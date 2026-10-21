import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial";
import { submitContact, type FieldError } from "./actions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the LASUSMA Research & Journal Club about joining a project, collaborating, or requesting a speaker.",
};

const ERRORS: Record<FieldError, string> = {
  name: "Please give us a name we can reply to.",
  email: "Please check the email address — it does not look right.",
  subject: "Please tell us what your message is about.",
  message: "Please give us a little more detail (at least a sentence or two).",
  config:
    "Email delivery is not configured on this deployment. Please write to us directly using the address below.",
};

const SUBJECTS = [
  "Joining a research project",
  "Joining the journal club",
  "Collaboration or supervision",
  "Requesting a speaker or session",
  "Publication or submission enquiry",
  "Something else",
];

function FieldErrorText({ error, field }: { error: FieldError | null; field: FieldError }) {
  if (error !== field) return null;
  return (
    <p className="mt-2 text-[0.8125rem] text-accent" role="alert">
      {ERRORS[field]}
    </p>
  );
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;
  const fieldError = (error ?? null) as FieldError | null;
  const sentOk = sent === "1";

  const mailtoSubject = encodeURIComponent("Enquiry — LASUSMA Research & Journal Club");
  const mailtoBody = encodeURIComponent(
    "Name:\nAffiliation:\n\nMessage:\n",
  );

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Collaborate with us"
        lede="We are always glad to hear from students who want to take part, from researchers who want to collaborate or supervise, and from anyone who would like a session at their institution."
      />

      <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_20rem] lg:gap-24">
          {/* ---------------- form ---------------- */}
          <div className="max-w-[46rem]">
            {sentOk ? (
              <div
                role="status"
                className="border-l-2 border-accent bg-accent-05 px-7 py-8"
              >
                <p className="eyebrow eyebrow-accent">Message sent</p>
                <p className="mt-4 font-display text-[1.5rem] leading-[1.25] text-ink">
                  Thank you — we have your message.
                </p>
                <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-60">
                  Someone from the club will reply, usually within a few days. If
                  your matter is time-sensitive, write to us directly at the
                  address on this page.
                </p>
                <a
                  href="/contact"
                  className="link-underline mt-7 inline-block text-[0.8125rem] text-accent"
                >
                  Send another message
                </a>
              </div>
            ) : (
              <form action={submitContact} method="POST" className="flex flex-col gap-9">
                {fieldError === "config" && (
                  <div
                    role="alert"
                    className="border border-gold bg-surface px-6 py-5"
                  >
                    <p className="text-[0.875rem] leading-relaxed text-ink-60">
                      {ERRORS.config}
                    </p>
                  </div>
                )}

                {/* Honeypot — hidden from people, irresistible to bots. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-9 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="eyebrow">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="name"
                      className="mt-3 w-full border-b border-rule bg-transparent pb-3 text-[0.9375rem] text-ink outline-none transition-colors duration-200 focus:border-accent"
                    />
                    <FieldErrorText error={fieldError} field="name" />
                  </div>

                  <div>
                    <label htmlFor="email" className="eyebrow">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-3 w-full border-b border-rule bg-transparent pb-3 text-[0.9375rem] text-ink outline-none transition-colors duration-200 focus:border-accent"
                    />
                    <FieldErrorText error={fieldError} field="email" />
                  </div>
                </div>

                <div>
                  <label htmlFor="affiliation" className="eyebrow">
                    Affiliation
                  </label>
                  <input
                    id="affiliation"
                    name="affiliation"
                    type="text"
                    maxLength={160}
                    placeholder="e.g. 500 Level, LASU College of Medicine"
                    className="mt-3 w-full border-b border-rule bg-transparent pb-3 text-[0.9375rem] text-ink placeholder:text-ink-40 outline-none transition-colors duration-200 focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="eyebrow">
                    Subject <span className="text-accent">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="mt-3 w-full appearance-none border-b border-rule bg-transparent pb-3 text-[0.9375rem] text-ink outline-none transition-colors duration-200 focus:border-accent"
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <FieldErrorText error={fieldError} field="subject" />
                </div>

                <div>
                  <label htmlFor="message" className="eyebrow">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={4000}
                    placeholder="Tell us what you would like to do, and what you are hoping to get out of it."
                    className="mt-3 w-full resize-y border border-rule bg-surface p-4 text-[0.9375rem] leading-relaxed text-ink placeholder:text-ink-40 outline-none transition-colors duration-200 focus:border-accent"
                  />
                  <FieldErrorText error={fieldError} field="message" />
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-block border border-accent bg-accent px-7 py-3.5 text-[0.75rem] font-medium tracking-[0.14em] text-paper uppercase transition-colors duration-200 hover:bg-accent-hover"
                  >
                    Send message
                  </button>
                  <p className="mt-4 text-[0.8125rem] text-ink-40">
                    We use your details only to reply to this message.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ---------------- aside ---------------- */}
          <aside className="lg:sticky lg:top-(--header-h) lg:self-start">
            <div className="border-t-2 border-accent pt-5">
              <h2 className="eyebrow eyebrow-accent">Direct</h2>
              <a
                href={`mailto:${site.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="link-underline mt-3 block break-all text-[0.9375rem] text-accent"
              >
                {site.contact.email}
              </a>
            </div>

            <div className="mt-10 border-t border-rule pt-5">
              <h2 className="eyebrow">Find us</h2>
              <p className="mt-3 max-w-[30ch] text-[0.875rem] leading-relaxed text-ink-60">
                {site.institution}
              </p>
            </div>

            <div className="mt-10 border-t border-rule pt-5">
              <h2 className="eyebrow">Social</h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {site.contact.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[0.875rem] text-ink-60 transition-colors duration-200 hover:text-ink"
                    >
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-rule pt-5">
              <h2 className="eyebrow">Response time</h2>
              <p className="mt-3 max-w-[32ch] text-[0.875rem] leading-relaxed text-ink-60">
                We are students, and this runs alongside clinical rotations. We
                aim to reply within a few days, and longer during examinations.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
