const { getTransporter } = require("../config/mailer");

const applyJob = async (req, res) => {
  const { name, email, whatsapp, portfolio, message, jobId, jobTitle } = req.body;

  if (!name || !email || !whatsapp || !message) {
    return res.status(400).json({ error: "Missing required form fields (name, email, whatsapp, and message are required)." });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Resume / CV file attachment is required." });
  }

  const receiver = process.env.EMAIL_RECEIVER || "mksolanki527@gmail.com";
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return res.status(500).json({ 
      error: "Mailer setup is incomplete. Please configure EMAIL_USER and EMAIL_PASS in the backend .env file." 
    });
  }

  const transporter = getTransporter();

  const mailOptions = {
    from: `"Sanmora Web Careers" <${user}>`,
    to: receiver,
    subject: `New Job Application: ${jobTitle || "Job Seeker"} - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">Job Application Received</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 180px;">Job Role Applied:</td>
            <td style="padding: 8px 0; color: #1f2937;"><strong>${jobTitle || "Job ID: " + jobId}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Applicant Name:</td>
            <td style="padding: 8px 0; color: #1f2937;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
            <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">WhatsApp Number:</td>
            <td style="padding: 8px 0; color: #1f2937;">${whatsapp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Portfolio / GitHub:</td>
            <td style="padding: 8px 0; color: #1f2937;">
              ${portfolio ? `<a href="${portfolio}" target="_blank">${portfolio}</a>` : "N/A"}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">Cover Letter / Message:</td>
            <td style="padding: 8px 0; color: #1f2937; white-space: pre-line;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 13px; color: #64748b;">
          <em>Note: The applicant's resume is attached to this email.</em>
        </p>
        <div style="margin-top: 30px; padding: 12px; background-color: #ecfeff; color: #0891b2; border-radius: 6px; font-size: 14px; text-align: center;">
          This job application was submitted from the Sanmora Web Careers Portal.
        </div>
      </div>
    `,
    attachments: [
      {
        filename: req.file.originalname,
        content: req.file.buffer
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Success] Career email with attachment sent successfully to ${receiver} for: ${name}`);
    return res.status(200).json({ success: true, message: "Application submitted and email sent successfully!" });
  } catch (error) {
    console.error("[Error] Failed to send career email:", error);
    return res.status(500).json({ error: "Failed to send career email: " + error.message });
  }
};

module.exports = {
  applyJob
};
