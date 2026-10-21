import Link from "next/link";
import type { Article } from "@/content/schema";

/**
 * An archive row: month, discipline, title, citation. Hairline separated,
 * with a READ affordance that appears on hover. The entire row is one link.
 *
 * `headingLevel` keeps the document outline valid: on the archive the row
 * titles sit directly under the page h1 (pass 2), while on the homepage they
 * sit under the "Recent appraisals" h2 (pass 3, the default).
 */
export function ArticleRow({
  article,
  headingLevel = 3,
}: {
  article: Article;
  headingLevel?: 2 | 3;
}) {
  const [year, month] = article.date.split("-");
  const monthLabel = MONTHS[Number(month) - 1] ?? "";
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <li>
      <Link
        href={`/journal-club/${article.slug}`}
        className="group grid grid-cols-1 gap-x-8 gap-y-3 py-8 transition-colors duration-200 sm:grid-cols-[7rem_1fr_auto] sm:items-baseline md:py-10"
      >
        <div className="flex items-baseline gap-3 sm:block">
          <p className="text-[0.75rem] font-medium tracking-[0.12em] text-ink uppercase tabular-nums">
            {monthLabel}
          </p>
          <p className="text-[0.75rem] text-ink-40 tabular-nums sm:mt-1">
            {year}
          </p>
        </div>

        <div>
          <Heading className="max-w-[46ch] font-display text-[1.5rem] leading-[1.2] text-ink transition-colors duration-200 group-hover:text-accent md:text-[1.75rem]">
            {article.title}
          </Heading>
          <p className="mt-2.5 text-[0.8125rem] text-ink-60">
            {article.original ? (
              <>
                <span className="italic">{article.original.journal}</span>
                <span className="text-ink-40"> · {article.original.year}</span>
                <span className="text-ink-40"> · {article.discipline}</span>
              </>
            ) : (
              <>
                <span>
                  {article.contributors.length > 0
                    ? article.contributors.join(", ")
                    : "LASUMSA Research & Journal Club"}
                </span>
                <span className="text-ink-40"> · {article.discipline}</span>
              </>
            )}
          </p>
        </div>

        <p
          aria-hidden
          className="flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.14em] text-accent uppercase opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:self-center"
        >
          Read
          <span aria-hidden>→</span>
        </p>
      </Link>
    </li>
  );
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export { MONTHS };
