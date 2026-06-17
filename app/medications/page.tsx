import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  MEDICATIONS,
  CASH_PAY_SERVICES,
  SPECIALTIES,
  SITE,
} from "@/lib/constants";
import { Info, ExternalLink } from "lucide-react";

export const metadata = buildMetadata({
  title: "Medications & Therapies",
  description:
    "Find your therapy under the specialty that uses it: rheumatology, neurology/MS, gastroenterology, dermatology, osteoporosis, allergy and immunology, and endocrinology, plus our full A-to-Z formulary and cash-pay wellness services.",
  path: "/medications",
});

// Manufacturer site for each therapy name, for hyperlinking the chips below.
const MED_URL: Record<string, string> = Object.fromEntries(
  MEDICATIONS.map((m) => [m.name, m.url]),
);

export default function MedicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Medications & therapies"
        title="Do we have your medicine? Find it under your specialty"
        description="Therapies are grouped under the specialty that uses them, so you can quickly find the one your physician prescribed. Some biologics treat conditions across more than one specialty, so you will see them listed under each. All infusions are administered under physician supervision."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Therapies by specialty"
            title="Find your therapy under the specialty that uses it"
            description="A patient referred by their neurologist sees MS and neurology therapies here; a patient referred by their gastroenterologist sees GI therapies. Biologics that span specialties appear under each relevant one."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 md:grid-cols-2">
            {SPECIALTIES.map((s) => (
              <article key={s.slug} className="bg-white p-7 sm:p-8">
                <h3 className="font-display text-xl text-primary-dark">
                  {s.name}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.therapies.map((t) =>
                    MED_URL[t] ? (
                      <li key={t}>
                        <a
                          href={MED_URL[t]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary-dark transition-colors hover:border-primary/40 hover:bg-primary/10 sm:text-sm"
                        >
                          {t}
                          <ExternalLink
                            className="h-3 w-3 opacity-60"
                            aria-hidden
                          />
                        </a>
                      </li>
                    ) : (
                      <li
                        key={t}
                        className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary-dark sm:text-sm"
                      >
                        {t}
                      </li>
                    ),
                  )}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Complete formulary (A to Z)"
            title="Every therapy we administer, with its indication"
            description="The full list of biologic, biosimilar, and immunologic therapies, each administered by licensed clinical staff with a supervising provider present in the suite."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MEDICATIONS.map((m) => (
              <article
                key={m.name}
                className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm"
              >
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-display text-lg text-primary-dark hover:text-coral"
                >
                  {m.name}
                  <ExternalLink
                    className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
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
            Additional infusion therapies are available upon request. If a
            specific agent is not listed above, please call us at {SITE.phone}{" "}
            ext. {SITE.phoneExt}, our formulary is reviewed and expanded
            regularly based on referring physician needs.
          </p>
        </div>
      </section>

      <section className="section-y bg-white">
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
                Cash-pay services are not a substitute for evaluation by your
                primary care physician or specialist. We recommend discussing
                supplemental therapies with your physician before booking. If
                you are unsure whether a service is appropriate for you, call us
                and we will help you decide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
