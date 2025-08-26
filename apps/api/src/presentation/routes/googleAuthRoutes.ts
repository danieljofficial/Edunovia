import { Router } from "express";
import { GoogleAuthController } from "../controllers/GoogleAuthController";
import passport from "passport";

const router = Router();

// Student (default)
router.get("/auth/google", (req, res, next) => {
  req.query.type = "STUDENT";
  GoogleAuthController.googleAuth(req, res, next);
});

// Parent
router.get("/auth/google/parent", (req, res, next) => {
  req.query.type = "PARENT";
  //   GoogleAuthController.googleAuth(req, res, next);
  res.redirect("/auth/google?type=PARENT");
});

// Teacher
router.get("/auth/google/teacher", (req, res, next) => {
  req.query.type = "TEACHER";
  //   GoogleAuthController.googleAuth(req, res, next);
  res.redirect("/auth/google?type=TEACHER");
});

// Admin
router.get("/auth/google/admin", (req, res, next) => {
  req.query.type = "ADMIN";
  //   GoogleAuthController.googleAuth(req, res, next);
  res.redirect("/auth/google?type=ADMIN");
});

// router.get("/auth/google/:type", (req, res, next) => {
//   req.query.type = req.params.type;
//   GoogleAuthController.googleAuth(req, res, next);
// });

// Callback
router.get("/auth/google/callback", GoogleAuthController.googleAuthCallback);
// router.get("/google/student", GoogleAuthController.studentAuth);
// const userTypes = ["TEACHER", "PARENT", "STUDENT", "ADMIN"];

// userTypes.forEach((type) => {
//   router.get(
//     `/auth/google/${type.toLowerCase()}`,
//     (req, res, next) => {
//       req.query.type = type;
//       next();
//     },
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );
// });

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Successful authentication
//     res.send(`<p>Successfull login ${userTypes}</p>`);
//   }
// );
export default router;
