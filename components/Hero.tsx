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
        <p className="text-[11px] tracking-[2px] uppercase text-slate-400 mb-3 font-body">
          Software Engineer
        </p>
        <h1 className="font-heading text-5xl sm:text-[52px] font-black leading-none tracking-tighter text-slate-900">
          Dev
          <br />
          Pradeep
        </h1>
        <p className="text-lg text-slate-600 font-medium mt-3">
          CS @ University at Buffalo · Class of&nbsp;2027
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mt-3 max-w-[380px]">
          Building AI-powered systems and full-stack products. 2× SWE intern.
        </p>

        {/* Primary CTAs */}
        <div className="flex gap-3 mt-6 flex-wrap">
          <a
            href="#projects"
            className="bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            View Projects
          </a>
          <a
            href="https://1drv.ms/b/c/baac359db7beec33/IQBhattP8cB8QrQKh8ILoM1wAQZQu55smPDSXs4aIpGfRiQ?e=oHBD0H"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-300 text-slate-600 text-xs font-medium px-5 py-2.5 rounded-md hover:border-slate-500 hover:text-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            Resume ↗
          </a>
        </div>

        {/* Social icon buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {socialLinks.map(({ label, href, icon: Icon, ariaLabel, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={ariaLabel}
              className="inline-flex items-center gap-1.5 border border-slate-200 bg-white text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-md hover:border-slate-400 hover:shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
            >
              <Icon size={13} strokeWidth={2} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Right: profile photo */}
      <div className="flex-shrink-0">
        <Image
          src="/profile.JPG"
          alt="Dev Pradeep"
          width={160}
          height={160}
          className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl object-cover border border-slate-200"
          priority
        />
      </div>
    </section>
  );
}
