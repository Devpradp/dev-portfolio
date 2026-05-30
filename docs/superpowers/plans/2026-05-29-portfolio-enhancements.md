# Portfolio Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Experience section with branded internship cards, replace the Hero's GitHub CTA with a Resume button, apply deterministic colored pills to Skills and Projects, remove the Contact section, and clean up Nav links.

**Architecture:** One new component (`Experience`), one new utility (`lib/pill-color.ts`), and five file edits. The `pillColor` utility is the single source of truth for tag coloring — shared by Skills, Projects, and Experience. All logo assets live in `public/logos/`. No new npm dependencies.

**Tech Stack:** Next.js 16, Tailwind CSS v4, TypeScript, `next/image` for logo rendering

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `lib/pill-color.ts` | Deterministic hash → Tailwind color palette |
| Create | `components/Experience.tsx` | Experience section with two internship cards |
| **User places** | `public/logos/ub.png` | UB logo (PNG, transparent bg) |
| **User places** | `public/logos/kapsch.png` | Kapsch logo (PNG, white bg) |
| Modify | `components/Hero.tsx` | Replace GitHub button with Resume button |
| Modify | `components/Nav.tsx` | Add Experience link, remove Contact + Hire Me |
| Modify | `components/Skills.tsx` | Use `pillColor` for skill tags |
| Modify | `components/Projects.tsx` | Use `pillColor` for tech stack tags |
| Modify | `app/page.tsx` | Add Experience, remove Contact import + JSX |
| Delete | `components/Contact.tsx` | No longer used |

---

## Prerequisite: Place logo files

> **This is a manual user step — cannot be automated.**

- [ ] Create the logos directory:

```bash
mkdir -p /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio/public/logos
```

- [ ] Save the UB interlocked-letters logo (blue, transparent background) as:
  `public/logos/ub.png`

- [ ] Save the Kapsch TrafficCom logo (dark "kapsch" + yellow chevrons, white background) as:
  `public/logos/kapsch.png`

- [ ] Verify both files exist:

```bash
ls /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio/public/logos/
# Expected output:
# kapsch.png  ub.png
```

---

## Task 1: Create `lib/pill-color.ts` utility

**Files:**
- Create: `lib/pill-color.ts`

The full class name strings must appear as literals so Tailwind v4's scanner includes them at build time. Never construct them via string concatenation.

- [ ] **Step 1: Create the utility**

```typescript
// lib/pill-color.ts
const PALETTES = [
  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200"    },
  { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200"  },
  { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200"   },
  { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200"    },
  { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200"     },
  { bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200"  },
  { bg: "bg-teal-50",    text: "text-teal-700",    border: "border-teal-200"    },
  { bg: "bg-pink-50",    text: "text-pink-700",    border: "border-pink-200"    },
  { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200"  },
] as const;

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function pillColor(label: string) {
  return PALETTES[hash(label) % PALETTES.length];
}
```

- [ ] **Step 2: Verify TypeScript compiles with no errors**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npx tsc --noEmit
```

Expected: exits 0 with no output.

- [ ] **Step 3: Commit**

```bash
git add lib/pill-color.ts
git commit -m "feat: add deterministic pill-color utility"
```

---

## Task 2: Update `Hero.tsx` — replace GitHub button with Resume

**Files:**
- Modify: `components/Hero.tsx:65-72`

- [ ] **Step 1: Replace the secondary CTA button**

In `components/Hero.tsx`, find and replace the GitHub anchor:

```tsx
// REMOVE this:
          <a
            href="https://github.com/devpradp"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-300 text-slate-600 text-xs font-medium px-5 py-2.5 rounded-md hover:border-slate-500 hover:text-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            GitHub ↗
          </a>
```

```tsx
// REPLACE with:
          <a
            href="https://1drv.ms/b/c/baac359db7beec33/IQBhattP8cB8QrQKh8ILoM1wAQZQu55smPDSXs4aIpGfRiQ?e=oHBD0H"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-300 text-slate-600 text-xs font-medium px-5 py-2.5 rounded-md hover:border-slate-500 hover:text-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            Resume ↗
          </a>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npx tsc --noEmit
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: replace GitHub CTA with Resume button in Hero"
```

---

## Task 3: Update `Nav.tsx` — add Experience, remove Contact + Hire Me

**Files:**
- Modify: `components/Nav.tsx:6-10` (links array)
- Modify: `components/Nav.tsx:61-67` (desktop Hire Me button)
- Modify: `components/Nav.tsx:100-107` (mobile drawer Hire Me button)

- [ ] **Step 1: Update the links array**

In `components/Nav.tsx`, replace:

```tsx
const links = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
```

With:

```tsx
const links = [
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
];
```

- [ ] **Step 2: Remove the desktop "Hire me →" button**

In `components/Nav.tsx`, remove the following block entirely (it comes after the `{links.map(...)}` call inside the desktop `<nav>`):

```tsx
          <a
            href="#contact"
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            Hire me →
          </a>
