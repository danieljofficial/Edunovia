import { Router } from "express";
import { PasswordResetController } from "../controllers/passwordResetController";
import { PasswordResetValidators } from "../validators/passwordResetValidators";
import { validateRequest } from "../middlewares/validateRequest";

const passwordResetRoutes = Router();

const passwordResetController = new PasswordResetController();

passwordResetRoutes.post(
  "/forgot-password",
  PasswordResetValidators.requestResetPassword,
  validateRequest,
  passwordResetController.forgotPassword.bind(passwordResetController)
);
passwordResetRoutes.post(
  "/execute-reset",
  PasswordResetValidators.resetPassword,
  validateRequest,

  passwordResetController.resetPassword.bind(passwordResetController)
);
passwordResetRoutes.post(
  "/validate-reset-token",
  passwordResetController.validateResetToken.bind(passwordResetController)
);

export default passwordResetRoutes;
