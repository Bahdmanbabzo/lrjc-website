import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial";
import { journalProcess, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const objectives = [
  "Develop the capacity to critically appraise medical literature independently and rigorously.",
  "Build practical research skills — study design, data collection, analysis and scientific writing.",
  "Create a forum in which questions about evidence can be asked without penalty.",
  "Produce a permanent, citable record of student scholarly work.",
  "Connect students across disciplines, years and institutions who are interested in research.",
];

const values = [
  {
    title: "Precision over confidence",
    body: "We would rather say ‘this study does not establish that’ than imply a certainty we cannot support. Much of what is misread in medicine begins as an overstatement that nobody had time to check.",
  },
  {
    title: "Methods are part of the finding",
    body: "A result is inseparable from the design that produced it. We teach the design alongside the conclusion, always.",
  },
  {
    title: "Openness",
    body: "Our appraisals are published in full, including where the paper is strong, and including where we changed our minds.",
  },
  {
    title: "Access",
    body: "No prior research experience is assumed. The club exists to make research participation normal rather than exceptional.",
  },
];

const team = [
  {
    name: "O. Eze",
    role: "President",
    bio: "Final-year student. Leads the research programme and the neuro-oncology working group.",
  },
  {
    name: "A. Balogun",
    role: "Vice-President · Research Lead",
    bio: "Coordinates project supervision and the annual journal's editorial process.",
  },
  {
    name: "F. Adeyemi",
    role: "Secretary",
    bio: "Maintains the appraisal archive and coordinates monthly sessions.",
  },
  {
    name: "N. Bello",
    role: "Publications Officer",
    bio: "Oversees manuscript preparation, the annual volume, and external presentation.",
  },
  {
    name: "T. Okafor",
    role: "Technical Lead",
    bio: "Maintains the analytical pipeline and the research data infrastructure.",
  },
];

const milestones = [
  {
    year: "2025",
    text: "Formed as a reading group of six students meeting fortnightly in the College of Medicine library.",
  },
  {
    year: "2026",
    text: "Began publishing written appraisals of every session, and launched the first annual journal volume.",
  },
  {
    year: "2026",
    text: "First member research projects established, including the segmentation and infectious disease working groups.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the club"
        title="A student community built around evidence."
        lede="The LASUSMA Research & Journal Club is a student-led body at Lagos State University College of Medicine. We meet monthly to appraise the medical literature, we run our own research projects, and we publish both."
      />

      {/* ---- mission ---- */}
      <section aria-labelledby="mission-heading" className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
          <h2 id="mission-heading" className="text-[0.8125rem] font-medium tracking-[0.14em] text-ink uppercase">
            Our mission
          </h2>
          <div className="max-w-[62ch]">
            <p className="text-[clamp(1.25rem,2.5vw,1.625rem)] leading-[1.45] text-ink">
              To make the critical evaluation of medical evidence an ordinary
              skill among our students — and to leave behind a published record
              of what we learned while learning it.
            </p>
            <div className="mt-12 flex flex-col gap-5">
              {objectives.map((o) => (
                <p
                  key={o}
                  className="border-l border-gold pl-5 text-[0.9375rem] leading-relaxed text-ink-60"
                >
                  {o}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- process ---- */}
      <section aria-labelledby="process-heading" className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-accent">How the journal club works</p>
            <h2
              id="process-heading"
              className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06]"
            >
              Five steps, every month.
            </h2>
          </div>

          <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
            {journalProcess.map((step) => (
              <li key={step.number}>
                <div className="flex items-baseline gap-3">
                  <p className="text-[0.75rem] font-medium text-gold tabular-nums">
                    {step.number}
                  </p>
                  <span aria-hidden className="h-px flex-1 bg-rule" />
                </div>
                <h3 className="mt-6 font-display text-[1.5rem] leading-[1.2]">
                  {step.verb}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-60">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- values ---- */}
      <section aria-labelledby="values-heading" className="border-t border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <p className="eyebrow eyebrow-accent">How we work</p>
          <h2
            id="values-heading"
            className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]"
          >
            Four commitments
          </h2>
          <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="border-t border-rule pt-7">
                <dt className="text-[1.375rem] leading-[1.2]">{v.title}</dt>
                <dd className="mt-3.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-60">
                  {v.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- team ---- */}
      <section aria-labelledby="team-heading" className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <p className="eyebrow eyebrow-accent">The club</p>
          <h2
            id="team-heading"
            className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08]"
          >
            Executive &amp; editorial team
          </h2>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="border-t border-rule pt-7">
                <p className="font-display text-[1.5rem] leading-tight text-ink">
                  {m.name}
                </p>
                <p className="mt-2 text-[0.75rem] font-medium tracking-[0.12em] text-accent uppercase">
                  {m.role}
                </p>
                <p className="mt-4 max-w-[40ch] text-[0.875rem] leading-relaxed text-ink-60">
                  {m.bio}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-14 max-w-[52ch] text-[0.8125rem] leading-relaxed text-ink-40">
            SAMPLE CONTENT — these are placeholder names and roles. Replace with
            the current executive and editorial board before launch.
          </p>
        </div>
      </section>

      {/* ---- history ---- */}
      <section aria-labelledby="history-heading" className="border-t border-rule">
        <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
            <h2
              id="history-heading"
              className="text-[0.8125rem] font-medium tracking-[0.14em] text-ink uppercase"
            >
              A short history
            </h2>
            <ol className="max-w-[58ch] list-none">
              {milestones.map((m) => (
                <li key={m.text} className="grid grid-cols-[4rem_1fr] gap-6 border-t border-rule py-7">
                  <p className="text-[0.875rem] font-medium text-gold tabular-nums">
                    {m.year}
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-60">
                    {m.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
