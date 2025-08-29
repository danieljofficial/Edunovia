import { body } from "express-validator";

export const AuthValidators = {
  register: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be 3–20 characters"),

    body("email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .withMessage("Invalid email address"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    body("role")
      .optional()
      .isIn(["TEACHER", "PARENT", "STUDENT", "ADMIN"]) // whitelist roles you allow
      .withMessage("Invalid role"),
  ],

  login: [
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
};
