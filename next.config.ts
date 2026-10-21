import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Standalone output keeps the Vercel function bundle small and lets the
  // same build run on any Node host.
  output: "standalone",
  experimental: {
    // Tailwind's atomic CSS is small enough that inlining it removes a
    // render-blocking request on first visit.
    inlineCss: true,
  },
  images: {
    // Content figures are static assets under /public.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/figures/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
