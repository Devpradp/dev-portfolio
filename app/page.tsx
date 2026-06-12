import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="bg-slate-50">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Footer />
      </div>
    </>
  );
}
