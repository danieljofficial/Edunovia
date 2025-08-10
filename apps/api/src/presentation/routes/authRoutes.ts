import "dotenv/config";
import { Router } from "express";
import { AuthService } from "../../core/services/AuthService";
import { AuthController } from "../controllers/AuthController";
const authRoutes = Router();

const authService = new AuthService(process.env.JWT_SECRET as string);

const authController = new AuthController(authService);

authRoutes.post("/register", authController.register.bind(authController));
authRoutes.post("/login", authController.login.bind(authController));
// authRoutes.post("/verify", authController.verify.bind(authController));
export default authRoutes;
