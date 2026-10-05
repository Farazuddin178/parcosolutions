// Headless WordPress client.
// Runs at BUILD TIME only (static export), so content changes in WordPress
// appear on the live site after the next `npm run build` + upload
// (or automatically via the GitHub Actions workflow).

const WP_URL = (process.env.WP_URL ?? "https://parcosolutions.in").replace(/\/$/, "");

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: { src: string; alt: string };
};

type WPRenderedPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string }[];
  };
};

async function wpFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json${path}`, {
      headers: { Accept: "application/json" },
      cache: "force-cache",
    });
    if (!res.ok) {
      console.warn(`[wordpress] ${res.status} for ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    // Never fail the build because WordPress is unreachable; pages render
    // their empty states instead.
    console.warn(`[wordpress] request failed for ${path}:`, (err as Error).message);
    return null;
  }
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "...",
  ndash: "-",
  mdash: "-",
};

export function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, n) => {
      const code = Number(n);
      // Normalise WordPress' typographic dashes to plain hyphens.
      if (code === 8211 || code === 8212) return "-";
      return String.fromCodePoint(code);
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

function toPost(p: WPRenderedPost): Post {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: p.id,
    slug: p.slug,
    date: p.date,
    title: decodeEntities(stripTags(p.title.rendered)),
    excerpt: decodeEntities(stripTags(p.excerpt.rendered)).replace(/\s*\[\.\.\.\]$/, "..."),
    content: p.content.rendered,
    image: media?.source_url ? { src: media.source_url, alt: media.alt_text ?? "" } : undefined,
  };
}

export async function getPosts(): Promise<Post[]> {
  const data = await wpFetch<WPRenderedPost[]>("/wp/v2/posts?per_page=100&_embed=wp:featuredmedia");
  return Array.isArray(data) ? data.map(toPost) : [];
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await wpFetch<WPRenderedPost[]>(
    `/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`,
  );
  return Array.isArray(data) && data[0] ? toPost(data[0]) : null;
}

export type Page = { title: string; content: string; modified: string };

/** A WordPress page by slug, e.g. "privacy" or "terms". */
export async function getPage(slug: string): Promise<Page | null> {
  const data = await wpFetch<{ title: { rendered: string }; content: { rendered: string }; modified: string }[]>(
    `/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=title,content,modified`,
  );
  const page = Array.isArray(data) ? data[0] : null;
  if (!page) return null;
  const title = decodeEntities(stripTags(page.title.rendered));
  // Drop a leading heading that just repeats the page title.
  const content = page.content.rendered.replace(/^\s*<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/i, (m, inner) =>
    decodeEntities(stripTags(inner)).toLowerCase() === title.toLowerCase() ? "" : m,
  );
  return { title, content, modified: page.modified };
}

export const formatDate =(iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
