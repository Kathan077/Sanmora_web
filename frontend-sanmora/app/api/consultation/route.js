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

    const host = process.env.EMAIL_HOST || "smtp.hostinger.com";
    const port = parseInt(process.env.EMAIL_PORT) || 465;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.EMAIL_RECEIVER || "info@sanmora.in";

    if (!user || !pass) {
      return NextResponse.json(
        { error: "Mailer configuration is missing on the server. Please set EMAIL_USER and EMAIL_PASS." },
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
