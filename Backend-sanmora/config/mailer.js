const nodemailer = require("nodemailer");
const dns = require("dns");
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

let pooledTransporter = null;

const sendViaResend = async (mailOptions) => {
  const { from, to, subject, html, attachments } = mailOptions;

  let resendAttachments = [];
  if (attachments && attachments.length > 0) {
    resendAttachments = attachments.map((att) => {
      let base64Content = "";
      if (Buffer.isBuffer(att.content)) {
        base64Content = att.content.toString("base64");
      } else if (typeof att.content === "string") {
        base64Content = Buffer.from(att.content).toString("base64");
      } else {
        base64Content = att.content;
      }
      return {
        filename: att.filename,
        content: base64Content,
      };
    });
  }

  let sender = process.env.RESEND_FROM;
  if (!sender) {
    const match = from.match(/^"([^"]+)"/);
    const namePrefix = match ? `"${match[1]}" ` : "";
    sender = `${namePrefix}<onboarding@resend.dev>`;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: sender,
      to: typeof to === "string" ? to.split(",").map((e) => e.trim()) : to,
      subject: subject,
      html: html,
      attachments: resendAttachments.length > 0 ? resendAttachments : undefined,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Resend API returned status ${response.status}`);
  }
  return data;
};

const sendViaSendGrid = async (mailOptions) => {
  const { from, to, subject, html, attachments } = mailOptions;

  let sendgridAttachments = [];
  if (attachments && attachments.length > 0) {
    sendgridAttachments = attachments.map((att) => {
      let base64Content = "";
      if (Buffer.isBuffer(att.content)) {
        base64Content = att.content.toString("base64");
      } else if (typeof att.content === "string") {
        base64Content = Buffer.from(att.content).toString("base64");
      } else {
        base64Content = att.content;
      }
      return {
        content: base64Content,
        filename: att.filename,
        type: att.contentType || "application/octet-stream",
        disposition: "attachment",
      };
    });
  }

  let senderEmail = from;
  if (from.includes("<")) {
    const match = from.match(/<([^>]+)>/);
    if (match) {
      senderEmail = match[1].trim();
    }
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: (typeof to === "string" ? to.split(",").map((e) => e.trim()) : to).map((email) => ({ email })),
        },
      ],
      from: {
        email: senderEmail,
      },
      subject: subject,
      content: [
        {
          type: "text/html",
          value: html,
        },
      ],
      attachments: sendgridAttachments.length > 0 ? sendgridAttachments : undefined,
    }),
  });

  if (!response.ok) {
    let errorText = "";
    try {
      const errData = await response.json();
      errorText = JSON.stringify(errData);
    } catch {
      errorText = await response.text();
    }
    throw new Error(`SendGrid API returned status ${response.status}: ${errorText}`);
  }
  return { success: true };
};

const getTransporter = () => {
  if (process.env.RESEND_API_KEY) {
    return { sendMail: sendViaResend };
  }

  if (process.env.SENDGRID_API_KEY) {
    return { sendMail: sendViaSendGrid };
  }

  if (pooledTransporter) {
    return pooledTransporter;
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("WARNING: SMTP credentials (EMAIL_USER/EMAIL_PASS) are not configured in .env. Emails will fail to send.");
    return null;
  }

  const host = process.env.EMAIL_HOST || "smtp.hostinger.com";
  const port = parseInt(process.env.EMAIL_PORT, 10) || 465;
  const isSecure = port === 465;

  pooledTransporter = nodemailer.createTransport({
    host: host.trim(),
    port: port,
    secure: isSecure,
    // Connection pooling to prevent socket floods to Hostinger
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
    rateLimit: 5,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
  });

  return pooledTransporter;
};

const sendMailSafe = async (mailOptions) => {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error("SMTP credentials are not configured.");
  }

  const authUser = (process.env.EMAIL_USER || "").trim();
  const fromName = mailOptions.fromName || "Sanmora Web";
  const safeOptions = {
    ...mailOptions,
    from: `"${fromName}" <${authUser}>`,
  };

  const sendPromise = transporter.sendMail(safeOptions);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("SMTP_TIMEOUT: Sending mail timed out after 20 seconds.")), 20000);
  });

  return Promise.race([sendPromise, timeoutPromise]);
};

module.exports = {
  getTransporter,
  sendMailSafe,
};
