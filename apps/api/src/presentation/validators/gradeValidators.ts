import { body, param, query } from "express-validator";

export const GradeClassArmValidators = {
  validateGrade: [
    body("level")
      .isInt({ min: 1, max: 6 })
      .withMessage("Grade level must be between 1 and 6"),
    body("section")
      .isIn(["JUNIOR", "SENIOR"])
      .withMessage("Section must be either JUNIOR or SENIOR"),
  ],

  validateClassArm: [
    body("name")
      .isIn(["A", "B", "C"])
      .withMessage("Arm name must be A, B, or C"),
  ],

  validateGradeId: [
    // Take note of this, its correct behaviour but an unexpected error message arises from it.
    param("gradeId").isUUID().withMessage("Invalid grade ID format"),
  ],

  validateSectionQuery: [
    query("section")
      .optional()
      .isIn(["JUNIOR", "SENIOR"])
      .withMessage("Section must be either JUNIOR or SENIOR"),
  ],
};
