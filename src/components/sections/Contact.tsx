import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { ContactForm } from "../ContactForm";
import { Container, Divider } from "../ui";
import { Reveal } from "../Reveal";

export function ContactDetails() {
  const row = "flex gap-4 border-t border-line py-5";
  const label = "font-pixel text-[10px] uppercase tracking-[0.16em] text-dim";
  return (
    <ul className="border-b border-line">
      <li className={row}>
        <Phone size={20} className="mt-1 flex-none text-signal" aria-hidden />
        <div>
          <p className={label}>Call</p>
          <a href={site.phoneHref} className="mt-1 block text-lg text-bone hover:text-signal">
            {site.phone}
          </a>
        </div>
      </li>
      <li className={row}>
        <EnvelopeSimple size={20} className="mt-1 flex-none text-signal" aria-hidden />
        <div>
          <p className={label}>Email</p>
          <a href={`mailto:${site.email}`} className="mt-1 block text-lg text-bone hover:text-signal">
            {site.email}
          </a>
        </div>
      </li>
      <li className={row}>
        <MapPin size={20} className="mt-1 flex-none text-signal" aria-hidden />
        <div>
          <p className={label}>Office</p>
          <a
            href={site.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block leading-relaxed text-bone hover:text-signal"
          >
            {site.address.join(", ")}
          </a>
        </div>
      </li>
    </ul>
  );
}

export function Contact({ index = 7 }: { index?: number }) {
  return (
    <section id="contact" className="smoke relative py-24 lg:py-32">
      <Container>
        <Divider index={index} title="Start a project" />
        <div className="mt-14 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <h2 className="display-shadow font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl">
              Tell us what you need built
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-fog">
              Share a few details and the right specialist will get in touch to talk through scope, timeline and budget.
            </p>
            <div className="mt-10">
              <ContactDetails />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
