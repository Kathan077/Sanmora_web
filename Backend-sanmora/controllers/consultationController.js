const { sendMailSafe } = require("../config/mailer");
const {
  escapeHtml,
  sanitizeHeader,
  validateEmail,
  checkRateLimit,
  checkDuplicateSubmission,
  verifyRecaptcha,
  getClientIp,
  logEmailAudit,
} = require("../utils/emailSecurity");

const sendConsultationEmail = async (req, res) => {
  const clientIp = getClientIp(req);
  const endpoint = "/api/consultation";

  // 1. Rate Limiting Check (Max 5 requests per 10 minutes per IP)
  const rateLimitResult = checkRateLimit(clientIp);
  if (!rateLimitResult.allowed) {
    logEmailAudit({
      endpoint,
      clientIp,
      status: "BLOCKED_RATE_LIMIT",
      details: `Retry after ${rateLimitResult.retryAfterSec}s`,
    });
    return res.status(429).json({
      error: "Too many requests. Please wait a few minutes before submitting another consultation inquiry.",
      retryAfter: rateLimitResult.retryAfterSec,
    });
  }

  const { fullName, companyName, emailId, contactNo, serviceName, recaptchaToken } = req.body;

  // 2. Google reCAPTCHA v3 Validation
  const recaptchaResult = await verifyRecaptcha(recaptchaToken, null, clientIp);
  if (!recaptchaResult.success) {
    logEmailAudit({
      endpoint,
      clientIp,
      status: "BLOCKED_CAPTCHA",
      score: recaptchaResult.score,
      error: recaptchaResult.error,
    });
    return res.status(400).json({
      error: recaptchaResult.error || "Security validation failed. Please refresh the page and try again.",
    });
  }

  // 3. Validate Required Fields
  if (!fullName || !emailId || !contactNo || !serviceName) {
    return res.status(400).json({
      error: "Missing required fields: fullName, emailId, contactNo, and serviceName are required.",
    });
  }

  // 4. Strict Email Validation
  const emailValidation = validateEmail(emailId);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.error });
  }
  const cleanEmail = emailValidation.email;

  // 5. Sanitize Headers and Text Inputs
  const cleanFullName = sanitizeHeader(fullName, 80);
  const cleanCompany = sanitizeHeader(companyName || "N/A", 100);
  const cleanContactNo = sanitizeHeader(contactNo, 30);
  const cleanServiceName = sanitizeHeader(serviceName, 100);

  if (cleanFullName.length < 2) {
    return res.status(400).json({ error: "Full Name must be at least 2 characters long." });
  }

  // 6. Duplicate Submission Prevention (Idempotency) - 2 min window
  const duplicateKey = `${clientIp}:${cleanEmail.toLowerCase()}:${cleanServiceName.toLowerCase()}`;
  const duplicateCheck = checkDuplicateSubmission(duplicateKey);
  if (duplicateCheck.isDuplicate) {
    logEmailAudit({
      endpoint,
      clientIp,
      recipient: cleanEmail,
      status: "BLOCKED_DUPLICATE",
      score: recaptchaResult.score,
      subject: cleanServiceName,
      details: "Duplicate request suppressed to prevent SMTP flood",
    });
    return res.status(200).json({
      success: true,
      message: "Your consultation request has already been received. Our team will contact you shortly!",
    });
  }

  // 7. Check SMTP Credentials
  const receiver = process.env.EMAIL_RECEIVER || "info@sanmora.in, info@sanmora.co.za";
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return res.status(500).json({
      error: "Mailer setup is incomplete. Please configure EMAIL_USER and EMAIL_PASS in the backend .env file.",
    });
  }

  const safeSubject = sanitizeHeader(`New Free Consultation Request - ${cleanServiceName}`, 120);

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">Free Consultation Request</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 180px;">Service of Interest:</td>
          <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(cleanServiceName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Full Name:</td>
          <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(cleanFullName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Company Name:</td>
          <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(cleanCompany)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
          <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${encodeURIComponent(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Contact Number:</td>
          <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(cleanContactNo)}</td>
        </tr>
      </table>
      <div style="margin-top: 30px; padding: 12px; background-color: #f3e8ff; color: #6b21a8; border-radius: 6px; font-size: 14px; text-align: center;">
        This inquiry was sent from the Sanmora Web Free Consultation Form.
      </div>
    </div>
  `;

  try {
    await sendMailSafe({
      fromName: "Sanmora Web Consultation",
      to: receiver,
      replyTo: cleanEmail,
      subject: safeSubject,
      html: htmlBody,
    });

    logEmailAudit({
      endpoint,
      clientIp,
      recipient: receiver,
      status: "SUCCESS",
      score: recaptchaResult.score,
      subject: safeSubject,
    });

    return res.status(200).json({ success: true, message: "Consultation request email submitted successfully!" });
  } catch (error) {
    logEmailAudit({
      endpoint,
      clientIp,
      recipient: receiver,
      status: "FAILED_SMTP",
      score: recaptchaResult.score,
      subject: safeSubject,
      error: error.message,
    });

    return res.status(500).json({ error: "Failed to send consultation email: " + error.message });
  }
};

module.exports = {
  sendConsultationEmail,
};
