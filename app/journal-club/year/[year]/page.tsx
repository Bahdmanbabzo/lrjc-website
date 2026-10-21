import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleRow } from "@/components/article-row";
import { PageHeader } from "@/components/editorial";
import {
  JournalClubProcess,
  YearFilter,
} from "@/components/journal-club-archive";
import { PageTransition } from "@/components/page-transition";
import {
  getArticleYears,
  getArticlesByYear,
  getPublishedArticles,
} from "@/lib/content";

type Params = { params: Promise<{ year: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const years = await getArticleYears();
  return years.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `Journal Club — ${year}`,
    description: `The ${year} archive of the LASUMSA Research & Journal Club's monthly critical appraisals and reviews of contemporary medical literature.`,
    alternates: { canonical: `/journal-club/year/${year}` },
  };
}

export default async function JournalClubYearPage({ params }: Params) {
  const { year } = await params;
  const yearNumber = Number(year);

  if (!Number.isInteger(yearNumber)) notFound();

  const [years, articles, allArticles] = await Promise.all([
    getArticleYears(),
    getArticlesByYear(yearNumber),
    getPublishedArticles(),
  ]);

  if (articles.length === 0) notFound();

  const disciplines = [...new Set(articles.map((a) => a.discipline))].sort();

  return (
    <PageTransition>
      <PageHeader
        eyebrow={`Monthly discussions · ${year}`}
        title="The Journal Club"
        lede="Each month the club reads, discusses and writes — appraisals of a contemporary paper, and reviews of the topics shaping medicine in Nigeria. What follows is a permanent, citable record of that work: our summary, our analysis, and the takeaways we carry forward."
        meta={[
          { label: "Articles", value: String(articles.length) },
          { label: "Years", value: String(years.length || 1) },
          { label: "Disciplines", value: String(disciplines.length || 1) },
          { label: "Cadence", value: "Monthly" },
        ]}
      />

      <div className="mx-auto max-w-[1200px] px-gutter">
        <YearFilter years={years} activeYear={yearNumber} />
      </div>

      <section className="mx-auto max-w-[1200px] px-gutter pt-14 md:pt-20">
        <ul className="hairline-list border-t border-rule">
          {articles.map((a) => (
            <ArticleRow key={a.slug} article={a} headingLevel={2} />
          ))}
        </ul>
      </section>

      {allArticles.length > articles.length && (
        <section className="mx-auto max-w-[1200px] px-gutter pt-16">
          <Link
            href="/journal-club"
            transitionTypes={["nav-back"]}
            className="link-underline text-[0.8125rem] text-accent"
          >
            View the whole archive
          </Link>
        </section>
      )}

      <JournalClubProcess />
    </PageTransition>
  );
}
