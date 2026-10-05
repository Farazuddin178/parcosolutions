import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { formatDate, getPosts, type Post } from "@/lib/wordpress";
import { PageHeader } from "@/components/PageHeader";
import { Button, Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles from Parco Solutions on ERP, SAP, web development and the systems behind growing businesses.",
  alternates: { canonical: "/blog/" },
};

function PostImage({ post, className }: { post: Post; className: string }) {
  if (post.image) {
    return (
      <div className={`duo duo-live relative overflow-hidden border border-line ${className}`}>
        {/* Remote WordPress media: plain <img>, the static export cannot optimise it. */}
        <img src={post.image.src} alt={post.image.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border border-line bg-coal bg-cover bg-center opacity-80 ${className}`}
      style={{ backgroundImage: "url(/images/dither-circuit.png)" }}
    />
  );
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHeader
        crumb={[{ label: "Insights" }]}
        title="Insights"
        lead="Notes on ERP, SAP, web development and the systems behind growing businesses."
      />

      <section className="smoke relative pb-24">
        <Container>
          {!lead ? (
            <div className="frame grid place-items-center px-6 py-20 text-center">
              <div>
                <p className="font-display text-3xl text-bone">No articles yet</p>
                <p className="mx-auto mt-3 max-w-md text-fog">
                  New articles published in WordPress appear here after the next site build.
                </p>
                <div className="mt-8">
                  <Button href="/contact-us/" variant="ghost">
                    Start a project
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Reveal>
                <Link href={`/blog/${lead.slug}/`} className="group grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <PostImage post={lead} className="aspect-[16/10]" />
                  <div>
                    <time dateTime={lead.date} className="font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">
                      {formatDate(lead.date)}
                    </time>
                    <h2 className="mt-4 font-display text-4xl leading-tight text-bone group-hover:text-signal">{lead.title}</h2>
                    <p className="mt-4 line-clamp-4 leading-relaxed text-fog">{lead.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-pixel text-[11px] uppercase tracking-wider text-signal">
                      Read article <ArrowRight size={12} weight="bold" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {rest.length > 0 && (
                <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <li key={post.id}>
                      <Reveal delay={(i % 3) * 0.06}>
                        <Link href={`/blog/${post.slug}/`} className="group block">
                          <PostImage post={post} className="aspect-[16/10]" />
                          <time dateTime={post.date} className="mt-5 block font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">
                            {formatDate(post.date)}
                          </time>
                          <h3 className="mt-3 text-xl leading-snug text-bone group-hover:text-signal">{post.title}</h3>
                          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-fog">{post.excerpt}</p>
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
