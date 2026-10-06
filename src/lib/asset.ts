// Base path the site is served from.
// GitHub Pages project URL (farazuddin178.github.io/parcosolutions) needs
// "/parcosolutions"; a custom domain or cPanel root needs "" (empty).
// Next.js prefixes <Link> hrefs automatically, but files from /public
// (images, icons, CSS backgrounds) must go through asset().
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export const asset = (path: string) => `${BASE_PATH}${path}`;
