# Dev Pradeep Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Light & Clean developer portfolio for Dev Pradeep using Next.js App Router and Tailwind CSS.

**Architecture:** A single `page.tsx` assembles six focused components (Nav, Hero, Projects, Skills, Contact, Footer) plus a shared `FadeIn` wrapper. No routing, no backend, no CMS — pure static output. Scroll animations via `IntersectionObserver` in `FadeIn`. All content is hardcoded from the resume; no data layer needed.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Lucide React (icons), `next/font/google` (Archivo + Space Grotesk).

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | RootLayout, font variables, `<html>/<body>`, page metadata |
| `app/page.tsx` | Assembles all sections with `FadeIn` wrappers |
| `app/globals.css` | Tailwind import, `@theme` tokens, fade-in utilities, `scroll-behavior` |
| `components/FadeIn.tsx` | Client component — IntersectionObserver fade-up animation wrapper |
| `components/Nav.tsx` | Sticky frosted nav — logo, anchor links, Hire me CTA, mobile drawer |
| `components/Hero.tsx` | Split hero — eyebrow, name, role, bio, CTA buttons, social icon buttons, monogram |
| `components/Projects.tsx` | Two project cards — EDEN and LovaSlide |
| `components/Skills.tsx` | Three skill groups — Languages, Frameworks, Cloud & Tools |
| `components/Contact.tsx` | Three link cards — GitHub, LinkedIn, Email |
| `components/Footer.tsx` | Footer row — name + built-with text |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: all project files via `create-next-app`

- [ ] **Step 1: Bootstrap the project**

Run from inside `dev-portfolio/` (the directory already exists and has `.gitignore` and `docs/`):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted:
- "The directory contains files…" → **Yes, continue**
- "Would you like to use Turbopack?" → **No**

- [ ] **Step 2: Install Lucide React**

```bash
npm install lucide-react
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000. You should see the default Next.js starter page. Press Ctrl+C to stop.

- [ ] **Step 4: Clear boilerplate**

Replace `app/page.tsx` with an empty shell:

```tsx
export default function Home() {
  return <main />
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 with Tailwind, TypeScript, and Lucide"
```

---

## Task 2: Configure design tokens and fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Note on Tailwind version:** `create-next-app` installs Tailwind CSS v4, which uses CSS-based configuration via `@import "tailwindcss"` and `@theme {}` — there is no `tailwind.config.ts`. If you see a `tailwind.config.ts` in the project root, that means v3 was installed; in that case replace it with the content shown in the note at the bottom of this task.

- [ ] **Step 1: Write globals.css**

```css
@import "tailwindcss";

@theme {
  --font-family-heading: var(--font-archivo), system-ui, sans-serif;
  --font-family-body: var(--font-space-grotesk), system-ui, sans-serif;
  --max-width-portfolio: 860px;
}

html {
  scroll-behavior: smooth;
}

@layer utilities {
  .fade-in-hidden {
    opacity: 0;
    transform: translateY(16px);
  }

  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 400ms ease-out, transform 400ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-in-hidden {
      opacity: 1;
      transform: none;
    }

    .fade-in-visible {
      transition: none;
    }
  }
}
```

- [ ] **Step 2: Write layout.tsx**

```tsx
import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Pradeep — Software Engineer",
  description:
    "Portfolio of Dev Pradeep, Software Engineer. Building AI-powered systems and full-stack products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-slate-50 font-body antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify fonts load**

```bash
npm run dev
```

Open http://localhost:3000, open DevTools → Elements, inspect `<body>`. Confirm `font-family` resolves to Space Grotesk. Press Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: configure Archivo + Space Grotesk fonts and design tokens"
```

---

**Tailwind v3 fallback (only if `tailwind.config.ts` was generated):**

Delete the generated `tailwind.config.ts` and replace with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        portfolio: "860px",
      },
    },
  },
  plugins: [],
};

export default config;
```

And replace `globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

@layer utilities {
  .fade-in-hidden {
    opacity: 0;
    transform: translateY(16px);
  }

  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 400ms ease-out, transform 400ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-in-hidden {
      opacity: 1;
      transform: none;
    }

    .fade-in-visible {
      transition: none;
    }
  }
}
```

