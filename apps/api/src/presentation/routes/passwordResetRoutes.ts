import { Router } from "express";
import { PasswordResetController } from "../controllers/passwordResetController";
import { PasswordResetValidators } from "../validators/passwordResetValidators";
import { validateRequest } from "../middlewares/validateRequest";

const passwordResetRoutes = Router();

const passwordResetController = new PasswordResetController();

/**
 * @swagger
 * /api/v1/password-reset/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: |
 *       Initiates the password reset process for a user.
 *
 *       **Security Note:**
 *       - Always returns 200 with the same message regardless of whether email exists
 *       - This prevents email enumeration attacks
 *       - If email exists, sends reset token via email
 *       - If email doesn't exist, returns success without sending email
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *           example:
 *             email: "john.doe@edunovia.com"
 *     responses:
 *       200:
 *         description: Password reset email sent if account exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *             example:
 *               success: true
 *               message: "Password reset email sent if account exists"
 *       400:
 *         description: Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               errors:
 *                 field: "Invalid email address"
 *       500:
 *         description: Internal server error
 */
passwordResetRoutes.post(
  "/forgot-password",
  PasswordResetValidators.requestResetPassword,
  validateRequest,
  passwordResetController.forgotPassword.bind(passwordResetController)
);

/**
 * @swagger
 * /api/v1/password-reset/execute-reset:
 *   post:
 *     summary: Execute password reset
 *     description: |
 *       Resets the user's password using a valid reset token.
 *
 *       **Process:**
 *       1. Validates the reset token
 *       2. Checks if token is expired or used
 *       3. Hashes and updates the new password
 *       4. Invalidates the used token
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *           examples:
 *             validReset:
 *               summary: Valid password reset
 *               value:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 newPassword: "newSecurePassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordResponse'
 *             example:
 *               success: true
 *               message: "Password reset successfully"
 *       400:
 *         description: Invalid token or validation error
 *         content:
 *           application/json:
 *             examples:
 *               invalidToken:
 *                 value:
 *                   success: false
 *                   message: "Invalid or expired reset token"
 *               weakPassword:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Password must be at least 8 characters"
 *       500:
 *         description: Internal server error
 */
passwordResetRoutes.post(
  "/execute-reset",
  PasswordResetValidators.resetPassword,
  validateRequest,

  passwordResetController.resetPassword.bind(passwordResetController)
);

/**
 * @swagger
 * /api/v1/password-reset/validate-reset-token:
 *   post:
 *     summary: Validate reset token
 *     description: |
 *       Validates if a password reset token is still valid and unused.
 *       Useful for frontend to check token validity before showing password reset form.
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidateTokenRequest'
 *           example:
 *             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Token validation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateTokenResponse'
 *             examples:
 *               validToken:
 *                 value:
 *                   valid: true
 *                   message: "Token is valid"
 *               invalidToken:
 *                 value:
 *                   valid: false
 *                   message: "Invalid or expired token"
 *       400:
 *         description: Token validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
passwordResetRoutes.post(
  "/validate-reset-token",
  passwordResetController.validateResetToken.bind(passwordResetController)
);

export default passwordResetRoutes;
