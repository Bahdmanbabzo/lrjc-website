"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site";

/**
 * The only client component in the layout. Kept deliberately small so the
 * site ships ~1KB of JavaScript. Desktop navigation is server-rendered.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex items-center gap-2.5 text-[0.6875rem] font-medium tracking-[0.18em] text-ink uppercase"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden className="flex h-3 w-4 flex-col justify-between">
          <span
            className={`h-px w-full bg-ink transition-transform duration-200 ${
              open ? "translate-y-[5.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-ink transition-transform duration-200 ${
              open ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-(--header-h) z-40 h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-rule bg-paper"
        >
          <nav aria-label="Mobile">
            <ul className="px-gutter">
              {nav.map((item, i) => (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 font-display text-3xl tracking-[-0.02em] text-ink"
                  >
                    <span className="text-[0.6875rem] font-sans font-medium text-gold tabular-nums">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-rule">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5 font-display text-3xl tracking-[-0.02em] text-accent"
                >
                  <span className="text-[0.6875rem] font-sans font-medium text-gold tabular-nums">
                    0{nav.length + 1}
                  </span>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="px-gutter py-10">
            <p className="eyebrow">Lagos State University</p>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink-60">
              College of Medicine
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-underline mt-5 inline-block text-sm text-accent"
            >
              {site.contact.email}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