---

## Task 3: FadeIn wrapper component

**Files:**
- Create: `components/FadeIn.tsx`

- [ ] **Step 1: Create FadeIn.tsx**

```tsx
"use client";

import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove("fade-in-hidden");
            el.classList.add("fade-in-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in-hidden ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FadeIn.tsx
git commit -m "feat: add FadeIn wrapper with IntersectionObserver"
```

---

## Task 4: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create Nav.tsx**

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-portfolio mx-auto px-5 sm:px-10 flex justify-between items-center h-14">
        <span className="font-heading text-[15px] font-extrabold text-slate-900 tracking-tight">
          Dev Pradeep
        </span>

        {/* Desktop links */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            Hire me →
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-700 hover:text-slate-900 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-md text-center hover:bg-slate-700 transition-colors duration-150"
            onClick={() => setOpen(false)}
          >
            Hire me →
          </a>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Mount Nav in page.tsx and verify**

```tsx
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="h-[200vh]" />
    </>
  );
}
```

Run `npm run dev`. Open http://localhost:3000 and verify:
- Nav stays at top when scrolling down
- Desktop (≥640px): Work, Skills, Contact links + "Hire me →" button visible
- Mobile (<640px): Only hamburger icon visible; clicking it opens a drawer with links; clicking a link closes the drawer
Press Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add sticky Nav with desktop links and mobile drawer"
```

---

## Task 5: Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { ElementType } from "react";

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
      className="max-w-portfolio mx-auto px-5 sm:px-10 pt-16 pb-14 sm:pt-20 sm:pb-16 flex flex-col-reverse sm:flex-row items-center gap-10 border-b border-slate-200"
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
            href="https://github.com/devpradp"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-300 text-slate-600 text-xs font-medium px-5 py-2.5 rounded-md hover:border-slate-500 hover:text-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer"
          >
            GitHub ↗
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

      {/* Right: monogram box */}
      <div className="flex-shrink-0">
        <div
          className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="font-heading text-4xl font-black text-slate-900 tracking-tighter">
            DP
          </span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to page.tsx and verify**

```tsx
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
```

Run `npm run dev`. Verify at http://localhost:3000:
- Desktop: "Dev Pradeep" heading on left, "DP" monogram box on right
- Mobile (resize to 375px): monogram above heading, full-width layout
- "View Projects" scrolls to `#projects` (section not yet built — anchor just doesn't jump anywhere)
- "GitHub ↗" opens `github.com/devpradp` in a new tab
- Social icon buttons show correct icons and text; Email opens mail client

Press Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with split layout and social icon buttons"
```

---

## Task 6: Projects component

**Files:**
- Create: `components/Projects.tsx`

- [ ] **Step 1: Create Projects.tsx**

```tsx
import { ExternalLink } from "lucide-react";

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
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
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

- [ ] **Step 2: Add Projects to page.tsx and verify**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="bg-slate-50 min-h-screen">
        <Hero />
        <Projects />
      </div>
    </>
  );
}
```

Run `npm run dev`. Verify:
- Two project cards in a 2-column grid (desktop), 1-column stack (mobile)
- EDEN card: correct badge, description, 8 tech tags, GitHub link
- LovaSlide card: "HackHarvard 2025" badge, correct description, 5 tech tags, GitHub link
- Card border and shadow appear on hover
- "View Projects" nav link now scrolls to this section

Press Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add components/Projects.tsx app/page.tsx
git commit -m "feat: add Projects section with EDEN and LovaSlide cards"
```

---

## Task 7: Skills component

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

```tsx
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
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Skills to page.tsx and verify**

```tsx
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
```

Run `npm run dev`. Verify:
- 3 cards side-by-side on desktop, stacked on mobile
- "Languages" group: 7 pills (Python, TypeScript, JavaScript, Java, Swift, C, SQL)
- "Frameworks" group: 7 pills (React, Next.js, FastAPI, Flask, Express, Expo, YOLO)
- "Cloud & Tools" group: 6 pills (AWS, GCP, Docker, GitLab CI, Firebase, MySQL)

Press Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx app/page.tsx
git commit -m "feat: add Skills section with three pill-group cards"
```

