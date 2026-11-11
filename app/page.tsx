import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/editorial";
import { HeroFigure } from "@/components/hero-figure";
import { PageTransition } from "@/components/page-transition";
import { getArticleYears, getIssues, getPublishedArticles } from "@/lib/content";
import { pillars, site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
};

export default async function HomePage() {
  const [articles, years, issues] = await Promise.all([
    getPublishedArticles(),
    getArticleYears(),
    getIssues(),
  ]);

  const latest = articles[0] ?? null;
  const allArticles = articles.slice(0, 3);

  const issue = issues[0];
  const stats = [
    { value: String(years.length || 1), label: "Years of reviews" },
    { value: String(articles.length), label: "Published reviews" },
    { value: String(issues.length || 1), label: "Annual volume" },
    { value: "12", label: "Sessions per year" },
  ];

  return (
    <PageTransition>
      {/* ---------------- hero ---------------- */}
      <section className="hero-atmosphere relative overflow-hidden">
        <HeroFigure className="pointer-events-none absolute top-1/2 right-[-18%] w-[min(760px,105vw)] -translate-y-1/2 text-accent opacity-[0.55] select-none max-lg:right-[-40%] max-lg:top-24 max-lg:w-[560px] max-lg:translate-y-0 max-lg:opacity-30" />

        <div className="relative mx-auto max-w-[1200px] px-gutter pt-24 pb-20 md:pt-40 md:pb-32">
          <p className="eyebrow eyebrow-accent">
            Lagos State University College of Medicine
          </p>

          <h1 className="mt-8 max-w-[15ch] text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[0.98] text-ink">
            Building a culture of{" "}
            <span className="text-accent">evidence</span>, inquiry &amp; research.
          </h1>

          <p className="mt-9 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-60">
            A student-led platform for critical appraisal, scientific discussion,
            research development and scholarly communication.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-5">
            <ArrowLink href="/journal-club">Explore the journal club</ArrowLink>
            <ArrowLink href="/about" tone="ink">
              About us
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* ---------------- this month ---------------- */}
      {latest && (
        <section aria-labelledby="latest-heading" className="border-t border-rule bg-surface">
          <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
            <p className="eyebrow eyebrow-accent" id="latest-heading">
              This month
            </p>

            <Link
              href={`/journal-club/${latest.slug}`}
              className="group mt-10 grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-20"
            >
              <div>
                <p className="text-[0.75rem] font-medium tracking-[0.12em] text-ink uppercase tabular-nums">
                  {latest.displayDate}
                </p>
                <h2 className="mt-5 max-w-[22ch] font-semibold text-[clamp(1.875rem,4vw,3rem)] leading-[1.08] text-accent transition-colors duration-200 group-hover:text-ink">
                  {latest.title}
                </h2>
                <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-60">
                  {latest.summary}
                </p>
                <p className="mt-7 text-[0.8125rem] text-ink-60">
                  {latest.original ? (
                    <>
                      <span className="italic">{latest.original.journal}</span>
                      <span className="text-ink-40">
                        {" "}
                        · {latest.original.year} · {latest.discipline}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {latest.contributors.length > 0
                          ? latest.contributors.join(", ")
                          : "LASUMSA Research & Journal Club"}
                      </span>
                      <span className="text-ink-40"> · {latest.discipline}</span>
                    </>
                  )}
                </p>
                <p
                  aria-hidden
                  className="mt-9 inline-flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.14em] text-accent uppercase"
                >
                  Read the review
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </p>
              </div>

              {/* Large numeral instead of an image — typographic hierarchy over stock photography. */}
              <div className="hidden lg:block">
                <p
                  aria-hidden
                  className="text-right font-display text-[7rem] leading-none text-gold-40 tabular-nums"
                >
                  {String(new Date(latest.date).getMonth() + 1).padStart(2, "0")}
                </p>
                <p className="eyebrow mt-4 text-right">
                  {new Date(latest.date).getFullYear()}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ---------------- what we do ---------------- */}
      <section aria-labelledby="pillars-heading" className="defer-paint border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-accent" id="pillars-heading">
              What we do
            </p>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] text-accent">
              Four things we hold ourselves to.
            </h2>
          </div>

          <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {pillars.map((p) => (
              <li key={p.number} className="border-t border-rule pt-7">
                <p className="text-[0.75rem] font-medium text-gold-ink tabular-nums">
                  {p.number}
                </p>
                <h3 className="mt-5 text-[1.625rem] leading-[1.15] text-accent">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-60">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- archive table ---------------- */}
      <section aria-labelledby="archive-heading" className="defer-paint border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow eyebrow-accent" id="archive-heading">
                From the journal club
              </p>
              <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08] text-accent">
                Recent reviews
              </h2>
            </div>
            <ArrowLink href="/journal-club">Full archive</ArrowLink>
          </div>

          {/* Column header */}
          <div className="mt-14 hidden grid-cols-[8rem_1fr_10rem] gap-8 border-b border-rule pb-3 sm:grid">
            <p className="eyebrow">Month</p>
            <p className="eyebrow">Article</p>
            <p className="eyebrow">Topic</p>
          </div>

          <ul>
            {allArticles.map((a) => {
              const d = new Date(a.date);
              return (
                <li key={a.slug} className="border-b border-rule">
                  <Link
                    href={`/journal-club/${a.slug}`}
                    className="group grid grid-cols-1 gap-x-8 gap-y-2 py-7 transition-colors duration-200 sm:grid-cols-[8rem_1fr_10rem] sm:items-baseline"
                  >
                    <p className="text-[0.75rem] font-medium tracking-[0.1em] text-ink uppercase tabular-nums">
                      {d.toLocaleString("en-GB", { month: "short" })}{" "}
                      <span className="text-ink-40">{d.getFullYear()}</span>
                    </p>
                    <p className="max-w-[52ch] font-display text-[1.25rem] font-semibold leading-[1.25] text-accent transition-colors duration-200 group-hover:text-ink">
                      {a.title}
                    </p>
                    <p className="text-[0.8125rem] text-ink-60 sm:text-right">
                      {a.discipline}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- annual journal ---------------- */}
      {issue && (
        <section aria-labelledby="journal-heading" className="defer-paint border-t border-rule bg-surface-raised">
          <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
            <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
              <div>
                <p className="eyebrow eyebrow-accent" id="journal-heading">
                  Annual journal
                </p>
                <h2 className="mt-5 max-w-[16ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] text-accent">
                  Volume {issue.issue.volume} · {issue.issue.year}
                </h2>
                <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-60">
                  {issue.issue.coverNote}
                </p>
                <div className="mt-10">
                  <ArrowLink href={`/annual-journal/${issue.issue.year}`}>
                    Explore the journal
                  </ArrowLink>
                </div>
              </div>

              {/* The cover, rendered as a physical object. */}
              <div className="mx-auto w-full max-w-[300px] lg:max-w-[320px]">
                <Link
                  href={`/annual-journal/${issue.issue.year}`}
                  className="group block"
                  aria-label={`Open Volume ${issue.issue.volume}, ${issue.issue.year}`}
                >
                  <div className="relative aspect-3/4 overflow-hidden border border-cover-rule bg-journal-cover p-7 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex h-full flex-col">
                      <p className="font-display text-[0.9375rem] font-bold tracking-[0.1em] text-cover-ink">
                        LASUMSA
                      </p>
                      <div aria-hidden className="my-2 h-px w-full bg-gold" />
                      <p className="text-[0.4375rem] font-medium tracking-[0.18em] text-cover-muted uppercase">
                        Research + Journal Club
                      </p>

                      <div className="relative my-auto flex items-center justify-center py-6">
                        <HeroFigure className="w-[135%] text-cover-accent opacity-45" />
                      </div>

                      <p className="text-[0.5625rem] font-medium tracking-[0.16em] text-cover-accent uppercase">
                        Annual Journal
                      </p>
                      <p className="mt-1.5 font-display text-[1.375rem] font-bold leading-none text-cover-gold-ink">
                        Vol. {issue.issue.volume} · {issue.issue.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- stats ---------------- */}
      <section aria-label="Club in numbers" className="defer-paint border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-16 md:py-20">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="eyebrow">{s.label}</dt>
                <dd className="mt-3 font-display text-[2.75rem] leading-none text-accent tabular-nums">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageTransition>
  );
}
