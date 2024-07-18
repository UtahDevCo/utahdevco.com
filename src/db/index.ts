import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { dotenvConfig } from "../../dotenv";
import { CONSTANTS } from "../../constants";

dotenvConfig();

const client = createClient({
  url: "file:./.data/turso.db",
  syncUrl: CONSTANTS.ENV.TURSO_CONNECTION_URL,
  authToken: CONSTANTS.ENV.TURSO_AUTH_TOKEN,
});

export async function sync() {
  await client.sync();

  console.info("Synced");
}

export const db = drizzle(client);
