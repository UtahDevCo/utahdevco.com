import { existsSync } from 'fs';

import { config } from 'dotenv';

export function dotenvConfig() {
  const envPath = existsSync('.env.local') ? '.env.local' : '.env';
  config({ path: envPath });
}
