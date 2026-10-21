import type { Metadata } from "next";
import Link from "next/link";
import { ArticleRow } from "@/components/article-row";
import { PageHeader } from "@/components/editorial";
import {
  JournalClubProcess,
  YearFilter,
} from "@/components/journal-club-archive";
import { PageTransition } from "@/components/page-transition";
import { getArticleYears, getPublishedArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal Club",
  description:
    "A permanent archive of the LASUMSA Research & Journal Club's monthly critical appraisals and reviews of contemporary medical literature.",
};

export default async function JournalClubPage() {
  const [articles, years] = await Promise.all([
    getPublishedArticles(),
    getArticleYears(),
  ]);

  const total = articles.length;
  const disciplines = [...new Set(articles.map((a) => a.discipline))].sort();

  return (
    <PageTransition>
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
        <YearFilter years={years} activeYear={null} />
      </div>

      <section className="mx-auto max-w-[1200px] px-gutter pt-14 md:pt-20">
        {total === 0 ? (
          <div className="border-t border-rule py-20">
            <p className="font-display text-2xl text-ink">
              No articles have been published yet.
            </p>
            <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-60">
              The next article has not been published yet. In the meantime, the
              annual journal collects our completed work.
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

      <JournalClubProcess />
    </PageTransition>
  );
}
