/**
 * Abstract scientific figure for the hero: a fine reference grid, nested
 * contour curves, and scattered sample points. Inline SVG so it is
 * server-rendered and costs no requests or JavaScript.
 *
 * Purely decorative — hidden from assistive technology.
 */
export function HeroFigure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 640"
      className={className}
      aria-hidden
      focusable="false"
      role="presentation"
    >
      <defs>
        <pattern
          id="hf-grid"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M32 0H0v32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </pattern>
        <radialGradient id="hf-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="hf-mask">
          <rect width="640" height="640" fill="url(#hf-fade)" />
        </mask>
      </defs>

      <g mask="url(#hf-mask)" style={{ color: "var(--color-accent)" }}>
        {/* reference grid */}
        <rect width="640" height="640" fill="url(#hf-grid)" opacity="0.16" />

        {/* nested contour curves */}
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path
            d="M320 96c104 0 190 84 190 190s-86 190-190 190-190-84-190-190 86-190 190-190z"
            opacity="0.32"
          />
          <path
            d="M318 128c92-6 170 66 172 158 2 94-72 172-166 180-96 8-180-60-186-156-6-98 68-176 180-182z"
            opacity="0.4"
          />
          <path
            d="M322 168c78-10 144 48 150 124 6 80-52 150-130 162-80 12-154-40-166-118-12-82 46-158 146-168z"
            opacity="0.48"
          />
          <path
            d="M316 210c62-12 118 30 126 92 8 66-34 120-98 134-68 14-128-22-142-88-16-70 24-128 114-138z"
            opacity="0.56"
          />
          <path
            d="M324 252c48-10 88 16 96 62 8 50-20 92-68 106-52 14-98-10-112-58-16-52 10-102 84-110z"
            opacity="0.64"
          />
          <path
            d="M318 292c32-8 60 6 66 36 6 34-12 64-44 76-36 12-68-2-80-34-14-36 0-70 58-78z"
            opacity="0.72"
          />
        </g>

        {/* crosshair axes through the field */}
        <g stroke="currentColor" strokeWidth="0.5" opacity="0.3">
          <path d="M320 40v560" />
          <path d="M40 320h560" />
        </g>

        {/* sample points */}
        <g fill="currentColor">
          <circle cx="196" cy="212" r="3" opacity="0.55" />
          <circle cx="252" cy="452" r="2.5" opacity="0.45" />
          <circle cx="430" cy="196" r="3.5" opacity="0.6" />
          <circle cx="452" cy="404" r="2.5" opacity="0.5" />
          <circle cx="160" cy="352" r="2" opacity="0.4" />
          <circle cx="384" cy="512" r="2" opacity="0.35" />
          <circle cx="524" cy="288" r="2.5" opacity="0.45" />
          <circle cx="120" cy="292" r="2" opacity="0.3" />
          <circle cx="404" cy="132" r="2" opacity="0.4" />
          <circle cx="240" cy="128" r="2" opacity="0.35" />
          <circle cx="486" cy="496" r="2" opacity="0.3" />
          <circle cx="140" cy="464" r="2" opacity="0.3" />
          <circle cx="566" cy="176" r="2" opacity="0.25" />
        </g>

        {/* one plotted series, for the research-data association */}
        <g fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5">
          <path d="M96 496l88-52 72 34 96-96 80 40 96-128" strokeLinejoin="round" />
        </g>
        <g fill="currentColor" opacity="0.5">
          <circle cx="96" cy="496" r="3" />
          <circle cx="184" cy="444" r="3" />
          <circle cx="256" cy="478" r="3" />
          <circle cx="352" cy="382" r="3" />
          <circle cx="432" cy="422" r="3" />
          <circle cx="528" cy="294" r="3.5" />
        </g>
      </g>
    </svg>
  );
}

/** Small contour mark used as a page-level ornament. */
export function ContourMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      className={className}
      aria-hidden
      focusable="false"
      role="presentation"
      fill="none"
      stroke="currentColor"
    >
      <path d="M2 34c18 0 22-14 40-14s22 10 38 10 20-12 38-12" strokeWidth="1" opacity="0.5" />
      <path d="M2 27c18 0 24-18 42-18s24 14 40 14 20-16 36-16" strokeWidth="1" opacity="0.35" />
      <path d="M2 20c16 0 26-22 44-22s26 18 42 18 18-12 32-12" strokeWidth="1" opacity="0.22" />
    </svg>
  );
}
