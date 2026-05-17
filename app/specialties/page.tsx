import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SPECIALTIES, SITE } from "@/lib/constants";
import { Phone, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Specialties Served",
  description:
    "Our formulary and clinical expertise span eight medical specialties. Rheumatology, gastroenterology, oncology/hematology, dermatology, neurology, osteoporosis, allergy and immunology, endocrinology.",
  path: "/specialties",
});

export default function SpecialtiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialties served"
        title="A specialty infusion center, in the truest sense of the word"
        description="Whether your patient needs a biologic for rheumatoid arthritis, an investigational therapy for thyroid eye disease, an IVIG infusion for an immunodeficiency, or a bone-building agent for severe osteoporosis, we are equipped, trained, and ready."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 md:grid-cols-2">
            {SPECIALTIES.map((s) => (
              <article key={s.slug} className="flex flex-col bg-white p-7 sm:p-9">
                <h2 className="font-display text-2xl text-primary-dark">
                  {s.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                  {s.body}
                </p>
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Featured therapies
                  </p>
                  <p className="mt-2 text-sm text-grey-700">
                    {s.therapies.join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grey-50">
        <div className="container-prose grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Don't see what you need?"
            title="Our formulary is broader than this list"
            description="We routinely add new agents as we receive referrals — provided the medication is appropriate for outpatient infusion in a physician-supervised setting. Call us to discuss a specific therapy, and we will let you know whether we can accommodate the referral."
          />
          <div className="space-y-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="btn-coral w-full"
            >
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
