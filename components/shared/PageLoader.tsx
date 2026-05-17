"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
        "pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-primary-dark transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <Image
        src="/brand/kirkland-logo.png"
        alt=""
        width={584}
        height={442}
        priority
        className="h-28 w-auto animate-pulse sm:h-32"
      />
    </div>
  );
}
