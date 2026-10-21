// Measures the gzipped JavaScript each route actually references.
// Run against a live production server: node scripts/measure-js.mjs
import { gzipSync } from "node:zlib";

const BASE = process.env.BASE ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/journal-club",
  "/journal-club/2026-09-deep-learning-screening-diabetic-retinopathy",
  "/annual-journal",
  "/annual-journal/2026",
  "/research",
  "/resources",
  "/contact",
  "/sitemap.xml",
];

const cache = new Map();

async function gzippedSize(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // Level 9 to approximate CDN behaviour; report raw too.
  const gz = gzipSync(buf, { level: 9 }).length;
  const out = { raw: buf.length, gz };
  cache.set(url, out);
  return out;
}

const rows = [];

for (const route of ROUTES) {
  const url = BASE + route;
  const res = await fetch(url);
  const html = await res.text();
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  const unique = [...new Set(scripts)];
  let raw = 0;
  let gz = 0;
  for (const s of unique) {
    const size = await gzippedSize(new URL(s, url).toString());
    raw += size.raw;
    gz += size.gz;
  }
  rows.push({ route, scripts: unique.length, raw, gz, html: Buffer.byteLength(html) });
}

console.log(
  "\n" +
    "ROUTE".padEnd(58) +
    "SCRIPTS".padStart(8) +
    "JS GZIP".padStart(11) +
    "JS RAW".padStart(11) +
    "HTML".padStart(10),
);
console.log("-".repeat(98));
for (const r of rows) {
  console.log(
    r.route.padEnd(58) +
      String(r.scripts).padStart(8) +
      (r.gz / 1024).toFixed(1).padStart(9) + "K" +
      (r.raw / 1024).toFixed(1).padStart(9) + "K" +
      (r.html / 1024).toFixed(1).padStart(8) + "K",
  );
}
console.log("-".repeat(98));
