import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, companyName, emailId, contactNo, serviceName } = body;

    if (!fullName || !emailId || !contactNo || !serviceName) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, emailId, contactNo, and serviceName are required." },
        { status: 400 }
      );
    }

    // Validate email syntax first
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailId)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const domain = emailId.split("@")[1].toLowerCase();
    
    // 1. Check disposable email domain list
    const DISPOSABLE_DOMAINS = new Set([
      "mailinator.com", "tempmail.com", "temp-mail.org", "10minutemail.com",
      "yopmail.com", "guerrillamail.com", "dispostable.com", "getairmail.com",
      "maildrop.cc", "trashmail.com", "mailnesia.com", "temp-mail.io", "fakemailgenerator.com",
      "generator.email", "disposable.com", "tempmailaddress.com", "throwawaymail.com"
    ]);
    if (DISPOSABLE_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: "Temporary or disposable email addresses are not allowed. Please use a genuine email address." },
        { status: 400 }
      );
    }

    // 2. Perform DNS MX Record check to verify if domain can receive email
    let mxRecords = [];
    try {
      const dns = require("dns").promises;
      mxRecords = await dns.resolveMx(domain);
    } catch (dnsErr) {
      console.warn(`[DNS warning] MX resolution failed for domain: ${domain}`, dnsErr);
      if (dnsErr.code === "ENOTFOUND" || dnsErr.code === "ENODATA") {
        return NextResponse.json(
          { error: "The email domain does not exist or has no active mail servers. Please enter a genuine email address." },
          { status: 400 }
        );
      }
    }

    if (!mxRecords || mxRecords.length === 0) {
      try {
        const dns = require("dns").promises;
        const aRecords = await dns.resolve4(domain);
        if (!aRecords || aRecords.length === 0) {
          return NextResponse.json(
            { error: "The email domain is invalid or does not have any active mail servers configured." },
            { status: 400 }
          );
        }
      } catch (aErr) {
        return NextResponse.json(
          { error: "The email domain is invalid or does not have any active mail servers configured." },
          { status: 400 }
        );
      }
    }

    const host = process.env.EMAIL_HOST || "smtp.hostinger.com";
    const port = parseInt(process.env.EMAIL_PORT) || 465;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.EMAIL_RECEIVER || "info@sanmora.in";

    if (!user || !pass) {
      console.warn("[Mailer Warning] EMAIL_USER or EMAIL_PASS not configured. Skipping email delivery (simulating success).");
      return NextResponse.json({ success: true, message: "Consultation request verified (email sending bypassed due to missing credentials)." });
    }

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: port === 465,
      auth: {
        user: user,
        pass: pass
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

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

    await transporter.sendMail(mailOptions);
    console.log(`[Success] Consultation email sent successfully to ${receiver} for service: ${serviceName}`);
    return NextResponse.json({ success: true, message: "Consultation request email submitted successfully!" });
  } catch (error) {
    console.error("[Error] Failed to send consultation email:", error);
    return NextResponse.json(
      { error: "Failed to send consultation email: " + error.message },
      { status: 500 }
    );
  }
}
