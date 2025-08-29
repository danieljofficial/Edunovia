import { prisma } from "../src/infrastructure/database/prisma";

export default async function teardown() {
  try {
    await prisma.passwordResetToken.deleteMany();
    await prisma.user.deleteMany();
  } finally {
    await prisma.$disconnect();
  }
}
