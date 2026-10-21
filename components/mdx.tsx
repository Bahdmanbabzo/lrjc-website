import { MDXRemote } from "next-mdx-remote/rsc";
import type { Figure } from "@/content/schema";

/**
 * Server-rendered MDX. No client components, no syntax highlighting JS —
 * articles ship as plain HTML.
 */
function FigureBlock({
  src,
  caption,
  credit,
  width,
  height,
  sizes,
  avifSrcSet,
  webpSrcSet,
}: Figure) {
  return (
    <figure>
      {/* Content figures are static assets in /public; plain picture/img keeps
          the payload free of the image optimiser's client runtime. */}
      <picture>
        {avifSrcSet && (
          <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
        )}
        {webpSrcSet && (
          <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        )}
        <img
          src={src}
          alt={caption}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>
        {caption}
        {credit ? ` — ${credit}` : ""}
      </figcaption>
    </figure>
  );
}

const components = {
  // MDX only maps custom components for capitalised JSX tags.
  Figure: FigureBlock,
  figure: FigureBlock,
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
