import bcrypt from "bcrypt";
class PasswordService {
  async hashPassword(password: string, saltRounds: number) {
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainText: string, hash: string) {
    return await bcrypt.compare(plainText, hash);
  }
}

export const passwordService = new PasswordService();
