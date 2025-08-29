import { passwordService } from "../src/core/services/passwordService";
import { prisma } from "../src/infrastructure/database/prisma";
import request from "supertest";
import createApp from "../src/infrastructure/server/app";
import { v4 as uuidv4 } from "uuid";
import { EmailService } from "../src/core/services/emailService";
import { TokenPayload } from "../src/core/interfaces/ITokenService";
import { tokenService } from "../src/core/services/tokenService";
import "dotenv/config";
import { IPasswordResetExecution } from "../src/core/interfaces/IPasswordReset";
let app = createApp();
jest.mock("../src/core/services/emailService");
describe("Password reset flow", () => {
  const testUser = {
    username: "test user",
    email: `${uuidv4()}@edunovia.com`,
    password: "oldPassword123",
    role: "TEACHER",
    isVerified: true,
  };

  const mockSendPasswordResetEmail = jest.fn();

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        ...testUser,
        password: await passwordService.hashPassword(testUser.password, 5),
      },
    });

    (EmailService as jest.Mock).mockImplementation(() => ({
      sendPasswordResetEmail:
        mockSendPasswordResetEmail.mockResolvedValue(undefined),
    }));
  });

  afterEach(async () => {
    await prisma.passwordResetToken.deleteMany();
    jest.clearAllMocks();
  });

  describe("POST /api/password-reset/forgot-password", () => {
    it("should generate reset token for valid email", async () => {
      const response = await request(app)
        .post("/api/password-reset/forgot-password")
        .send({ email: testUser.email });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(
        "Password reset email sent if account exists"
      );

      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          userId: (await prisma.user.findUnique({
            where: { email: testUser.email },
          }))!.id,
        },
      });

      expect(resetToken).toBeDefined();
      expect(resetToken?.used).toBe(false);
      expect(resetToken?.expiresAt.getTime()).toBeGreaterThan(Date.now());

      expect(EmailService.prototype.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it("should return same response for non-existent email (security)", async () => {
      const response = await request(app)
        .post("/api/password-reset/forgot-password")
        .send({ email: "nonexistent@edunovia.com" });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(
        "Password reset email sent if account exists"
      );

      const resetToken = await prisma.passwordResetToken.findMany();
      expect(resetToken.length).toBe(0);

      expect(
        EmailService.prototype.sendPasswordResetEmail
      ).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid email format", async () => {
      const response = await request(app)
        .post("/api/password-reset/forgot-password")
        .send({ email: "invalid-email" });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("POST /api/password-reset/execute-reset", () => {
    let payload: TokenPayload;
    let resetToken: string;
    beforeEach(async () => {
      const user = await prisma.user.findUnique({
        where: { email: testUser.email },
      });

      if (!user) return;

      payload = { email: user?.email, id: user.id, role: user.role };

      resetToken = tokenService.generateToken(payload, "10m");

      await prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          userId: user!.id,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
    });

    it("should successfully reset password with valid token", async () => {
      const newPassword = "newSecurejjjjjjjjjjjjjjjjjjjjjjjjjPassword123";
      const dat: IPasswordResetExecution = {
        token: resetToken,
        newPassword: newPassword,
      };
      const response = await request(app)
        .post("/api/password-reset/execute-reset")
        .send(dat);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Password reset successfully");

      const usedToken = await prisma.passwordResetToken.findUnique({
        where: { token: resetToken },
      });

      // Null because used tokens are deleted
      expect(usedToken).toBe(null);

      const updatedUser = await prisma.user.findUnique({
        where: { email: testUser.email },
      });
      const isNewPasswordValid = await passwordService.comparePasswords(
        newPassword,
        updatedUser!.password
      );
      expect(isNewPasswordValid).toBe(true);
    });

    it("should return 400 for invalid token", async () => {
      const response = await request(app)
        .post("/api/password-reset/execute-reset")
        .send({
          token: "invalid-token",
          newPassword: "newPassword123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Invalid or expired reset token");
    });

    it("should return 400 for weak password", async () => {
      const response = await request(app)
        .post("/api/password-reset/execute-reset")
        .send({
          token: resetToken,
          newPassword: "123",
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
