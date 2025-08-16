import { IAuthService } from "../interfaces/IAuthService";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Prisma, prisma, User } from "../../infrastructure/database/prisma";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../presentation/errors/genericErrors";
import { passwordService } from "./passwordService";
import { tokenService } from "./tokenService";
export class AuthService implements IAuthService {
  constructor(private jwtSecret: string, private saltRounds: number = 10) {}

  async register(
    userData: Prisma.UserCreateInput
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    const { username, email, password, role } = userData;
    if (!username || !email || !password || !role) {
      throw new BadRequestError("All Fields Required!");
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError("Email Already Exists!");
    }
    const hashedPassword = await passwordService.hashPassword(
      password,
      this.saltRounds
    );

    const result = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
    });

    const token = tokenService.generateToken({
      id: result.id,
      role: result.role,
      email: result.email,
    });
    const { password: _, ...newUser } = result;
    return { user: newUser, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError("User Not Found!");
    }

    if (!user.password) {
      throw new BadRequestError("Missing Password!");
    }

    const isValid = await passwordService.comparePasswords(
      password,
      user.password
    );

    if (!isValid) {
      throw new UnauthorizedError("Invalid Password!");
    }

    const token = tokenService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}
