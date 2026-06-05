const nodemailer = require("nodemailer");

const getTransporter = () => {
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
      }
    });
  }

  return nodemailer.createTransport({
    host: host,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: user,
      pass: pass
    }
  });
};

module.exports = {
  getTransporter
};
