import { NextFunction, Request, Response } from "express";
import { GradeClassArmService } from "../../core/services/gradeClassArmService";

export class GradeClassArmController {
  private gradeClassArmService: GradeClassArmService;

  constructor() {
    this.gradeClassArmService = new GradeClassArmService();
  }

  async createGrade(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const grade = await this.gradeClassArmService.createGrade(req.body);
      res.status(201).json(grade);
    } catch (error: any) {
      console.error("Create grade error:", error);
      next(error);
    }
  }

  async getGrades(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const section = req.query.section as string;
      const grades = await this.gradeClassArmService.getGrades(section);
      res.status(200).json(grades);
    } catch (error) {
      console.error("Get grades error:", error);
      next(error);
    }
  }

  async getGrade(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { gradeId } = req.params;
      const grade = await this.gradeClassArmService.getGradeById(gradeId);
      res.status(200).json(grade);
    } catch (error) {
      console.error("Get grade error:", error);
      next(error);
    }
  }

  async createClassArm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { gradeId } = req.params;
      const armData = { ...req.body, gradeId };

      const arm = await this.gradeClassArmService.createClassArm(armData);
      res.status(201).json(arm);
    } catch (error) {
      console.error("Create class arm error:", error);
      next(error);
    }
  }

  //   async getClassArms(req: Request, res: Response): Promise<void> {
  //     try {
  //       const { gradeId } = req.params;
  //       const arms = await this.gradeClassArmService.getClassArmsByGrade(gradeId);
  //       res.status(200).json(arms);
  //     } catch (error: any) {
  //       console.error('Get class arms error:', error);
  //       res.status(500).json({ message: 'Internal server error' });
  //     }
  //   }
}
