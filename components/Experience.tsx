import Image from "next/image";
import { pillColor } from "@/lib/pill-color";

interface ExperienceEntry {
  company: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  brandColor: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
  tech: string[];
}

const experiences: ExperienceEntry[] = [
  {
    company: "University at Buffalo",
    logo: "/logos/ub.png",
    logoWidth: 120,
    logoHeight: 40,
    brandColor: "#005BBB",
    role: "Software Engineer Intern",
    location: "Buffalo, NY",
    dates: "Jan 2026 – Present",
    bullets: [
      "Maintaining and scaling an academic TraceTool used in CSE 115/116, supporting 500+ students annually and 5,000+ submissions per semester.",
      "Contributing to system design for multi-institution deployment, improving concurrency and scalability to reliably handle 5,000+ submissions per semester under peak load.",
    ],
    tech: [],
  },
  {
    company: "Kapsch TrafficCom",
    logo: "/logos/kapsch.png",
    logoWidth: 160,
    logoHeight: 40,
    brandColor: "#231F20",
    role: "Software Engineer Intern",
    location: "Duluth, GA",
    dates: "May 2025 – Aug 2025",
    bullets: [
      "Engineered 40+ automated end-to-end tests within a two-week Agile release cycle for the DYNAC traffic management platform using Ranorex and Selenium, reducing manual regression testing by 6 hours per release.",
      "Built CI/CD pipelines in GitLab CI triggering automated test suites on every commit, reducing manual QA effort from 4h → 30m and surfacing 12 defects before staging.",
    ],
    tech: ["Selenium", "Ranorex", "GitLab CI"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-b border-slate-200">
      <div className="max-w-portfolio mx-auto px-5 sm:px-10 py-14">
        <h2 className="font-heading text-[22px] font-extrabold text-slate-900 tracking-tight mb-7">
          Experience
        </h2>
        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-900 hover:shadow-sm transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 flex items-center h-8">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={exp.logoWidth}
                      height={exp.logoHeight}
                      className="object-contain h-7 w-auto"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="font-heading text-[14px] font-extrabold leading-tight"
                      style={{ color: exp.brandColor }}
                    >
                      {exp.company}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{exp.role}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-slate-400 whitespace-nowrap">{exp.dates}</p>
                  <p className="text-[10px] text-slate-400 whitespace-nowrap">{exp.location}</p>
                </div>
              </div>

              <ul className={`space-y-1.5 ${exp.tech.length > 0 ? "mb-4" : ""}`}>
                {exp.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-xs text-slate-600 leading-relaxed"
                  >
                    <span className="text-slate-300 mt-0.5 shrink-0" aria-hidden="true">
                      ▸
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => {
                    const c = pillColor(t);
                    return (
                      <span
                        key={t}
                        className={`text-[10px] border px-2 py-0.5 rounded-full ${c.bg} ${c.text} ${c.border}`}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
