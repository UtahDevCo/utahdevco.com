import { defineConfig } from "drizzle-kit";
import { dotenvConfig } from "./dotenv";
import { CONSTANTS } from "./constants";

dotenvConfig();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: CONSTANTS.ENV.TURSO_CONNECTION_URL,
    authToken: CONSTANTS.ENV.TURSO_AUTH_TOKEN,
  },
});
