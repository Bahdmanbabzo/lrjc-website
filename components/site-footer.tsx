import Link from "next/link";
import { Wordmark } from "./wordmark";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print mt-px border-t border-rule">
      <div className="mx-auto max-w-[1200px] px-gutter py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div>
            <Wordmark />
            <p className="mt-7 max-w-[34ch] text-sm leading-relaxed text-ink-60">
              {site.institution}
            </p>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-40">
              Research · Critical Appraisal · Scientific Communication
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Sections</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {[...nav, { label: "Resources", href: "/resources" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-ink-60 transition-colors duration-200 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Connect</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline text-sm text-ink-60 transition-colors duration-200 hover:text-ink"
                >
                  Email
                </a>
              </li>
              {site.contact.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="link-underline text-sm text-ink-60 transition-colors duration-200 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="link-underline text-sm text-ink-60 transition-colors duration-200 hover:text-ink"
                >
                  Collaborate with us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-rule pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-ink-40">
            © {year} {site.name}
          </p>
          <p className="text-[0.75rem] text-ink-40">
            A scholarly record of student research at LASU College of Medicine.
          </p>
        </div>
      </div>
    </footer>
  );
}
