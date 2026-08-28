import { Github, Linkedin, Mail } from "lucide-react";
import { ElementType } from "react";
import Image from "next/image";

const socialLinks: {
  label: string;
  href: string;
  icon: ElementType;
  ariaLabel: string;
  external: boolean;
}[] = [
  {
    label: "GitHub",
    href: "https://github.com/devpradp",
    icon: Github,
    ariaLabel: "GitHub profile",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/devpradeep-swe",
    icon: Linkedin,
    ariaLabel: "LinkedIn profile",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:dev.pradeep@outlook.com",
    icon: Mail,
    ariaLabel: "Send email to Dev Pradeep",
    external: false,
  },
];

export default function Hero() {
  return (
    <section
      id="about"
      className="max-w-portfolio mx-auto px-5 sm:px-10 pt-16 pb-14 sm:pt-20 sm:pb-16 flex flex-col-reverse sm:flex-row sm:items-start gap-10 border-b border-slate-200"
    >
      {/* Left: text */}
      <div className="flex-1 w-full">
        <p className="rise-1 text-xs tracking-[2px] uppercase text-slate-500 mb-3 font-body">
          Software Engineer
        </p>
        <h1 className="rise-2 font-heading text-5xl sm:text-[52px] font-black leading-none tracking-tighter text-slate-900">
          Dev
          <br />
          Pradeep
        </h1>
        <p className="rise-3 text-lg text-slate-600 font-medium mt-3">
          CS @ University at Buffalo · Class of&nbsp;2027
        </p>
        <p className="rise-3 text-base text-slate-500 leading-relaxed mt-3 max-w-[420px]">
          Software Engineer at OneAuris. Building AI-powered systems and full-stack products. 2× SWE intern.
        </p>

        {/* Primary CTAs */}
        <div className="rise-4 flex gap-3 mt-6 flex-wrap">
          <a
            href="#projects"
            className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-slate-700 motion-safe:hover:-translate-y-px active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-300 text-slate-600 text-sm font-medium px-5 py-2.5 rounded-md hover:border-slate-500 hover:text-slate-900 motion-safe:hover:-translate-y-px active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            Resume ↗
          </a>
        </div>

        {/* Social icon buttons */}
        <div className="rise-4 flex gap-2 mt-4 flex-wrap">
          {socialLinks.map(({ label, href, icon: Icon, ariaLabel, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={ariaLabel}
              className="inline-flex items-center gap-1.5 border border-slate-200 bg-white text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md hover:border-slate-400 hover:shadow-sm motion-safe:hover:-translate-y-px active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
            >
              <Icon size={14} strokeWidth={2} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Right: profile photo */}
      <div className="rise-5 flex-shrink-0">
        <Image
          src="/profile-720.jpg"
          alt="Dev Pradeep"
          width={240}
          height={240}
          sizes="(max-width: 640px) 208px, 240px"
          className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl object-cover border border-slate-200"
          priority
        />
      </div>
    </section>
  );
}
