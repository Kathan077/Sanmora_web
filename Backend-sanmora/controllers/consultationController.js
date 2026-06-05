const { getTransporter } = require("../config/mailer");

const sendConsultationEmail = async (req, res) => {
  const { fullName, companyName, emailId, contactNo, serviceName } = req.body;

  if (!fullName || !emailId || !contactNo || !serviceName) {
    return res.status(400).json({ error: "Missing required fields: fullName, emailId, contactNo, and serviceName are required." });
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
    from: `"Sanmora Web Consultation" <${user}>`,
    to: receiver,
    subject: `New Free Consultation Request - ${serviceName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">Free Consultation Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 180px;">Service of Interest:</td>
            <td style="padding: 8px 0; color: #1f2937;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Full Name:</td>
            <td style="padding: 8px 0; color: #1f2937;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Company Name:</td>
            <td style="padding: 8px 0; color: #1f2937;">${companyName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
            <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${emailId}">${emailId}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Contact Number:</td>
            <td style="padding: 8px 0; color: #1f2937;">${contactNo}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding: 12px; background-color: #f3e8ff; color: #6b21a8; border-radius: 6px; font-size: 14px; text-align: center;">
          This inquiry was sent from the Sanmora Web Free Consultation Form.
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Success] Consultation email sent successfully to ${receiver} for service: ${serviceName}`);
    return res.status(200).json({ success: true, message: "Consultation request email submitted successfully!" });
  } catch (error) {
    console.error("[Error] Failed to send consultation email:", error);
    return res.status(500).json({ error: "Failed to send consultation email: " + error.message });
  }
};

module.exports = {
  sendConsultationEmail
};
