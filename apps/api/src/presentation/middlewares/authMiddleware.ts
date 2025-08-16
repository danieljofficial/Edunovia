import { NextFunction, Request, Response } from "express";
// import { IAuthService } from "../interfaces/auth/IAuthService";
import { IAuthService } from "../../core/interfaces/IAuthService";
import { tokenService } from "../../core/services/tokenService";

export class AuthMiddleware {
  constructor() {}
  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Authentication required");
      }
      const { userId } = tokenService.verifyToken(token);
      (req as any).userId = userId;
      next();
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };
}
