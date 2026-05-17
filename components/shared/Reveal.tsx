"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const HIDDEN: Record<Direction, string> = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "translate-x-6",
  right: "-translate-x-6",
  none: "",
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  threshold = 0.12,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const id = window.setTimeout(() => setShown(true), delay);
          if (once) obs.disconnect();
          return () => window.clearTimeout(id);
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown
          ? "translate-x-0 translate-y-0 opacity-100"
          : cn("opacity-0", HIDDEN[direction]),
        className,
      )}
    >
      {children}
    </div>
  );
}
