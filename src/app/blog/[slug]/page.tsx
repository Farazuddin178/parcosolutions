import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/wordpress";
import { PageHeader } from "@/components/PageHeader";
import { Button, Container } from "@/components/ui";

export const dynamicParams = false;

// Static export needs at least one path; if WordPress returns no posts we
// emit a placeholder route that renders the 404 page.
const PLACEHOLDER = "no-posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = slug === PLACEHOLDER ? null : await getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { type: "article", images: post.image ? [{ url: post.image.src }] : undefined },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = slug === PLACEHOLDER ? null : await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <PageHeader crumb={[{ label: "Insights", href: "/blog/" }, { label: "Article" }]} title={post.title}>
        <time dateTime={post.date} className="mt-6 block font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">
          {formatDate(post.date)}
        </time>
      </PageHeader>

      <Container className="pb-24">
        {post.image && (
          <div className="duo brackets relative mb-14 aspect-[16/8] border border-line">
            <img src={post.image.src} alt={post.image.alt} className="absolute inset-0 size-full object-cover" />
          </div>
        )}
        {/* Content authored in WordPress by site admins. */}
        <div className="prose-wp mx-auto max-w-[70ch]" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mx-auto mt-16 flex max-w-[70ch] flex-wrap gap-3 border-t border-line pt-10">
          <Button href="/blog/" variant="ghost">
            All insights
          </Button>
          <Button href="/contact-us/" arrow>
            Start a project
          </Button>
        </div>
      </Container>
    </article>
  );
}
