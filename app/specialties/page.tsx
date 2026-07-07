import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SPECIALTIES, SITE } from "@/lib/constants";
import { Phone, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Specialties & Conditions",
  description:
    "A multi-specialty infusion center. Find your condition by name and the therapy your physician prescribed, across rheumatology, neurology/MS, gastroenterology, dermatology, osteoporosis, allergy and immunology, and endocrinology.",
  path: "/specialties",
});

export default function SpecialtiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialties & conditions"
        title="Find your condition by name, and the therapy you were prescribed"
        description="We are a multi-specialty infusion center. Whether you were told you have rheumatoid arthritis, Crohn's disease, multiple sclerosis, gout, thyroid eye disease, or another condition below, you can see here exactly which specialty cares for it and which therapies we offer."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          {/* Image-tile format (per client feedback). Each tile links to the
              specialty's dedicated page. TODO: drop a representative photo at
              /public/specialties/<slug>.jpg to replace the gradient placeholder. */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.map((s) => (
              <Link
                key={s.slug}
                href={`/specialties/${s.slug}`}
                aria-label={`${s.name} — view specialty`}
                className="group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-navy shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.95) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/25 to-transparent"
                />
                <div className="relative w-full p-5 text-center">
                  <h2 className="font-display text-lg text-white sm:text-xl">
                    {s.name}
                  </h2>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors group-hover:text-coral">
                    View specialty
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grey-50">
        <div className="container-prose grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Don't see what you need?"
            title="Our formulary is broader than this list"
            description="We routinely add new agents as we receive referrals, provided the medication is appropriate for outpatient infusion in a physician-supervised setting. Call us to discuss a specific therapy, and we will let you know whether we can accommodate the referral."
          />
          <div className="space-y-3">
            <a href={`tel:${SITE.phoneTel}`} className="btn-coral w-full">
              <Phone className="h-4 w-4" aria-hidden />
              Call {SITE.phone} ext. {SITE.phoneExt}
            </a>
            <Link href="/medications" className="btn-outline-dark w-full">
              See full formulary
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
