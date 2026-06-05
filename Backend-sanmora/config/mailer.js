const nodemailer = require("nodemailer");
const dns = require("dns");
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

/**
 * Custom wrapper that mimics Nodemailer's transporter object but sends via HTTPS API
 * for Resend or SendGrid to bypass SMTP port blocking on environments like Render Free Tier.
 */
const sendViaResend = async (mailOptions) => {
  const { from, to, subject, html, attachments } = mailOptions;

  // Format attachments for Resend API (base64 encoded content)
  let resendAttachments = [];
  if (attachments && attachments.length > 0) {
    resendAttachments = attachments.map(att => {
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
        content: base64Content
      };
    });
  }

  // Handle display name prefix and default to onboarding email if no verified custom domain
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
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: sender,
      to: typeof to === "string" ? [to] : to,
      subject: subject,
      html: html,
      attachments: resendAttachments.length > 0 ? resendAttachments : undefined
    })
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
    sendgridAttachments = attachments.map(att => {
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
        disposition: "attachment"
      };
    });
  }

  // Extract plain email from "Display Name <email@domain.com>"
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
      "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: (typeof to === "string" ? [to] : to).map(email => ({ email }))
        }
      ],
      from: {
        email: senderEmail
      },
      subject: subject,
      content: [
        {
          type: "text/html",
          value: html
        }
      ],
      attachments: sendgridAttachments.length > 0 ? sendgridAttachments : undefined
    })
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
  // 1. If RESEND_API_KEY is configured, return the HTTP API wrapper
  if (process.env.RESEND_API_KEY) {
    console.log("[Mailer] Configured to use Resend HTTP API.");
    return {
      sendMail: sendViaResend
    };
  }

  // 2. If SENDGRID_API_KEY is configured, return the HTTP API wrapper
  if (process.env.SENDGRID_API_KEY) {
    console.log("[Mailer] Configured to use SendGrid HTTP API.");
    return {
      sendMail: sendViaSendGrid
    };
  }

  // 3. Fallback to standard Nodemailer SMTP
  console.log("[Mailer] Configured to use SMTP Transporter.");
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("WARNING: SMTP credentials (EMAIL_USER/EMAIL_PASS) are not configured in .env. Emails will fail to send.");
  }

  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  if (host.includes("gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000
    });
  }

  return nodemailer.createTransport({
    host: host,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: user,
      pass: pass
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000
  });
};

module.exports = {
  getTransporter
};

