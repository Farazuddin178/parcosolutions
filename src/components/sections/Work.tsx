import Image from "next/image";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { work, type CaseStudy } from "@/content/site";
import { Container, Divider, SectionIntro, Tag } from "../ui";
import { Reveal } from "../Reveal";

function CaseCard({ study, ratio, sizes }: { study: CaseStudy; ratio: string; sizes: string }) {
  return (
    <article className="group">
      <div className="relative">
        <div className={`duo duo-live brackets ${ratio} border border-line`}>
          <Image src={study.image} alt={study.imageAlt} fill sizes={sizes} className="object-cover" />
        </div>
        {study.detailImage && (
          <div className="duo absolute -bottom-8 right-5 hidden aspect-[4/3] w-[38%] border-4 border-ink shadow-[0_20px_50px_rgb(0_0_0/0.6)] sm:block">
            <Image src={study.detailImage} alt={study.detailAlt ?? ""} fill sizes="300px" className="object-cover" />
          </div>
        )}
      </div>

      <div className="mt-10 sm:mt-14">
        <p className="font-pixel text-[10px] uppercase tracking-[0.18em] text-dim">{study.sector}</p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-bone sm:text-4xl">{study.client}</h3>
        <p className="mt-1 text-fog">{study.role}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Delivered">
          {study.deliverables.map((d) => (
            <li key={d}>
              <Tag>{d}</Tag>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[56ch] leading-relaxed text-fog">{study.summary}</p>
        <ul className="mt-6 grid gap-2.5">
          {study.points.map((p) => (
            <li key={p} className="flex gap-3 text-[15px] text-bone/85">
              <Check size={16} weight="bold" className="mt-1 flex-none text-signal" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        {study.url && (
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-pixel text-[11px] uppercase tracking-wider text-signal hover:text-signal-hi"
          >
            Visit site <ArrowUpRight size={12} weight="bold" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

export function Work({ index = 4 }: { index?: number }) {
  const [first, second] = work;
  return (
    <section id="work" className="smoke relative py-24 lg:py-32">
      <Container>
        <Divider index={index} title="Selected work" />
        <div className="mt-12">
          <Reveal>
            <SectionIntro
              title="Recent work, built end to end"
              body="Custom builds for clients in law and healthcare, from the first conversation to launch and ongoing support."
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <CaseCard study={first} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 720px, 100vw" />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:mt-40">
            <CaseCard study={second} ratio="aspect-[4/3] lg:aspect-[5/6]" sizes="(min-width: 1024px) 520px, 100vw" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
