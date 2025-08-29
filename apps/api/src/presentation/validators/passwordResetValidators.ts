import { body } from "express-validator";

export const PasswordResetValidators = {
  requestResetPassword: [
    body("email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .withMessage("Invalid email address"),
  ],

  resetPassword: [
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
};
