import { Button, Container, Lamp } from "@/components/ui";
import { asset } from "@/lib/asset";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80dvh] place-items-center overflow-hidden pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20 [mask-image:radial-gradient(circle,#000_20%,transparent_70%)]"
        style={{ backgroundImage: `url(${asset("/images/dither-circuit.png")})` }}
      />
      <Container className="relative text-center">
        <div className="flex justify-center gap-6">
          <Lamp />
          <Lamp />
        </div>
        <p className="mt-6 font-pixel text-sm uppercase tracking-[0.2em] text-signal">Error 404</p>
        <h1 className="display-shadow mt-4 font-display text-5xl text-bone sm:text-6xl">This page is not here</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-fog">
          The link may be old or the page may have moved during our redesign.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/contact-us/" variant="ghost">
            Start a project
          </Button>
        </div>
      </Container>
    </section>
  );
}
