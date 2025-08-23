export class InvalidTokenError extends Error {
  constructor(message: string = "Invalid Auth Token") {
    super(message);
    this.name = "InvalidTokenError";
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
}
