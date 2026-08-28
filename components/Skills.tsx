import { pillColor } from "@/lib/pill-color";
import FadeIn from "@/components/FadeIn";

interface SkillGroup {
  label: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "Swift", "C", "SQL"],
  },
  {
    label: "Frameworks",
    skills: ["React", "Next.js", "FastAPI", "Flask", "Express", "Expo", "YOLO"],
  },
  {
    label: "Cloud & Tools",
    skills: ["AWS", "AWS Bedrock", "Aurora", "GCP", "Docker", "GitLab CI", "Firebase", "MySQL", "Claude Code", "Cursor", "Codex"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-portfolio mx-auto px-5 sm:px-10 py-14 border-b border-slate-200">
        <FadeIn>
          <h2 className="font-heading text-[22px] font-extrabold text-slate-900 tracking-tight mb-7">
            Skills
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <FadeIn key={group.label} delay={i * 80} className="h-full">
              <div className="h-full bg-white border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => {
                    const c = pillColor(skill);
                    return (
                      <span
                        key={skill}
                        className={`text-xs border px-2.5 py-0.5 rounded-full ${c.bg} ${c.text} ${c.border}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
    </section>
  );
}
