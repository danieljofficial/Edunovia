import "dotenv/config";
import { Router } from "express";
import { AuthService } from "../../core/services/authService";
import { AuthController } from "../controllers/authController";
import { AuthValidators } from "../validators/authValidators";
import { validateRequest } from "../middlewares/validateRequest";
const authRoutes = Router();

const authService = new AuthService(process.env.JWT_SECRET as string, 10);

const authController = new AuthController(authService);

authRoutes.post(
  "/register",
  AuthValidators.register,
  validateRequest,
  authController.register.bind(authController)
);
authRoutes.post(
  "/login",
  AuthValidators.login,
  validateRequest,
  authController.login.bind(authController)
);
export default authRoutes;
