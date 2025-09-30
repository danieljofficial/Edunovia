import helmet from "helmet";
import { errorHandler } from "../../presentation/middlewares/errorMiddleware";
import authRoutes from "../../presentation/routes/authRoutes";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { FRONTEND_DOMAIN } from "../../utils/domains";
import passwordResetRoutes from "../../presentation/routes/passwordResetRoutes";
import academicRoutes from "../../presentation/routes/academicRoutes";
import gradeClassArmRoutes from "../../presentation/routes/gradeClassArmRoutes";
import { setupSwagger } from "../../presentation/docs/swagger";
import healthRoute from "../../presentation/routes/healthRoute";

function createApp() {
  const app = express();
  app.use(helmet());
  app.use(
    cors({
      origin: FRONTEND_DOMAIN,
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
    })
  );

  app.use(morgan("dev"));
  app.use(express.json());

  setupSwagger(app);

  app.use("/health", healthRoute);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/password-reset", passwordResetRoutes);
  app.use("/api/v1/academic", academicRoutes);
  app.use("/api/v1/academic", gradeClassArmRoutes);

  app.use(errorHandler);
  return app;
}

export default createApp;
