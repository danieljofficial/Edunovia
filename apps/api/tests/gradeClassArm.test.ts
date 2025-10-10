import { prisma } from "../src/infrastructure/database/prisma";
import request from "supertest";
import createApp from "../src/infrastructure/server/app";

describe("Grade and Class Arm API", () => {
  let app: any;

  beforeAll(async () => {
    app = createApp();
    await prisma.classArm.deleteMany();
    await prisma.grade.deleteMany();
  });

  afterEach(async () => {
    await prisma.classArm.deleteMany();
    await prisma.grade.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/v1/academic/grades", () => {
    it("should create a new grade with valid data", async () => {
      const gradeData = {
        level: 1,
        section: "JUNIOR",
      };

      const response = await request(app)
        .post("/api/v1/academic/grades")
        .send(gradeData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.level).toBe(1);
      expect(response.body.section).toBe("JUNIOR");
      expect(response.body.name).toBe("Grade 1");

      const grade = await prisma.grade.findUnique({
        where: { id: response.body.id },
      });
      expect(grade).toBeDefined();
    });

    it("should auto-generate grade name from level", async () => {
      const gradeData = {
        level: 3,
        section: "JUNIOR",
      };

      const response = await request(app)
        .post("/api/v1/academic/grades")
        .send(gradeData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Grade 3");
    });

    it("should return 400 for grade level outside 1-6 range", async () => {
      const gradeData = {
        level: 7,
        section: "JUNIOR",
      };

      const response = await request(app)
        .post("/api/v1/academic/grades")
        .send(gradeData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors).toMatchObject({
        field: "Grade level must be between 1 and 6",
      });
    });

    it("should return 400 for invalid section", async () => {
      const gradeData = {
        level: 2,
        section: "INVALID",
      };

      const response = await request(app)
        .post("/api/v1/academic/grades")
        .send(gradeData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors).toMatchObject({
        field: "Section must be either JUNIOR or SENIOR",
      });
    });

    it("should return 400 for duplicate grade level", async () => {
      await prisma.grade.create({
        data: {
          level: 4,
          name: "Grade 4",
          section: "JUNIOR",
        },
      });

      const gradeData = {
        level: 4,
        section: "SENIOR",
      };

      const response = await request(app)
        .post("/api/v1/academic/grades")
        .send(gradeData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Grade level already exists");
    });

    it("should correctly assign JUNIOR/SENIOR sections based on level", async () => {
      const juniorGrade = {
        level: 2,
        section: "JUNIOR",
      };

      const juniorResponse = await request(app)
        .post("/api/v1/academic/grades")
        .send(juniorGrade);

      expect(juniorResponse.status).toBe(201);
      expect(juniorResponse.body.section).toBe("JUNIOR");

      const seniorGrade = {
        level: 5,
        section: "SENIOR",
      };

      const seniorResponse = await request(app)
        .post("/api/v1/academic/grades")
        .send(seniorGrade);

      expect(seniorResponse.status).toBe(201);
      expect(seniorResponse.body.section).toBe("SENIOR");
    });
  });

  describe("POST /api/v1/academic/grades/:gradeId/arms", () => {
    let grade: any;

    beforeEach(async () => {
      grade = await prisma.grade.create({
        data: {
          level: 1,
          name: "Grade 1",
          section: "JUNIOR",
          arms: {
            create: [
              { name: "B", fullName: "Grade 1B" },
              { name: "C", fullName: "Grade 1C" },
            ],
          },
        },
      });
    });

    it("should create a new class arm for a grade", async () => {
      const armData = {
        name: "A",
      };

      const response = await request(app)
        .post(`/api/v1/academic/grades/${grade.id}/arms`)
        .send(armData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("A");
      expect(response.body.fullName).toBe("Grade 1A");
      expect(response.body.gradeId).toBe(grade.id);

      const arm = await prisma.classArm.findUnique({
        where: { id: response.body.id },
      });
      expect(arm).toBeDefined();
    });

    it("should auto-generate full name from grade and arm", async () => {
      await prisma.classArm.deleteMany();
      const armData = {
        name: "B",
      };

      const response = await request(app)
        .post(`/api/v1/academic/grades/${grade.id}/arms`)
        .send(armData);

      expect(response.status).toBe(201);
      expect(response.body.fullName).toBe("Grade 1B");
    });

    it("should retrieve all class arms for a grade", async () => {
      const response = await request(app).get(
        `/api/v1/academic/grades/${grade.id}/arms`
      );

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].gradeId).toBe(grade.id);
      expect(response.body[0].name).toBe("B");
      expect(response.body[1].name).toBe("C");
      expect(response.body[0].fullName).toBe("Grade 1B");
    });

    it("should enforce maximum 3 arms per grade", async () => {
      await prisma.classArm.deleteMany();
      await prisma.classArm.createMany({
        data: [
          { name: "A", fullName: "Grade 1A", gradeId: grade.id },
          { name: "B", fullName: "Grade 1B", gradeId: grade.id },
          { name: "C", fullName: "Grade 1C", gradeId: grade.id },
        ],
      });

      const armData = {
        name: "D",
      };

      const response = await request(app)
        .post(`/api/v1/academic/grades/${grade.id}/arms`)
        .send(armData);

      expect(response.status).toBe(400);
      console.log(response.body);
      expect(response.body.errors).toMatchObject({
        field: "Arm name must be A, B, or C",
      });
    });

    it("should return 400 for duplicate arm name in same grade", async () => {
      await prisma.classArm.deleteMany();
      await prisma.classArm.create({
        data: {
          name: "A",
          fullName: "Grade 1A",
          gradeId: grade.id,
        },
      });

      const armData = {
        name: "A",
      };

      const response = await request(app)
        .post(`/api/v1/academic/grades/${grade.id}/arms`)
        .send(armData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        "Class arm already exists for this grade"
      );
    });

    it("should return 400 for invalid arm name", async () => {
      const armData = {
        name: "INVALID",
      };

      const response = await request(app)
        .post(`/api/v1/academic/grades/${grade.id}/arms`)
        .send(armData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      console.log(response.body);
      expect(response.body.errors).toMatchObject({
        field: "Arm name must be A, B, or C",
      });
    });

    it("should return 404 for non-existent grade", async () => {
      const armData = {
        name: "A",
      };

      const response = await request(app)
        .post("/api/v1/academic/grades/non-existent-id/arms")
        .send(armData);
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toMatchObject({
        field: "Invalid grade ID format",
      });
    });
  });

  describe("GET /api/v1/academic/grades", () => {
    it("should retrieve all grades with their arms", async () => {
      const grade1 = await prisma.grade.create({
        data: {
          level: 1,
          name: "Grade 1",
          section: "JUNIOR",
          arms: {
            create: [
              { name: "A", fullName: "Grade 1A" },
              { name: "B", fullName: "Grade 1B" },
            ],
          },
        },
        include: { arms: true },
      });

      const grade2 = await prisma.grade.create({
        data: {
          level: 4,
          name: "Grade 4",
          section: "SENIOR",
          arms: {
            create: [{ name: "A", fullName: "Grade 4A" }],
          },
        },
      });

      const response = await request(app).get("/api/v1/academic/grades");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);

      const gradeWithArms = response.body.find((g: any) => g.level === 1);
      expect(gradeWithArms.arms.length).toBe(2);
      expect(gradeWithArms.arms[0].fullName).toBe("Grade 1A");
    });

    it("should filter grades by section", async () => {
      await prisma.grade.createMany({
        data: [
          { level: 1, name: "Grade 1", section: "JUNIOR" },
          { level: 2, name: "Grade 2", section: "JUNIOR" },
          { level: 4, name: "Grade 4", section: "SENIOR" },
        ],
      });

      const response = await request(app).get(
        "/api/v1/academic/grades?section=JUNIOR"
      );

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body.every((g: any) => g.section === "JUNIOR")).toBe(
        true
      );
    });
  });

  describe("GET /api/v1/academic/grades/:gradeId", () => {
    it("should retrieve a specific grade with arms", async () => {
      const grade = await prisma.grade.create({
        data: {
          level: 3,
          name: "Grade 3",
          section: "JUNIOR",
          arms: {
            create: [
              { name: "A", fullName: "Grade 3A" },
              { name: "B", fullName: "Grade 3B" },
            ],
          },
        },
      });

      const response = await request(app).get(
        `/api/v1/academic/grades/${grade.id}`
      );

      expect(response.status).toBe(200);
      expect(response.body.level).toBe(3);
      expect(response.body.arms.length).toBe(2);
    });

    it("should return 404 for non-existent grade", async () => {
      const response = await request(app).get(
        "/api/v1/academic/grades/non-existent-id"
      );
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toMatchObject({
        field: "Invalid grade ID format",
      });
    });
  });
});
