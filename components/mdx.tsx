import { MDXRemote } from "next-mdx-remote/rsc";
import type { Figure } from "@/content/schema";

/**
 * Server-rendered MDX. No client components, no syntax highlighting JS —
 * articles ship as plain HTML.
 */
const components = {
  figure: ({ src, caption, credit }: Figure) => (
    <figure>
      {/* Content figures are static assets in /public; plain img keeps the
          payload free of the image optimiser's client runtime. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={caption} loading="lazy" decoding="async" />
      <figcaption>
        {caption}
        {credit ? ` — ${credit}` : ""}
      </figcaption>
    </figure>
  ),
  // MDX renders a bare <table>; wrap it so a wide table scrolls instead of
  // forcing the whole page sideways.
  table: (props: React.ComponentProps<"table">) => (
    <div className="-mx-gutter overflow-x-auto px-gutter">
      <table {...props} />
    </div>
  ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-editorial">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
