import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="bg-slate-50 min-h-screen">
        <Hero />
        <Projects />
        <Skills />
      </div>
    </>
  );
}
