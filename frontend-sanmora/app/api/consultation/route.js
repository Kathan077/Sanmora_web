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

export async function POST(request) {
  const clientIp = getClientIp(request);
  const endpoint = "/api/consultation";

  // 1. Rate Limiting Check (Max 5 emails per 10 minutes per IP)
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
        error: "Too many requests. Please wait a few minutes before submitting another consultation inquiry.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimitResult.retryAfterSec) },
      }
    );
  }

  // 2. Parse JSON Request Body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const { fullName, companyName, emailId, contactNo, serviceName, recaptchaToken } = body;

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

  // 4. Validate Required Fields
  if (!fullName || !emailId || !contactNo || !serviceName) {
    return NextResponse.json(
      { error: "Missing required fields: Full Name, Email, Contact Number, and Service are required." },
      { status: 400 }
    );
  }

  // 5. Strict Email Syntax & Disposable Domain Check
  const emailValidation = validateEmail(emailId);
  if (!emailValidation.valid) {
    return NextResponse.json({ error: emailValidation.error }, { status: 400 });
  }
  const cleanEmail = emailValidation.email;

  // 6. Sanitize and validate remaining fields
  const cleanFullName = sanitizeHeader(fullName, 80);
  const cleanCompany = sanitizeHeader(companyName || "N/A", 100);
  const cleanContactNo = sanitizeHeader(contactNo, 30);
  const cleanServiceName = sanitizeHeader(serviceName, 100);

  if (cleanFullName.length < 2) {
    return NextResponse.json({ error: "Full Name must be at least 2 characters long." }, { status: 400 });
  }

  // 7. Duplicate Submission Prevention (Idempotency) - 2 minute window
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
    return NextResponse.json({
      success: true,
      message: "Your consultation request has already been received. Our team will contact you shortly!",
    });
  }

  // 8. Prepare Safe SMTP Email
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
      subject: cleanServiceName,
    });
    return NextResponse.json({
      success: true,
      message: "Consultation request verified (email delivery bypassed in dev due to missing credentials).",
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

  // 9. Send Email via Pooled Mailer with hard timeout and audit log
  try {
    await sendMailSafe({
      fromName: "Sanmora Consultation",
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

    return NextResponse.json({
      success: true,
      message: "Consultation request email submitted successfully!",
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
      { error: "Unable to deliver inquiry email at this moment. Please try again or reach us on WhatsApp." },
      { status: 500 }
    );
  }
}
