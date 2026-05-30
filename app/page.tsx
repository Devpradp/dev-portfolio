import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
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
          <Experience />
        </FadeIn>
        <FadeIn delay={50}>
          <Projects />
        </FadeIn>
        <FadeIn delay={50}>
          <Skills />
        </FadeIn>
        <Footer />
      </div>
    </>
  );
}
