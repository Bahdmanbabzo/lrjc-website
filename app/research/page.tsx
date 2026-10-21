import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink, PageHeader } from "@/components/editorial";
import { PageTransition } from "@/components/page-transition";
import {
  opportunities,
  presentations,
  projects,
  publications,
} from "@/lib/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research produced by members of the LASUMSA Research & Journal Club: ongoing projects, publications, conference presentations and opportunities to join.",
};

const STATUS_TONE: Record<string, string> = {
  Ongoing: "border-accent text-accent",
  "In analysis": "border-rule-strong text-ink-60",
  Completed: "border-gold text-gold-ink",
  Recruiting: "border-accent text-accent",
};

export default function ResearchPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Member research"
        title="Research"
        lede="The journal club reads other people’s work. This is where we produce our own. Below are the studies our members are running, what they have published and presented, and where you can join one."
        meta={[
          { label: "Active projects", value: String(projects.length) },
          { label: "Publications", value: String(publications.length) },
          { label: "Presentations", value: String(presentations.length) },
          { label: "Open to join", value: "Yes" },
        ]}
      />

      {/* ---- projects ---- */}
      <section aria-labelledby="projects-heading" className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow eyebrow-accent">Projects</p>
            <h2 id="projects-heading" className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]">
              Ongoing and completed work
            </h2>
          </div>
          <p className="max-w-[30ch] text-[0.875rem] leading-relaxed text-ink-60">
            Hover a project for its method and outputs.
          </p>
        </div>

        <ol className="mt-14 list-none border-t border-rule">
          {projects.map((p, i) => (
            <li key={p.id} className="border-b border-rule">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start gap-6 py-8 md:py-10 [&::-webkit-details-marker]:hidden">
                  <span className="mt-1.5 shrink-0 text-[0.75rem] font-medium text-gold-ink tabular-nums transition-transform duration-300 group-open:translate-x-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-display text-[1.5rem] leading-tight text-ink md:text-[1.75rem]">
                        {p.title}
                      </span>
                      <span
                        className={`border px-2 py-0.5 text-[0.625rem] font-medium tracking-[0.12em] uppercase ${STATUS_TONE[p.status]}`}
                      >
                        {p.status}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[0.9375rem] text-ink-60">
                      {p.subtitle}
                      <span className="text-ink-40">
                        {" "}
                        · {p.discipline} · {p.year}
                      </span>
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="mt-2 hidden shrink-0 text-ink-40 transition-transform duration-300 group-open:rotate-45 sm:block"
                  >
                    +
                  </span>
                </summary>

                <div className="pb-10 md:pl-14">
                  <div className="grid gap-8 md:grid-cols-[1fr_18rem] md:gap-14">
                    <div>
                      <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-60">
                        {p.summary}
                      </p>
                      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                        <div>
                          <dt className="eyebrow">Method</dt>
                          <dd className="mt-2 text-[0.875rem] text-ink">{p.method}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow">Members</dt>
                          <dd className="mt-2 text-[0.875rem] text-ink">
                            {p.members.join(" · ")}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="eyebrow">Outputs</dt>
                          <dd className="mt-2 flex flex-col gap-1.5">
                            {p.outputs.map((o) => (
                              <span key={o} className="text-[0.875rem] text-ink-60">
                                {o}
                              </span>
                            ))}
                          </dd>
                        </div>
                      </dl>
                      {p.link && (
                        <div className="mt-8">
                          <ArrowLink href={p.link}>Read the publication</ArrowLink>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- publications ---- */}
      <section aria-labelledby="publications-heading" className="defer-paint border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <p className="eyebrow eyebrow-accent">Published</p>
          <h2
            id="publications-heading"
            className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]"
          >
            Publications
          </h2>

          <ul className="mt-14 list-none border-t border-rule">
            {publications.map((pub) => (
              <li key={pub.title} className="border-b border-rule">
                {pub.link ? (
                  <Link
                    href={pub.link}
                    className="group block py-7 transition-colors duration-200"
                  >
                    <p className="text-[0.8125rem] text-ink-40">
                      {pub.authors} · {pub.year}
                    </p>
                    <p className="mt-2 max-w-[62ch] font-display text-[1.25rem] leading-[1.25] text-ink transition-colors duration-200 group-hover:text-accent">
                      {pub.title}
                    </p>
                    <p className="mt-1.5 text-[0.875rem] text-ink-60">
                      <span className="italic">{pub.venue}</span>
                    </p>
                  </Link>
                ) : (
                  <div className="py-7">
                    <p className="text-[0.8125rem] text-ink-40">
                      {pub.authors} · {pub.year}
                    </p>
                    <p className="mt-2 max-w-[62ch] font-display text-[1.25rem] leading-[1.25] text-ink">
                      {pub.title}
                    </p>
                    <p className="mt-1.5 text-[0.875rem] text-ink-60">
                      <span className="italic">{pub.venue}</span>
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- presentations ---- */}
      <section aria-labelledby="presentations-heading" className="defer-paint border-t border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <p className="eyebrow eyebrow-accent">Presented</p>
          <h2
            id="presentations-heading"
            className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]"
          >
            Conference presentations
          </h2>

          <ul className="mt-14 list-none border-t border-rule">
            {presentations.map((p) => (
              <li
                key={p.title}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-7 md:grid-cols-[8rem_1fr_12rem] md:items-baseline"
              >
                <p className="text-[0.75rem] font-medium tracking-[0.1em] text-accent uppercase">
                  {p.type}
                </p>
                <div>
                  <p className="max-w-[54ch] font-display text-[1.25rem] leading-[1.25] text-ink">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] text-ink-60">{p.presenters}</p>
                </div>
                <p className="text-[0.875rem] text-ink-60 md:text-right">
                  {p.venue}
                  <span className="mt-1 block text-ink-40 tabular-nums">{p.when}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- opportunities ---- */}
      <section aria-labelledby="opportunities-heading" className="defer-paint border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <p className="eyebrow eyebrow-accent">Get involved</p>
          <h2
            id="opportunities-heading"
            className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]"
          >
            Ways to take part
          </h2>

          <ol className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-3">
            {opportunities.map((o, i) => (
              <li key={o.title} className="border-t border-rule pt-7">
                <p className="text-[0.75rem] font-medium text-gold-ink tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-[1.375rem] leading-[1.2]">{o.title}</h3>
                <p className="mt-3 text-[0.75rem] tracking-[0.1em] text-accent uppercase">
                  {o.commitment}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-60">
                  {o.body}
                </p>
                <p className="mt-5 border-l border-gold pl-4 text-[0.8125rem] leading-relaxed text-ink-40">
                  {o.suitedTo}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 border-t border-rule pt-12">
            <ArrowLink href="/contact">Ask about joining a project</ArrowLink>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
