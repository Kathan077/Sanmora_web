const nodemailer = require("nodemailer");

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("WARNING: SMTP credentials (EMAIL_USER/EMAIL_PASS) are not configured in .env. Emails will fail to send.");
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
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
