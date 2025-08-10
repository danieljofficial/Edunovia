import { Prisma, User } from "@prisma/client";

export interface IAuthService {
  login(
    email: string,
    password: string
  ): Promise<{ user: Omit<User, "password">; token: string }>;
  register(
    userData: Prisma.UserCreateInput
  ): Promise<{ user: Omit<User, "password"> }>;
  verifyToken(token: string): Promise<{ userId: number }>;
}
