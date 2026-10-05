import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { solutions } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { Button, Container, Divider, Figure } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Cloud, AI and automation, and data and analytics solutions from Parco Solutions.",
  alternates: { canonical: "/solutions/" },
};

function Checklist({ items, cols = "sm:grid-cols-2" }: { items: string[]; cols?: string }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3.5 ${cols}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-bone/90">
          <Check size={16} weight="bold" className="mt-1 flex-none text-signal" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function SolutionsPage() {
  const [cloud, ai, data] = solutions;
  return (
    <>
      <PageHeader
        crumb={[{ label: "Solutions" }]}
        title="Technology solutions for modern businesses"
        lead="Partner with Parco Solutions to build systems that improve efficiency, drive growth and create lasting business value."
      >
        <div className="mt-9">
          <Button href="/contact-us/" arrow>
            Start a project
          </Button>
        </div>
      </PageHeader>

      {/* Cloud: text left, figure right */}
      <section id={cloud.id} className="smoke relative py-20 lg:py-28">
        <Container>
          <Divider index={1} title={cloud.name} />
          <Reveal className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="display-shadow font-display text-4xl leading-tight text-bone sm:text-5xl">Cloud solutions</h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-fog">{cloud.body}</p>
              <div className="frame mt-10 px-6 py-8 sm:px-8">
                <Checklist items={cloud.items} />
              </div>
            </div>
            <Figure src={cloud.image} alt={cloud.imageAlt} caption="Secure, scalable infrastructure" index={1} ratio="aspect-[4/3]" />
          </Reveal>
        </Container>
      </section>

      {/* AI: full-width band, list underneath */}
      <section id={ai.id} className="relative py-20 lg:py-28">
        <Container>
          <Divider index={2} title={ai.name} />
          <Reveal className="mt-14">
            <div className="duo brackets relative aspect-[16/9] border border-line sm:aspect-[21/8]">
              <Image src={ai.image} alt={ai.imageAlt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 z-[2] flex items-end bg-[linear-gradient(0deg,rgb(11_13_12/0.9),transparent_70%)] p-6 sm:p-10">
                <h2 className="display-shadow max-w-xl font-display text-4xl leading-tight text-bone sm:text-5xl">
                  AI and intelligent automation
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <p className="max-w-[48ch] text-lg leading-relaxed text-fog">{ai.body}</p>
              <Checklist items={ai.items} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Data: figure left, text right */}
      <section id={data.id} className="smoke relative py-20 lg:py-28">
        <Container>
          <Divider index={3} title={data.name} />
          <Reveal className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <Figure
              src={data.image}
              alt={data.imageAlt}
              caption="From raw data to weekly decisions"
              index={2}
              ratio="aspect-[4/3]"
              className="order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <h2 className="display-shadow font-display text-4xl leading-tight text-bone sm:text-5xl">Data and analytics</h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-fog">{data.body}</p>
              <div className="mt-10">
                <Checklist items={data.items} />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Contact index={4} />
    </>
  );
}
