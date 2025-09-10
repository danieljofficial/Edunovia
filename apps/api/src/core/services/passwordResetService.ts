import { prisma } from "../../infrastructure/database/prisma";
import { BadRequestError } from "../../presentation/errors/genericErrors";
import {
  IPasswordResetExecution,
  IPasswordResetRequest,
  IPasswordResetToken,
} from "../interfaces/IPasswordReset";
import { EmailService } from "./emailService";
import { passwordService } from "./passwordService";
import { JwtTokenService } from "./tokenService";
import "dotenv/config";
export class PasswordResetService {
  private jwtService: JwtTokenService;
  private emailService: EmailService;
  constructor() {
    this.jwtService = new JwtTokenService(process.env.JWT_SECRET as string);
    this.emailService = new EmailService();
  }
  async requestResetPassword(request: IPasswordResetRequest) {
    const user = await prisma.user.findFirst({
      where: { email: request.email },
    });

    if (!user) return;

    const passwordResetToken = this.jwtService.generateToken(
      { id: user.id, email: user.email },
      "10m"
    );

    await prisma.passwordResetToken.create({
      data: {
        token: passwordResetToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 3600000),
      },
    });

    await this.emailService.sendPasswordResetEmail(
      user.email,
      passwordResetToken
    );
  }

  async resetPassword(request: IPasswordResetExecution) {
    const decodedToken = this.jwtService.verifyToken(request.token);

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: request.token,
        userId: decodedToken.id,
        expiresAt: { gt: new Date() },
      },
    });

    if (!resetToken) {
      return false;
    }

    const hashedPassword = await passwordService.hashPassword(
      request.newPassword,
      10
    );

    await prisma.user.update({
      where: {
        id: decodedToken.id,
      },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { token: resetToken.token },
    });
    return true;
  }

  async validateResetToken(token: string): Promise<boolean> {
    try {
      const decodedToken = this.jwtService.verifyToken(token);

      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          token: token,
          userId: decodedToken.userId,
          expiresAt: { gt: new Date() },
        },
      });

      return !!resetToken;
    } catch (error) {
      return false;
    }
  }
}
