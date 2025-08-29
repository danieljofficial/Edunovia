import { SignOptions } from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  email: string;
  role?: string;
  [key: string]: any;
}

export interface ITokenService {
  generateToken(
    payload: TokenPayload,
    expiresIn: SignOptions["expiresIn"]
  ): string;
  verifyToken(token: string): TokenPayload;
  decodeToken(token: string): TokenPayload | null;
}
