# Dev Pradeep - Portfolio Website

A modern, animated portfolio website built with Next.js, React, TypeScript, and Framer Motion.

## Features

- 🎨 **Clean, Modern UI** - Inspired by Uber, Beli, and Apple design principles
- 🌓 **Dark/Light Mode** - Seamless theme switching with persistent preferences
- ✨ **Dynamic Animations** - Smooth scroll animations, hover effects, and interactive components
- 📱 **Fully Responsive** - Optimized for all device sizes
- 🎯 **Single Page Scroll** - Smooth navigation with expandable/collapsible sections
- 🚀 **Project Cards** - Interactive project cards with hover effects and animations

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dev-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── About.tsx           # About section with profile
│   ├── Contact.tsx         # Contact information
│   ├── Experience.tsx       # Work experience (expandable)
│   ├── Navigation.tsx       # Navigation bar with theme toggle
│   ├── Organizations.tsx   # Organizations (expandable)
│   ├── Projects.tsx        # Project showcase with hover effects
│   ├── Skills.tsx          # Technical skills display
│   └── ThemeProvider.tsx   # Theme context provider
└── public/                 # Static assets
```

## Customization

- Update personal information in each component file
- Replace profile photo placeholder in `components/About.tsx`
- Modify color scheme in `tailwind.config.ts`
- Add/remove projects in `components/Projects.tsx`

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
