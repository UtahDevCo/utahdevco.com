#!/usr/bin/env node
/**
 * Pings IndexNow (Bing, ChatGPT Search, Yandex, Seznam, Naver) with all URLs
 * currently published in https://www.utahdevco.com/sitemap.xml.
 *
 * Usage:
 *   npm run seo:indexnow
 *   node scripts/ping-indexnow.mjs --dry-run
 */

const HOST = 'www.utahdevco.com';
const KEY = 'utahdevco-indexnow-9f4c2a8e1b7d4036';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const dryRun = process.argv.includes('--dry-run');

async function main() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${SITEMAP_URL}: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  if (urlList.length === 0) {
    throw new Error(`No <loc> URLs found in ${SITEMAP_URL}`);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`Found ${urlList.length} URLs in ${SITEMAP_URL}:`);
  for (const url of urlList) console.log(`  - ${url}`);

  if (dryRun) {
    console.log('\n[dry-run] Skipping POST to IndexNow.');
    return;
  }

  const ping = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const body = await ping.text();
  console.log(`\nIndexNow response: HTTP ${ping.status}${body ? ` — ${body}` : ''}`);
  if (!ping.ok) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
