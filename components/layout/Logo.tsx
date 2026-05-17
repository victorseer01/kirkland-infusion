import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Kirkland Specialty Infusion Center — home"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Image
        src="/brand/kirkland-logo.png"
        alt="Kirkland Specialty Infusion Center"
        width={584}
        height={442}
        priority
        className={cn(
          "w-auto",
          variant === "light" ? "h-14 sm:h-16" : "h-12 lg:h-14",
        )}
      />
    </Link>
  );
}
