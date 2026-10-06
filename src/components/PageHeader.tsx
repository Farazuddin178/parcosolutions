import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./ui";
import { Reveal } from "./Reveal";
import { asset } from "@/lib/asset";

/** Top of every inner page: breadcrumb, headline, lead and an optional visual. */
export function PageHeader({
  crumb,
  title,
  lead,
  children,
  aside,
}: {
  crumb: { label: string; href?: string }[];
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-cover bg-center opacity-20 [mask-image:linear-gradient(180deg,#000,transparent_80%)]"
        style={{ backgroundImage: `url(${asset("/images/dither-circuit.png")})` }}
      />
      <Container className="relative">
        <div className={`grid gap-12 ${aside ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16" : ""}`}>
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 font-pixel text-[10px] uppercase tracking-[0.16em] text-dim">
                <li>
                  <Link href="/" className="hover:text-signal">
                    Home
                  </Link>
                </li>
                {crumb.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    {c.href ? (
                      <Link href={c.href} className="hover:text-signal">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-fog">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className="display-shadow mt-6 max-w-[16ch] font-display text-[2.6rem] font-medium leading-[1.03] tracking-tight text-bone sm:text-6xl lg:text-[4.4rem]">
              {title}
            </h1>
            {lead && <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-fog sm:text-xl">{lead}</p>}
            {children}
          </Reveal>
          {aside && <Reveal delay={0.12}>{aside}</Reveal>}
        </div>
      </Container>
    </section>
  );
}
