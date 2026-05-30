import { ExternalLink } from "lucide-react";
import { pillColor } from "@/lib/pill-color";

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  name: string;
  badge: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
}

const projects: Project[] = [
  {
    name: "EDEN",
    badge: "AI · Security",
    description:
      "AI-powered security monitoring across 25+ live camera feeds. Detects incidents (fighting, theft, vandalism) with accuracy improving from 75% → 92%. Real-time dispatch via Twilio — response time 30m → 10m.",
    tags: [
      "TypeScript",
      "Next.js",
      "YOLO",
      "OpenCV",
      "PyTorch",
      "OpenAI",
      "Mapbox",
      "Twilio",
    ],
    links: [{ label: "GitHub", href: "https://github.com/devpradp" }],
  },
  {
    name: "LovaSlide",
    badge: "HackHarvard 2025",
    description:
      "AI tool that transforms documents into polished, data-driven presentations. 90% faster than Gamma AI. RAG pipeline cross-checks generated claims against live SerpAPI sources before render.",
    tags: ["Python", "Next.js", "FastAPI", "OpenAI API", "SerpAPI"],
    links: [{ label: "GitHub", href: "https://github.com/devpradp" }],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-b border-slate-200">
      <div className="max-w-portfolio mx-auto px-5 sm:px-10 py-14">
        <div className="flex justify-between items-baseline mb-7">
          <h2 className="font-heading text-[22px] font-extrabold text-slate-900 tracking-tight">
            Projects
          </h2>
          <a
            href="https://github.com/devpradp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-slate-500 hover:text-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 rounded"
          >
            github.com/devpradp ↗
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <article
              key={project.name}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-900 hover:shadow-sm transition-all duration-150"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-heading text-[15px] font-extrabold text-slate-900">
                  {project.name}
                </h3>
                <span className="text-[9px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full whitespace-nowrap ml-2 shrink-0">
                  {project.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => {
                  const c = pillColor(tag);
                  return (
                    <span
                      key={tag}
                      className={`text-[10px] border px-2 py-0.5 rounded-full ${c.bg} ${c.text} ${c.border}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              <div className="flex gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-900 hover:text-slate-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 rounded"
                  >
                    {link.label}
                    <ExternalLink size={10} strokeWidth={2.5} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
