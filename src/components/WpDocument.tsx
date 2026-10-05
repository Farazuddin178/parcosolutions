import { notFound } from "next/navigation";
import { formatDate, getPage } from "@/lib/wordpress";
import { PageHeader } from "./PageHeader";
import { Container } from "./ui";

/** Renders a WordPress page (e.g. Privacy Policy) inside the site chrome. */
export async function WpDocument({ slug, label }: { slug: string; label: string }) {
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <>
      <PageHeader crumb={[{ label }]} title={page.title}>
        <p className="mt-6 font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">
          Updated {formatDate(page.modified)}
        </p>
      </PageHeader>
      <Container className="pb-24">
        <div className="prose-wp max-w-[72ch]" dangerouslySetInnerHTML={{ __html: page.content }} />
      </Container>
    </>
  );
}
