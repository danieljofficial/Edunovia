import { Router } from "express";
import { GradeClassArmController } from "../controllers/gradeClassArmController";
import { GradeClassArmValidators } from "../validators/gradeValidators";
import { validateRequest } from "../middlewares/validateRequest";

const gradeClassArmRoutes = Router();

const gradeClassArmController = new GradeClassArmController();

/**
 * @swagger
 * /api/v1/academic/grades:
 *   post:
 *     summary: Create a new grade
 *     description: |
 *       Creates a new grade level with auto-generated name.
 *       Grade name is automatically generated as "Grade {level}".
 *
 *       **Section Guidelines:**
 *       - JUNIOR: Typically grades 1-3
 *       - SENIOR: Typically grades 4-6
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGradeRequest'
 *           examples:
 *             juniorGrade:
 *               summary: Junior grade
 *               value:
 *                 level: 1
 *                 section: "JUNIOR"
 *             seniorGrade:
 *               summary: Senior grade
 *               value:
 *                 level: 5
 *                 section: "SENIOR"
 *     responses:
 *       201:
 *         description: Grade created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Grade'
 *             example:
 *               success: true
 *               message: "Grade created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 level: 1
 *                 name: "Grade 1"
 *                 section: "JUNIOR"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Validation error or duplicate grade
 *         content:
 *           application/json:
 *             examples:
 *               invalidLevel:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Grade level must be between 1 and 6"
 *               invalidSection:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Section must be either JUNIOR or SENIOR"
 *               duplicateGrade:
 *                 value:
 *                   success: false
 *                   message: "Grade level already exists"
 *       500:
 *         description: Internal server error
 */
gradeClassArmRoutes.post(
  "/grades",
  GradeClassArmValidators.validateGrade,
  validateRequest,
  gradeClassArmController.createGrade.bind(gradeClassArmController)
);

/**
 * @swagger
 * /api/v1/academic/grades:
 *   get:
 *     summary: Get all grades
 *     description: |
 *       Retrieve all grades with their class arms.
 *       Can be filtered by section (JUNIOR/SENIOR).
 *     tags: [Grades]
 *     parameters:
 *       - $ref: '#/components/parameters/SectionQueryParam'
 *     responses:
 *       200:
 *         description: List of grades retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *             example:
 *               - id: "123e4567-e89b-12d3-a456-426614174000"
 *                 level: 1
 *                 name: "Grade 1"
 *                 section: "JUNIOR"
 *                 arms:
 *                   - id: "223e4567-e89b-12d3-a456-426614174000"
 *                     name: "A"
 *                     fullName: "Grade 1A"
 *                     gradeId: "123e4567-e89b-12d3-a456-426614174000"
 *                   - id: "323e4567-e89b-12d3-a456-426614174000"
 *                     name: "B"
 *                     fullName: "Grade 1B"
 *                     gradeId: "123e4567-e89b-12d3-a456-426614174000"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Invalid section parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
gradeClassArmRoutes.get(
  "/grades",
  GradeClassArmValidators.validateSectionQuery,
  validateRequest,
  gradeClassArmController.getGrades.bind(gradeClassArmController)
);

/**
 * @swagger
 * /api/v1/academic/grades/{gradeId}:
 *   get:
 *     summary: Get a specific grade
 *     description: Retrieve a specific grade by ID with its class arms
 *     tags: [Grades]
 *     parameters:
 *       - $ref: '#/components/parameters/GradeIdParam'
 *     responses:
 *       200:
 *         description: Grade retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       400:
 *         description: Invalid grade ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               errors:
 *                 field: "Invalid grade ID format"
 *       404:
 *         description: Grade not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
gradeClassArmRoutes.get(
  "/grades/:gradeId",
  GradeClassArmValidators.validateGradeId,
  validateRequest,
  gradeClassArmController.getGrade.bind(gradeClassArmController)
);

/**
 * @swagger
 * /api/v1/academic/grades/{gradeId}/arms:
 *   post:
 *     summary: Create a class arm for a grade
 *     description: |
 *       Creates a new class arm (A, B, or C) for a specific grade.
 *       Full name is auto-generated as "Grade {level}{arm}".
 *
 *       **Limitations:**
 *       - Maximum 3 arms per grade (A, B, C)
 *       - No duplicate arm names within the same grade
 *     tags: [Grades]
 *     parameters:
 *       - $ref: '#/components/parameters/GradeIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClassArmRequest'
 *           examples:
 *             armA:
 *               summary: Create arm A
 *               value:
 *                 name: "A"
 *             armB:
 *               summary: Create arm B
 *               value:
 *                 name: "B"
 *     responses:
 *       201:
 *         description: Class arm created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ClassArm'
 *             example:
 *               success: true
 *               message: "Class arm created successfully"
 *               data:
 *                 id: "223e4567-e89b-12d3-a456-426614174000"
 *                 name: "A"
 *                 fullName: "Grade 1A"
 *                 gradeId: "123e4567-e89b-12d3-a456-426614174000"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Validation error or duplicate/max arms
 *         content:
 *           application/json:
 *             examples:
 *               invalidArm:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Arm name must be A, B, or C"
 *               duplicateArm:
 *                 value:
 *                   success: false
 *                   message: "Class arm already exists for this grade"
 *               maxArms:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Arm name must be A, B, or C"
 *       404:
 *         description: Grade not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
gradeClassArmRoutes.post(
  "/grades/:gradeId/arms",
  [
    ...GradeClassArmValidators.validateGradeId,
    ...GradeClassArmValidators.validateClassArm,
  ],
  validateRequest,
  gradeClassArmController.createClassArm.bind(gradeClassArmController)
);

/**
 * @swagger
 * /api/v1/academic/grades/{gradeId}/arms:
 *   get:
 *     summary: Get class arms for a grade
 *     description: Retrieve all class arms belonging to a specific grade
 *     tags: [Grades]
 *     parameters:
 *       - $ref: '#/components/parameters/GradeIdParam'
 *     responses:
 *       200:
 *         description: List of class arms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClassArm'
 *             example:
 *               - id: "223e4567-e89b-12d3-a456-426614174000"
 *                 name: "A"
 *                 fullName: "Grade 1A"
 *                 gradeId: "123e4567-e89b-12d3-a456-426614174000"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *               - id: "323e4567-e89b-12d3-a456-426614174000"
 *                 name: "B"
 *                 fullName: "Grade 1B"
 *                 gradeId: "123e4567-e89b-12d3-a456-426614174000"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Invalid grade ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Grade not found or no arms exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
gradeClassArmRoutes.get(
  "/grades/:gradeId/arms",
  GradeClassArmValidators.validateGradeId,
  validateRequest,
  gradeClassArmController.getClassArms.bind(gradeClassArmController)
);

export default gradeClassArmRoutes;
