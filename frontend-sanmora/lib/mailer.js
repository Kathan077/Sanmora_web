import nodemailer from "nodemailer";

let pooledTransporter = null;

/**
 * Returns a pooled Nodemailer transporter for Hostinger SMTP.
 * Connection pooling (`pool: true`) reuses connections, preventing socket floods
 * and connection handshake bans from Hostinger's mail firewall.
 */
export function getMailTransporter() {
  if (pooledTransporter) {
    return pooledTransporter;
  }

  const host = process.env.EMAIL_HOST || "smtp.hostinger.com";
  const port = parseInt(process.env.EMAIL_PORT, 10) || 465;
  const isSecure = port === 465;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  pooledTransporter = nodemailer.createTransport({
    host: host.trim(),
    port: port,
    secure: isSecure,
    // Enable connection pooling
    pool: true,
    maxConnections: 3, // Safe pool size for Hostinger
    maxMessages: 50, // Recycle socket connection after 50 messages
    rateLimit: 5, // Maximum 5 messages per second to avoid SMTP flood flag
    auth: {
      user: user.trim(),
      pass: pass.trim()
    },
    connectionTimeout: 10000, // 10s connection timeout
    greetingTimeout: 10000, // 10s greeting timeout
    socketTimeout: 15000, // 15s socket activity timeout
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true
    }
  });

  return pooledTransporter;
}

/**
 * Sends mail safely with timeout protection and no retry loops.
 */
export async function sendMailSafe(mailOptions) {
  const transporter = getMailTransporter();
  if (!transporter) {
    throw new Error("SMTP credentials are not configured (EMAIL_USER or EMAIL_PASS missing).");
  }

  // Ensure 'from' header strictly matches the authenticated EMAIL_USER to prevent Hostinger spoofing bans
  const authUser = process.env.EMAIL_USER.trim();
  const fromName = mailOptions.fromName || "Sanmora Web";
  const safeOptions = {
    ...mailOptions,
    from: `"${fromName}" <${authUser}>`
  };

  // 20-second hard limit on sendMail to prevent hung serverless handlers
  const sendPromise = transporter.sendMail(safeOptions);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("SMTP_TIMEOUT: Sending mail timed out after 20 seconds.")), 20000);
  });

  return Promise.race([sendPromise, timeoutPromise]);
}

