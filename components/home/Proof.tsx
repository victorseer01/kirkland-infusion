import { Award } from "lucide-react";
import { SITE } from "@/lib/constants";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";

const STATS = [
  { label: "Specialties", value: "8" },
  { label: "Therapies", value: "19+" },
  { label: "Years of care", value: "20+" },
];

const AWARD_LABELS = [
  "Castle Connolly Top Doctors",
  "Seattle Magazine Top Doctors",
  "Vitals Patient Choice",
  "Patients' Choice",
  "Seattle Met Top Doctors",
  "Vitals Compassionate Doctor",
];

export function Proof() {
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

        <div className="mt-10">
          <p className="eyebrow text-primary">Recognition</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            {AWARD_LABELS.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-grey-200 bg-white px-3.5 py-2 text-xs font-medium text-grey-700 shadow-sm"
              >
                <Award className="h-3.5 w-3.5 text-coral" aria-hidden />
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-grey-500">
            Recognition earned by our affiliated physicians and the Evergreen Rheumatology / Overlake Arthritis practice over two decades. Approved award artwork to be supplied by SGSL ops.
          </p>
        </div>
      </div>
    </section>
  );
}
