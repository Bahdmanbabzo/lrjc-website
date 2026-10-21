import Link from "next/link";
import { journalProcess } from "@/lib/site";

export function YearFilter({
  years,
  activeYear,
}: {
  years: number[];
  activeYear: number | null;
}) {
  return (
    <nav aria-label="Filter by year" className="pt-12 md:pt-16">
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
        <li>
          <Link
            href="/journal-club"
            transitionTypes={["nav-back"]}
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
              href={`/journal-club/year/${y}`}
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
  );
}

export function JournalClubProcess() {
  return (
    <section className="mx-auto max-w-[1200px] px-gutter py-28 md:py-36">
      <div className="border-t border-rule pt-16">
        <p className="eyebrow eyebrow-accent">How a session works</p>
        <h2 className="mt-5 max-w-[18ch] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1]">
          From a published paper to a published appraisal.
        </h2>
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {journalProcess.map((step) => (
            <li key={step.number}>
              <p className="text-[0.75rem] font-medium text-gold-ink tabular-nums">
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
  );
}
