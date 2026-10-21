import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/editorial";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for is not in the archive.",
};

export default function NotFound() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-[1200px] px-gutter py-32 md:py-48">
      <p className="eyebrow eyebrow-accent">Error 404</p>
      <h1 className="mt-6 max-w-[18ch] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.03]">
        This page is not in the archive.
      </h1>
      <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-60">
        The address may have changed, or the page may never have existed. The
        archive of published articles is the best place to start looking.
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
        <ArrowLink href="/journal-club">Browse the archive</ArrowLink>
        <ArrowLink href="/" tone="ink">
          Return home
        </ArrowLink>
      </div>
      <p className="mt-16 text-[0.8125rem] text-ink-40">
        Think something is missing?{" "}
        <Link href="/contact" className="link-underline text-accent">
          Let us know
        </Link>
        .
      </p>
      </div>
    </PageTransition>
  );
}
