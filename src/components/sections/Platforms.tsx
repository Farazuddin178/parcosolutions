import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { enterpriseServices } from "@/content/site";
import { IconTile } from "../Icon";
import { Container, Divider, Figure } from "../ui";
import { Reveal } from "../Reveal";

export function Platforms({ index = 6 }: { index?: number }) {
  return (
    <section id="platforms" className="relative py-24 lg:py-32">
      <Container>
        <Divider index={index} title="Enterprise platforms" />
        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="display-shadow font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
              Enterprise platforms and our own products
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-fog">
              Alongside custom builds, we implement and support SAP and ERP, and offer our own Ocean ERP and Vehicle
              Tracking System.
            </p>
            <Figure
              src="/images/it-infra.webp"
              alt="Engineer with a laptop walking past illuminated server racks"
              ratio="aspect-[16/10]"
              className="mt-10"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-b border-line">
              {enterpriseServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/service/${s.slug}/`}
                    className="group flex items-center gap-6 border-t border-line py-7 transition-colors hover:bg-coal/60 sm:px-4"
                  >
                    <IconTile name={s.icon} />
                    <span className="flex-1">
                      <span className="block font-display text-2xl text-bone transition-colors group-hover:text-signal">
                        {s.name}
                      </span>
                      <span className="mt-1.5 block leading-relaxed text-fog">{s.short}</span>
                    </span>
                    <ArrowRight
                      size={20}
                      className="flex-none text-signal transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
