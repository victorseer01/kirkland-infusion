import { cn } from "@/lib/utils";

export type ServiceStackItem = {
  eyebrow?: string;
  title: string;
  body: string;
  meta?: string;
};

export function ServiceStack({
  items,
  sticky = true,
  tone = "light",
  className,
}: {
  items: readonly ServiceStackItem[];
  sticky?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "relative",
              sticky && "lg:min-h-screen lg:pb-16",
            )}
          >
            <div
              className={cn(
                sticky && "lg:sticky lg:top-24",
                "flex h-full items-stretch",
              )}
            >
              <article
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl shadow-sm transition-all",
                  isDark
                    ? "border border-white/10 bg-primary/30 text-ice backdrop-blur-md"
                    : "border border-grey-200 bg-white",
                )}
              >
                <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[160px_1fr] lg:gap-12 lg:p-14">
                  <div className="flex items-start justify-start lg:flex-col lg:justify-between">
                    <span
                      className={cn(
                        "font-display text-5xl leading-none lg:text-7xl",
                        isDark ? "text-coral" : "text-coral",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.eyebrow && (
                      <span
                        className={cn(
                          "eyebrow ml-4 lg:ml-0 lg:mt-6",
                          isDark ? "text-ice/70" : "text-primary",
                        )}
                      >
                        {item.eyebrow}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "text-balance font-display text-2xl sm:text-3xl lg:text-4xl",
                        isDark ? "text-white" : "text-primary-dark",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
                        isDark ? "text-ice/90" : "text-grey-700",
                      )}
                    >
                      {item.body}
                    </p>
                    {item.meta && (
                      <p
                        className={cn(
                          "mt-6 text-xs uppercase tracking-[0.18em]",
                          isDark ? "text-ice/60" : "text-primary",
                        )}
                      >
                        {item.meta}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
