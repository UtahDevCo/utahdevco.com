import { config } from "dotenv";
import { existsSync } from "fs";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { dotenvConfig } from "../../dotenv";
import { CONSTANTS } from "../../constants";

dotenvConfig();

const client = createClient({
  url: CONSTANTS.ENV.TURSO_CONNECTION_URL,
  authToken: CONSTANTS.ENV.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
