import helmet from "helmet";
import { errorHandler } from "../../presentation/middlewares/errorMiddleware";
import authRoutes from "../../presentation/routes/authRoutes";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { FRONTEND_DOMAIN } from "../../utils/domains";

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
  app.use("/auth", authRoutes);
  app.use(errorHandler);
  return app;
}

export default createApp;
