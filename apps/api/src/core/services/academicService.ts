import { prisma } from "../../infrastructure/database/prisma";
import {
  BadRequestError,
  NotFoundError,
} from "../../presentation/errors/genericErrors";
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

  async createTerm(termData: IAcademicTermCreate) {
    await this.validateTermOrThrow(termData);

    return await prisma.$transaction(async (tx) => {
      if (termData.isCurrent) {
        await tx.academicTerm.updateMany({
          where: {
            sessionId: termData.sessionId,
            isCurrent: true,
          },
          data: { isCurrent: false },
        });
      }

      return await tx.academicTerm.create({
        data: termData,
      });
    });
  }

  async validateTermOrThrow(termData: IAcademicTermCreate): Promise<void> {
    const session = await prisma.academicSession.findUnique({
      where: { id: termData.sessionId },
      select: {
        startDate: true,
        endDate: true,
        terms: { select: { termNumber: true, startDate: true, endDate: true } },
      },
    });

    if (!session) {
      throw new NotFoundError("No active session found.");
    }

    const termStart = new Date(termData.startDate);
    const termEnd = new Date(termData.endDate);

    if (
      termStart < session.startDate ||
      termEnd > session.endDate ||
      termStart >= termEnd
    ) {
      throw new BadRequestError("Term dates must be within the session range.");
    }

    const hasDuplicateTerm = session.terms.some(
      (term) => term.termNumber === termData.termNumber
    );
    if (hasDuplicateTerm) {
      throw new BadRequestError(
        "Duplicate term detected number for this session."
      );
    }

    const overlaps = session.terms.some(
      (term) => termStart < term.endDate && termEnd > term.startDate
    );

    if (overlaps) {
      throw new BadRequestError("Term dates overlap with an existing term.");
    }
  }

  async getSessionTerms(sessionId: string) {
    const terms = await prisma.academicTerm.findMany({
      where: { sessionId },
      orderBy: { termNumber: "asc" },
    });

    if (!terms || terms.length <= 0) {
      throw new NotFoundError("Terms not found");
    }

    return terms;
  }

  async getCurrentTerm() {
    return await prisma.academicTerm.findFirst({
      where: { isCurrent: true },
      include: { session: true },
    });
  }
}
