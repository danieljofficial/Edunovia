import { prisma } from "../../infrastructure/database/prisma";
import {
  IAcademicSessionCreate,
  IAcademicTermCreate,
} from "../interfaces/IAcademicSession";

export class AcademicService {
  async createSession(sessionData: IAcademicSessionCreate) {
    return await prisma.$transaction(async (tx) => {
      if (sessionData.isCurrent) {
        await tx.academicSession.updateMany({
          where: { isCurrent: true },
          data: { isCurrent: false },
        });
      }

      return await tx.academicSession.create({
        data: sessionData,
      });
    });
  }

  async getSessions() {
    return await prisma.academicSession.findMany({
      orderBy: { startDate: "desc" },
    });
  }

  async getCurrentSession() {
    return await prisma.academicSession.findFirst({
      where: { isCurrent: true },
    });
  }

  async createTerm(termdata: IAcademicTermCreate) {
    return await prisma.$transaction(async (tx) => {
      if (termdata.isCurrent) {
        await tx.academicTerm.updateMany({
          where: {
            sessionId: termdata.sessionId,
            isCurrent: true,
          },
          data: { isCurrent: false },
        });
      }

      return await tx.academicTerm.create({
        data: termdata,
      });
    });
  }

  async getSessionTerms(sessionId: string) {
    return await prisma.academicTerm.findMany({
      where: { sessionId },
      orderBy: { termNumber: "asc" },
    });
  }

  async getCurrentTerm() {
    return await prisma.academicTerm.findFirst({
      where: { isCurrent: true },
      include: { session: true },
    });
  }
}
