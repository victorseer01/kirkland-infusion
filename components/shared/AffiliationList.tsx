import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Renders the list of affiliated practices as an inline, comma-separated phrase
// ("A, B, and C"). Each practice name links to its site when a URL is known;
// otherwise it renders as plain text ("link each practice if applicable").
export function AffiliationList({ linkClassName }: { linkClassName?: string }) {
  const items = SITE.affiliates;
  return (
    <>
      {items.map((a, i) => {
        const separator =
          i === 0 ? "" : i === items.length - 1 ? ", and " : ", ";
        return (
          <span key={a.name}>
            {separator}
            {a.url ? (
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("underline-offset-4 hover:underline", linkClassName)}
              >
                {a.name}
              </a>
            ) : (
              a.name
            )}
          </span>
        );
      })}
    </>
  );
}
