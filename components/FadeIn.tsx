"use client";

import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right";
}

const hiddenClass = {
  up: "fade-in-hidden",
  left: "fade-in-hidden-left",
  right: "fade-in-hidden-right",
} as const;

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  from = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply hidden state only after mount — avoids SSR flashing opacity:0
    el.classList.add(hiddenClass[from]);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove(hiddenClass[from]);
            el.classList.add("fade-in-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, from]);

  return (
    <div ref={ref} className={className || undefined}>
      {children}
    </div>
  );
}
