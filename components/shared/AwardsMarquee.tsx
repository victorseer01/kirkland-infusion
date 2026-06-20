import Image from "next/image";
import { getAwards } from "@/lib/awards";

// Recognition row: a paused-on-hover horizontal marquee of award badges.
// Shared by the home page (Proof) and the About page. Renders nothing if there
// are no award assets. The edge fades assume a grey-50 background.
export function AwardsMarquee() {
  const awards = getAwards();
  if (awards.length === 0) return null;

  return (
    <div>
      <p className="eyebrow text-primary">Recognition</p>
      <h3 className="mt-3 text-balance font-display text-2xl text-primary-dark sm:text-3xl">
        Two decades of physician recognition
      </h3>
      <p className="mt-3 max-w-2xl text-base text-grey-700">
        Awards earned by our affiliated physicians at Evergreen Rheumatology and
        Overlake Arthritis over twenty years of caring for Pacific Northwest
        patients.
      </p>

      <div
        className="group relative mt-8 overflow-hidden"
        aria-label="Awards and recognition"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-grey-50 to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-grey-50 to-transparent sm:w-24"
        />

        <ul className="flex w-max animate-scroll-x items-center gap-1 group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-2">
          {[...awards, ...awards].map((award, i) => (
            <li
              key={`${award.src}-${i}`}
              aria-hidden={i >= awards.length}
              className="relative h-24 w-36 shrink-0 sm:h-28 sm:w-44"
            >
              <Image
                src={award.src}
                alt={i < awards.length ? award.alt : ""}
                fill
                sizes="176px"
                className="object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
