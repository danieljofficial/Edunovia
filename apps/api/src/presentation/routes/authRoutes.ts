import "dotenv/config";
import { Router } from "express";
import { AuthService } from "../../core/services/authService";
import { AuthValidators } from "../validators/authValidators";
import { validateRequest } from "../middlewares/validateRequest";
import { AuthController } from "../controllers/authController";

const authRoutes = Router();

const authService = new AuthService(process.env.JWT_SECRET as string, 10);

const authController = new AuthController(authService);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account in the Edunovia system. Returns JWT token upon successful registration.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           examples:
 *             teacherRegistration:
 *               summary: Teacher registration
 *               value:
 *                 username: "mr_smith"
 *                 email: "john.smith@edunovia.com"
 *                 password: "securePassword123"
 *                 role: "TEACHER"
 *             studentRegistration:
 *               summary: Student registration
 *               value:
 *                 username: "student_jane"
 *                 email: "jane.doe@edunovia.com"
 *                 password: "studentPass123"
 *                 role: "STUDENT"
 *             adminRegistration:
 *               summary: Admin registration
 *               value:
 *                 username: "admin_user"
 *                 email: "admin@edunovia.com"
 *                 password: "adminPass123"
 *                 role: "ADMIN"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 username: "john_doe"
 *                 email: "john.doe@edunovia.com"
 *                 role: "TEACHER"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               invalidEmail:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Invalid email address"
 *               invalidUsername:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Username must be 3–20 characters"
 *               invalidPassword:
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   errors:
 *                     field: "Password must be at least 8 characters"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "User with this email already exists"
 *       500:
 *         description: Internal server error
 */
authRoutes.post(
  "/register",
  AuthValidators.register,
  validateRequest,
  authController.register.bind(authController)
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user with email and password. Returns JWT token upon successful login.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             teacherLogin:
 *               summary: Teacher login
 *               value:
 *                 email: "john.smith@edunovia.com"
 *                 password: "securePassword123"
 *             studentLogin:
 *               summary: Student login
 *               value:
 *                 email: "jane.doe@edunovia.com"
 *                 password: "studentPass123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 username: "john_doe"
 *                 email: "john.doe@edunovia.com"
 *                 role: "TEACHER"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               errors:
 *                 field: "Email and password are required"
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Invalid Password!"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "User Not Found!"
 *       500:
 *         description: Internal server error
 */
authRoutes.post(
  "/login",
  AuthValidators.login,
  validateRequest,
  authController.login.bind(authController)
);
export default authRoutes;
