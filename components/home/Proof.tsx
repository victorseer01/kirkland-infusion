import Image from "next/image";
import { SITE } from "@/lib/constants";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { getAwards } from "@/lib/awards";

const STATS = [
  { label: "Specialties", value: "8" },
  { label: "Therapies", value: "19+" },
  { label: "Years of care", value: "20+" },
];

export function Proof() {
  const awards = getAwards();

  return (
    <section className="bg-grey-50 section-y">
      <div className="container-prose">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-primary">Affiliated with</p>
            <h2 className="mt-3 text-balance font-display text-3xl text-primary-dark sm:text-4xl">
              {SITE.affiliatedWith}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-grey-700 sm:text-lg">
              One of the Pacific Northwest&apos;s most respected rheumatology practices — more than two decades of specialty care, now anchoring the only physician-led specialty infusion suite in Kirkland.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-grey-200 bg-white p-4 text-center shadow-sm sm:p-5"
                >
                  <dd className="font-display text-3xl text-primary-dark sm:text-4xl">
                    {s.value}
                  </dd>
                  <dt className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <MediaPlaceholder
            aspect="wide"
            tone="primary"
            src="/home/proof-team.jpg"
            alt="Evergreen Rheumatology clinical team"
          />
        </div>

        <blockquote className="relative mt-12 overflow-hidden rounded-2xl border border-grey-200 bg-white p-7 shadow-sm sm:p-10">
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-1.5 bg-coral"
          />
          <p className="text-balance text-lg leading-relaxed text-primary-dark sm:text-xl">
            A licensed provider is present in the suite for{" "}
            <span className="font-semibold">every infusion</span> — not nearby, not on call, but in the room.
          </p>
        </blockquote>

        {awards.length > 0 && (
          <div className="mt-12">
            <p className="eyebrow text-primary">Recognition</p>
            <h3 className="mt-3 text-balance font-display text-2xl text-primary-dark sm:text-3xl">
              Two decades of physician recognition
            </h3>
            <p className="mt-3 max-w-2xl text-base text-grey-700">
              Awards earned by our affiliated physicians at Evergreen Rheumatology and Overlake Arthritis over twenty years of caring for Pacific Northwest patients.
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

              <ul className="flex w-max animate-scroll-x items-center gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-6">
                {[...awards, ...awards].map((award, i) => (
                  <li
                    key={`${award.src}-${i}`}
                    aria-hidden={i >= awards.length}
                    className="flex h-28 w-40 shrink-0 items-center justify-center rounded-2xl border border-grey-200 bg-white p-3 shadow-sm sm:h-32 sm:w-48 sm:p-4"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={award.src}
                        alt={i < awards.length ? award.alt : ""}
                        fill
                        sizes="192px"
                        className="object-contain opacity-85 transition-opacity hover:opacity-100"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
