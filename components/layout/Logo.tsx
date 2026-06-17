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
      aria-label="Kirkland Specialty Infusion Center, home"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Image
        src={
          variant === "light"
            ? "/brand/logo-stacked-white.png"
            : "/brand/logo-stacked-dark.png"
        }
        alt="Kirkland Specialty Infusion Center"
        width={487}
        height={367}
        priority
        className={cn(
          "w-auto",
          variant === "light" ? "h-16 sm:h-20 lg:h-[5.5rem]" : "h-14 lg:h-16",
        )}
      />
    </Link>
  );
}
