import "dotenv/config";
import { ITokenService, TokenPayload } from "../interfaces/ITokenService";
import * as jwt from "jsonwebtoken";
import { InvalidTokenError } from "../../presentation/errors/authErrors";
import { BadRequestError } from "../../presentation/errors/genericErrors";
export class JwtTokenService implements ITokenService {
  constructor(private readonly secret: string) {}
  generateToken(
    payload: TokenPayload,
    expiresIn: jwt.SignOptions["expiresIn"]
  ): string {
    if (!this.secret) {
      throw new BadRequestError("JWT secret is not defined");
    }
    const token = jwt.sign(payload, this.secret, { expiresIn });
    return token;
  }
  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.secret) as TokenPayload;
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
  decodeToken(token: string): TokenPayload | null {
    throw new Error("Method not implemented.");
  }
}

export const tokenService = new JwtTokenService(
  process.env.JWT_SECRET as string
);
