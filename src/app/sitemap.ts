import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";
import { getPosts } from "@/lib/wordpress";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "about-us/", "solutions/", "contact-us/", "blog/", "privacy/", "terms/"];
  const posts = await getPosts();
  return [
    ...pages.map((p) => ({ url: `${site.url}/${p}` })),
    ...services.map((s) => ({ url: `${site.url}/service/${s.slug}/` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date })),
  ];
}
