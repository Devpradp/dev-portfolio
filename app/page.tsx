import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="bg-slate-50 min-h-screen">
        <Hero />
      </div>
    </>
  );
}
