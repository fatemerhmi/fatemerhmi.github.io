import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Publications from "@/components/Publications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedProjects />
        <WorkExperience />
        <Skills />
        <Publications />
        <Education />
        <Contact />
      </main>
    </>
  );
}
