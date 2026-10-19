import { FeaturedWork } from "@/components/featured-work";
import { Hero } from "@/components/hero";
import { Stats, TechMarquee } from "@/components/marquee";
import { Nav, ScrollProgress } from "@/components/nav";
import { Projects } from "@/components/projects";
import { About, Approach, Contact, Footer, Skills } from "@/components/sections";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <TechMarquee />
        <Stats />
        <FeaturedWork />
        <Projects />
        <Skills />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
