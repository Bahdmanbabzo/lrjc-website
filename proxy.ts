import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep the old `?year=` archive URLs working after moving the filter to a
 * static path segment. Only runs for `/journal-club` itself.
 */
export function proxy(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");
  if (year && /^\d{4}$/.test(year)) {
    return NextResponse.redirect(
      new URL(`/journal-club/year/${year}`, request.url),
      308,
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/journal-club",
};
