import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="bg-slate-50">
        <FadeIn>
          <Hero />
        </FadeIn>
        <FadeIn delay={50}>
          <Projects />
        </FadeIn>
        <FadeIn delay={50}>
          <Skills />
        </FadeIn>
        <FadeIn delay={50}>
          <Contact />
        </FadeIn>
        <Footer />
      </div>
    </>
  );
}
