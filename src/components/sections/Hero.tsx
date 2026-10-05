import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button, Container } from "../ui";
import { Reveal } from "../Reveal";
import { stats } from "@/content/site";

const modules = [
  { title: "Enterprise and SAP", line: "Implement, upgrade, roll out", href: "/service/sap/" },
  { title: "Ocean ERP", line: "Finance to HR, one system", href: "/service/oceanerp/" },
  { title: "Web and apps", line: "Sites and systems that ship", href: "/service/web-development/" },
  { title: "Fleet tracking", line: "Every vehicle, live", href: "/service/vts/" },
];

function Module({ title, line, href, side }: (typeof modules)[number] & { side: "left" | "right" }) {
  return (
    <Link
      href={href}
      className="group relative block border border-signal/25 bg-signal/[0.03] px-5 pb-4 pt-6 transition-colors hover:border-signal/60 hover:bg-signal/[0.07]"
    >
      <span className="absolute -top-2.5 left-3 bg-[#0a0c0b] px-2 font-pixel text-[11px] uppercase tracking-wider text-signal">
        {title}
      </span>
      <span className="block font-pixel text-[10px] uppercase tracking-wider text-signal/60">{line}</span>
      <span className="mt-5 flex justify-end">
        <span className="inline-flex items-center gap-1.5 border border-signal/40 px-2.5 py-1 font-pixel text-[10px] uppercase tracking-wider text-signal transition-colors group-hover:bg-signal group-hover:text-ink">
          Explore <ArrowUpRight size={11} weight="bold" aria-hidden />
        </span>
      </span>
      {/* connector line towards the core image (desktop) */}
      <span
        aria-hidden
        className={`absolute top-1/2 hidden h-px w-6 bg-signal/40 lg:block ${side === "left" ? "-right-6" : "-left-6"}`}
      />
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-36">
      {/* Dithered circuit-board halftone framing the hero, like engraved side art. */}
      <div
        aria-hidden
        className="mask-sides pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url(/images/dither-circuit.png)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_at_50%_20%,transparent_30%,var(--color-ink)_75%)]"
      />

      <Container className="relative text-center">
        <Reveal>
          <h1 className="display-shadow mx-auto max-w-[21ch] text-balance font-display text-[2.7rem] font-medium leading-[1.02] tracking-tight text-bone sm:text-6xl lg:text-[5.25rem]">
            Enterprise software, built around how you work
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[54ch] text-lg leading-relaxed text-fog sm:text-xl">
            Parco Solutions designs, builds and supports ERP, SAP, web and fleet tracking systems for growing businesses.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contact-us/" arrow>
            Start a project
          </Button>
          <Button href="/#work" variant="ghost">
            See our work
          </Button>
        </Reveal>

        {/* Console */}
        <Reveal delay={0.3} y={40} className="mx-auto mt-16 max-w-[1180px] text-left">
          <div className="bezel notch p-3 sm:p-5 lg:p-7">
            <div className="screen p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-4 border-b border-signal/20 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-pixel text-sm uppercase tracking-[0.2em] text-signal sm:text-base">Parco console</p>
                <ul className="flex flex-wrap gap-2">
                  {stats.map((s) => (
                    <li
                      key={s.label}
                      className="border border-signal/30 px-2.5 py-1 font-pixel text-[10px] uppercase tracking-wider text-signal/80"
                    >
                      {s.value} {s.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,1.1fr)_1fr] lg:items-center lg:gap-12">
                <div className="order-2 grid gap-6 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-10">
                  <Module {...modules[0]} side="left" />
                  <Module {...modules[1]} side="left" />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="duo brackets relative aspect-[16/10] border border-signal/20 lg:aspect-[4/5]">
                    <Image
                      src="/images/hero-circuit.webp"
                      alt="Glowing printed circuit board traces"
                      fill
                      priority
                      sizes="(min-width: 1024px) 420px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="order-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
                  <Module {...modules[2]} side="right" />
                  <Module {...modules[3]} side="right" />
                </div>
              </div>
            </div>

            {/* Nameplate */}
            <div className="mt-4 flex items-center gap-4 sm:mt-6 sm:gap-6">
              <div className="notch bg-[#151917] px-4 py-2.5 shadow-[inset_0_2px_0_rgb(0_0_0/0.6),inset_0_-1px_0_rgb(255_255_255/0.08)] sm:px-6 sm:py-3">
                <span className="display-shadow font-pixel text-base tracking-[0.2em] text-bone/90 sm:text-2xl">
                  PARCO SOLUTIONS
                </span>
              </div>
              <div aria-hidden className="hidden flex-1 flex-col gap-1.5 sm:flex">
                <span className="h-1 w-40 bg-black/50" />
                <span className="h-1 w-40 bg-black/50" />
              </div>
              <div aria-hidden className="ml-auto hidden h-8 w-32 items-end bg-black/50 p-1 sm:flex">
                <span className="h-2 w-full bg-signal/70 shadow-[0_0_10px_rgb(150_201_61/0.5)]" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
