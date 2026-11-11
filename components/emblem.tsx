/**
 * Renders the official LASUMSA Research & Journal Club circular emblem
 * (`public/logo.png`). Purely decorative when used as a backdrop watermark
 * or accompanied by accessible link text in the header.
 */
export function Emblem({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}

