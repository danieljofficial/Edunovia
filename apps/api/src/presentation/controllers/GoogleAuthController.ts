import { Request, Response, NextFunction } from "express";
import passport from "../../core/services/googleOAuthService";
import { User } from "@prisma/client";

export class GoogleAuthController {
  static googleAuth(req: Request, res: Response, next: NextFunction) {
    const allowedRoles: string[] = ["STUDENT", "PARENT", "TEACHER", "ADMIN"];
    const type =
      typeof req.query.type === "string" &&
      allowedRoles.includes(req.query.type)
        ? req.query.type
        : "STUDENT";

    console.log("Google OAuth initiating with type:", type);
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: type,
    })(req, res, next);
  }

  static googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    const userType = req.query.state;
    passport.authenticate("google", (err: Error, user: User) => {
      if (err || !user) {
        console.log(err);
        return res.redirect("/login?error=oauth_failed");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          return res.redirect("/login?error=session_failed");
        }
        return res.status(200).json({ user });
      });
    })(req, res, next);
  }

  // static teacherGoogleAuth(req: Request, res: Response, next: NextFunction) {
  //   req.query.type = "TEACHER";
  //   passport.authenticate("google", {
  //     scope: ["profile", "email"],
  //     state: req.query.type,
  //   })(req, res, next);
  // }

  // static parentGoogleAuth(req: Request, res: Response, next: NextFunction) {
  //   req.query.type = "PARENT";
  //   passport.authenticate("google", {
  //     scope: ["profile", "email"],
  //     state: req.query.type,
  //   })(req, res, next);
  // }
  // static adminGoogleAuth(req: Request, res: Response, next: NextFunction) {
  //   req.query.type = "PARENT";
  //   passport.authenticate("google", {
  //     scope: ["profile", "email"],
  //     state: req.query.type,
  //   })(req, res, next);
  // }
}
