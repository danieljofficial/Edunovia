import { v4 as uuidv4 } from "uuid";
import { UserRole } from "../src/presentation/types/userRoles";

export const createTestUserData: () => {
  email: String;
  username?: String;
  password: String;
  role: UserRole;
  isVerified: boolean;
} = () => ({
  email: `${uuidv4()}@test.com`,
  password: "password",
  username: "Test User",
  role: "TEACHER",
  isVerified: false,
});

export const GoogleTestUserData: () => {
  email: String;
  username: String;
  password?: String;
  role: UserRole;
  isVerified: boolean;
} = () => ({
  email: `adeniyikayd@gmail.com`,
  username: "Adeniyi Adewumi",
  password: "",
  role: "STUDENT",
  isVerified: true,
});
