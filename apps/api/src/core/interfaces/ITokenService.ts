export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  [key: string]: any;
}

export interface ITokenService {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
  decodeToken(token: string): TokenPayload | null;
}
