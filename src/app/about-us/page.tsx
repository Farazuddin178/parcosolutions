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
    "Parco Solutions is an IT solutions company that builds custom software, management systems, websites and mobile apps for businesses.",
  alternates: { canonical: "/about-us/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb={[{ label: "About" }]}
        title="We build the software your business runs on"
        lead="An IT solutions company building custom software, management systems and websites around the way our clients actually work."
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
                <span className="text-bone">Parco Solutions</span> builds custom software for businesses that have
                outgrown spreadsheets, paper registers and one-size-fits-all tools: management systems, client portals,
                websites and mobile apps, each shaped around how the client works.
              </p>
              <p>
                Our team combines technical excellence, industry knowledge and a customer-centric approach. From startups
                to large enterprises, we take the time to understand each client&apos;s challenges and build customised
                solutions that drive measurable results.
              </p>
              <p>
                Our work ranges from a Case Management System for a High Court advocate to a website for a
                multi-speciality hospital. We also implement SAP and ERP, provide IT staffing and corporate training, and
                offer our own <span className="text-bone">Ocean ERP</span> and{" "}
                <span className="text-bone">Vehicle Tracking System</span>.
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
