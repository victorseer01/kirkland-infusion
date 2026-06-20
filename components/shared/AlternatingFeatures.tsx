import { cn } from "@/lib/utils";

type FeatureItem = { title: string; body: string };

/**
 * Renders a list of {title, body} items as alternating two-column rows:
 * row 1 has the title on the left / body on the right, row 2 flips, and so on.
 * Collapses to a single stacked column (title then body) on small screens.
 */
export function AlternatingFeatures({
  items,
}: {
  items: readonly FeatureItem[];
}) {
  return (
    <div className="divide-y divide-grey-200">
      {items.map((item, i) => {
        const flip = i % 2 === 1;
        return (
          <div
            key={item.title}
            className="grid items-center gap-5 py-10 sm:py-12 lg:grid-cols-2 lg:gap-16"
          >
            <div className={cn(flip && "lg:order-2")}>
              <span
                aria-hidden
                className="block font-display text-lg font-semibold leading-none text-coral/70 sm:text-xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl text-primary-dark sm:text-3xl">
                {item.title}
              </h3>
            </div>
            <p
              className={cn(
                "text-base leading-relaxed text-grey-700 sm:text-lg",
                flip && "lg:order-1",
              )}
            >
              {item.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
