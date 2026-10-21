import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink, PageHeader } from "@/components/editorial";
import { Mdx } from "@/components/mdx";
import { getIssue, getIssueYears } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  const years = await getIssueYears();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { year } = await params;
  const found = await getIssue(year);
  if (!found) return {};
  return {
    title: `Annual Journal — Volume ${found.issue.volume}, ${found.issue.year}`,
    description: found.issue.coverNote,
    alternates: { canonical: `/annual-journal/${found.issue.year}` },
  };
}

export default async function IssuePage({ params }: Params) {
  const { year } = await params;
  const found = await getIssue(year);
  if (!found) notFound();

  const { issue, entries } = found;

  // Preserve the order declared in issue.mdx, and group by section.
  const sections = [...new Set(entries.map((e) => e.section))].map((section) => ({
    section,
    items: entries.filter((e) => e.section === section),
  }));

  const contributors = [...new Set(entries.flatMap((e) => e.authors))];

  return (
    <>
      <PageHeader
        eyebrow={`Annual journal · Volume ${issue.volume}`}
        title={issue.title}
        lede={issue.coverNote}
        meta={[
          { label: "Volume", value: `Vol. ${issue.volume}` },
          { label: "Published", value: String(issue.year) },
          { label: "Contributions", value: String(entries.length) },
          { label: "Contributors", value: String(contributors.length) },
        ]}
      />

      {/* ---- cover ---- */}
      <section className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        <div className="mx-auto w-full max-w-[380px]">
          <div className="relative aspect-3/4 overflow-hidden border border-rule bg-paper p-9 shadow-[0_24px_50px_-28px_rgba(23,23,23,0.3)]">
            <div className="flex h-full flex-col">
              <p className="font-display text-[1.0625rem] tracking-[0.1em] text-ink">
                LASUSMA
              </p>
              <div aria-hidden className="my-2.5 h-px w-full bg-gold" />
              <p className="text-[0.4375rem] font-medium tracking-[0.18em] text-ink-60 uppercase">
                Research + Journal Club
              </p>

              <div className="relative my-auto py-8">
                <svg
                  viewBox="0 0 640 640"
                  className="w-[150%] -translate-x-[16%] text-accent opacity-40"
                  aria-hidden
                  focusable="false"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M320 96c104 0 190 84 190 190s-86 190-190 190-190-84-190-190 86-190 190-190z" opacity="0.3" />
                    <path d="M318 128c92-6 170 66 172 158 2 94-72 172-166 180-96 8-180-60-186-156-6-98 68-176 180-182z" opacity="0.4" />
                    <path d="M322 168c78-10 144 48 150 124 6 80-52 150-130 162-80 12-154-40-166-118-12-82 46-158 146-168z" opacity="0.5" />
                    <path d="M316 210c62-12 118 30 126 92 8 66-34 120-98 134-68 14-128-22-142-88-16-70 24-128 114-138z" opacity="0.6" />
                    <path d="M324 252c48-10 88 16 96 62 8 50-20 92-68 106-52 14-98-10-112-58-16-52 10-102 84-110z" opacity="0.7" />
                  </g>
                </svg>
              </div>

              <p className="text-[0.5625rem] font-medium tracking-[0.16em] text-accent uppercase">
                Annual Journal
              </p>
              <p className="mt-2 font-display text-[1.5rem] leading-tight text-ink">
                {issue.title}
              </p>
              <p className="mt-3 font-display text-[1.125rem] leading-none text-gold">
                Vol. {issue.volume} · {issue.year}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- contents ---- */}
      <section aria-labelledby="contents-heading" className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <h2 id="contents-heading" className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]">
            Contents
          </h2>

          <div className="mt-16">
            {sections.map((group, gi) => (
              <section key={group.section} className="mt-14 first:mt-0">
                <div className="flex items-baseline gap-5 border-b border-rule-strong pb-4">
                  <p className="text-[0.75rem] font-medium text-gold tabular-nums">
                    {String(gi + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-[0.8125rem] font-medium tracking-[0.14em] text-ink uppercase">
                    {group.section}
                  </h3>
                  <p className="ml-auto text-[0.75rem] text-ink-40 tabular-nums">
                    {group.items.length}{" "}
                    {group.items.length === 1 ? "article" : "articles"}
                  </p>
                </div>

                <ol className="list-none">
                  {group.items.map((e, i) => (
                    <li key={e.slug} className="border-b border-rule">
                      <article className="py-8">
                        <div className="flex items-baseline gap-4">
                          <p className="text-[0.75rem] text-ink-40 tabular-nums">
                            {String(gi + 1).padStart(2, "0")}.
                            {String(i + 1).padStart(2, "0")}
                          </p>
                          <div className="min-w-0">
                            <h4 className="max-w-[54ch] font-display text-[1.375rem] leading-[1.22] text-ink md:text-[1.5rem]">
                              {e.title}
                            </h4>
                            <p className="mt-2.5 text-[0.8125rem] text-ink-60">
                              {e.authors.join(", ")}
                              {e.pages && (
                                <span className="text-ink-40"> · pp. {e.pages}</span>
                              )}
                            </p>
                            <p className="mt-4 max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-60">
                              {e.abstract}
                            </p>
                            {e.keywords.length > 0 && (
                              <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
                                {e.keywords.map((k) => (
                                  <span
                                    key={k}
                                    className="border border-rule px-2 py-0.5 text-[0.6875rem] text-ink-40"
                                  >
                                    {k}
                                  </span>
                                ))}
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ---- editorial ---- */}
      <section aria-labelledby="editorial-heading" className="border-t border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="max-w-[68ch]">
            <p className="eyebrow eyebrow-accent">Editorial</p>
            <h2
              id="editorial-heading"
              className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1]"
            >
              {issue.editorialTitle ?? "Editorial"}
            </h2>
            {issue.editor && (
              <p className="mt-4 text-[0.875rem] text-ink-60">{issue.editor}</p>
            )}
            <div className="mt-10">
              <Mdx source={issue.editorialBody} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- contributors ---- */}
      <section aria-labelledby="contributors-heading" className="border-t border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-24">
          <h2
            id="contributors-heading"
            className="text-[0.8125rem] font-medium tracking-[0.14em] text-ink uppercase"
          >
            Contributors
          </h2>
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {contributors.map((name) => (
              <li
                key={name}
                className="font-display text-[1.25rem] text-ink"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-10 gap-y-6 px-gutter py-16">
          <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-60">
            How this issue&rsquo;s appraisals were developed, month by month, in
            the open.
          </p>
          <ArrowLink href="/journal-club">Read the journal club archive</ArrowLink>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Periodical",
            name: `${site.name} Annual Journal`,
            issn: undefined,
            volume: issue.volume,
            datePublished: issue.publishedAt,
            url: `${site.url}/annual-journal/${issue.year}`,
            publisher: { "@type": "Organization", name: site.name },
          }),
        }}
      />
    </>
  );
}
