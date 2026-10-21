import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { WordmarkLink } from "./wordmark";
import { nav } from "@/lib/site";

/**
 * Sticky, deliberately low-contrast masthead. Server-rendered — the desktop
 * navigation ships no JavaScript. Active-page highlighting is omitted on
 * purpose: the masthead is meant to recede, and the page's own heading
 * already establishes context.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95">
      <div className="mx-auto flex h-(--header-h) max-w-[1200px] items-center justify-between px-gutter">
        <WordmarkLink />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-[0.8125rem] text-ink-60 transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-block border border-accent px-4 py-2 text-[0.6875rem] font-medium tracking-[0.14em] text-accent uppercase transition-colors duration-200 hover:bg-accent hover:text-paper"
          >
            Contact
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
