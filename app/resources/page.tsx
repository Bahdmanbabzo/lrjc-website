import type { Metadata } from "next";
import { ArrowLink, PageHeader } from "@/components/editorial";
import { getPublishedArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Critical appraisal checklists, reporting guidelines, literature-search tools and recommended software for medical student research.",
};

const toolkits = [
  {
    name: "CASP checklists",
    body: "The Critical Appraisal Skills Programme checklists — the appraisal tools we use in session for diagnostic, cohort, RCT and qualitative designs.",
    href: "https://casponline.net/",
    note: "External",
  },
  {
    name: "Cochrane Handbook",
    body: "The reference standard for systematic review methodology, including risk-of-bias assessment and GRADE. Free to read online.",
    href: "https://training.cochrane.org/handbook",
    note: "External",
  },
  {
    name: "EQUATOR Network",
    body: "Every major reporting guideline in one index — CONSORT, STROBE, PRISMA, ARRIVE, TRIPOD, STARD and others, with extensions.",
    href: "https://www.equator-network.org/reporting-guidelines/",
    note: "External",
  },
  {
    name: "JBI Manual",
    body: "Chapter-by-chapter guidance for the main evidence synthesis designs, with worked examples.",
    href: "https://www.jbi.global/",
    note: "External",
  },
  {
    name: "GRADE Working Group",
    body: "How certainty of evidence is rated, and how that rating should change what you do.",
    href: "https://www.gradeworkinggroup.org/",
    note: "External",
  },
  {
    name: "ICMJE Recommendations",
    body: "Authorship, duplicate publication, conflicts of interest and other publication ethics. Required reading before any submission.",
    href: "https://www.icmje.org/recommendations/",
    note: "External",
  },
];

const search = [
  {
    name: "PubMed",
    body: "The default biomedical literature search. Learn the field-tag syntax and MeSH filters before anything else.",
    href: "https://pubmed.ncbi.nlm.nih.gov/",
  },
  {
    name: "PubMed Central",
    body: "Free full text for a large share of the biomedical literature, including much that is not otherwise open access.",
    href: "https://www.ncbi.nlm.nih.gov/pmc/",
  },
  {
    name: "ClinicalTrials.gov",
    body: "Registered trial protocols. Checking whether a trial was pre-registered, and whether the outcome matches the registration, is a basic appraisal step.",
    href: "https://clinicaltrials.gov/",
  },
  {
    name: "Cochrane Library",
    body: "Systematic reviews, with the underlying study data and risk-of-bias assessments.",
    href: "https://www.cochranelibrary.com/",
  },
  {
    name: "Unpaywall",
    body: "Finds an open-access copy of an article when the publisher's version is paywalled. Works as a browser extension.",
    href: "https://unpaywall.org/",
  },
  {
    name: "Semantic Scholar",
    body: "Useful for citation-graph exploration — which papers cite a work, and what has cited it since.",
    href: "https://www.semanticscholar.org/",
  },
];

const software = [
  {
    name: "Zotero",
    body: "Reference manager with browser connector and Word plugin. Free, and it stores the PDF with its metadata so your library stays usable offline.",
    href: "https://www.zotero.org/",
  },
  {
    name: "Rayyan",
    body: "Collaborative screening for systematic reviews, with a blinded mode for two independent screeners.",
    href: "https://www.rayyan.ai/",
  },
  {
    name: "R (RStudio)",
    body: "The default for statistical analysis in the biomedical sciences. Start with the tidyverse.",
    href: "https://posit.co/download/r-studio/",
  },
  {
    name: "Python",
    body: "Necessary for image analysis, natural-language processing and most machine-learning work.",
    href: "https://www.python.org/",
  },
  {
    name: "SPSS / JASP / Jamovi",
    body: "Point-and-click statistics. Reasonable for a first analysis; know what your test assumes before running it.",
    href: "https://www.jamovi.org/download.html",
  },
  {
    name: "OSF",
    body: "Free project hosting with version control and pre-registration for preregistration.",
    href: "https://osf.io/",
  },
];

const statistics = [
  "Distinguish the null hypothesis from the point of equivalence. Absence of evidence is not evidence of absence.",
  "Confidence intervals are more informative than p-values, and the width of the interval is a finding in itself.",
  "Every test assumes something. Write the assumption down before you look at the p-value.",
  "Multiple comparisons inflate false positives. If you ran twenty comparisons, your nominal 5% threshold is roughly 64%.",
  "A statistically significant result from a large enough study is nearly guaranteed and may be clinically irrelevant.",
];

