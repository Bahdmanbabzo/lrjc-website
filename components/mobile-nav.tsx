"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site";

/**
 * Minimalist "MENU" text with a 3-bar hamburger icon on the right of the
 * sticky masthead, opening the full-bleed navigation drawer.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-navigation-drawer"
        className="group flex items-center gap-3 py-2 text-[0.6875rem] font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-200 hover:text-accent"
      >
        <span>{open ? "CLOSE" : "MENU"}</span>
        <span aria-hidden className="flex h-3.5 w-4.5 flex-col justify-between">
          <span
            className={`h-[1.5px] w-full bg-current transition-transform duration-200 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-full bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-full bg-current transition-transform duration-200 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          id="site-navigation-drawer"
          className="fixed inset-x-0 top-(--header-h) z-40 h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-rule bg-canvas-deep/95 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-[1200px] px-gutter py-8 md:py-12">
            <p className="algo-meta-mono mb-4 text-ink-40">
              [ DIRECTORY // NAVIGATION_INDEX ]
            </p>
            <nav aria-label="Primary">
              <ul className="border-t border-rule">
                {nav.map((item, i) => (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-5 font-display text-2xl font-semibold tracking-[-0.02em] text-accent transition-colors duration-200 hover:text-ink md:text-3xl"
                    >
                      <span className="font-mono text-xs text-ink-60 tabular-nums">
                        0{i + 1}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="border-b border-rule">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 py-5 font-display text-2xl font-semibold tracking-[-0.02em] text-accent transition-colors duration-200 hover:text-ink md:text-3xl"
                  >
                    <span className="font-mono text-xs text-ink-60 tabular-nums">
                      0{nav.length + 1}
                    </span>
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-10">
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
        </div>
      )}
    </div>
  );
}
