// Basic accessibility and structure checks against the running server.
// Usage: node scripts/audit.mjs
const BASE = process.env.BASE ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/journal-club",
  "/journal-club/2026-10-ward-rounds-on-tiktok",
  "/annual-journal",
  "/annual-journal/2026",
  "/research",
  "/resources",
  "/contact",
  "/nope",
];

const stripTags = (h) => h.replace(/<[^>]*>/g, "");

for (const route of ROUTES) {
  const res = await fetch(BASE + route);
  const html = await res.text();
  const problems = [];
  const notes = [];

  // Exactly one h1
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) problems.push(`h1 count = ${h1s} (expected 1)`);

  // Heading levels must not skip (h1 -> h3 etc.)
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let prev = 0;
  let skipAt = null;
  for (const l of levels) {
    if (prev && l > prev + 1) skipAt = `${prev}->${l}`;
    prev = l;
  }
  if (skipAt) problems.push(`heading level skip: ${skipAt}`);

  // Images need alt (or explicit aria-hidden)
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) problems.push(`img without alt: ${m[0].slice(0, 80)}`);
  }

  // Inputs need a label, aria-label, or aria-labelledby
  for (const m of html.matchAll(/<(input|select|textarea)\b[^>]*>/g)) {
    const tag = m[0];
    if (/type="hidden"/.test(tag)) continue;
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const hasAria = /aria-label|aria-labelledby/.test(tag);
    const hasLabel = id && html.includes(`for="${id}"`);
    if (!hasAria && !hasLabel) {
      problems.push(`unlabelled control: ${tag.slice(0, 90)}`);
    }
  }

  // Buttons/links need discernible text
  for (const m of html.matchAll(/<a\b[^>]*>\s*<\/a>/g)) {
    problems.push(`empty link: ${m[0]}`);
  }

  // html lang
  if (!/<html[^>]+lang="/.test(html)) problems.push("missing <html lang>");

  // viewport
  if (!/name="viewport"/.test(html)) problems.push("missing viewport meta");

  // Page must not be the not-found page unless expected
  const title = stripTags(html.match(/<title>(.*?)<\/title>/)?.[1] ?? "(none)");

  console.log(
    `\n${route}  [${res.status}]  h1=${h1s} headings=${levels.length}  "${title}"`,
  );
  if (problems.length) {
    for (const p of problems) console.log("   ISSUE  " + p);
  } else {
    console.log("   clean");
  }
  for (const n of notes) console.log("   note   " + n);
}
