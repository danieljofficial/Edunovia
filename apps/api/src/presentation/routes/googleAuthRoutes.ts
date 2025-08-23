import { Router } from "express";
import { GoogleAuthController } from "../controllers/GoogleAuthController";

const router = Router();

router.get("/auth/google", GoogleAuthController.googleAuth);
router.get("/auth/google/parent", GoogleAuthController.parentGoogleAuth);
router.get("/auth/google/teacher", GoogleAuthController.teacherGoogleAuth);
router.get("/auth/google/callback", GoogleAuthController.googleAuthCallback);
// router.get("/google/student", GoogleAuthController.studentAuth);
export default router;
