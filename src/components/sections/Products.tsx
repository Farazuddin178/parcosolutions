import { getService } from "@/content/site";
import { IconTile } from "../Icon";
import { Button, Container, Divider, Figure, SectionIntro } from "../ui";
import { Reveal } from "../Reveal";

const rows = [
  {
    slug: "oceanerp",
    title: "Ocean ERP",
    body: "Finance, inventory, purchasing, sales, projects and HR in a single database, with workflow and reporting built in. First-class functionality at a low cost of ownership.",
    cta: "Explore Ocean ERP",
    image: "/images/svc-oceanerp.webp",
    caption: "Finance to HR, one database",
  },
  {
    slug: "vts",
    title: "Vehicle Tracking System",
    body: "GPS/GPRS trackers and a central dashboard for live location, geofencing, SMS queries and trip history. Built for school buses, fleets, taxis and security teams.",
    cta: "Explore fleet tracking",
    image: "/images/svc-vts-fleet.webp",
    caption: "Live location across the fleet",
  },
] as const;

export function Products() {
  return (
    <section id="products" className="smoke relative py-24 lg:py-32">
      <Container>
        <Divider index={2} title="Products" />
        <div className="mt-12">
          <Reveal>
            <SectionIntro
              tag="Built in-house"
              title="Two products we build, run and support"
              body="Our own platforms, refined over years of deployments. Use them as they are or have them tailored to your operation."
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 lg:gap-24">
          {rows.map((row, i) => {
            const service = getService(row.slug)!;
            const card = (
              <div className="flex h-full flex-col justify-between border border-line bg-coal/50 p-7 sm:p-10">
                <div>
                  <IconTile name={service.icon} size={24} />
                  <h3 className="mt-7 text-2xl font-medium text-bone sm:text-[1.7rem]">{row.title}</h3>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-fog">{row.body}</p>
                </div>
                <div className="mt-10">
                  <Button href={`/service/${row.slug}/`} arrow>
                    {row.cta}
                  </Button>
                </div>
              </div>
            );
            const figure = (
              <Figure
                src={row.image}
                alt={service.imageAlt}
                caption={row.caption}
                index={i + 1}
                live
                ratio="aspect-[16/11]"
                sizes="(min-width: 1024px) 760px, 100vw"
              />
            );
            return (
              <Reveal
                key={row.slug}
                className={`grid gap-6 lg:items-stretch ${i % 2 === 0 ? "lg:grid-cols-[0.75fr_1.25fr]" : "lg:grid-cols-[1.25fr_0.75fr]"}`}
              >
                {i % 2 === 0 ? (
                  <>
                    {card}
                    {figure}
                  </>
                ) : (
                  <>
                    <div className="order-2 lg:order-1">{figure}</div>
                    <div className="order-1 lg:order-2">{card}</div>
                  </>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
