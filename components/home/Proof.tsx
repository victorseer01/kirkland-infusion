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

            <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
              {awards.map((award) => (
                <li
                  key={award.src}
                  className="group flex aspect-square items-center justify-center rounded-2xl border border-grey-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={award.src}
                      alt={award.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 33vw"
                      className="object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
