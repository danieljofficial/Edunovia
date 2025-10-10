import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient();

async function main() {
  // Example: Create an admin user
  await prisma.user.create({
    data: {
      email: "admin@edunovia.com",
      username: "admin",
      password: "adminpassword", // Hash in production!
      role: "ADMIN",
      isVerified: true,
    },
  });

  // Example: Create a teacher user
  await prisma.user.create({
    data: {
      email: "teacher@edunovia.com",
      username: "teacher",
      password: "teacherpassword",
      role: "TEACHER",
      isVerified: true,
    },
  });

  // Example: Create a student user
  await prisma.user.create({
    data: {
      email: "student@edunovia.com",
      username: "student",
      password: "studentpassword",
      role: "STUDENT",
      isVerified: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
