import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactDetails } from "@/components/sections/Contact";
import { PageHeader } from "@/components/PageHeader";
import { Container, Figure } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to Parco Solutions about custom software, management systems, websites, mobile apps, ERP, cloud, AI or data projects.",
  alternates: { canonical: "/contact-us/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb={[{ label: "Contact" }]}
        title="Start a project with Parco"
        lead="Share a few details and the right specialist will get in touch to talk through scope, timeline and budget."
        aside={<ContactForm />}
      >
        <div className="mt-10">
          <ContactDetails />
        </div>
      </PageHeader>

      <section className="relative pb-24">
        <Container>
          <Reveal>
            <Figure
              src="/images/contact-office.webp"
              alt="Bright open-plan office corridor"
              ratio="aspect-[16/9] sm:aspect-[21/8]"
              sizes="100vw"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
