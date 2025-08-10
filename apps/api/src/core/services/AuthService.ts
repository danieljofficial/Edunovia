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
export class AuthService implements IAuthService {
  constructor(private jwtSecret: string, private saltRounds: number = 10) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  private async comparePasswords(plainText: string, hash: string) {
    return await bcrypt.compare(plainText, hash);
  }

  private generateToken(userid: string) {
    return jwt.sign(userid, this.jwtSecret);
  }

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
    const hashedPassword = await this.hashPassword(password);

    const result = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
    });

    const token = this.generateToken(result.id);
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

    const isValid = await this.comparePasswords(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError("Invalid Password!");
    }

    const token = this.generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async verifyToken(token: string): Promise<{ userId: number }> {
    try {
      const decodedToken = jwt.verify(token, this.jwtSecret);
      const parsedToken = parseInt(decodedToken as string);
      return { userId: parsedToken };
    } catch (error) {
      throw new UnauthorizedError(`Invalid Token: ${error}`);
    }
  }
}
