import { validationResult } from "express-validator";
import { AcademicService } from "../../core/services/academicService";
import { Request, Response } from "express";
import { BadRequestError, InternalServerError } from "../errors/genericErrors";

export class AcademicController {
  private academicService: AcademicService;

  constructor() {
    this.academicService = new AcademicService();
  }

  async createSession(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(
          `Validation failed: ${JSON.stringify(errors.array())}`
        );
      }
      const session = await this.academicService.createSession(req.body);
      res.status(201).json(session);
    } catch (error) {
      console.error("Create session error:", error);
      throw new BadRequestError("Failed to create a new session");
    }
  }

  async getSessions(req: Request, res: Response): Promise<void> {
    try {
      const sessions = await this.academicService.getSessions();
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Get sessions error:", error);
      throw new InternalServerError();
    }
  }

  async getCurrentSession(req: Request, res: Response): Promise<void> {
    try {
      const session = await this.academicService.getCurrentSession();
      if (!session) {
        throw new BadRequestError("No current session found");
      }
      res.status(200).json(session);
    } catch (error) {
      console.error("Get current session error:", error);
      throw new InternalServerError();
    }
  }

  async createTerm(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new BadRequestError(
          `Validation failed: ${JSON.stringify(errors.array())}`
        );
      }

      const term = await this.academicService.createTerm(req.body);
      res.status(201).json(term);
    } catch (error) {
      console.error("Create term error:", error);
      throw new InternalServerError();
    }
  }

  async getSessionTerms(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params;
      const terms = await this.academicService.getSessionTerms(sessionId);
      res.status(200).json(terms);
    } catch (error) {
      console.error("Get session terms error:", error);
      throw new InternalServerError();
    }
  }

  async getCurrentTerm(req: Request, res: Response): Promise<void> {
    try {
      const term = await this.academicService.getCurrentTerm();
      if (!term) {
        res.status(404).json({ message: "No current term found" });
        return;
      }
      res.status(200).json(term);
    } catch (error) {
      console.error("Get current term error:", error);
      throw new InternalServerError();
    }
  }
}
