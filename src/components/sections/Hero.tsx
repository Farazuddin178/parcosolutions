import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button, Container } from "../ui";
import { Reveal } from "../Reveal";
import { TypeLoop } from "../TypeLoop";
import { MatrixRain } from "../fx/MatrixRain";
import { HeroCore } from "../fx/HeroCore";
import { Scramble } from "../fx/Scramble";

const modules = [
  { title: "Custom software", line: "Built to your process", href: "/service/custom-software/" },
  { title: "Management systems", line: "Every record in one place", href: "/service/management-systems/" },
  { title: "Websites", line: "Designed, built and hosted", href: "/service/web-development/" },
  { title: "IT solutions", line: "Cloud, AI and data", href: "/solutions/" },
];

function Module({ title, line, href, side }: (typeof modules)[number] & { side: "left" | "right" }) {
  return (
    <Link
      href={href}
      className="group relative block border border-signal/25 bg-signal/[0.03] px-5 pb-4 pt-6 transition-colors hover:border-signal/60 hover:bg-signal/[0.07]"
    >
      <span className="absolute -top-2.5 left-3 bg-[#010402] px-2 font-pixel text-[11px] uppercase tracking-wider text-signal">
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
      {/* Digital rain framing the hero on both sides */}
      <div aria-hidden className="mask-sides pointer-events-none absolute inset-x-0 top-0 h-[1100px] opacity-70">
        <MatrixRain />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_at_50%_20%,transparent_30%,var(--color-ink)_75%)]"
      />
      {/* Green light pool behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[900px] max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(0_200_100/0.22),rgb(198_255_61/0.06)_45%,transparent_70%)]"
      />

      <Container className="relative text-center">
        <Reveal>
          <p className="mx-auto mb-7 inline-flex items-center gap-2.5 border border-signal/30 bg-signal/[0.06] px-3.5 py-1.5 font-pixel text-[11px] uppercase tracking-[0.16em] text-signal-hi">
            <span className="gem scale-75" />
            <Scramble text="IT solutions company" />
          </p>
          <h1 className="display-shadow mx-auto max-w-[20ch] text-balance font-display text-[2.6rem] leading-[1.04] text-bone sm:text-6xl lg:text-[4.9rem]">
            Custom software and websites, <span className="text-grad">built for your business</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[54ch] text-lg leading-relaxed text-fog sm:text-xl">
            We build management systems, custom applications and websites around the way your team actually works.
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
                <p className="font-pixel text-sm uppercase tracking-[0.2em] text-signal sm:text-base">What we build</p>
                <TypeLoop className="font-pixel text-[11px] text-signal/80 sm:text-xs" />
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,1.1fr)_1fr] lg:items-center lg:gap-12">
                <div className="order-2 grid gap-6 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-10">
                  <Module {...modules[0]} side="left" />
                  <Module {...modules[1]} side="left" />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="brackets relative aspect-square border border-signal/20 bg-[radial-gradient(circle_at_50%_50%,rgb(57_255_136/0.1),transparent_65%)] sm:aspect-[16/10] lg:aspect-[4/5]">
                    <HeroCore />
                    <p className="pointer-events-none absolute bottom-4 left-0 right-0 hidden text-center font-pixel text-[10px] uppercase tracking-[0.2em] text-signal/60 [@media(pointer:fine)]:block">
                      Drag to spin
                    </p>
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
              <div className="notch bg-[#08100b] px-4 py-2.5 shadow-[inset_0_2px_0_rgb(0_0_0/0.6),inset_0_-1px_0_rgb(255_255_255/0.08)] sm:px-6 sm:py-3">
                <span className="display-shadow font-pixel text-base tracking-[0.2em] text-bone/90 sm:text-2xl">
                  PARCO SOLUTIONS
                </span>
              </div>
              <div aria-hidden className="hidden flex-1 flex-col gap-1.5 sm:flex">
                <span className="h-1 w-40 bg-black/50" />
                <span className="h-1 w-40 bg-black/50" />
              </div>
              <div aria-hidden className="ml-auto hidden h-8 w-32 items-end bg-black/50 p-1 sm:flex">
                <span className="h-2 w-full bg-signal/70 shadow-[0_0_10px_rgb(57_255_136/0.5)]" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
