import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import {
  MEDICATIONS,
  CASH_PAY_SERVICES,
  SPECIALTIES,
  SITE,
} from "@/lib/constants";
import {
  Info,
  FileText,
  ArrowRight,
  ExternalLink,
  Syringe,
  Sun,
  FlaskConical,
  Droplets,
  Activity,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "Medications & Therapies",
  description:
    "Find your therapy under the specialty that uses it: rheumatology, neurology/MS, gastroenterology, dermatology, osteoporosis, allergy and immunology, and inflammatory eye disease, plus our full A-to-Z formulary and cash-pay wellness services.",
  path: "/medications",
});

// Icons for the cash-pay wellness cards, in the same order as CASH_PAY_SERVICES.
const CASH_PAY_ICONS = [Syringe, Sun, FlaskConical, Droplets, Activity] as const;

export default function MedicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Medications & therapies"
        title="Find the Therapy That's Right for Your Condition"
        description="Whether you've been prescribed a biologic medication, infusion therapy, or specialty treatment, we've organized our formulary by specialty to make it easier to find the information you need."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
            <SectionHeading
              eyebrow="Therapies by specialty"
              title="Find Your Therapy by Specialty"
              description="We've organized our therapies by specialty to help patients and providers quickly find the treatments they're looking for. Because some medications are used across multiple conditions, you may see them listed under more than one specialty."
            />
            <MediaPlaceholder
              aspect="wide"
              tone="navy"
              src="/medications/care.jpg"
              alt="A care team member supporting a patient during infusion therapy"
            />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 md:grid-cols-2">
            {SPECIALTIES.map((s) => (
              <article key={s.slug} className="bg-white p-7 sm:p-8">
                <h3 className="font-display text-xl text-primary-dark">
                  {s.name}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.therapies.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary-dark sm:text-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-ice/50 p-6 sm:flex-row sm:items-center sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg text-primary-dark">
                  Referring providers
                </p>
                <p className="mt-1 text-sm text-grey-700">
                  Download medication-specific referral forms, ready to
                  complete and fax, on our For Physicians page.
                </p>
              </div>
            </div>
            <Link
              href="/physicians#referral-forms"
              className="btn-coral shrink-0"
            >
              Referral Forms
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Complete formulary (A to Z)"
            title="Explore Our Complete Formulary"
            description="Browse our full list of infusion therapies, biologics, and specialty medications, including the conditions they are commonly used to treat."
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
            title="Optional Therapies for Additional Support"
            description="For patients interested in supportive wellness services, we offer a curated selection of physician-supervised cash-pay therapies available outside of traditional insurance coverage."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CASH_PAY_SERVICES.map((s, i) => {
              const Icon = CASH_PAY_ICONS[i] ?? Syringe;
              return (
                <article key={s.name} className="card-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-primary-dark">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
                    {s.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-coral/30 bg-coral/5 p-5 sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral">
              <Info className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-base text-primary-dark">
                A Note About Cash-Pay Services
              </p>
              <p className="mt-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                Cash-pay wellness and supportive services are intended to
                complement, not replace, the care you receive from your primary
                care physician or specialist. We encourage patients to discuss
                any supplemental therapies with their healthcare provider before
                booking. If you have questions about whether a service is right
                for you, our team is happy to help.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
