import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const whatsapp = formData.get("whatsapp");
    const portfolio = formData.get("portfolio");
    const message = formData.get("message");
    const jobId = formData.get("jobId");
    const jobTitle = formData.get("jobTitle");
    const resumeFile = formData.get("resume");

    if (!name || !email || !whatsapp || !message || !resumeFile) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, whatsapp, message, and resume are required)." },
        { status: 400 }
      );
    }

    // Convert the File object to a Buffer
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const host = process.env.EMAIL_HOST || "smtp.hostinger.com";
    const port = parseInt(process.env.EMAIL_PORT) || 465;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.EMAIL_RECEIVER || "info@sanmora.in";

    if (!user || !pass) {
      return NextResponse.json(
        { error: "Mailer configuration is missing on the server. Please configure EMAIL_USER and EMAIL_PASS." },
        { status: 500 }
      );
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
          filename: resumeFile.name,
          content: buffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Success] Career email with attachment sent successfully to ${receiver} for: ${name}`);
    return NextResponse.json({ success: true, message: "Application submitted and email sent successfully!" });
  } catch (error) {
    console.error("[Error] Failed to send career email:", error);
    return NextResponse.json(
      { error: "Failed to send career email: " + error.message },
      { status: 500 }
    );
  }
}
