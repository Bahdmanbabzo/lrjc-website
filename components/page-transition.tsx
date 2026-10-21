import { ViewTransition } from "react";

/**
 * Wraps a page body in a React view transition. The site header and footer
 * live in the layout, so only the page content is captured and wiped.
 *
 * Links can opt into the reverse wipe with `transitionTypes={["nav-back"]}`.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-back": "page-back", default: "page-forward" }}
      exit={{ "nav-back": "page-back", default: "page-forward" }}
    >
      <div className="page-shell">{children}</div>
    </ViewTransition>
  );
}
