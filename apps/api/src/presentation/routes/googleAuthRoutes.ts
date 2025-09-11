import { Router } from "express";
import { GoogleAuthController } from "../controllers/GoogleAuthController";
import passport from "passport";

const router = Router();

// Student (default)
router.get("/google", (req, res, next) => {
  req.query.type = "STUDENT";
  GoogleAuthController.googleAuth(req, res, next);
});

// Parent
router.get("/google/parent", (req, res, next) => {
  res.redirect("/auth/google?type=PARENT");
});

// Teacher
router.get("/google/teacher", (req, res, next) => {
  res.redirect("/auth/google?type=TEACHER");
});

// Admin
router.get("/google/admin", (req, res, next) => {
  res.redirect("/auth/google?type=ADMIN");
});

// Callback
router.get("/google/callback", GoogleAuthController.googleAuthCallback);
export default router;
