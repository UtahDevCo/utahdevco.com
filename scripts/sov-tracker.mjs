#!/usr/bin/env node
/**
 * Lightweight Multi-LLM Share-of-Voice (SoV) Tracker
 *
 * Queries OpenAI, Gemini (with Google Search grounding), and Perplexity across
 * Test and Control prompt cohorts, logging brand mentions and cited URLs.
 *
 * Environment variables (set whichever providers you want to query):
 *   OPENAI_API_KEY
 *   GEMINI_API_KEY (or GOOGLE_API_KEY)
 *   PERPLEXITY_API_KEY
 *
 * Usage:
 *   npm run seo:sov
 *   node scripts/sov-tracker.mjs --cohort=test
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(__dirname, 'sov-prompts.json'), 'utf8'));

const cohortFilter = process.argv.find((a) => a.startsWith('--cohort='))?.split('=')[1] || 'all';
const openaiKey = process.env.OPENAI_API_KEY;
const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const perplexityKey = process.env.PERPLEXITY_API_KEY;

async function queryOpenAI(prompt) {
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.SOV_OPENAI_MODEL || 'gpt-4o-mini',
      tools: [{ type: 'web_search_preview' }],
      input: prompt,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text =
    data.output_text ||
    (data.output || [])
      .flatMap((item) => item.content || [])
      .map((c) => c.text || '')
      .join('\n');
  const citations = (data.output || [])
    .flatMap((item) => item.content || [])
    .flatMap((c) => c.annotations || [])
    .map((a) => a.url)
    .filter(Boolean);
  return { text, citations: [...new Set(citations)] };
}

async function queryGemini(prompt) {
  const model = process.env.SOV_GEMINI_MODEL || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }],
    }),
  });
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const candidate = data.candidates?.[0];
  const text = (candidate?.content?.parts || []).map((p) => p.text || '').join('\n');
  const citations = (candidate?.groundingMetadata?.groundingChunks || [])
    .map((c) => c.web?.uri)
    .filter(Boolean);
  return { text, citations: [...new Set(citations)] };
}

async function queryPerplexity(prompt) {
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${perplexityKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.SOV_PERPLEXITY_MODEL || 'sonar',
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Perplexity HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  const citations = Array.isArray(data.citations) ? data.citations : [];
  return { text, citations };
}

function detectBrands(text, citations) {
  const haystack = `${text}\n${citations.join('\n')}`.toLowerCase();
  const found = [];
  for (const brand of config.brands) {
    if (brand.patterns.some((p) => haystack.includes(p.toLowerCase()))) {
      found.push(brand.name);
    }
  }
  return found;
}

async function main() {
  const providers = [
    openaiKey ? { name: 'openai', fn: queryOpenAI } : null,
    geminiKey ? { name: 'gemini', fn: queryGemini } : null,
    perplexityKey ? { name: 'perplexity', fn: queryPerplexity } : null,
  ].filter(Boolean);

  if (providers.length === 0) {
    console.error('No LLM API keys found. Set OPENAI_API_KEY, GEMINI_API_KEY, and/or PERPLEXITY_API_KEY.');
    process.exit(1);
  }

  const cohortsToRun =
    cohortFilter === 'all' ? Object.keys(config.cohorts) : [cohortFilter].filter((c) => config.cohorts[c]);

  const timestamp = new Date().toISOString();
  const dateSlug = timestamp.slice(0, 10);
  const results = [];

  for (const cohort of cohortsToRun) {
    for (const item of config.cohorts[cohort]) {
      for (const provider of providers) {
        process.stdout.write(`[${cohort}] ${item.id} (${provider.name})... `);
        try {
          const { text, citations } = await provider.fn(item.query);
          const brandsMentioned = detectBrands(text, citations);
          results.push({
            cohort,
            id: item.id,
            query: item.query,
            provider: provider.name,
            brandsMentioned,
            citations,
            snippet: text.slice(0, 500),
          });
          console.log(brandsMentioned.length > 0 ? `HIT: ${brandsMentioned.join(', ')}` : 'miss');
        } catch (err) {
          console.log(`ERROR: ${err.message}`);
          results.push({
            cohort,
            id: item.id,
            query: item.query,
            provider: provider.name,
            error: err.message,
            brandsMentioned: [],
            citations: [],
          });
        }
      }
    }
  }

  const outDir = join(__dirname, 'sov-logs');
  mkdirSync(outDir, { recursive: true });
  const jsonPath = join(outDir, `sov-${dateSlug}.json`);
  writeFileSync(jsonPath, JSON.stringify({ timestamp, results }, null, 2));

  const mdLines = [
    `# AI Share-of-Voice Report (${dateSlug})`,
    '',
    '| Cohort | Prompt ID | Provider | Brands Mentioned | Citations |',
    '| :--- | :--- | :--- | :--- | :--- |',
    ...results.map(
      (r) =>
        `| ${r.cohort} | ${r.id} | ${r.provider} | ${r.brandsMentioned.join(', ') || '-'} | ${r.citations.length} |`
    ),
    '',
  ];
  const mdPath = join(outDir, `sov-${dateSlug}.md`);
  writeFileSync(mdPath, mdLines.join('\n'));

  console.log(`\nSaved:\n  ${jsonPath}\n  ${mdPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
