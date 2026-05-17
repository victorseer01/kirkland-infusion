import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MEDICATIONS, CASH_PAY_SERVICES, SITE } from "@/lib/constants";
import { Info } from "lucide-react";

export const metadata = buildMetadata({
  title: "Medications & Therapies",
  description:
    "Our specialty infusion formulary covers the most commonly prescribed biologic, biosimilar, and immunologic therapies — plus cash-pay wellness services.",
  path: "/medications",
});

export default function MedicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Medications & therapies"
        title="Our specialty formulary and cash-pay services"
        description="All infusions are administered under physician supervision, with full pre-infusion safety review and post-infusion communication back to the referring office."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Specialty infusion drugs"
            title="A comprehensive specialty formulary"
            description="The most commonly prescribed biologic, biosimilar, and immunologic therapies — each administered by licensed clinical staff with a supervising physician present in the suite."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MEDICATIONS.map((m) => (
              <article
                key={m.name}
                className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg text-primary-dark">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {m.generic}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-grey-700">
                  {m.indication}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-grey-500">
            Additional infusion therapies are available upon request. If a specific agent is not listed above, please call us at {SITE.phone} ext. {SITE.phoneExt} — our formulary is reviewed and expanded regularly based on referring physician needs.
          </p>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Cash-pay wellness"
            title="Cash-pay wellness & supportive services"
            description="In addition to our insurance-covered specialty infusion services, we offer a small menu of physician-supervised cash-pay supportive therapies."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CASH_PAY_SERVICES.map((s) => (
              <article key={s.name} className="card-soft">
                <h3 className="font-display text-lg text-primary-dark">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
                  {s.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-coral/30 bg-coral/5 p-5 sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral">
              <Info className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-base text-primary-dark">
                A note on cash-pay services
              </p>
              <p className="mt-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                Cash-pay services are not a substitute for evaluation by your primary care physician or specialist. We recommend discussing supplemental therapies with your physician before booking. If you are unsure whether a service is appropriate for you, call us and we will help you decide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
