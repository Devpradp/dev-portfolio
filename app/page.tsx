import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import SideTrees from "@/components/SideTrees";

export default function Home() {
  return (
    <>
      {/* Fixed gutter trees — z-0 behind content, wide screens only */}
      <SideTrees />
      <Nav />
      {/* relative z-10 ensures the content column always paints above the z-0 trees */}
      <div className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Footer />
      </div>
    </>
  );
}
