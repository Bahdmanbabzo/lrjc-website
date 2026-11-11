import Link from "next/link";
import { Emblem } from "./emblem";
import { MobileNav } from "./mobile-nav";
import { WordmarkLink } from "./wordmark";
import { site } from "@/lib/site";

/**
 * Sticky top masthead across all pages:
 * - Left: "LASUMSA" (tracked serif, bold) with sub-label "RESEARCH • JOURNAL CLUB"
 * - Center: Official club logo (`public/logo.png`) centered sticky at the top
 * - Right: Minimalist "MENU" text with a 3-bar hamburger icon
 */
export function SiteHeader() {
  return (
    <header className="masthead-scrim sticky top-0 z-50 border-b border-rule">
      <div className="relative mx-auto flex h-(--header-h) max-w-[1200px] items-center justify-between px-gutter">
        <WordmarkLink />

        <Link
          href="/"
          aria-label={`${site.name} — emblem home link`}
          className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-0.5 transition-transform duration-300 hover:scale-105"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-full border border-gold/25 opacity-75 transition-opacity duration-300 group-hover:border-gold/60 group-hover:opacity-100"
          />
          <Emblem className="h-10 w-10 rounded-full drop-shadow-[0_0_12px_rgba(245,180,25,0.28)] md:h-12 md:w-12" />
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