export default async function ResourcesPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PageHeader
        eyebrow="Open resources"
        title="Resources"
        lede="The appraisal checklists, reporting guidelines, search tools and software we use. Everything here is free, and most of it is the standard reference rather than our own recommendation."
      />

      {/* ---- critical appraisal ---- */}
      <section aria-labelledby="appraisal-heading" className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
          <div>
            <p className="eyebrow eyebrow-accent">01</p>
            <h2 id="appraisal-heading" className="mt-5 text-[1.625rem] leading-[1.2]">
              Critical appraisal &amp; methodology
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {toolkits.map((t) => (
              <li key={t.name} className="border-t border-rule pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.125rem] leading-snug text-ink">{t.name}</h3>
                  <span className="shrink-0 text-[0.625rem] tracking-[0.12em] text-ink-40 uppercase">
                    {t.note}
                  </span>
                </div>
                <p className="mt-2.5 max-w-[42ch] text-[0.875rem] leading-relaxed text-ink-60">
                  {t.body}
                </p>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-3 inline-block text-[0.8125rem] text-accent"
                >
                  Visit <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- literature search ---- */}
      <section aria-labelledby="search-heading" className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-accent">02</p>
              <h2 id="search-heading" className="mt-5 text-[1.625rem] leading-[1.2]">
                Literature search
              </h2>
            </div>
            <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {search.map((t) => (
                <li key={t.name} className="border-t border-rule pt-6">
                  <h3 className="text-[1.125rem] leading-snug text-ink">{t.name}</h3>
                  <p className="mt-2.5 max-w-[42ch] text-[0.875rem] leading-relaxed text-ink-60">
                    {t.body}
                  </p>
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-3 inline-block text-[0.8125rem] text-accent"
                  >
                    Visit <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- software ---- */}
      <section aria-labelledby="software-heading" className="border-t border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-accent">03</p>
              <h2 id="software-heading" className="mt-5 text-[1.625rem] leading-[1.2]">
                Software &amp; tools
              </h2>
            </div>
            <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {software.map((t) => (
                <li key={t.name} className="border-t border-rule pt-6">
                  <h3 className="text-[1.125rem] leading-snug text-ink">{t.name}</h3>
                  <p className="mt-2.5 max-w-[42ch] text-[0.875rem] leading-relaxed text-ink-60">
                    {t.body}
                  </p>
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-3 inline-block text-[0.8125rem] text-accent"
                  >
                    Visit <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- statistics notes ---- */}
      <section aria-labelledby="stats-heading" className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-accent">04</p>
              <h2 id="stats-heading" className="mt-5 text-[1.625rem] leading-[1.2]">
                Five things we keep saying
              </h2>
            </div>
            <ol className="max-w-[62ch] list-none">
              {statistics.map((s, i) => (
                <li
                  key={s}
                  className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-rule py-6"
                >
                  <span className="text-[0.75rem] font-medium text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-60">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- club resources ---- */}
      <section aria-labelledby="club-heading" className="border-t border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-accent">05</p>
              <h2 id="club-heading" className="mt-5 text-[1.625rem] leading-[1.2]">
                Our own material
              </h2>
            </div>
            <div className="max-w-[62ch]">
              <p className="text-[0.9375rem] leading-relaxed text-ink-60">
                Everything the club has published is a worked example of a
                structured critical review. Reading them in order is the most
                useful preparation for a first session, and several members have
                said it is the only reading that made the method click.
              </p>
              <div className="mt-10">
                <ArrowLink href="/journal-club">
                  Read the archive ({articles.length} articles)
                </ArrowLink>
              </div>

              <div className="mt-16 border-t border-rule pt-10">
                <h3 className="text-[0.8125rem] font-medium tracking-[0.14em] text-ink uppercase">
                  Session format
                </h3>
                <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow">When</dt>
                    <dd className="mt-2 text-[0.875rem] text-ink-60">
                      Monthly, during the Wednesday clinical meeting
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Where</dt>
                    <dd className="mt-2 text-[0.875rem] text-ink-60">
                      College of Medicine seminar room
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Who</dt>
                    <dd className="mt-2 text-[0.875rem] text-ink-60">
                      All years, all disciplines. No prior experience assumed.
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Bring</dt>
                    <dd className="mt-2 text-[0.875rem] text-ink-60">
                      The paper, and one sentence on what you think it shows
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
