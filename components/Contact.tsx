import { Github, Linkedin, Mail } from "lucide-react";
import { ElementType } from "react";

interface ContactCard {
  name: string;
  handle: string;
  href: string;
  icon: ElementType;
  ariaLabel: string;
  external: boolean;
}

const cards: ContactCard[] = [
  {
    name: "GitHub",
    handle: "github.com/devpradp",
    href: "https://github.com/devpradp",
    icon: Github,
    ariaLabel: "GitHub profile — github.com/devpradp",
    external: true,
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/devpradeep-swe",
    href: "https://linkedin.com/in/devpradeep-swe",
    icon: Linkedin,
    ariaLabel: "LinkedIn profile — linkedin.com/in/devpradeep-swe",
    external: true,
  },
  {
    name: "Email",
    handle: "dev.pradeep@outlook.com",
    href: "mailto:dev.pradeep@outlook.com",
    icon: Mail,
    ariaLabel: "Send email to dev.pradeep@outlook.com",
    external: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-b border-slate-200">
      <div className="max-w-portfolio mx-auto px-5 sm:px-10 py-14">
        <h2 className="font-heading text-[22px] font-extrabold text-slate-900 tracking-tight mb-7">
          Get in touch
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map(({ name, handle, href, icon: Icon, ariaLabel, external }) => (
            <a
              key={name}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={ariaLabel}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-1 hover:border-slate-900 hover:shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 group cursor-pointer"
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-slate-400 group-hover:text-slate-700 transition-colors duration-150"
              />
              <p className="font-heading text-[13px] font-extrabold text-slate-900 mt-1">
                {name}
              </p>
              <p className="text-[11px] text-slate-500 break-all">{handle}</p>
              <span className="text-[11px] text-slate-400 mt-auto pt-3" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
