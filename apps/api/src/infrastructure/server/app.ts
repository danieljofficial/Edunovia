import helmet from "helmet";
import { errorHandler } from "../../presentation/middlewares/errorMiddleware";
import authRoutes from "../../presentation/routes/authRoutes";
import googleAuthRoutes from "../../presentation/routes/googleAuthRoutes";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { FRONTEND_DOMAIN } from "../../utils/domains";
import passwordResetRoutes from "../../presentation/routes/passwordResetRoutes";
import session from "express-session";
import passport from "passport";
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

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "bd4d099b3d394aada59cc45dfac8eaf0",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(morgan("dev"));
  app.use(express.json());
  // app.use("/api/auth", authRoutes);
  app.use("/api/auth", googleAuthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/password-reset", passwordResetRoutes);
  app.use("/api/academic", academicRoutes);

  setupSwagger(app);

  app.use("/health", healthRoute);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/password-reset", passwordResetRoutes);
  app.use("/api/v1/academic", academicRoutes);
  app.use("/api/v1/academic", gradeClassArmRoutes);

  app.use(errorHandler);
  app.use(passport.initialize());
  app.use(passport.session());
  return app;
}

export default createApp;
