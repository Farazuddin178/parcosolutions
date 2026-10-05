import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { getService, services } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { HangingLamp } from "@/components/sections/Capabilities";
import { Button, Container, Divider, Figure } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
    alternates: { canonical: `/service/${service.slug}/` },
    openGraph: { images: [{ url: service.image }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  let n = 0;

  return (
    <>
      <PageHeader
        crumb={[{ label: "Services" }, { label: service.name }]}
        title={service.name}
        lead={service.summary}
        aside={
          <Figure
            src={service.image}
            alt={service.imageAlt}
            caption={service.figure}
            index={1}
            priority
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        }
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact-us/" arrow>
            Start a project
          </Button>
        </div>
        {service.useCases && (
          <div className="mt-10">
            <p className="text-sm text-fog">{service.useCasesLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.useCases.map((u) => (
                <li key={u} className="border border-line bg-coal/60 px-3 py-1.5 text-sm text-bone/85">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageHeader>

      {service.sections.map((section) => {
        const detailed = section.items.some((i) => i.body);
        n += 1;
        return (
          <section key={section.title} className="smoke relative py-20 lg:py-24">
            <Container>
              <Divider index={n} title={section.title} />
              <Reveal className="relative mt-14">
                {n === 1 && <HangingLamp className="absolute -top-14 right-8 hidden sm:flex" />}
                {detailed ? (
                  <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
                    {section.items.map((item, i, all) => (
                      <li
                        key={item.title}
                        className={`bg-ink p-7 sm:p-9 ${all.length % 2 === 1 && i === all.length - 1 ? "md:col-span-2" : ""}`}
                      >
                        <h3 className="font-pixel text-xs uppercase tracking-wide text-signal">{item.title}</h3>
                        {item.body && <p className="mt-3 max-w-[60ch] leading-relaxed text-fog">{item.body}</p>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="frame px-6 py-10 sm:px-10">
                    <ul className="grid gap-x-12 gap-y-4 md:grid-cols-2">
                      {section.items.map((item) => (
                        <li key={item.title} className="flex gap-3 text-bone/90">
                          <Check size={16} weight="bold" className="mt-1 flex-none text-signal" aria-hidden />
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </Container>
          </section>
        );
      })}

      {service.specs && (
        <section className="relative py-20 lg:py-24">
          <Container>
            <Divider index={++n} title="Specifications" />
            <Reveal className="mt-14">
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.specs.map((spec) => (
                  <div key={spec.label} className="notch bg-coal px-6 py-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
                    <dt className="font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">{spec.label}</dt>
                    <dd className="mt-2 text-lg text-bone">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="relative pb-8 pt-12">
        <Container>
          <p className="font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">More services</p>
          <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/service/${o.slug}/`}
                  className="group flex h-full flex-col justify-between gap-6 bg-ink p-6 transition-colors hover:bg-coal"
                >
                  <span>
                    <span className="block text-lg text-bone group-hover:text-signal">{o.name}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-fog">{o.short}</span>
                  </span>
                  <ArrowRight size={16} className="text-signal" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Contact index={++n} />
    </>
  );
}
