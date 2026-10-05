import { Container, Divider, SectionIntro } from "../ui";
import { Reveal } from "../Reveal";
import { SolutionTabs } from "../SolutionTabs";

export function Solutions() {
  return (
    <section id="solutions" className="smoke relative py-24 lg:py-32">
      <Container>
        <Divider index={5} title="Solutions" />
        <div className="mt-12">
          <Reveal>
            <SectionIntro
              title="Cloud, AI and data, put to work"
              body="Modern infrastructure and intelligence layered onto the systems you already rely on."
            />
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <SolutionTabs />
        </Reveal>
      </Container>
    </section>
  );
}
