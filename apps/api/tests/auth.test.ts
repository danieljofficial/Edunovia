import createApp from "../src/infrastructure/server/app";
import request from "supertest";
import { createTestUserData } from "./testUtils";
describe("Authentication tests", () => {
  let app = createApp();
  afterAll(async () => {});
  let testData = createTestUserData();

  describe("POST /api/v1/auth/register", () => {
    it("should create a new user with valid data", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(testData);
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

    it("should reject invalid email format", async () => {
      const invalidData = createTestUserData();
      invalidData.email = "not-an-email";
      // try {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(invalidData);
      console.log(response.body);
      expect(response.status).toBe(400);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      console.log("errors", response.body.errors);
      expect(response.body.errors).toMatchObject({
        field: "Invalid email address",
      });
    });

    it("should reject invalid username format", async () => {
      const invalidData = createTestUserData();
      invalidData.username = "u";
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(invalidData);
      console.log(response.body);
      expect(response.status).toBe(400);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      console.log("errors", response.body.errors);
      expect(response.body.errors).toMatchObject({
        field: "Username must be 3–20 characters",
      });
    });

    it("should reject invalid username format", async () => {
      const invalidData = createTestUserData();
      invalidData.password = "p";
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(invalidData);
      console.log(response.body);
      expect(response.status).toBe(400);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      console.log("errors", response.body.errors);
      expect(response.body.errors).toMatchObject({
        field: "Password must be at least 8 characters",
      });
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should login with valid email and password", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: testData.email,

        password: testData.password,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
    });

    it("should reject login with invalid password (401)", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: testData.email,
        password: "false password",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid Password!");
    });

    it("should reject login with non-existent email", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "nonexistent@test.com",
        password: "anypassword",
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User Not Found!");
    });
  });
});
