import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to /out,
// which is uploaded as-is to cPanel's public_html. No Node server needed.
const nextConfig: NextConfig = {
  output: "export",
  // WordPress used trailing slashes (/about-us/); keeping them preserves
  // existing URLs and lets Apache serve /about-us/index.html directly.
  trailingSlash: true,
  // The default image optimiser needs a server, so images ship pre-optimised.
  images: { unoptimized: true },
};

export default nextConfig;
