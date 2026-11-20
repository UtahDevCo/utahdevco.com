import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getBookingUrl() {
  if (process.argv[2]) {
    return process.argv[2];
  }

  const constantsPath = resolve(__dirname, '../constants.ts');
  const source = readFileSync(constantsPath, 'utf8');
  const match = source.match(/BOOKING_URL:\s*['"]([^'"]+)['"]/);

  if (!match) {
    throw new Error(`Could not find BOOKING_URL in ${constantsPath}`);
  }

  return match[1];
}

async function main() {
  const url = getBookingUrl();
  const response = await fetch(url, { redirect: 'follow' });

  if (!response.ok) {
    console.error(`FAIL: ${url} returned HTTP ${response.status} (${response.url})`);
    process.exit(1);
  }

  const html = await response.text();
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
  const ogTitle =
    html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i)?.[1]?.trim() ?? '';

  const invalidTitles = new Set(['', '(No title)']);

  if (invalidTitles.has(title) || invalidTitles.has(ogTitle)) {
    console.error(
      `FAIL: Booking link appears expired or deleted.\n` +
        `  URL: ${url}\n` +
        `  Final URL: ${response.url}\n` +
        `  <title>: ${JSON.stringify(title)}\n` +
        `  og:title: ${JSON.stringify(ogTitle)}`
    );
    process.exit(1);
  }

  console.log(`OK: Booking link is active (${title}) -> ${response.url}`);
}

main().catch((err) => {
  console.error(`FAIL: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
