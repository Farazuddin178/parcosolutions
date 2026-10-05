import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Products } from "@/components/sections/Products";
import { Enterprise } from "@/components/sections/Enterprise";
import { Work } from "@/components/sections/Work";
import { Solutions } from "@/components/sections/Solutions";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Products />
      <Enterprise />
      <Work />
      <Solutions />
      <About />
      <Contact />
    </>
  );
}
