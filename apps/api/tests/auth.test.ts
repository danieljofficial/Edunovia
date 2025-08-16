import { prisma } from "../src/infrastructure/database/prisma";
import createApp from "../src/infrastructure/server/app";
import request from "supertest";
import { createTestUserData } from "./testUtils";
describe("Authentication tests", () => {
  let app = createApp();
  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });
  let testData = createTestUserData();

  describe("POST /auth/register", () => {
    it("should create a new user with valid data", async () => {
      const response = await request(app).post("/auth/register").send(testData);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          email: testData.email,
          username: testData.username,
          role: testData.role,
          createdAt: expect.any(String),
        },
      });
      expect(response.body).not.toHaveProperty("password");
    });

    it("should reject registration with missing required fields (400)", async () => {
      const testData = createTestUserData();
      delete testData.username;

      const response = await request(app).post("/auth/register").send(testData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("All Fields Required!");
    });
  });

  describe("POST /auth/login", () => {
    it("should login with valid email and password", async () => {
      const response = await request(app).post("/auth/login").send({
        email: testData.email,

        password: testData.password,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
    });

    it("should reject login with invalid password (401)", async () => {
      const response = await request(app).post("/auth/login").send({
        email: testData.email,
        password: "false password",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid Password!");
    });

    it("should reject login with non-existent email", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "nonexistent@test.com",
        password: "anypassword",
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User Not Found!");
    });
  });
});
