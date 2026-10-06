import Link from "next/link";
import { capabilities } from "@/content/site";
import { IconTile } from "../Icon";
import { Container, Divider, Lamp, SectionIntro } from "../ui";
import { Reveal } from "../Reveal";

export function HangingLamp({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex flex-col items-center ${className}`}>
      <span className="h-3 w-2 rounded-full border border-[#24452f]" />
      <span className="-mt-0.5 h-3 w-2 rounded-full border border-[#24452f]" />
      <span className="relative mt-0.5 grid h-12 w-9 place-items-end justify-center border-2 border-signal/55 bg-signal/[0.06] pb-1 shadow-[0_0_34px_rgb(57_255_136/0.25)]">
        <Lamp />
      </span>
    </div>
  );
}

export function Capabilities({ index = 1 }: { index?: number }) {
  return (
    <section id="capabilities" className="smoke relative py-24 lg:py-32">
      <Container>
        <Divider index={index} title="What we do" />
        <div className="mt-12">
          <Reveal>
            <SectionIntro
              title="Built around the work you already do"
              body="From a law practice to a hospital, we build the software, systems and websites your business runs on, then host and support them."
            />
          </Reveal>
        </div>

        <Reveal className="relative mt-16">
          <p className="mb-4 font-pixel text-[11px] uppercase tracking-[0.16em] text-fog">Capabilities</p>
          <HangingLamp className="absolute -top-14 right-8 hidden sm:flex" />
          <div className="frame px-5 py-10 sm:px-10 lg:px-12">
            <ul className="grid gap-x-12 gap-y-9 md:grid-cols-2">
              {capabilities.map((c) => {
                const body = (
                  <>
                    <IconTile name={c.icon} />
                    <span>
                      <span className="block font-pixel text-xs uppercase tracking-wide text-bone transition-colors group-hover:text-signal">
                        {c.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-fog">{c.body}</span>
                    </span>
                  </>
                );
                return (
                  <li key={c.title}>
                    {c.href ? (
                      <Link href={c.href} className="group flex gap-5">
                        {body}
                      </Link>
                    ) : (
                      <div className="flex gap-5">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
