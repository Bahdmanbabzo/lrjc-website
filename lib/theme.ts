/**
 * Palette constants for contexts that cannot read CSS custom properties —
 * currently the Satori/ImageResponse social cards.
 *
 * Keep these in sync with the `@theme` block in app/globals.css.
 */
export const palette = {
  paper: "#fefbf4",
  surface: "#ffffff",
  ink: "#1a1a17",
  ink60: "#6b6a61",
  ink40: "#8b897e",
  rule: "#e7e3d8",
  ruleStrong: "#d6d1c4",
  accent: "#153c59",
  accentHover: "#0e2c42",
  accent05: "#e9eff3",
  gold: "#f5b41a",
  goldInk: "#7a5200",
  gold40: "#fbe6ad",
} as const;
