"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  src?: string;
  alt?: string;
  gradient?: string;
};

// Slides are served from /public/hero/. Replace these placeholder JPGs with
// real photos (same path, same filename) — ideally 1920×1080 or larger.
const PLACEHOLDER_SLIDES: HeroSlide[] = [
  { src: "/hero/01.jpg", alt: "" },
  { src: "/hero/02.jpg", alt: "" },
  { src: "/hero/03.jpg", alt: "" },
  { src: "/hero/04.jpg", alt: "" },
];

export function HeroBackground({
  slides = PLACEHOLDER_SLIDES,
  intervalMs = 6000,
}: {
  slides?: HeroSlide[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-primary-dark"
      aria-hidden
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-[8000ms] ease-out motion-reduce:transform-none",
              i === index ? "scale-105" : "scale-100",
            )}
          >
            {slide.src ? (
              <Image
                src={slide.src}
                alt={slide.alt ?? ""}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  slide.gradient,
                )}
              />
            )}
          </div>
        </div>
      ))}

      {/* Tonal vignette to keep hero copy legible over any slide */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/55 via-primary-dark/35 to-primary-dark/75" />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}
