export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statuscode: number, isOperational = false) {
    super(message);
    this.statusCode = statuscode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request!") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized!") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden!") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found!") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict!") {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error!") {
    super(message, 500);
  }
}
