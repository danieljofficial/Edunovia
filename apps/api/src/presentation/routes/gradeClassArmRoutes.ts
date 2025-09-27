import { Router } from "express";
import { GradeClassArmController } from "../controllers/gradeClassArmController";
import { GradeClassArmValidators } from "../validators/gradeValidators";
import { validateRequest } from "../middlewares/validateRequest";

const gradeClassArmRoutes = Router();

const gradeClassArmController = new GradeClassArmController();

gradeClassArmRoutes.post(
  "/grades",
  GradeClassArmValidators.validateGrade,
  validateRequest,
  gradeClassArmController.createGrade.bind(gradeClassArmController)
);

gradeClassArmRoutes.get(
  "/grades",
  GradeClassArmValidators.validateSectionQuery,
  validateRequest,
  gradeClassArmController.getGrades.bind(gradeClassArmController)
);

gradeClassArmRoutes.get(
  "/grades/:gradeId",
  GradeClassArmValidators.validateGradeId,
  validateRequest,
  gradeClassArmController.getGrade.bind(gradeClassArmController)
);

gradeClassArmRoutes.post(
  "/grades/:gradeId/arms",
  [
    ...GradeClassArmValidators.validateGradeId,
    ...GradeClassArmValidators.validateClassArm,
  ],
  validateRequest,
  gradeClassArmController.createClassArm.bind(gradeClassArmController)
);

export default gradeClassArmRoutes;

// router.post('/grades', validateGrade, (req, res) =>
//   gradeClassArmController.createGrade(req, res)
// );

// router.get('/grades', validateSectionQuery, (req, res) =>
//   gradeClassArmController.getGrades(req, res)
// );

// router.post('/grades/:gradeId/arms', [...validateGradeId, ...validateClassArm], (req, res) =>
//   gradeClassArmController.createClassArm(req, res)
// );

// router.get('/grades/:gradeId/arms', validateGradeId, (req, res) =>
//   gradeClassArmController.getClassArms(req, res)
// );
