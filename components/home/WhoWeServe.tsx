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
          title="Specialized Care. Personalized Support."
          description="Our infusion center serves and welcomes patients with a wide range of medical conditions, including autoimmune diseases, thyroid eye disease, neurologic disorders, gout, gastrointestinal conditions, and other specialty care needs. Working closely with referring physicians, we provide expert infusion therapy in a welcoming environment where comfort, communication, and exceptional care come first."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-stretch lg:gap-10">
          <MediaPlaceholder
            aspect="tall"
            tone="navy"
            src="/home/who-we-serve.jpg"
            alt="A patient meeting with their care provider at Kirkland Specialty Infusion Center"
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
              Find Your Condition, Treatment, or Specialty
            </p>
            <p className="mt-1 text-sm text-grey-700">
              Browse the conditions we treat, infusion therapies we offer, and
              specialties we support. Whether you&apos;re a patient exploring
              treatment options or a provider seeking infusion services for a
              patient, you&apos;ll find detailed information and resources here.
            </p>
            <Link
              href="/physicians"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark hover:text-coral"
            >
              Referring a patient? Visit our Physician Resources
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <Link href="/specialties" className="btn-coral shrink-0">
            Explore Conditions &amp; Treatments
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