```

- [ ] **Step 3: Remove the mobile drawer "Hire me →" button**

In `components/Nav.tsx`, remove the following block entirely (it comes after the `{links.map(...)}` call inside the mobile drawer `<div>`):

```tsx
          <a
            href="#contact"
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-md text-center hover:bg-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            onClick={() => setOpen(false)}
          >
            Hire me →
          </a>
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npx tsc --noEmit
```

Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add Experience nav link, remove Contact and Hire Me CTA"
```

---

## Task 4: Create `components/Experience.tsx`

**Files:**
- Create: `components/Experience.tsx`

> **Logo color notes:**
> - `University at Buffalo` title color: `#005BBB` — the exact blue of the UB interlocked-letters logo.
> - `Kapsch TrafficCom` title color: `#231F20` — the exact dark charcoal of the "kapsch" wordmark text.
>
> Both colors are applied via inline `style` (not Tailwind) because they're specific brand hex values.

- [ ] **Step 1: Create the component**

```tsx
// components/Experience.tsx
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

              <ul className="space-y-1.5 mb-4">
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npx tsc --noEmit
```

Expected: exits 0. If you see an error about missing logo files at build time, that's a runtime concern — tsc only checks types, not file existence.

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: add Experience section with UB and Kapsch internship cards"
```

---

## Task 5: Update `Skills.tsx` — deterministic colored pills

**Files:**
- Modify: `components/Skills.tsx`

- [ ] **Step 1: Replace the full file content**

```tsx
// components/Skills.tsx
import { pillColor } from "@/lib/pill-color";

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
    skills: ["AWS", "GCP", "Docker", "GitLab CI", "Firebase", "MySQL"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-b border-slate-200">
      <div className="max-w-portfolio mx-auto px-5 sm:px-10 py-14">
        <h2 className="font-heading text-[22px] font-extrabold text-slate-900 tracking-tight mb-7">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => {
                  const c = pillColor(skill);
                  return (
                    <span
                      key={skill}
                      className={`text-[11px] border px-2.5 py-0.5 rounded-full ${c.bg} ${c.text} ${c.border}`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npx tsc --noEmit
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx
git commit -m "feat: apply deterministic colored pills to Skills section"
```

---

## Task 6: Update `Projects.tsx` — deterministic colored tech stack pills

**Files:**
- Modify: `components/Projects.tsx`

- [ ] **Step 1: Replace the full file content**

```tsx
// components/Projects.tsx
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npx tsc --noEmit
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add components/Projects.tsx
git commit -m "feat: apply deterministic colored pills to Projects tech stack"
```

---

## Task 7: Wire `page.tsx` — add Experience, remove Contact

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/Contact.tsx`

- [ ] **Step 1: Replace the full content of `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="bg-slate-50">
        <FadeIn>
          <Hero />
        </FadeIn>
        <FadeIn delay={50}>
          <Experience />
        </FadeIn>
        <FadeIn delay={50}>
          <Projects />
        </FadeIn>
        <FadeIn delay={50}>
          <Skills />
        </FadeIn>
        <Footer />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Delete the Contact component**

```bash
rm /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio/components/Contact.tsx
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npx tsc --noEmit
```

Expected: exits 0.

- [ ] **Step 4: Run a full build to confirm no errors**

```bash
cd /Users/devpradeep/Documents/Mirror/Projects/dev-portfolio && npm run build
```

Expected: build completes successfully with no errors or warnings about missing modules.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git rm components/Contact.tsx
git commit -m "feat: wire Experience into page, remove Contact section"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Experience section above Projects — Task 4 + Task 7
- [x] Company logo on each card — Task 4 (`next/image`, `/logos/` path)
- [x] Company title colored to match logo — Task 4 (`brandColor` + inline `style`)
- [x] Colored pills for Skills — Task 5
- [x] Colored pills for Projects tech stack — Task 6
- [x] Colored pills for Experience tech stack — Task 4
- [x] Remove "Get in touch" / Contact section — Task 7
- [x] Replace GitHub button with Resume button — Task 2
- [x] Resume opens in new tab (OneDrive URL) — Task 2
- [x] Nav Contact link removed — Task 3
- [x] Nav "Hire me →" button removed (both desktop + mobile drawer) — Task 3
- [x] Nav "Experience" link added — Task 3

**Type consistency:**
- `pillColor(label: string)` → `{ bg, text, border }` used identically in Tasks 4, 5, 6 ✅
- `ExperienceEntry` interface defined and consumed only in Task 4 ✅
- `PALETTES as const` — ensures return type inference is correct ✅

**Tailwind purge safety:**
- All Tailwind classes in `lib/pill-color.ts` are complete literal strings (not concatenated) — scanner picks them up ✅
