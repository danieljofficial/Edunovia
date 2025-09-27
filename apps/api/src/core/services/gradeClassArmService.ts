import { prisma } from "../../infrastructure/database/prisma";
import {
  BadRequestError,
  NotFoundError,
} from "../../presentation/errors/genericErrors";
import { IGradeCreate, IClassArmCreate } from "../interfaces/IGradeClassArm";

export class GradeClassArmService {
  async createGrade(gradeData: IGradeCreate): Promise<any> {
    try {
      const name = gradeData.name || `Grade ${gradeData.level}`;

      if (
        gradeData.level >= 1 &&
        gradeData.level <= 3 &&
        gradeData.section !== "JUNIOR"
      ) {
        throw new BadRequestError("Grades 1-3 must be in JUNIOR section");
      }

      if (
        gradeData.level >= 4 &&
        gradeData.level <= 6 &&
        gradeData.section !== "SENIOR"
      ) {
        throw new BadRequestError("Grades 4-6 must be in SENIOR section");
      }

      const existingGrade = await prisma.grade.findFirst({
        where: { level: gradeData.level },
      });

      if (existingGrade) {
        throw new BadRequestError("Grade level already exists");
      }

      return await prisma.grade.create({
        data: {
          ...gradeData,
          name,
        },
        include: { arms: true },
      });
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new BadRequestError("Failed to create grade");
    }
  }

  async getGrades(section?: string): Promise<any[]> {
    try {
      const where = section ? { section } : {};

      return await prisma.grade.findMany({
        where,
        include: { arms: true },
        orderBy: { level: "asc" },
      });
    } catch (error) {
      throw new Error("Failed to retrieve grades");
    }
  }

  async getGradeById(gradeId: string): Promise<any> {
    try {
      const grade = await prisma.grade.findUnique({
        where: { id: gradeId },
        include: { arms: true },
      });

      if (!grade) {
        throw new NotFoundError("Grade not found");
      }

      return grade;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new Error("Failed to retrieve grade");
    }
  }

  async createClassArm(armData: IClassArmCreate): Promise<any> {
    try {
      const grade = await prisma.grade.findUnique({
        where: { id: armData.gradeId },
      });

      if (!grade) {
        throw new NotFoundError("Grade not found");
      }

      // Check maximum arms (3 per grade)
      const existingArms = await prisma.classArm.count({
        where: { gradeId: armData.gradeId },
      });

      if (existingArms >= 3) {
        throw new BadRequestError("Maximum 3 arms allowed per grade");
      }

      // Check for duplicate arm name in same grade
      const existingArm = await prisma.classArm.findUnique({
        where: {
          gradeId_name: {
            gradeId: armData.gradeId,
            name: armData.name,
          },
        },
      });

      if (existingArm) {
        throw new BadRequestError("Class arm already exists for this grade");
      }

      // Auto-generate full name
      const fullName = armData.fullName || `${grade.name}${armData.name}`;

      return await prisma.classArm.create({
        data: {
          ...armData,
          fullName,
        },
        include: { grade: true },
      });
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new BadRequestError("Failed to create class arm");
    }
  }

  //   async getClassArmsByGrade(gradeId: string): Promise<any[]> {
  //     try {
  //       return await prisma.classArm.findMany({
  //         where: { gradeId },
  //         include: { grade: true },
  //         orderBy: { name: 'asc' }
  //       });
  //     } catch (error) {
  //       throw new Error('Failed to retrieve class arms');
  //     }
  //   }
}
