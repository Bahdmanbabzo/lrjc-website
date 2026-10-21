import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

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
          backgroundColor: "#fefbf4",
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
            backgroundColor: "#0c365a",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              letterSpacing: 7,
              color: "#1a1a17",
            }}
          >
            LASUSMA
          </div>
          <div
            style={{
              height: 2,
              width: 120,
              backgroundColor: "#9a6510",
              margin: "18px 0",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: 5,
              color: "#6b6a61",
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
              color: "#1a1a17",
              maxWidth: 900,
            }}
          >
            Building a culture of evidence, inquiry &amp; research.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#0c365a",
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
