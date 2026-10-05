import type { Metadata } from "next";
import { industries, stats } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Capabilities } from "@/components/sections/Capabilities";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Button, Container, Divider, Figure } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Parco Solutions is an IT services and software development company delivering enterprise applications, websites, mobile apps, IT staffing and corporate training.",
  alternates: { canonical: "/about-us/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb={[{ label: "About" }]}
        title="Smart technology for growing businesses"
        lead="An IT services and software development company helping organisations transform through technology that is built to last."
        aside={
          <Figure
            src="/images/about-team.webp"
            alt="Developers collaborating around a table with laptops"
            caption="The team behind every build"
            index={1}
            priority
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        }
      >
        <div className="mt-9">
          <Button href="/contact-us/" arrow>
            Start a project
          </Button>
        </div>
      </PageHeader>

      <section className="smoke relative py-20 lg:py-28">
        <Container>
          <Divider index={1} title="Who we are" />
          <Reveal className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div className="grid max-w-[64ch] gap-6 text-lg leading-relaxed text-fog">
              <p>
                <span className="text-bone">Parco Solutions</span> delivers high-quality software, enterprise
                applications, mobile apps and web solutions that help organisations improve efficiency, streamline
                operations and accelerate growth.
              </p>
              <p>
                Our team combines technical excellence, industry knowledge and a customer-centric approach. From startups
                to large enterprises, we take the time to understand each client&apos;s challenges and build customised
                solutions that drive measurable results.
              </p>
              <p>
                Alongside services, we build our own products, <span className="text-bone">Ocean ERP</span> and our{" "}
                <span className="text-bone">Vehicle Tracking System</span>, designed to simplify operations and improve
                productivity.
              </p>
              <p>
                We believe technology is a strategic asset, not just software. A commitment to quality, transparency and
                customer satisfaction has made us a trusted partner for organisations that need reliable, cost-effective
                IT.
              </p>
            </div>

            <div className="grid content-start gap-10">
              <dl className="grid gap-px border border-line bg-line">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-6 bg-ink px-6 py-5">
                    <dt className="text-fog">{s.label}</dt>
                    <dd className="font-pixel text-3xl text-signal">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="text-sm text-fog">Industries we serve</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {industries.map((name) => (
                    <li key={name} className="border border-line bg-coal/60 px-3 py-1.5 text-sm text-bone/85">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Capabilities index={2} />
      <Work index={3} />
      <Contact index={4} />
    </>
  );
}
