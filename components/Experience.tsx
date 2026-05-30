import Image from "next/image";

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
      "Working with course staff to ensure correct and consistent memory modeling and tracing behavior, improving reliability and clarity of the tool as student usage continues to grow.",
    ],
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
      "Identified and documented 15+ defects through automated UI and integration tests, improving release stability for a platform deployed across multiple municipal traffic operations centers.",
    ],
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
                  <div className="shrink-0 flex items-center h-8 bg-white">
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

              <ul className="space-y-1.5">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
