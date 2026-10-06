import Image from "next/image";
import { industries, stats } from "@/content/site";
import { Button, Container, Divider } from "../ui";
import { Reveal } from "../Reveal";

export function About({ index = 7 }: { index?: number }) {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <Container>
        <Divider index={index} title="About Parco" />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="relative">
            <div className="duo brackets relative aspect-[5/4] border border-line">
              <Image
                src="/images/about-team.webp"
                alt="Developers collaborating around a table with laptops"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            {/* halftone corner, echoing the hero side art */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-10 hidden size-48 bg-cover opacity-40 [mask-image:radial-gradient(circle,#000_30%,transparent_70%)] lg:block"
              style={{ backgroundImage: "url(/images/dither-circuit.png)" }}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="display-shadow font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl">
              A technology partner for the long run
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-fog">
              Parco Solutions is an IT solutions company. We build custom software, management systems and websites for
              practices, hospitals, schools and growing businesses, then host, support and improve them.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-px border border-line bg-line">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink px-4 py-5 sm:px-6">
                  <dt className="text-xs text-fog sm:text-sm">{s.label}</dt>
                  <dd className="mt-2 font-pixel text-2xl text-signal sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 text-sm text-fog">Industries we serve</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {industries.map((name) => (
                <li key={name} className="border border-line bg-coal/60 px-3 py-1.5 text-sm text-bone/85">
                  {name}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="/about-us/" variant="ghost" arrow>
                About Parco
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
