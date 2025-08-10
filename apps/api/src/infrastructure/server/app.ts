import { errorHandler } from "../../presentation/middlewares/errorMiddleware";
import authRoutes from "../../presentation/routes/authRoutes";
import express from "express";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/auth", authRoutes);
  app.use(errorHandler);
  return app;
}

export default createApp;
