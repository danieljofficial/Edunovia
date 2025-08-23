import { Request, Response, NextFunction } from "express";
import passport from "../../core/services/googleOAuthService";
import { User } from "@prisma/client";

export class GoogleAuthController {
  // For Students
  static googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  static googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", (err: Error, user: User) => {
      if (err || !user) {
        console.log(err);
        return res.redirect("/login?error=oauth_failed");
      }
      // Here, you can generate a JWT or session
      // For now, just send user info
      req.logIn(user, (err) => {
        if (err) {
          return res.redirect("/login?error=session_failed");
        }
        return res.json({ user });
      });
    })(req, res, next);
  }

  static teacherGoogleAuth(req: Request, res: Response, next: NextFunction) {
    req.query.type = "TEACHER";
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  static parentGoogleAuth(req: Request, res: Response, next: NextFunction) {
    req.query.type = "PARENT";
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }
}
