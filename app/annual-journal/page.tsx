import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink, PageHeader } from "@/components/editorial";
import { getIssues } from "@/lib/content";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Annual Journal",
  description:
    "The annual journal of the LASUMSA Research & Journal Club: original research, reviews, case reports, commentaries and student perspectives.",
};

export default async function AnnualJournalIndexPage() {
  const issues = await getIssues();

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Annual journal"
        title="Collected volumes"
        lede="Once a year we gather the year’s completed work into a single issue — original research, reviews, commentaries and student perspectives. Each volume is given a permanent address and remains citable."
      />

      <section className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        {issues.length === 0 ? (
          <p className="font-display text-2xl text-ink">
            The first volume is in preparation.
          </p>
        ) : (
          <ul className="hairline-list">
            {issues.map(({ issue, entries }) => (
              <li key={issue.year}>
                <Link
                  href={`/annual-journal/${issue.year}`}
                  className="group grid grid-cols-1 gap-x-8 gap-y-6 py-10 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:py-14"
                >
                  <div>
                    <p className="font-display text-[1.75rem] leading-none text-gold-ink">
                      Vol. {issue.volume}
                    </p>
                    <p className="eyebrow mt-3">{issue.year}</p>
                  </div>

                  <div>
                    <h2 className="max-w-[24ch] font-display text-[clamp(1.5rem,3vw,2.125rem)] leading-[1.12] text-ink transition-colors duration-200 group-hover:text-accent">
                      {issue.title}
                    </h2>
                    {issue.theme && (
                      <p className="mt-3 text-[0.875rem] text-ink-60">
                        {issue.theme}
                      </p>
                    )}
                    <p className="mt-4 text-[0.8125rem] text-ink-40">
                      {entries.length}{" "}
                      {entries.length === 1 ? "contribution" : "contributions"}
                    </p>
                  </div>

                  <p
                    aria-hidden
                    className="flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.14em] text-accent uppercase opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:self-center"
                  >
                    Open
                    <span aria-hidden>→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20 border-t border-rule pt-12">
          <ArrowLink href="/journal-club">See how each issue was developed</ArrowLink>
        </div>
      </section>
    </PageTransition>
  );
}
