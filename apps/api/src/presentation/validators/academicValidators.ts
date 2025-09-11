import { body } from "express-validator";

export const Academicvalidators = {
  validateSession: [
    body("startDate").isISO8601().withMessage("Valid start date is required"),
    body("endDate").isISO8601().withMessage("Valid end date is required"),
    body("name").notEmpty().withMessage("Session name is required"),
    body("endDate").custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  ],

  validateTerm: [
    body("name").notEmpty().withMessage("Term name is required"),
    body("termNumber")
      .isInt({ min: 1, max: 3 })
      .withMessage("Term number must be 1, 2, or 3"),
    body("startDate").isISO8601().withMessage("Valid start date is required"),
    body("endDate").isISO8601().withMessage("Valid end date is required"),
    body("sessionId").notEmpty().withMessage("Session ID is required"),
  ],
};
