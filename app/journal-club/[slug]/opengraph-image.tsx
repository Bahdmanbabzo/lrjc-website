import { ImageResponse } from "next/og";

import { getArticle, getArticleSlugs } from "@/lib/content";
import { site } from "@/lib/site";

export const alt = "LASUSMA R&JC article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Per-article social card, generated at build for every published article. */
export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const file = await getArticle(slug);
  const title = file?.data.title ?? site.name;
  const meta = file
    ? `${file.data.displayDate.toUpperCase()} · ${(file.data.original?.journal ?? file.data.discipline).toUpperCase()}`
    : "JOURNAL CLUB";
  const genre = file?.data.original ? "CRITICAL APPRAISAL" : "REVIEW";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fefbf4",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#0c365a",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", fontSize: 24, letterSpacing: 5, color: "#0c365a" }}
          >
            {meta}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#1a1a17",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e7e3d8",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#1a1a17" }}>
            LASUSMA R&amp;JC
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: "#8b897e" }}>
            {genre}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
