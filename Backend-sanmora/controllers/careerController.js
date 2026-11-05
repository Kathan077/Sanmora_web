const { sendMailSafe } = require("../config/mailer");
const {
  escapeHtml,
  sanitizeHeader,
  sanitizeTextInput,
  validateEmail,
  checkRateLimit,
  checkDuplicateSubmission,
  verifyRecaptcha,
  getClientIp,
  logEmailAudit,
} = require("../utils/emailSecurity");

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = /\.(pdf|doc|docx)$/i;

const applyJob = async (req, res) => {
  const clientIp = getClientIp(req);
  const endpoint = "/api/career-apply";

  // 1. Rate Limiting Check (Max 5 submissions per 10 minutes per IP)
  const rateLimitResult = checkRateLimit(clientIp);
  if (!rateLimitResult.allowed) {
    logEmailAudit({
      endpoint,
      clientIp,
      status: "BLOCKED_RATE_LIMIT",
      details: `Retry after ${rateLimitResult.retryAfterSec}s`,
    });
    return res.status(429).json({
      error: "Too many requests. Please wait a few minutes before submitting another job application.",
      retryAfter: rateLimitResult.retryAfterSec,
    });
  }

  const { name, email, whatsapp, portfolio, message, jobId, jobTitle, recaptchaToken } = req.body;

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

  // 3. Validate Required Form Fields
  if (!name || !email || !whatsapp || !message) {
    return res.status(400).json({
      error: "Missing required form fields (name, email, whatsapp, and message are required).",
    });
  }

  // 4. Validate Resume Attachment
  if (!req.file) {
    return res.status(400).json({ error: "Resume / CV file attachment is required." });
  }

  if (!ALLOWED_FILE_EXTENSIONS.test(req.file.originalname)) {
    return res.status(400).json({ error: "Only PDF, DOC, and DOCX resume files are accepted." });
  }

  if (req.file.size > MAX_FILE_SIZE_BYTES) {
    return res.status(400).json({ error: "Resume file size must be less than 10MB." });
  }

  // 5. Strict Email Validation
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.error });
  }
  const cleanEmail = emailValidation.email;

  // 6. Sanitize Text Inputs
  const cleanName = sanitizeHeader(name, 80);
  const cleanWhatsapp = sanitizeHeader(whatsapp, 30);
  const cleanJobTitle = sanitizeHeader(jobTitle || `Job ID: ${jobId || "Role"}`, 80);
  const cleanPortfolio = sanitizeTextInput(portfolio || "", 250);
  const cleanMessage = sanitizeTextInput(message, 3000);
  const safeFilename = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");

  // 7. Duplicate Submission Check (2 min window)
  const duplicateKey = `${clientIp}:${cleanEmail.toLowerCase()}:${cleanJobTitle.toLowerCase()}`;
  const duplicateCheck = checkDuplicateSubmission(duplicateKey);
  if (duplicateCheck.isDuplicate) {
    logEmailAudit({
      endpoint,
      clientIp,
      recipient: cleanEmail,
      status: "BLOCKED_DUPLICATE",
      score: recaptchaResult.score,
      subject: cleanJobTitle,
      details: "Duplicate application submission suppressed",
    });
    return res.status(200).json({
      success: true,
      message: "Your application has already been received. Our recruitment team will review it shortly!",
    });
  }

  // 8. Check SMTP Credentials
  const receiver = process.env.EMAIL_RECEIVER || "info@sanmora.in, info@sanmora.co.za";
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return res.status(500).json({
      error: "Mailer setup is incomplete. Please configure EMAIL_USER and EMAIL_PASS in the backend .env file.",
    });
  }

  const safeSubject = sanitizeHeader(`New Job Application: ${cleanJobTitle} - ${cleanName}`, 120);

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">Job Application Received</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 180px;">Job Role Applied:</td>
          <td style="padding: 8px 0; color: #1f2937;"><strong>${escapeHtml(cleanJobTitle)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Applicant Name:</td>
          <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
          <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${encodeURIComponent(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">WhatsApp Number:</td>
          <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(cleanWhatsapp)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Portfolio / GitHub:</td>
          <td style="padding: 8px 0; color: #1f2937;">
            ${cleanPortfolio ? `<a href="${escapeHtml(cleanPortfolio)}" target="_blank" rel="noopener noreferrer">${escapeHtml(cleanPortfolio)}</a>` : "N/A"}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">Cover Letter / Message:</td>
          <td style="padding: 8px 0; color: #1f2937; white-space: pre-line;">${escapeHtml(cleanMessage)}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; font-size: 13px; color: #64748b;">
        <em>Note: The applicant's resume is attached to this email.</em>
      </p>
      <div style="margin-top: 30px; padding: 12px; background-color: #ecfeff; color: #0891b2; border-radius: 6px; font-size: 14px; text-align: center;">
        This job application was submitted from the Sanmora Web Careers Portal.
      </div>
    </div>
  `;

  try {
    await sendMailSafe({
      fromName: "Sanmora Web Careers",
      to: receiver,
      replyTo: cleanEmail,
      subject: safeSubject,
      html: htmlBody,
      attachments: [
        {
          filename: safeFilename,
          content: req.file.buffer,
        },
      ],
    });

    logEmailAudit({
      endpoint,
      clientIp,
      recipient: receiver,
      status: "SUCCESS",
      score: recaptchaResult.score,
      subject: safeSubject,
    });

    return res.status(200).json({ success: true, message: "Application submitted and email sent successfully!" });
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

    return res.status(500).json({ error: "Failed to send career email: " + error.message });
  }
};

module.exports = {
  applyJob,
};
