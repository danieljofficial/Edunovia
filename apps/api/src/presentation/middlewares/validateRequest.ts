import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted: Record<string, string> = {};
    errors.array().forEach((err) => {
      formatted[err.type] = err.msg;
    });
    return res.status(400).json({ errors: formatted });
  }

  next();
}
