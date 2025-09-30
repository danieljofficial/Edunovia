import { Router } from "express";
import { AcademicController } from "../controllers/academicController";
import { Academicvalidators } from "../validators/academicValidators";
import { validateRequest } from "../middlewares/validateRequest";

const academicRoutes = Router();
const academicController = new AcademicController();

/**
 * @swagger
 * /api/v1/academic/sessions:
 *   post:
 *     summary: Create a new academic session
 *     description: Creates a new academic session. If isCurrent is true, it will set all other sessions as not current.
 *     tags: [Academic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "2024/2025 Academic Year"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-31T00:00:00Z"
 *               isCurrent:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Academic session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AcademicSession'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error
 */
academicRoutes.post(
  "/sessions",
  Academicvalidators.validateSession,
  validateRequest,
  academicController.createSession.bind(academicController)
);

/**
 * @swagger
 * /api/v1/academic/sessions:
 *   get:
 *     summary: Get all academic sessions
 *     description: Retrieve a list of all academic sessions, ordered by creation date
 *     tags: [Academic]
 *     responses:
 *       200:
 *         description: List of academic sessions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AcademicSession'
 *       500:
 *         description: Internal server error
 */
academicRoutes.get(
  "/sessions",
  academicController.getSessions.bind(academicController)
);

/**
 * @swagger
 * /api/v1/academic/sessions/current:
 *   get:
 *     summary: Get current academic session
 *     description: Retrieve the currently active academic session
 *     tags: [Academic]
 *     responses:
 *       200:
 *         description: Current academic session retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcademicSession'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Internal server error
 */
academicRoutes.get(
  "/sessions/current",
  academicController.getCurrentSession.bind(academicController)
);

/**
 * @swagger
 * /api/v1/academic/terms:
 *   post:
 *     summary: Create a new academic term
 *     description: Creates a new academic term within a session. Term number must be unique per session.
 *     tags: [Academic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - termNumber
 *               - startDate
 *               - endDate
 *               - sessionId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "First Term"
 *               termNumber:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 3
 *                 example: 1
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-15T00:00:00Z"
 *               sessionId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               isCurrent:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Academic term created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AcademicTerm'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */
academicRoutes.post(
  "/terms",
  Academicvalidators.validateTerm,
  validateRequest,
  academicController.createTerm.bind(academicController)
);

/**
 * @swagger
 * /api/v1/academic/sessions/{sessionId}/terms:
 *   get:
 *     summary: Get terms for a specific session
 *     description: Retrieve all academic terms belonging to a specific academic session
 *     tags: [Academic]
 *     parameters:
 *       - $ref: '#/components/parameters/SessionIdParam'
 *     responses:
 *       200:
 *         description: List of academic terms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AcademicTerm'
 *       404:
 *         description: Session or terms not found
 *       500:
 *         description: Internal server error
 */
academicRoutes.get(
  "/sessions/:sessionId/terms",
  academicController.getSessionTerms.bind(academicController)
);

/**
 * @swagger
 * /api/v1/academic/terms/current:
 *   get:
 *     summary: Get current academic term
 *     description: Retrieve the currently active academic term
 *     tags: [Academic]
 *     responses:
 *       200:
 *         description: Current academic term retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcademicTerm'
 *       404:
 *         description: No current term found
 *       500:
 *         description: Internal server error
 */
academicRoutes.get(
  "/terms/current",
  academicController.getCurrentTerm.bind(academicController)
);

export default academicRoutes;
