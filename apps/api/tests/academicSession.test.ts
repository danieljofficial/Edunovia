import { prisma } from "../src/infrastructure/database/prisma";
import request from "supertest";
import createApp from "../src/infrastructure/server/app";
import { AcademicSession } from "../src/infrastructure/database/generated";

describe("Academic Session API", () => {
  let app: any;
  beforeAll(async () => {
    app = createApp();
    await prisma.academicSession.deleteMany();
  });
  afterEach(async () => {
    await prisma.academicSession.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/academic/sessions", () => {
    it("should create a new academic session", async () => {
      const sessionData = {
        name: "2024/2025 Academic Year",
        startDate: "2024-09-01T00:00:00Z",
        endDate: "2025-07-31T00:00:00Z",
      };

      const response = await request(app)
        .post("/api/academic/sessions")
        .send(sessionData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(sessionData.name);
      expect(response.body.isCurrent).toBe(false);

      const session = await prisma.academicSession.findUnique({
        where: { id: response.body.id },
      });
      expect(session).toBeDefined();
    });

    it("should set only one session as current", async () => {
      const session1 = await prisma.academicSession.create({
        data: {
          name: "2023/2024 Academic Year",
          startDate: new Date("2023-09-01"),
          endDate: new Date("2024-07-31"),
          isCurrent: true,
        },
      });

      const sessionData = {
        name: "2024/2025 Academic Year",
        startDate: "2024-09-01T00:00:00Z",
        endDate: "2025-07-31T00:00:00Z",
        isCurrent: true,
      };

      const response = await request(app)
        .post("/api/academic/sessions")
        .send(sessionData);

      expect(response.status).toBe(201);
      expect(response.body.isCurrent).toBe(true);

      // Verifies that previous session is no longer current
      const previousSession = await prisma.academicSession.findUnique({
        where: { id: session1.id },
      });
      expect(previousSession?.isCurrent).toBe(false);
    });

    it("should return 400 for missing required fields", async () => {
      const response = await request(app)
        .post("/api/academic/sessions")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      console.log(response.body.errors);
      expect(response.body.errors.field).toEqual("Session name is required");
    });

    it("should return 400 for invalid date format", async () => {
      const sessionData = {
        name: "2024/2025 Academic Year",
        startDate: "invalid-date",
        endDate: "2025-07-31T00:00:00Z",
      };

      const response = await request(app)
        .post("/api/academic/sessions")
        .send(sessionData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should return 400 for end date before start date", async () => {
      const sessionData = {
        name: "2024/2025 Academic Year",
        startDate: "2025-09-01T00:00:00Z", // Later date
        endDate: "2024-07-31T00:00:00Z", // Earlier date
      };

      const response = await request(app)
        .post("/api/academic/sessions")
        .send(sessionData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.field).toEqual(
        "End date must be after start date"
      );
    });

    it("should return 400 for duplicate session name", async () => {
      await prisma.academicSession.create({
        data: {
          name: "2024/2025 Academic Year",
          startDate: new Date("2024-09-01"),
          endDate: new Date("2025-07-31"),
        },
      });

      const sessionData = {
        name: "2024/2025 Academic Year",
        startDate: "2024-09-01T00:00:00Z",
        endDate: "2025-07-31T00:00:00Z",
      };

      const response = await request(app)
        .post("/api/academic/sessions")
        .send(sessionData);

      console.log(response.error);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Failed to create a new session");
    });
  });

  describe("GET /api/academic/sessions", () => {
    it("should retrieve all academic sessions", async () => {
      await prisma.academicSession.createMany({
        data: [
          {
            name: "2023/2024 Academic Year",
            startDate: new Date("2023-09-01"),
            endDate: new Date("2024-07-31"),
          },
          {
            name: "2024/2025 Academic Year",
            startDate: new Date("2024-09-01"),
            endDate: new Date("2025-07-31"),
            isCurrent: true,
          },
        ],
      });

      const response = await request(app).get("/api/academic/sessions");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].isCurrent).toBe(true);
    });

    it("should retrieve current academic session", async () => {
      await prisma.academicSession.create({
        data: {
          name: "2024/2025 Academic Year",
          startDate: new Date("2024-09-01"),
          endDate: new Date("2025-07-31"),
          isCurrent: true,
        },
      });

      const response = await request(app).get("/api/academic/sessions/current");

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("2024/2025 Academic Year");
      expect(response.body.isCurrent).toBe(true);
    });
  });

  describe("POST /api/academic/terms", () => {
    let session: AcademicSession;

    beforeEach(async () => {
      session = await prisma.academicSession.create({
        data: {
          name: "2024/2025 Academic Year",
          startDate: new Date("2024-09-01"),
          endDate: new Date("2025-07-31"),
        },
      });
    });

    afterEach(async () => {
      await prisma.academicSession.deleteMany();
    });

    it("should return 400 for invalid term number", async () => {
      const termData = {
        name: "First Term",
        termNumber: 4,
        startDate: "2024-09-01T00:00:00Z",
        endDate: "2024-12-15T00:00:00Z",
        sessionId: session.id,
      };

      const response = await request(app)
        .post("/api/academic/terms")
        .send(termData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.field).toEqual(
        "Term number must be 1, 2, or 3"
      );
    });

    // it("should return 400 for term dates outside session dates", async () => {
    //   const termData = {
    //     name: "First Term",
    //     termNumber: 1,
    //     startDate: "2023-08-01T00:00:00Z",
    //     endDate: "2024-12-15T00:00:00Z",
    //     sessionId: session.id,
    //   };

    //   const response = await request(app)
    //     .post("/api/academic/terms")
    //     .send(termData);

    //   expect(response.status).toBe(400);
    //   // You might want to add custom validation for this
    // });

    // it('should return 400 for duplicate term number in same session', async () => {
    //   // Create first term
    //   await prisma.academicTerm.create({
    //     data: {
    //       name: 'First Term',
    //       termNumber: 1,
    //       startDate: new Date('2024-09-01'),
    //       endDate: new Date('2024-12-15'),
    //       sessionId: session.id
    //     }
    //   });

    //   const termData = {
    //     name: 'Another First Term',
    //     termNumber: 1, // Same term number in same session
    //     startDate: '2024-09-01T00:00:00Z',
    //     endDate: '2024-12-15T00:00:00Z',
    //     sessionId: session.id
    //   };

    //   const response = await request(app)
    //     .post('/api/academic/terms')
    //     .send(termData);

    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toContain('unique');
    // });

    // it('should return 404 for non-existent session ID', async () => {
    //   const termData = {
    //     name: 'First Term',
    //     termNumber: 1,
    //     startDate: '2024-09-01T00:00:00Z',
    //     endDate: '2024-12-15T00:00:00Z',
    //     sessionId: 'non-existent-id' // Invalid session ID
    //   };

    //   const response = await request(app)
    //     .post('/api/academic/terms')
    //     .send(termData);

    //   expect(response.status).toBe(404);
    //   expect(response.body.message).toContain('Session not found');
    // });
  });

  // describe('GET /api/academic/sessions/:sessionId/terms', () => {
  //   it('should return 404 for non-existent session', async () => {
  //     const response = await request(app)
  //       .get('/api/academic/sessions/non-existent-id/terms');

  //     expect(response.status).toBe(404);
  //     expect(response.body.message).toContain('Session not found');
  //   });

  //   it('should return empty array for session with no terms', async () => {
  //     const session = await prisma.academicSession.create({
  //       data: {
  //         name: '2024/2025 Academic Year',
  //         startDate: new Date('2024-09-01'),
  //         endDate: new Date('2025-07-31')
  //       }
  //     });

  //     const response = await request(app)
  //       .get(`/api/academic/sessions/${session.id}/terms`);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual([]);
  //   });
  // });

  // describe('GET /api/academic/sessions/current', () => {
  //   it('should return 404 when no current session exists', async () => {
  //     // Ensure no current session
  //     await prisma.academicSession.updateMany({
  //       where: { isCurrent: true },
  //       data: { isCurrent: false }
  //     });

  //     const response = await request(app)
  //       .get('/api/academic/sessions/current');

  //     expect(response.status).toBe(404);
  //     expect(response.body.message).toContain('No current session found');
  //   });
  // });

  // describe('GET /api/academic/terms/current', () => {
  //   it('should return 404 when no current term exists', async () => {
  //     // Ensure no current term
  //     await prisma.academicTerm.updateMany({
  //       where: { isCurrent: true },
  //       data: { isCurrent: false }
  //     });

  //     const response = await request(app)
  //       .get('/api/academic/terms/current');

  //     expect(response.status).toBe(404);
  //     expect(response.body.message).toContain('No current term found');
  //   });
  // });
});
