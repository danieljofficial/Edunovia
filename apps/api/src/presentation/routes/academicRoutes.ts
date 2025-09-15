import { Router } from "express";
import { AcademicController } from "../controllers/academicController";
import { Academicvalidators } from "../validators/academicValidators";
import { validateRequest } from "../middlewares/validateRequest";

const academicRoutes = Router();
const academicController = new AcademicController();

academicRoutes.post(
  "/sessions",
  Academicvalidators.validateSession,
  validateRequest,
  academicController.createSession.bind(academicController)
);

academicRoutes.get(
  "/sessions",
  academicController.getSessions.bind(academicController)
);

academicRoutes.get(
  "/sessions/current",
  academicController.getCurrentSession.bind(academicController)
);

academicRoutes.post(
  "/terms",
  Academicvalidators.validateTerm,
  validateRequest,
  academicController.createTerm.bind(academicController)
);

academicRoutes.get(
  "/sessions/:sessionId/terms",
  academicController.getCurrentTerm.bind(academicController)
);

academicRoutes.get(
  "/terms/current",
  academicController.getCurrentTerm.bind(academicController)
);

export default academicRoutes;
