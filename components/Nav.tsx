"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Close on Escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    // Focus trap — keep focus inside drawer while open
    const onFocus = (e: FocusEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        // Return focus to first focusable element in drawer
        const first = drawerRef.current.querySelector<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  // Scrollspy — highlight the nav link for the section in view
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const linkClass = (href: string) =>
    `nav-link text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded ${
      active === href
        ? "nav-link-active text-slate-900 font-medium"
        : "text-slate-500 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-portfolio mx-auto px-5 sm:px-10 flex justify-between items-center h-14">
        <span className="font-heading text-[15px] font-extrabold text-slate-900 tracking-tight">
          Dev Pradeep
        </span>

        {/* Desktop links */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          ref={drawerRef}
          role="navigation"
          aria-label="Mobile navigation"
          className="sm:hidden border-t border-slate-200 bg-white px-5 py-4 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`self-start ${linkClass(l.href)}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
