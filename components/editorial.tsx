import Link from "next/link";

/** Small uppercase label + large serif heading. The page masthead pattern. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow eyebrow-accent">{eyebrow}</p>
      <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] text-ink">
        {title}
      </h2>
      {lede && <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-60">{lede}</p>}
    </div>
  );
}

/**
 * The site's primary directional affordance: a label with a rule that
 * extends on hover. Used instead of filled buttons wherever possible.
 */
export function ArrowLink({
  href,
  children,
  tone = "accent",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "accent" | "ink";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.14em] uppercase ${
        tone === "accent" ? "text-accent" : "text-ink"
      }`}
    >
      <span className="link-underline">{children}</span>
      <span
        aria-hidden
        className="block h-px w-8 origin-left transition-transform duration-300 group-hover:scale-x-150 group-hover:bg-accent"
        style={{ backgroundColor: "currentColor", opacity: 0.45 }}
      />
    </Link>
  );
}

/** Page-level masthead used by every interior page. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-[1200px] px-gutter pt-20 pb-16 md:pt-32 md:pb-20">
        <p className="eyebrow eyebrow-accent">{eyebrow}</p>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-ink">
          {title}
        </h1>
        {lede && (
          <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-60">
            {lede}
          </p>
        )}
        {meta && meta.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow">{m.label}</dt>
                <dd className="mt-2 font-display text-lg text-ink">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
