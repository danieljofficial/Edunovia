import nodemailer from "nodemailer";
import "dotenv/config";
import { FRONTEND_DOMAIN } from "../../utils/domains";
import { BadRequestError } from "../../presentation/errors/genericErrors";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });
  }
  async sendPasswordResetEmail(
    recipient: string,
    resetToken: string
  ): Promise<void> {
    const resetLink = `${FRONTEND_DOMAIN}/reset-password?token=${resetToken}`;

    console.log(`Sending password reset email to: ${recipient}`);
    console.log(`Reset link: ${resetLink}`);

    const mailOptions = {
      from: `"Edunovia Support" <${process.env.EMAIL_FROM}>`, // e.g. no-reply@edunovia.com
      to: recipient,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link to reset: ${resetLink}`,
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password (valid for 10 minutes):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to ${recipient}`);
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new BadRequestError("Failed to send password reset email");
    }
  }

  private generateResetEmailTemplate(resetLink: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Password Reset Request</title>
      </head>
      <body>
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
      </body>
      </html>
    `;
  }
}
