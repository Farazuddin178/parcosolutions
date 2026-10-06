import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { systemTypes } from "@/content/site";
import { IconTile } from "../Icon";
import { Button, Container, Divider, Figure, SectionIntro } from "../ui";
import { Reveal } from "../Reveal";

export function Systems() {
  return (
    <section id="systems" className="smoke relative py-24 lg:py-32">
      <Container>
        <Divider index={2} title="Management systems" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionIntro
              tag="Built to fit"
              title="Systems shaped around your workflow"
              body="Every record, task and document for your operation in one secure place, organised the way your team already works."
            />
            <Figure
              src="/images/svc-management.webp"
              alt="Hand arranging workflow cards on a whiteboard process map"
              caption="Mapped to your process first"
              index={1}
              live
              ratio="aspect-[16/10]"
              className="mt-10"
              sizes="(min-width: 1024px) 540px, 100vw"
            />
            <div className="mt-8">
              <Button href="/service/management-systems/" arrow>
                Explore management systems
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {systemTypes.map((t) => (
                <li key={t.title} className="flex flex-col gap-5 bg-ink p-7 transition-colors hover:bg-coal">
                  <IconTile name={t.icon} />
                  <div>
                    <h3 className="font-display text-xl text-bone">{t.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-fog">{t.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/contact-us/"
              className="group mt-6 flex items-center justify-between gap-4 border border-dashed border-ash px-6 py-5 text-fog transition-colors hover:border-signal/50 hover:text-bone"
            >
              <span>Need something different? Most of our systems start as a conversation.</span>
              <ArrowRight size={18} className="flex-none text-signal transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
