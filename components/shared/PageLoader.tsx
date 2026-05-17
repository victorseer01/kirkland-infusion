"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setVisible(false), reduce ? 50 : 650);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-primary-dark text-ice transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 bg-white/10">
          <Droplet className="h-7 w-7 animate-pulse" strokeWidth={2} aria-hidden />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ice/80">
          Kirkland Specialty Infusion
        </span>
      </div>
    </div>
  );
}
