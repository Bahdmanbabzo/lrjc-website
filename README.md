# LASUMSA Research &amp; Journal Club

Publication platform for the LASUMSA Research &amp; Journal Club, Lagos State
University College of Medicine.

Built as a scholarly archive rather than a student-association site. Content
lives in MDX files; there is no database and no admin panel.

> **Sample content is in place.** The three articles, the 2026 volume, and the
> research records are realistic placeholders with real paper metadata. See
> [`content/README.md`](content/README.md#before-launch) for the full
> pre-launch checklist.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 (CSS-first `@theme`) |
| Content | MDX via `next-mdx-remote/rsc`, validated by Zod |
| Fonts | Newsreader + Inter, self-hosted at build time via `next/font` |
| Email | Resend, via a server action |
| Hosting | Vercel (or any Node host — `output: "standalone"`) |

## Commands

```bash
npm run dev        # dev server
npm run build      # production build — fails on invalid content
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Two verification scripts, run against a live server:

```bash
node scripts/measure-js.mjs   # gzipped JS per route
node scripts/audit.mjs        # heading outline, alt text, labels, lang
```

## Publishing an article

Create `content/articles/2026-10-your-topic.mdx`, fill in the frontmatter, push.
That is the whole workflow. Full field reference and house style:
[`content/README.md`](content/README.md).

An invalid article **fails the build** with the file path and every problem
listed, so a broken article can never ship.

## Design system

`app/globals.css` holds every token. The palette:

| Role | Value |
|---|---|
| Page | `#FEFBF4` warm cream |
| Surface | `#FFFFFF` |
| Ink | `#1A1A17` / `#6B6A61` |
| Rules | `#E7E3D8` |
| Accent | `#153C59` deep navy |
| Accent hover | `#0E2C42` |
| Accent wash | `#E9EFF3` |
| Highlight | `#F5B41A` amber (decorative/fill only) |
| Highlight ink | `#7A5200` (text-safe amber) |
| Highlight tint | `#FBE6AD` |

Rules that hold throughout:

- Borders are hairlines, never shadows — the journal cover is the only exception.
- Navy marks interactive and active states. It is never a large fill.
- Bright gold is decorative: rules, markers, underlines and selection fills. Small
  gold text uses `--color-gold-ink`, because `#F5B41A` on cream is only 1.78:1.
- Gold appears roughly once per viewport at most.
- Whitespace does the work; section padding is `py-20 md:py-28`.
- Hover/state motion is 150–300ms on transform, opacity and colour. Route
  transitions are 220ms out / 460ms in with a clip-path wipe.

There is no dark mode and no `dark:` variant anywhere.

## JavaScript

The site is server-rendered throughout. Route changes use React's
`<ViewTransition>` with CSS clip-path wipes; browsers without the View
Transitions API get a CSS-only entrance fallback. All motion is disabled under
`prefers-reduced-motion: reduce`.

**Measured payload: ~174 KB gzipped of JavaScript per page**, of which ~170 KB
is the Next.js App Router React runtime that the framework ships
unconditionally. Verified by building a page containing nothing but static
markup: it still loads 169.4 KB.

Hand-written application code accounts for roughly 5 KB of that — the mobile
navigation, which is the only client component in the layout. We chose to
accept the framework baseline rather than migrate to a zero-JavaScript
framework. **A genuinely near-zero payload would require Astro**, which
outputs static HTML and ships no runtime; that was considered and declined.

## Structure

```
app/
  page.tsx                     home
  journal-club/
    page.tsx                   full archive
    year/[year]/               per-year archive (static)
    [slug]/                    article — the main template
  annual-journal/
    page.tsx                   all volumes
    [year]/                    one issue: cover, contents, editorial
  research/ resources/ about/ contact/
  sitemap.ts robots.ts opengraph-image.tsx
content/
  articles/*.mdx               monthly appraisals
  journal/<year>/              annual volumes
  schema.ts                    Zod contracts
lib/
  site.ts                      name, nav, pillars, process
  content.ts                   loaders
  research.ts                  research records
components/
  site-header.tsx site-footer.tsx mobile-nav.tsx
  editorial.tsx article-row.tsx mdx.tsx hero-figure.tsx wordmark.tsx
```

## Deployment

Push to a Git repository connected to Vercel. Set:

```
NEXT_PUBLIC_SITE_URL=https://<your-domain>
RESEND_API_KEY=re_...            # optional; see below
CONTACT_TO=research@lasuma.edu.ng
CONTACT_FROM=LRJC Website <contact@your-domain>
```

Without `RESEND_API_KEY` the contact form reports that delivery is not
configured and the page still offers a working `mailto:` fallback, so the site
is never a dead end. Spam protection is a honeypot field only — add a real
rate limiter (e.g. Upstash) if the form is ever abused in volume.
