# Dev Pradeep — Portfolio Design Spec
**Date:** 2026-05-29
**Stack:** Next.js + Tailwind CSS
**Status:** Approved

---

## Overview

Single-page developer portfolio for Dev Pradeep, Software Engineer. Light & Clean style — white/slate background, dark typography, no color gimmicks. Four sections on one scrollable page: Hero, Projects, Skills, Contact.

---

## Design System

### Style
- **Approach:** Light & Clean — white/slate background, dark text, minimal and timeless
- **Why:** Stands out among dark portfolios; recruiter-friendly; excellent readability

### Colors
| Token | Value | Use |
|---|---|---|
| Background | `#F8FAFC` (slate-50) | Page background |
| Surface | `#FFFFFF` | Cards |
| Border | `#E2E8F0` (slate-200) | Card borders, dividers |
| Text primary | `#0F172A` (slate-900) | Headings, labels |
| Text secondary | `#475569` (slate-600) | Body text, descriptions |
| Text muted | `#94A3B8` (slate-400) | Eyebrows, meta, footer |
| CTA background | `#0F172A` | Primary button |
| CTA text | `#FFFFFF` | Primary button text |

No accent color — the dark/light contrast carries all hierarchy.

### Typography
- **Heading font:** Archivo (Google Fonts) — weight 700/900
- **Body font:** Space Grotesk (Google Fonts) — weight 400/500
- **Hero name:** 52px, weight 900, letter-spacing -2px
- **Section titles:** 22px, weight 800, letter-spacing -0.5px
- **Body text:** 13–14px, line-height 1.6
- **Minimum body size:** 16px on mobile

### Spacing
- Section padding: `56px 40px` desktop, `40px 20px` mobile
- Card gap: `16px`
- Hero padding: `72px 40px 64px`

### Breakpoints
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+
- Max content width: 860px centered

---

## Page Architecture

Single `page.tsx` with all sections. No routing. Smooth scroll between sections via anchor links in nav.

```
<RootLayout>
  <Nav />          ← sticky, frosted
  <Hero />         ← split layout
  <Projects />     ← 2-column card grid
  <Skills />       ← 3-column pill groups
  <Contact />      ← 3 link cards
  <Footer />
</RootLayout>
```

---

## Components

### `<Nav />`
- Sticky top, `backdrop-blur-sm bg-white/90 border-b border-slate-200`
- Left: `Dev Pradeep` — 15px, weight 800
- Right: `Work · Skills · Contact` anchor links + `Hire me →` filled button
- Collapses to hamburger on mobile (links in drawer)

### `<Hero />`
Two-column split layout. Text left, avatar/monogram right.

**Left column:**
- Eyebrow: `"Software Engineer"` — 11px, letter-spacing 2px, uppercase, slate-400
- Name: `"Dev"` + `"Pradeep"` — 52px weight 900, two lines, slate-900
- Role line: `"CS @ University at Buffalo · Class of 2027"` — 18px, slate-600
- Bio: `"Building AI-powered systems and full-stack products. 2× SWE intern."` — 13px, slate-400, max-width 380px
- CTA row: `View Projects` (filled dark button) + `Resume ↗` (ghost button with border) — Resume button links to a hosted PDF; omit if no URL is provided
- Social icon buttons row: `GitHub`, `LinkedIn`, `Email` — bordered pill buttons with inline SVG icons (Lucide/Heroicons style), 14px icons, 11px label text

**Right column:**
- 160×160px rounded box (border-radius 20px), slate-100 background, slate-200 border
- Contains `DP` monogram initials at 40px weight 900
- Swap for real photo if provided — same dimensions, same border-radius

**Mobile:** Stack vertically, avatar above name, full-width buttons.

### `<Projects />`
- Section title: `"Projects"`
- Right of header: `"github.com/devpradp ↗"` link
- 2-column grid desktop, 1-column mobile

**Project card structure:**
- White card, slate-200 border, 10px border-radius, 20px padding
- Top row: project name (15px weight 800) + badge pill (category label)
- Description: 12px, slate-600, 2-3 lines, impact metrics included
- Tech tag pills: slate-50 bg, slate-200 border, slate-600 text
- Bottom: `GitHub ↗` always shown; `Live Demo ↗` / `Devpost ↗` only rendered if a URL is provided — omit the link element entirely if absent

**Projects (from resume):**

| Project | Badge | Stack | Links |
|---|---|---|---|
| EDEN | AI · Security | TypeScript, Next.js, YOLO, OpenCV, PyTorch, OpenAI, Mapbox, Twilio | GitHub (required), Live Demo (if available) |
| LovaSlide | HackHarvard 2025 | Python, Next.js, FastAPI, OpenAI API, SerpAPI | GitHub (required), Devpost (if available) |

### `<Skills />`
- Section title: `"Skills"`
- 3-column grid desktop, 1-column mobile
- Each column is a white card with a group label and pill tags

| Group | Skills |
|---|---|
| Languages | Python, TypeScript, JavaScript, Java, Swift, C, SQL |
| Frameworks | React, Next.js, FastAPI, Flask, Express, Expo, YOLO |
| Cloud & Tools | AWS, GCP, Docker, GitLab CI, Firebase, MySQL |

### `<Contact />`
- Section title: `"Get in touch"`
- 3 white cards side-by-side (1-column on mobile)
- Each card: label, handle/URL, `↗` arrow at bottom
- Cards link out to GitHub, LinkedIn, email (`mailto:`)
- All open in new tab

| Card | Handle | URL |
|---|---|---|
| GitHub | github.com/devpradp | `https://github.com/devpradp` |
| LinkedIn | linkedin.com/in/devpradeep-swe | `https://linkedin.com/in/devpradeep-swe` |
| Email | dev.pradeep@outlook.com | `mailto:dev.pradeep@outlook.com` |

### `<Footer />`
- Single row: `"Dev Pradeep · 2026"` left, `"Built with Next.js + Tailwind"` right
- slate-400 text, 11px

---

## Interactions & Animation

- **Scroll fade-ins:** Each section fades up on enter (Intersection Observer, `translateY(16px) → 0`, `opacity 0 → 1`, 400ms ease-out)
- **Card hover:** `border-color` transitions to slate-900, `box-shadow` lifts subtly — 150ms
- **Button hover:** Primary button lightens slightly; ghost button darkens border — 150ms
- **Icon button hover:** Social buttons get border darkening + subtle shadow — 150ms
- **Nav CTA:** Same hover as primary button
- **`prefers-reduced-motion`:** All transitions disabled when user has reduced motion enabled
- No parallax, no typed text, no 3D transforms

---

## Accessibility

- All interactive elements have visible focus rings (`outline-2 outline-offset-2`)
- Color contrast: slate-900 on white = 17:1 (AAA); slate-600 on white = 5.74:1 (AA)
- Semantic HTML: `<nav>`, `<section>`, `<footer>`, `<h1>` for name, `<h2>` for section titles
- Social icon buttons have `aria-label` attributes (e.g. `aria-label="GitHub profile"`)
- Avatar image (if added) has descriptive `alt` text
- Tab order matches visual order

---

## File Structure

```
dev-portfolio/
├── app/
│   ├── layout.tsx          ← RootLayout, font imports, metadata
│   ├── page.tsx            ← Assembles all sections
│   └── globals.css         ← Tailwind base, font-face, scroll-behavior
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/
│   └── (avatar image if provided)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Out of Scope

- Contact form / email delivery (links only)
- Blog or writing section
- Dark mode toggle
- CMS or data fetching
- Authentication
