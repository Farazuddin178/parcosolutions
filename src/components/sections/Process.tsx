import Image from "next/image";
import { process } from "@/content/site";
import { Icon } from "../Icon";
import { Button, Container, Divider } from "../ui";
import { Reveal } from "../Reveal";

const builds = [
  "Case management",
  "Hospital systems",
  "School management",
  "Inventory and billing",
  "HR and payroll",
  "CRM",
  "Client portals",
  "Business websites",
  "Mobile apps",
  "Dashboards",
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="duo absolute inset-0">
        <Image src="/images/process-team.webp" alt="" fill sizes="100vw" className="object-cover opacity-90" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink)_0%,rgb(6_8_12/0.6)_30%,rgb(6_8_12/0.75)_70%,var(--color-ink)_100%)]"
      />

      <Container className="relative">
        <Divider index={3} title="How we build" />
        <Reveal className="mt-12 max-w-3xl">
          <h2 className="display-shadow font-display text-4xl leading-[1.05] text-bone sm:text-5xl lg:text-[3.3rem]">
            From first conversation to <span className="text-grad">running software</span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-bone/80 sm:text-xl">
            A clear, four-step process so you always know what is being built, why, and when you will see it.
          </p>
          <div className="mt-9">
            <Button href="/contact-us/" arrow>
              Start a project
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <div key={step.title} className="bg-ink/90 p-7 backdrop-blur-sm">
              <span className="text-signal">
                <Icon name={step.icon} size={26} />
              </span>
              <h3 className="mt-5 font-display text-xl text-bone">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fog">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>

      {/* The one marquee on the page */}
      <div className="relative mt-16 overflow-hidden border-y border-line bg-ink/80 py-4" aria-label="Things we build">
        <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
          {[...builds, ...builds].map((m, i) => (
            <span
              key={i}
              aria-hidden={i >= builds.length}
              className="flex items-center gap-10 font-pixel text-sm uppercase tracking-[0.18em] text-fog"
            >
              {m}
              <span className="gem scale-75" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
