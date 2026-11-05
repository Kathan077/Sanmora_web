import { NextResponse } from "next/server";
import {
  escapeHtml,
  sanitizeHeader,
  sanitizeTextInput,
  validateEmail,
  checkRateLimit,
  checkDuplicateSubmission,
  verifyRecaptcha,
  getClientIp,
  logEmailAudit,
} from "@/lib/emailSecurity";
import { sendMailSafe } from "@/lib/mailer";

// 10 MB maximum resume file size
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = /\.(pdf|doc|docx)$/i;

export async function POST(request) {
  const clientIp = getClientIp(request);
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
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a few minutes before submitting another job application.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimitResult.retryAfterSec) },
      }
    );
  }

  // 2. Parse FormData
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data submission." }, { status: 400 });
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const whatsapp = formData.get("whatsapp");
  const portfolio = formData.get("portfolio");
  const message = formData.get("message");
  const jobId = formData.get("jobId");
  const jobTitle = formData.get("jobTitle");
  const resumeFile = formData.get("resume");
  const recaptchaToken = formData.get("recaptchaToken");

  // 3. Verify Google reCAPTCHA v3
  const recaptchaResult = await verifyRecaptcha(recaptchaToken, null, clientIp);
  if (!recaptchaResult.success) {
    logEmailAudit({
      endpoint,
      clientIp,
      status: "BLOCKED_CAPTCHA",
      score: recaptchaResult.score,
      error: recaptchaResult.error,
    });
    return NextResponse.json(
      { error: recaptchaResult.error || "Security validation failed. Please refresh the page and try again." },
      { status: 400 }
    );
  }

  // 4. Validate Required Form Fields
  if (!name || !email || !whatsapp || !message || !resumeFile) {
    return NextResponse.json(
      { error: "Missing required fields (name, email, whatsapp, message, and resume are required)." },
      { status: 400 }
    );
  }

  // 5. Strict Email Syntax & Disposable Domain Check
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return NextResponse.json({ error: emailValidation.error }, { status: 400 });
  }
  const cleanEmail = emailValidation.email;

  // 6. Validate Resume File
  if (typeof resumeFile !== "object" || !resumeFile.name) {
    return NextResponse.json({ error: "Resume file attachment is invalid." }, { status: 400 });
  }

  if (!ALLOWED_FILE_EXTENSIONS.test(resumeFile.name)) {
    return NextResponse.json({ error: "Only PDF, DOC, and DOCX resume files are accepted." }, { status: 400 });
  }

  if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "Resume file size must be less than 10MB." }, { status: 400 });
  }

  // 7. Sanitize Fields
  const cleanName = sanitizeHeader(name, 80);
  const cleanWhatsapp = sanitizeHeader(whatsapp, 30);
  const cleanJobTitle = sanitizeHeader(jobTitle || `Job ID: ${jobId || "Role"}`, 80);
  const cleanPortfolio = sanitizeTextInput(portfolio || "", 250);
  const cleanMessage = sanitizeTextInput(message, 3000);
  const safeFilename = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");

  // 8. Duplicate Submission Check (2 minute window)
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
    return NextResponse.json({
      success: true,
      message: "Your application has already been received. Our recruitment team will review it shortly!",
    });
  }

  // 9. Convert File to Buffer
  const arrayBuffer = await resumeFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 10. Check SMTP Configuration
  const receiver = process.env.EMAIL_RECEIVER || "info@sanmora.in, info@sanmora.co.za";
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("[Mailer Warning] EMAIL_USER or EMAIL_PASS not configured. Skipping SMTP dispatch.");
    logEmailAudit({
      endpoint,
      clientIp,
      recipient: receiver,
      status: "SKIPPED_NO_CREDENTIALS",
      score: recaptchaResult.score,
      subject: cleanJobTitle,
    });
    return NextResponse.json({
      success: true,
      message: "Application received (email delivery bypassed in dev due to missing credentials).",
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
        This job application was submitted from the Sanmora Careers Portal.
      </div>
    </div>
  `;

  // 11. Send Email with Attachment via Pooled Transporter
  try {
    await sendMailSafe({
      fromName: "Sanmora Careers",
      to: receiver,
      replyTo: cleanEmail,
      subject: safeSubject,
      html: htmlBody,
      attachments: [
        {
          filename: safeFilename,
          content: buffer,
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

    return NextResponse.json({
      success: true,
      message: "Application submitted and email sent successfully!",
    });
  } catch (err) {
    logEmailAudit({
      endpoint,
      clientIp,
      recipient: receiver,
      status: "FAILED_SMTP",
      score: recaptchaResult.score,
      subject: safeSubject,
      error: err.message,
    });

    return NextResponse.json(
      { error: "Unable to process application submission at this moment. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
