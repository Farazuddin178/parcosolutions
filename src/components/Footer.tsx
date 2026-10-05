import Link from "next/link";
import Image from "next/image";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { nav, services, site } from "@/content/site";
import { Container } from "./ui";

const heading = "font-pixel text-[10px] uppercase tracking-[0.18em] text-dim";
const link = "text-[15px] text-fog transition-colors hover:text-signal";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-coal/60">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image src="/parco-mark.png" alt="" width={210} height={271} className="h-10 w-auto" />
            <span className="font-pixel text-xs uppercase tracking-[0.14em] text-bone">Parco Solutions</span>
          </Link>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-fog">{site.description}</p>
        </div>

        <div>
          <p className={heading}>Services</p>
          <ul className="mt-4 grid gap-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/service/${s.slug}/`} className={link}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={heading}>Company</p>
          <ul className="mt-4 grid gap-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact-us/" className={link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className={heading}>Office</p>
          <ul className="mt-4 grid gap-4 text-[15px] text-fog">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 flex-none text-signal" aria-hidden />
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 flex-none text-signal" aria-hidden />
              <a href={site.phoneHref} className="hover:text-signal">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <EnvelopeSimple size={18} className="mt-0.5 flex-none text-signal" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-signal">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} PARCO Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy/" className="hover:text-bone">
              Privacy
            </Link>
            <Link href="/terms/" className="hover:text-bone">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
