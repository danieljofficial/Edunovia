import { Request, Response } from "express";
import { AuthService } from "../../core/services/authService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    const newUser = await this.authService.register({
      username,
      email,
      password,
      role,
    });
    res.status(201).json(newUser);
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loggedInUser = await this.authService.login(email, password);
    res.status(200).json(loggedInUser);
  }
}
