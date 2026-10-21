import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Typographic publication mark. Two-line lockup with a gold hairline.
 * `compact` renders the single-line nav variant.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="flex items-baseline gap-2">
        <span className="font-display text-[1.0625rem] tracking-[0.14em] text-ink">
          {site.wordmark.primary}
        </span>
        <span
          aria-hidden
          className="h-3 w-px self-center bg-gold"
        />
        <span className="text-[0.6875rem] font-medium tracking-[0.18em] text-ink-60 uppercase">
          RJC
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col leading-none">
      <span className="font-display text-[1.375rem] tracking-[0.1em] text-ink">
        {site.wordmark.primary}
      </span>
      <span
        aria-hidden
        className="my-1.5 h-px w-full bg-gold"
      />
      <span className="text-[0.5625rem] font-medium tracking-[0.2em] text-ink-60 uppercase">
        {site.wordmark.secondary}
      </span>
    </span>
  );
}

export function WordmarkLink() {
  return (
    <Link
      href="/"
      className="inline-block transition-opacity duration-200 hover:opacity-70"
      aria-label={`${site.name} — home`}
    >
      <Wordmark />
    </Link>
  );
}
