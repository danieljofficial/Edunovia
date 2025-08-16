import "dotenv/config";
import { ITokenService, TokenPayload } from "../interfaces/ITokenService";
import * as jwt from "jsonwebtoken";
import { InvalidTokenError } from "../../presentation/errors/authErrors";
export class JwtTokenService implements ITokenService {
  constructor(private readonly secret: string) {}
  generateToken(payload: TokenPayload, isRefreshToken = false): string {
    const expiresIn = isRefreshToken ? "7d" : "1d";
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
