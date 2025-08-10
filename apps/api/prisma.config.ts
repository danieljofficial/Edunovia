import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("src/infrastructure/database/prisma", "schema.prisma"),
  migrations: {
    path: path.join("src/infrastructure/database/prisma", "migrations"),
    seed: "tsx db/seed.ts",
  },
});
