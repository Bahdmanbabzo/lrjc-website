import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { PageTransition } from "@/components/page-transition";
import { getArticle, getArticleSlugs, getPublishedArticles } from "@/lib/content";
import type { Article } from "@/content/schema";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const file = await getArticle(slug);
  if (!file) return {};

  const a = file.data;
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/journal-club/${a.slug}` },
    authors: a.contributors.map((name) => ({ name })),
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      publishedTime: a.date,
      section: a.discipline,
      authors: a.contributors,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const file = await getArticle(slug);
  if (!file || file.data.status !== "published") notFound();

  const a = file.data;
  const all = await getPublishedArticles();
  const index = all.findIndex((x) => x.slug === a.slug);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index < all.length - 1 ? all[index + 1] : null;
  const nodeIndex = String(index >= 0 ? index + 1 : 1).padStart(2, "0");

  return (
    <PageTransition>
      <article className="mx-auto w-full max-w-xl px-5 py-12 sm:px-6 md:max-w-2xl md:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a)) }}
        />

        {/* ---- Top HUD Bar ---- */}
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <nav aria-label="Breadcrumb">
            <Link
              href="/journal-club"
              transitionTypes={["nav-back"]}
              className="algo-meta-mono link-underline text-ink-60 transition-colors hover:text-accent"
            >
              ← JOURNAL CLUB
            </Link>
          </nav>
          <span
            aria-hidden="true"
            className="algo-meta-mono text-ink-60 tabular-nums"
          >
            [ GRAPH_NODE: {nodeIndex} ]
          </span>
        </div>

        {/* ---- Central Algorithmic Reading Frame ---- */}
        <div className="algo-frame px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14">
          {/* Geometric Corner Brackets ┌ ┐ └ ┘ */}
          <span aria-hidden="true" className="algo-corner algo-corner-tl" />
          <span aria-hidden="true" className="algo-corner algo-corner-tr" />
          <span aria-hidden="true" className="algo-corner algo-corner-bl" />
          <span aria-hidden="true" className="algo-corner algo-corner-br" />

          {/* Top coordinate tick ruler */}
          <div aria-hidden="true" className="algo-tick-bar mb-8" />

          {/* ---- Category & Date Metadata ---- */}
          <header>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="algo-meta-mono text-ink-60">JOURNAL CLUB</p>
              <span
                aria-hidden="true"
                className="font-mono text-[0.625rem] tracking-[0.16em] text-ink-40/80"
              >
                + SYS_REF // {a.date}
              </span>
            </div>

            <p className="mt-3 text-[0.75rem] font-medium tracking-[0.18em] text-ink-60 uppercase">
              {a.displayDate} • {a.discipline}
            </p>

            {/* ---- Article Title (Amber Gold #f5b419 Serif) ---- */}
            <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.125rem)] font-semibold leading-[1.08] text-accent">
              {a.title}
            </h1>

            {/* ---- Hairline Divider with Central Junction Dot ---- */}
            <div aria-hidden="true" className="algo-divider">
              <span className="algo-divider-dot" />
            </div>

            {/* ---- Authors Section ---- */}
            <div>
              <h2 className="font-sans text-[0.6875rem] font-medium tracking-[0.2em] text-ink-60 uppercase">
                AUTHORS
              </h2>
              <p className="mt-2.5 font-display text-[1.125rem] leading-[1.5] text-ink">
                {a.contributors.length > 0
                  ? a.contributors.join(", ")
                  : "LASUMSA Research & Journal Club"}
              </p>
              <p className="mt-1.5 text-[0.8125rem] text-ink-60">
                {site.institution}
              </p>
            </div>

            {/* ---- Optional Source Paper & PICO (for paper appraisals) ---- */}
            {a.original && (
              <div className="mt-8 border border-gold/20 bg-canvas-deep/55 p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="algo-meta-mono text-ink-60">
                    Paper Under Review
                  </h2>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.625rem] text-ink-60"
                  >
                    [ SOURCE_CITATION ]
                  </span>
                </div>
                <p className="mt-3 font-display text-[1.0625rem] font-semibold leading-[1.35] text-accent">
                  {a.original.title}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink">
                  {a.original.authors.join(", ")}
                  {a.original.authors.length > 4 && " et al."}
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-ink-60">
                  <span className="italic">{a.original.journal}</span>
                  {a.original.volume && <span> {a.original.volume}</span>}
                  {a.original.issue && <span>({a.original.issue})</span>}
                  {a.original.pages && <span>: {a.original.pages}</span>}
                  <span className="text-ink-40"> · {a.original.year}</span>
                </p>
                {(a.original.doi || a.original.url) && (
                  <p className="mt-3">
                    <a
                      href={a.original.url ?? `https://doi.org/${a.original.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline break-all font-mono text-[0.75rem] text-accent"
                    >
                      {a.original.doi ? `doi:${a.original.doi}` : "View source"}
                      <span aria-hidden> ↗</span>
                    </a>
                  </p>
                )}
                {a.whySelected && (
                  <p className="mt-4 border-t border-rule pt-3 text-[0.875rem] leading-relaxed text-ink-60">
                    <span className="font-medium text-ink">Selection rationale: </span>
                    {a.whySelected}
                  </p>
                )}
              </div>
            )}
          </header>

          {/* ---- Hairline Divider with Central Junction Dot ---- */}
          <div aria-hidden="true" className="algo-divider">
            <span className="algo-divider-dot" />
          </div>

          {/* ---- Summary / Abstract ---- */}
          <section aria-labelledby="summary-heading">
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="summary-heading"
                className="font-display text-[1.625rem] leading-[1.2] text-ink"
              >
                Summary
              </h2>
              <span
                aria-hidden="true"
                className="algo-meta-mono text-ink-60"
              >
                [ ABSTRACT ]
              </span>
            </div>
            <p className="mt-4 text-[1.05rem] leading-[1.7] text-ink">
              {a.summary}
            </p>
          </section>

          {/* ---- PICO Table (when present) ---- */}
          {a.pico && (
            <section
              aria-labelledby="pico-heading"
              className="mt-10 border border-gold/20 bg-canvas-deep/50 p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 id="pico-heading" className="algo-meta-mono text-ink-60">
                  Study Parameters (PICO)
                </h2>
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.625rem] text-ink-60"
                >
                  [ MATRIX ]
                </span>
              </div>
              <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {[
                  ["Study type", a.pico.studyType],
                  ["Population", a.pico.population],
                  ["Intervention", a.pico.intervention],
                  ["Comparator", a.pico.comparator],
                  ["Primary outcome", a.pico.outcome],
                ].map(([label, value]) => (
                  <div key={label} className="border-t border-rule pt-3">
                    <dt className="eyebrow">{label}</dt>
                    <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* ---- Hairline Divider with Central Junction Dot ---- */}
          <div aria-hidden="true" className="algo-divider">
            <span className="algo-divider-dot" />
          </div>

          {/* ---- Full Critical Appraisal / Article Prose ---- */}
          <section aria-labelledby="appraisal-heading">
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="appraisal-heading"
                className="font-display text-[1.625rem] leading-[1.2] text-ink"
              >
                {a.original ? "Critical appraisal" : "Article"}
              </h2>
              <span
                aria-hidden="true"
                className="algo-meta-mono text-ink-60"
              >
                [ FULL_TEXT ]
              </span>
            </div>
            <div className="mt-6">
              <Mdx source={file.body} />
            </div>
          </section>

          {/* ---- Strengths, Limitations & Takeaways ---- */}
          {(a.strengths.length > 0 ||
            a.limitations.length > 0 ||
            a.takeaways.length > 0) && (
            <>
              <div aria-hidden="true" className="algo-divider">
                <span className="algo-divider-dot" />
              </div>

              <div className="flex flex-col gap-9">
                {a.strengths.length > 0 && (
                  <section aria-labelledby="strengths-heading">
                    <h2
                      id="strengths-heading"
                      className="algo-meta-mono text-ink-60"
                    >
                      Strengths
                    </h2>
                    <ul className="mt-4 flex flex-col gap-3">
                      {a.strengths.map((s) => (
                        <li
                          key={s}
                          className="border-l border-gold pl-4 text-[0.9375rem] leading-relaxed text-ink"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {a.limitations.length > 0 && (
                  <section aria-labelledby="limitations-heading">
                    <h2
                      id="limitations-heading"
                      className="algo-meta-mono text-ink-60"
                    >
                      Limitations
                    </h2>
                    <ul className="mt-4 flex flex-col gap-3">
                      {a.limitations.map((l) => (
                        <li
                          key={l}
                          className="border-l border-rule-strong pl-4 text-[0.9375rem] leading-relaxed text-ink"
                        >
                          {l}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {a.takeaways.length > 0 && (
                  <section aria-labelledby="takeaways-heading">
                    <h2
                      id="takeaways-heading"
                      className="algo-meta-mono text-ink-60"
                    >
                      Key Takeaways
                    </h2>
                    <ol className="mt-4 flex flex-col gap-4">
                      {a.takeaways.map((t, i) => (
                        <li key={t} className="flex gap-4">
                          <span className="shrink-0 font-mono text-[0.75rem] font-medium text-ink-60 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[0.9375rem] leading-relaxed text-ink">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </div>
            </>
          )}

          {/* ---- References ---- */}
          {a.references.length > 0 && (
            <>
              <div aria-hidden="true" className="algo-divider">
                <span className="algo-divider-dot" />
              </div>

              <section aria-labelledby="refs-heading" className="defer-paint">
                <div className="flex items-center justify-between gap-2">
                  <h2 id="refs-heading" className="algo-meta-mono text-ink-60">
                    References
                  </h2>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.6875rem] text-ink-60 tabular-nums"
                  >
                    [ COUNT: {String(a.references.length).padStart(2, "0")} ]
                  </span>
                </div>
                <ol className="mt-6 list-none">
                  {a.references.map((r, i) => (
                    <li
                      key={`${r.title}-${i}`}
                      className="border-t border-rule py-4 text-[0.875rem] leading-relaxed text-ink-60"
                    >
                      <span className="mr-3 font-mono text-xs text-ink-60 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {r.authors && <span>{r.authors} </span>}
                      <span className="text-ink">{r.title}.</span>{" "}
                      {r.source && <span className="italic">{r.source}. </span>}
                      {r.year && <span>{r.year}.</span>}{" "}
                      {r.doi && (
                        <a
                          href={r.url ?? `https://doi.org/${r.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline break-all text-accent"
                        >
                          doi:{r.doi}
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            </>
          )}

          {/* Bottom coordinate tick ruler */}
          <div aria-hidden="true" className="algo-tick-bar mt-10" />
        </div>

        {/* ---- Prev / Next Algorithmic Footer Navigation ---- */}
        <nav
          aria-label="More articles"
          className="no-print mt-8 grid gap-4 sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/journal-club/${older.slug}`}
              transitionTypes={["nav-back"]}
              className="group border border-gold/20 bg-canvas-deep/70 p-5 backdrop-blur-md transition-colors duration-200 hover:border-gold/55"
            >
              <p className="algo-meta-mono text-ink-60">
                <span aria-hidden>←</span> {older.displayDate}
              </p>
              <p className="mt-3 font-display text-[1.125rem] font-semibold leading-[1.25] text-accent transition-colors duration-200 group-hover:text-ink">
                {older.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/journal-club/${newer.slug}`}
              transitionTypes={["nav-forward"]}
              className="group border border-gold/20 bg-canvas-deep/70 p-5 backdrop-blur-md transition-colors duration-200 hover:border-gold/55 sm:text-right"
            >
              <p className="algo-meta-mono text-ink-60">
                {newer.displayDate} <span aria-hidden>→</span>
              </p>
              <p className="mt-3 font-display text-[1.125rem] font-semibold leading-[1.25] text-accent transition-colors duration-200 group-hover:text-ink">
                {newer.title}
              </p>
            </Link>
          )}
        </nav>
      </article>
    </PageTransition>
  );
}

function articleJsonLd(a: Article) {
  const isAppraisal = Boolean(a.original);
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: a.title,
    abstract: a.summary,
    datePublished: a.date,
    articleSection: a.discipline,
    genre: isAppraisal ? "Critical appraisal" : "Review",
    keywords: [
      a.discipline,
      isAppraisal ? "critical appraisal" : "review",
      "medical education",
    ].join(", "),
    url: `${site.url}/journal-club/${a.slug}`,
    author: a.contributors.map((name) => ({ "@type": "Person", name })),
    publisher: { "@type": "Organization", name: site.name },
    ...(a.original
      ? {
          isBasedOn: {
            "@type": "ScholarlyArticle",
            headline: a.original.title,
            author: a.original.authors.map((name) => ({ "@type": "Person", name })),
            datePublished: String(a.original.year),
            ...(a.original.journal
              ? { publisher: { "@type": "Periodical", name: a.original.journal } }
              : {}),
            ...(a.original.doi
              ? { identifier: a.original.doi, url: `https://doi.org/${a.original.doi}` }
              : {}),
          },
        }
      : {}),
  };
}
