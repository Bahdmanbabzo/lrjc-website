import type { Metadata } from "next";
import Link from "next/link";
import { ArticleRow } from "@/components/article-row";
import { PageHeader } from "@/components/editorial";
import { getArticleYears, getArticlesByYear } from "@/lib/content";
import { journalProcess } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal Club",
  description:
    "A permanent archive of the LASUSMA Research & Journal Club's monthly critical appraisals and reviews of contemporary medical literature.",
};

export default async function JournalClubPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year: yearParam } = await searchParams;
  const years = await getArticleYears();

  const activeYear = yearParam ? Number(yearParam) : null;
  const articles =
    activeYear === null
      ? (await Promise.all(years.map((y) => getArticlesByYear(y)))).flat()
      : await getArticlesByYear(activeYear);

  const total = articles.length;
  const disciplines = [...new Set(articles.map((a) => a.discipline))].sort();

  return (
    <>
      <PageHeader
        eyebrow="Monthly discussions"
        title="The Journal Club"
        lede="Each month the club reads, discusses and writes — appraisals of a contemporary paper, and reviews of the topics shaping medicine in Nigeria. What follows is a permanent, citable record of that work: our summary, our analysis, and the takeaways we carry forward."
        meta={[
          { label: "Articles", value: String(total) },
          { label: "Years", value: String(years.length || 1) },
          { label: "Disciplines", value: String(disciplines.length || 1) },
          { label: "Cadence", value: "Monthly" },
        ]}
      />

      <div className="mx-auto max-w-[1200px] px-gutter">
        {/* Year filter — plain links with a query param, so the archive
            stays indexable and needs no client-side filtering. */}
        <nav aria-label="Filter by year" className="pt-12 md:pt-16">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <li>
              <Link
                href="/journal-club"
                className={`link-underline text-[0.8125rem] ${
                  activeYear === null ? "text-accent" : "text-ink-60"
                }`}
              >
                All years
              </Link>
            </li>
            {years.map((y) => (
              <li key={y}>
                <Link
                  href={`/journal-club?year=${y}`}
                  className={`link-underline text-[0.8125rem] tabular-nums ${
                    activeYear === y ? "text-accent" : "text-ink-60"
                  }`}
                >
                  {y}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section className="mx-auto max-w-[1200px] px-gutter pt-14 md:pt-20">
        {total === 0 ? (
          <div className="border-t border-rule py-20">
            <p className="font-display text-2xl text-ink">
              No articles for {activeYear ?? "this year"}.
            </p>
            <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-60">
              The next article has not been published yet. In the
              meantime, the annual journal collects our completed work.
            </p>
            <Link
              href="/annual-journal"
              className="link-underline mt-7 inline-block text-sm text-accent"
            >
              Browse the annual journal →
            </Link>
          </div>
        ) : (
          <ul className="hairline-list border-t border-rule">
            {articles.map((a) => (
              <ArticleRow key={a.slug} article={a} headingLevel={2} />
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto max-w-[1200px] px-gutter py-28 md:py-36">
        <div className="border-t border-rule pt-16">
          <p className="eyebrow eyebrow-accent">How a session works</p>
          <h2 className="mt-5 max-w-[18ch] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1]">
            From a published paper to a published appraisal.
          </h2>
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {journalProcess.map((step) => (
              <li key={step.number}>
                <p className="text-[0.75rem] font-medium text-gold tabular-nums">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-xl text-ink">{step.verb}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-60">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
