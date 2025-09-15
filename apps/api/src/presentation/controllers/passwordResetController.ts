import { Request, Response } from "express";
import { PasswordResetService } from "../../core/services/passwordResetService";
import { InvalidCredentialsError } from "../errors/authErrors";
import { BadRequestError, InternalServerError } from "../errors/genericErrors";

export class PasswordResetController {
  private passwordResetService: PasswordResetService;

  constructor() {
    this.passwordResetService = new PasswordResetService();
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    await this.passwordResetService.requestResetPassword({ email });

    res
      .status(200)
      .json({ message: "Password reset email sent if account exists" });
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;

      const success = await this.passwordResetService.resetPassword({
        token,
        newPassword,
      });

      if (!success) {
        throw new InvalidCredentialsError("Invalid or expired reset token!");
      }

      res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    } catch (error) {
      // console.error("Reset password error:", error);
      throw new BadRequestError("Invalid or expired reset token");
    }
  }

  async validateResetToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      const isValid = await this.passwordResetService.validateResetToken(token);

      if (!isValid) {
        throw new BadRequestError("Invalid or expired reset token");
        return;
      }

      res.status(200).json({ valid: true, message: "Token is valid" });
    } catch (error) {
      console.error("Validate token error:", error);
      throw new InternalServerError();
    }
  }
}
