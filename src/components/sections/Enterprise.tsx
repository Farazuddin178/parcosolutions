import Image from "next/image";
import { getService } from "@/content/site";
import { Button, Container, Divider } from "../ui";
import { Reveal } from "../Reveal";

const modules = ["SAP FICO", "SAP SD", "SAP MM", "SAP PP", "SAP CRM", "NetWeaver", "Microsoft Dynamics", "Ocean ERP"];

export function Enterprise() {
  const sap = getService("sap")!;
  const offers = sap.sections[0].items;

  return (
    <section id="enterprise" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="duo absolute inset-0">
        <Image src={sap.image} alt="" fill sizes="100vw" className="object-cover opacity-90" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink)_0%,rgb(11_13_12/0.55)_30%,rgb(11_13_12/0.7)_70%,var(--color-ink)_100%)]"
      />

      <Container className="relative">
        <Divider index={3} title="Enterprise" />
        <Reveal className="mt-12 max-w-3xl">
          <h2 className="display-shadow font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-[3.4rem]">
            SAP and ERP, from blueprint to rollout
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-bone/80 sm:text-xl">
            Certified consultants, packaged methodologies and a vendor-neutral view of ERP keep time, cost and risk in
            check.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/service/sap/" arrow>
              SAP services
            </Button>
            <Button href="/service/erp/" variant="ghost">
              ERP services
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => (
            <div key={o.title} className="bg-ink/90 p-7 backdrop-blur-sm">
              <h3 className="font-pixel text-xs uppercase tracking-wide text-signal">{o.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fog">{o.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>

      {/* Module marquee (the one marquee on the page) */}
      <div className="relative mt-16 overflow-hidden border-y border-line bg-ink/80 py-4" aria-label="Platforms we work with">
        <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
          {[...modules, ...modules].map((m, i) => (
            <span
              key={i}
              aria-hidden={i >= modules.length}
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
