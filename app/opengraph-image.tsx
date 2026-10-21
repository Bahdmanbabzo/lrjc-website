import { ImageResponse } from "next/og";

import { site } from "@/lib/site";
import { palette } from "@/lib/theme";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card. Rendered by Satori at request time, so it always
 * reflects the current site name and positioning.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: palette.paper,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* accent rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: palette.accent,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              letterSpacing: 7,
              color: palette.ink,
            }}
          >
            LASUMSA
          </div>
          <div
            style={{
              height: 2,
              width: 120,
              backgroundColor: palette.gold,
              margin: "18px 0",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: 5,
              color: palette.ink60,
              textTransform: "uppercase",
            }}
          >
            Research + Journal Club
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: palette.ink,
              maxWidth: 900,
            }}
          >
            Building a culture of evidence, inquiry &amp; research.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: palette.accent,
              marginTop: 28,
            }}
          >
            Lagos State University College of Medicine
          </div>
        </div>
      </div>
    ),
    size,
  );
}
