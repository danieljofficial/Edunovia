import { Request, Response, NextFunction } from "express";
import { tokenService } from "../src/core/services/tokenService";
import { roleAuthMiddleware } from "../src/presentation/middlewares/roleAuthMiddleware";
import { ForbiddenError } from "../src/presentation/errors/genericErrors";
import { InvalidTokenError } from "../src/presentation/errors/authErrors";

describe("roleAuthMiddleware", () => {
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: NextFunction;
  let validToken: string;

  beforeAll(() => {
    validToken = tokenService.generateToken({
      id: "user-123",
      email: "teacher@edunovia.com",
      role: "TEACHER",
    });
  });

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it("should call next() for valid token with required role", () => {
    mockRequest.headers = { authorization: `Bearer ${validToken}` };

    const middleware = roleAuthMiddleware(["TEACHER", "ADMIN"]);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    console.log("mock user", mockRequest.user);
    expect(mockRequest.user).toMatchObject({
      id: "user-123",
      email: "teacher@edunovia.com",
      role: "TEACHER",
    });
  });

  it("should throw ForbiddenError for valid token without required role", () => {
    mockRequest.headers = { authorization: `Bearer ${validToken}` };

    const middleware = roleAuthMiddleware(["ADMIN"]);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(ForbiddenError));
  });

  it("should throw ForbiddenError when no token is provided", () => {
    const middleware = roleAuthMiddleware(["TEACHER"]);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(ForbiddenError));
  });

  it("should throw InvalidTokenError for invalid token", () => {
    mockRequest.headers = { authorization: "Bearer invalid.token.here" };

    const middleware = roleAuthMiddleware(["TEACHER"]);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(InvalidTokenError));
  });
});
