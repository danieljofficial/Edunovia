import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/infrastructure/server/",
    "/src/presentation/validators/",
  ],
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
    "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["./tests/setup.ts"],
  // globalSetup: "<rootDir>/tests/globalSetup.ts",
  // globalTeardown: "<rootDir>/tests/globalTeardown.ts",
};

export default config;
