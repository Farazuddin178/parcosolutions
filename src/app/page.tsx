import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Systems } from "@/components/sections/Systems";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Solutions } from "@/components/sections/Solutions";
import { Platforms } from "@/components/sections/Platforms";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Systems />
      <Process />
      <Work />
      <Solutions />
      <Platforms />
      <About index={7} />
      <Contact index={8} />
    </>
  );
}
