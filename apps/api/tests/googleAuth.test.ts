import request from "supertest";
import createApp from "../src/infrastructure/server/app";
// import { prisma } from "../src/infrastructure/database/prisma";
import { GoogleTestUserData } from "./testUtils";

// Mock passport and prisma logic as needed
import * as prismaModule from "../src/infrastructure/database/prisma";
describe("Google OAuth Routes", () => {
  let app: any;

  beforeAll(() => {
    app = createApp();
  });
  let userData = GoogleTestUserData();

  it("should redirect to Google with state=TEACHER", async () => {
    const res = await request(app).get("/auth/google?type=TEACHER");
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("accounts.google.com");
    expect(res.headers.location).toContain("state=TEACHER");
    expect(res.body).toMatchObject({
      user: {
        id: expect.any(String),
        email: userData.email,
        username: userData.username,
        role: userData.role,
        isVerified: userData.isVerified,
        // createdAt: expect.any(String),
      },
    });
    expect(res.body).not.toHaveProperty("password");
  });

  it("should redirect to Google with state=PARENT", async () => {
    const res = await request(app).get("/auth/google?type=PARENT");
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain("accounts.google.com");
    expect(res.headers.location).toContain("state=PARENT");
  });

  // You can add more tests for /student and /admin

  // For the callback, you should mock passport and prisma logic
  // Example:
  it("should create a user with correct role on callback", async () => {
    // Mock passport and prisma logic here
    // Simulate callback with state=TEACHER
    // Assert user is created with role TEACHER

    // Mock Prisma user methods
    jest.mock("../src/infrastructure/database/prisma", () => ({
      prisma: {
        user: {
          findUnique: jest.fn(),
          create: jest.fn(),
        },
      },
    }));

    // Mock Passport authenticate
    jest.mock("passport", () => ({
      authenticate: jest.fn(() => (req: any, res: any, next: any) => {
        // Simulate a successful authentication
        req.user = {
          id: "mock-id",
          email: "mock@user.com",
          username: "Mock User",
          role: req.query.state || "STUDENT",
          isVerified: true,
        };
        next();
      }),
      initialize: jest.fn(() => (req: any, res: any, next: any) => next()),
      session: jest.fn(() => (req: any, res: any, next: any) => next()),
    }));
  });
  describe("Google OAuth Callback", () => {
    let app: any;

    beforeAll(() => {
      app = createApp();
    });

    it("should create a user with correct role on callback", async () => {
      // Mock Prisma create
      (prismaModule.prisma.user.create as jest.Mock).mockResolvedValue({
        id: "mock-id",
        email: "mock@user.com",
        username: "Mock User",
        role: "TEACHER",
        isVerified: true,
      });

      const res = await request(app)
        .get("/auth/google/callback")
        .query({ state: "TEACHER" });

      expect(res.status).toBe(200);
      expect(res.body.user.role).toBe("TEACHER");
    });
  });
});
