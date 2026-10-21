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

  return (
    <PageTransition>
      <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a)) }}
      />

      {/* ---- masthead ---- */}
      <header className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter pt-14 pb-14 md:pt-24 md:pb-20">
          <nav aria-label="Breadcrumb">
            <Link
              href="/journal-club"
              transitionTypes={["nav-back"]}
              className="eyebrow link-underline hover:text-ink"
            >
              Journal Club
            </Link>
          </nav>

          <p className="eyebrow eyebrow-accent mt-10">
            {a.displayDate}
            <span className="text-ink-40"> · {a.discipline}</span>
          </p>

          <h1 className="mt-6 max-w-[20ch] text-[clamp(2.125rem,5.5vw,4rem)] leading-[1.04]">
            {a.title}
          </h1>

          {/* Original paper — kept deliberately compact so the club's own
              analysis dominates the page. Club-authored reviews have no paper
              under review, so they show the byline instead. */}
          {a.original ? (
            <div className="mt-12 grid gap-8 border-t border-rule pt-8 md:grid-cols-[1fr_1fr] md:gap-16">
              <div>
                <h2 className="eyebrow">Paper under review</h2>
                <p className="mt-4 font-display text-[1.1875rem] leading-[1.35] text-ink">
                  {a.original.title}
                </p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-60">
                  {a.original.authors.join(", ")}
                  {a.original.authors.length > 4 && " et al."}
                </p>
                <p className="mt-3 text-[0.8125rem] text-ink-60">
                  <span className="italic">{a.original.journal}</span>
                  {a.original.volume && <span> {a.original.volume}</span>}
                  {a.original.issue && <span>({a.original.issue})</span>}
                  {a.original.pages && <span>: {a.original.pages}</span>}
                  <span className="text-ink-40"> · {a.original.year}</span>
                </p>
                {(a.original.doi || a.original.url) && (
                  <p className="mt-4">
                    <a
                      href={a.original.url ?? `https://doi.org/${a.original.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline break-all text-[0.75rem] text-accent"
                    >
                      {a.original.doi ? `doi:${a.original.doi}` : "View source"}
                      <span aria-hidden> ↗</span>
                    </a>
                  </p>
                )}
              </div>

              <div>
                <h2 className="eyebrow">Why we selected this paper</h2>
                <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-60">
                  {a.whySelected}
                </p>
                {a.contributors.length > 0 && (
                  <>
                    <h2 className="eyebrow mt-8">Appraised by</h2>
                    <p className="mt-3 text-[0.875rem] text-ink-60">
                      {a.contributors.join(" · ")}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-12 border-t border-rule pt-8">
              <h2 className="eyebrow">Authors</h2>
              <p className="mt-4 max-w-[70ch] font-display text-[1.1875rem] leading-[1.5] text-ink">
                {a.contributors.length > 0
                  ? a.contributors.join(", ")
                  : site.institution}
              </p>
              <p className="mt-3 text-[0.8125rem] text-ink-60">
                {site.institution}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* ---- PICO table ---- */}
      {a.pico && (
        <section aria-labelledby="pico-heading" className="border-b border-rule bg-surface">
          <div className="mx-auto max-w-[1200px] px-gutter py-14 md:py-16">
            <h2 id="pico-heading" className="eyebrow">
              Article information
            </h2>
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Study type", a.pico.studyType],
                ["Population", a.pico.population],
                ["Intervention", a.pico.intervention],
                ["Comparator", a.pico.comparator],
                ["Primary outcome", a.pico.outcome],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-2.5 max-w-[42ch] text-[0.875rem] leading-relaxed text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ---- summary + appraisal ---- */}
      <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div>
            <section aria-labelledby="summary-heading">
              <h2
                id="summary-heading"
                className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.15]"
              >
                Summary
              </h2>
              <p className="mt-6 max-w-[64ch] text-[1.0625rem] leading-[1.75] text-ink">
                {a.summary}
              </p>
            </section>

            <hr className="my-16 border-t border-rule" />

            <section aria-labelledby="appraisal-heading">
              <h2
                id="appraisal-heading"
                className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.15]"
              >
                {a.original ? "Critical appraisal" : "Article"}
              </h2>
              <div className="mt-8">
                <Mdx source={file.body} />
              </div>
            </section>
          </div>

          {/* ---- sidebar ---- */}
          <aside className="lg:sticky lg:top-(--header-h) lg:self-start">
            {a.strengths.length > 0 && (
              <div className="border-t-2 border-accent pt-5">
                <h2 className="eyebrow eyebrow-accent">Strengths</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {a.strengths.map((s) => (
                    <li
                      key={s}
                      className="border-l border-gold pl-4 text-[0.875rem] leading-relaxed text-ink-60"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {a.limitations.length > 0 && (
              <div className="mt-10 border-t border-rule pt-5">
                <h2 className="eyebrow">Limitations</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {a.limitations.map((l) => (
                    <li
                      key={l}
                      className="border-l border-rule-strong pl-4 text-[0.875rem] leading-relaxed text-ink-60"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {a.takeaways.length > 0 && (
              <div className="mt-10 border-t border-rule pt-5">
                <h2 className="eyebrow">Takeaways</h2>
                <ol className="mt-4 flex flex-col gap-4">
                  {a.takeaways.map((t, i) => (
                    <li key={t} className="flex gap-4">
                      <span className="shrink-0 text-[0.75rem] font-medium text-gold-ink tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.875rem] leading-relaxed text-ink">
                        {t}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <Link
              href="/journal-club"
              transitionTypes={["nav-back"]}
              className="mt-10 inline-block border border-rule px-4 py-2.5 text-[0.6875rem] font-medium tracking-[0.14em] text-ink-60 uppercase transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              All articles
            </Link>
          </aside>
        </div>
      </div>

      {/* ---- references ---- */}
      {a.references.length > 0 && (
        <section aria-labelledby="refs-heading" className="defer-paint border-t border-rule">
          <div className="mx-auto max-w-[1200px] px-gutter py-16 md:py-20">
            <h2 id="refs-heading" className="eyebrow">
              References
            </h2>
            <ol className="mt-8 max-w-[80ch] list-none">
              {a.references.map((r, i) => (
                <li
                  key={`${r.title}-${i}`}
                  className="border-t border-rule py-5 text-[0.875rem] leading-relaxed text-ink-60"
                >
                  <span className="mr-3 text-ink-40 tabular-nums">
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
          </div>
        </section>
      )}

      {/* ---- prev / next ---- */}
      <nav
        aria-label="More articles"
        className="defer-paint border-t border-rule bg-surface no-print"
      >
        <div className="mx-auto grid max-w-[1200px] gap-px px-gutter sm:grid-cols-2">
          {older ? (
            <Link
              href={`/journal-club/${older.slug}`}
              transitionTypes={["nav-back"]}
              className="group block py-10 transition-colors duration-200 sm:pr-8"
            >
              <p className="eyebrow">
                <span aria-hidden>←</span> {older.displayDate}
              </p>
              <p className="mt-4 max-w-[34ch] font-display text-[1.25rem] leading-[1.25] text-ink transition-colors duration-200 group-hover:text-accent">
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
              className="group block py-10 transition-colors duration-200 sm:pl-8 sm:text-right"
            >
              <p className="eyebrow">
                {newer.displayDate} <span aria-hidden>→</span>
              </p>
              <p className="mt-4 ml-auto max-w-[34ch] font-display text-[1.25rem] leading-[1.25] text-ink transition-colors duration-200 group-hover:text-accent">
                {newer.title}
              </p>
            </Link>
          )}
        </div>
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
