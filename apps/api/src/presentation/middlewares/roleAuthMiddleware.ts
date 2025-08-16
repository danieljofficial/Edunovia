import { Request, Response, NextFunction } from "express";
import { ForbiddenError, InternalServerError } from "../errors/genericErrors";
import { tokenService } from "../../core/services/tokenService";
import { InvalidTokenError } from "../errors/authErrors";
import { UserRole } from "../types/userRoles";

export const roleAuthMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ForbiddenError("No token provided");
      }

      const token = authHeader.split(" ")[1];

      let payload;

      try {
        payload = tokenService.verifyToken(token);
      } catch (error) {
        throw new InvalidTokenError("Invalid token");
      }

      if (!allowedRoles.includes(payload.role)) {
        throw new ForbiddenError("Insufficient permissions");
      }

      (req as any).user = payload;
      next();
    } catch (error) {
      throw new InternalServerError(error as string);
    }
  };
};
