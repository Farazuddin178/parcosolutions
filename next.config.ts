import type { NextConfig } from "next";

// "" for a custom domain / cPanel root, "/parcosolutions" for the GitHub Pages
// project URL. Set by the deploy workflow via NEXT_PUBLIC_BASE_PATH.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

// Static export: `next build` writes plain HTML/CSS/JS to /out, which any
// static host can serve (GitHub Pages, cPanel public_html). No Node server.
const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // WordPress used trailing slashes (/about-us/); keeping them preserves
  // existing URLs and lets static hosts serve /about-us/index.html directly.
  trailingSlash: true,
  // The default image optimiser needs a server, so images ship pre-optimised.
  images: { unoptimized: true },
};

export default nextConfig;
