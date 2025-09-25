import { validationResult } from "express-validator";
import { AcademicService } from "../../core/services/academicService";
import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/genericErrors";

export class AcademicController {
  private academicService: AcademicService;

  constructor() {
    this.academicService = new AcademicService();
  }

  async createSession(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await this.academicService.createSession(req.body);
      res.status(201).json(session);
    } catch (error) {
      console.error("Create session error:", error);
      throw new BadRequestError("Failed to create a new session");
    }
  }

  async getSessions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sessions = await this.academicService.getSessions();
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Get sessions error:", error);
      next(error);
    }
  }

  async getCurrentSession(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const session = await this.academicService.getCurrentSession();
      if (!session) {
        throw new NotFoundError("No current session found");
      }
      res.status(200).json(session);
    } catch (error) {
      console.error("Get current session error:", error);
      next(error);
    }
  }

  async createTerm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const term = await this.academicService.createTerm(req.body);
      res.status(201).json(term);
    } catch (error) {
      console.error("Create term error:", error);
      next(error);
    }
  }

  async getSessionTerms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { sessionId } = req.params;
      const terms = await this.academicService.getSessionTerms(sessionId);
      res.status(200).json(terms);
    } catch (error) {
      console.error("Get session terms error:", error);
      next(error);
    }
  }

  async getCurrentTerm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const term = await this.academicService.getCurrentTerm();
      if (!term) {
        throw new NotFoundError("No current term found");
      }
      res.status(200).json(term);
    } catch (error) {
      console.error("Get current term error:", error);
      next(error);
    }
  }
}
