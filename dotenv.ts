import { config } from 'dotenv';
import { existsSync } from 'fs';

export function dotenvConfig() {
  const envPath = existsSync('.env.local') ? '.env.local' : '.env';
  config({ path: envPath });
}
