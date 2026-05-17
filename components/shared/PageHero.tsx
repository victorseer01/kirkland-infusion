import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary-dark text-ice",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(closest-side at 18% 0%, rgba(255,255,255,0.25), transparent 60%), radial-gradient(closest-side at 82% 100%, rgba(74,155,140,0.45), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-prose relative py-16 sm:py-24">
        {eyebrow && (
          <p className="eyebrow text-coral">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-4xl text-balance text-4xl text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-3xl text-pretty text-base text-ice/90 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
