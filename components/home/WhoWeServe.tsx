import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SPECIALTIES, MEDICATIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";

const FEATURED = MEDICATIONS.slice(0, 16).map((m) => m.name);

export function WhoWeServe() {
  return (
    <section className="bg-grey-50 section-y">
      <div className="container-prose">
        <SectionHeading
          eyebrow="Who we serve"
          title="A specialty infusion center, in the truest sense"
          description="Our infusion suite welcomes patients referred by rheumatologists, gastroenterologists, oncologists, dermatologists, neurologists, endocrinologists, allergists and immunologists, and physicians caring for patients with osteoporosis and metabolic bone disease."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-stretch lg:gap-10">
          <MediaPlaceholder
            aspect="tall"
            tone="navy"
            src="/home/suite.jpg"
            alt="Calm, private infusion suite at Kirkland Specialty Infusion Center"
            className="lg:h-full"
          />

          <div className="grid gap-6">
            <article className="flex flex-col rounded-2xl border border-grey-200 bg-white p-7 shadow-sm">
              <p className="eyebrow text-primary">Specialties served</p>
              <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2">
                {SPECIALTIES.map((s) => (
                  <li
                    key={s.slug}
                    className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary-dark sm:text-sm"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
              <Link
                href="/specialties"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-coral"
              >
                See specialty details
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>

            <article className="flex flex-col rounded-2xl border border-grey-200 bg-white p-7 shadow-sm">
              <p className="eyebrow text-primary">Featured therapies</p>
              <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2">
                {FEATURED.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary-dark sm:text-sm"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              <Link
                href="/medications"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-coral"
              >
                See full formulary
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-grey-200 bg-white p-7 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-lg text-primary-dark sm:text-xl">
              One referral. Zero hassle. Your patient is in expert hands.
            </p>
            <p className="mt-1 text-sm text-grey-700">
              Send the referral — we handle prior auth, financial advocacy, labs, scheduling, and follow-up.
            </p>
          </div>
          <Link href="/physicians#refer" className="btn-coral shrink-0">
            Send a Referral
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