---

## Task 8: Contact component

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

```tsx
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
```

- [ ] **Step 2: Add Contact to page.tsx and verify**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="bg-slate-50 min-h-screen">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
```

Run `npm run dev`. Verify:
- 3 contact cards in a row (desktop), stacked (mobile)
- GitHub card: links to `https://github.com/devpradp` in new tab
- LinkedIn card: links to `https://linkedin.com/in/devpradeep-swe` in new tab
- Email card: `href="mailto:dev.pradeep@outlook.com"`, no `target="_blank"`
- Icon turns darker on hover; border darkens; subtle shadow appears
- "Hire me →" in nav now scrolls to this section

Press Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx app/page.tsx
git commit -m "feat: add Contact section with GitHub, LinkedIn, and Email cards"
```

---

## Task 9: Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="max-w-portfolio mx-auto px-5 sm:px-10 py-5 flex justify-between items-center">
      <p className="text-[11px] text-slate-400">Dev Pradeep · 2026</p>
      <p className="text-[11px] text-slate-400">Built with Next.js + Tailwind</p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 10: Assemble page.tsx with FadeIn animations

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write final page.tsx**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
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
          <Projects />
        </FadeIn>
        <FadeIn delay={50}>
          <Skills />
        </FadeIn>
        <FadeIn delay={50}>
          <Contact />
        </FadeIn>
        <Footer />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify full page and animations**

Run `npm run dev`. Open http://localhost:3000. Verify:
- All sections render in order: Hero → Projects → Skills → Contact → Footer
- Reload and scroll slowly — Projects, Skills, and Contact sections each fade up as they enter the viewport
- Hero section appears immediately (it is already in viewport on load)
- Nav links scroll smoothly to correct sections: Work → `#projects`, Skills → `#skills`, Contact → `#contact`, Hire me → `#contact`

Press Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full page with FadeIn scroll animations"
```

---

## Task 11: Accessibility audit and responsive verification

**Files:**
- No new files — verification only; fix any issues found in existing components

- [ ] **Step 1: Keyboard navigation check**

Run `npm run dev`. Open http://localhost:3000. Press Tab repeatedly from top of page. Verify each item in order receives a visible focus ring:
1. Nav "Work" link
2. Nav "Skills" link
3. Nav "Contact" link
4. Nav "Hire me →" button
5. Hero "View Projects" button
6. Hero "GitHub ↗" button
7. Hero GitHub icon button
8. Hero LinkedIn icon button
9. Hero Email icon button
10. Projects "github.com/devpradp ↗" link
11. EDEN "GitHub" link
12. LovaSlide "GitHub" link
13. Contact GitHub card
14. Contact LinkedIn card
15. Contact Email card

If any element is missing a focus ring, add `focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2` to it.

- [ ] **Step 2: Reduced-motion check**

In Chrome DevTools → More tools → Rendering → scroll to "Emulate CSS media feature" → select `prefers-reduced-motion: reduce`. Reload http://localhost:3000 and scroll. All sections should appear immediately with no fade animation.

- [ ] **Step 3: Responsive check at 375px**

Resize browser to 375px width and verify:
- Nav: only logo + hamburger shown; hamburger opens drawer with Work/Skills/Contact/"Hire me →"
- Hero: "DP" monogram stacked above heading; bio text fits without overflow; buttons wrap if needed
- Projects: cards stack in 1 column; tag pills wrap correctly
- Skills: 3 cards stack in 1 column
- Contact: 3 cards stack in 1 column

- [ ] **Step 4: Responsive check at 768px**

Resize to 768px and verify:
- Nav: desktop links visible (no hamburger)
- Hero: split layout active (monogram on right)
- Projects: 2-column grid
- Skills: 3-column grid
- Contact: 3-column grid

- [ ] **Step 5: Production build**

```bash
npm run build
```

Expected: build completes with no TypeScript errors and no ESLint errors. Output looks like:

```
Route (app)    Size
┌ ○ /          x.x kB
```

If there are errors, fix them before marking this step complete.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio — accessibility verified, responsive, build passing"
```
