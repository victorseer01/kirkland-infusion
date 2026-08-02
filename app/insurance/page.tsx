import fs from "fs";
import path from "path";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE } from "@/lib/constants";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Insurance & Financial Assistance",
  description:
    "Cost should not stand between you and treatment. We verify coverage, pursue copay assistance and foundation grants, and re-verify benefits each year.",
  path: "/insurance",
});

const ADVOCACY_LIST = [
  "Verify your insurance coverage before your first infusion",
  "Provide an estimate of your expected out-of-pocket costs whenever possible",
  "Submit and track prior authorizations for covered medications",
  "Explore manufacturer copay assistance programs",
  "Evaluate eligibility for patient assistance programs (PAPs)",
  "Identify available foundation grants and financial support resources",
  "Re-verify benefits when coverage changes occur",
  "Renew authorizations before they expire",
];

// Drop a logo into public/insurance/<slug>.(svg|png|jpg|webp) and it appears
// automatically; until then the carrier shows as a name-only card.
const CARRIERS = [
  { name: "Premera Blue Cross", slug: "premera-blue-cross" },
  { name: "Regence BlueShield", slug: "regence-blueshield" },
  { name: "Aetna", slug: "aetna" },
  { name: "Cigna", slug: "cigna" },
  { name: "UnitedHealthcare", slug: "unitedhealthcare" },
  { name: "Kaiser Permanente PPO", slug: "kaiser-permanente" },
  { name: "First Choice Health", slug: "first-choice-health" },
  { name: "Medicare", slug: "medicare" },
  { name: "Medicare Advantage", slug: "medicare-advantage" },
];

// Resolve carrier logos present in /public/insurance at build time.
function resolveCarrierLogos() {
  const dir = path.join(process.cwd(), "public", "insurance");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }
  const map: Record<string, string> = {};
  for (const carrier of CARRIERS) {
    const match = files.find((f) =>
      /\.(svg|png|jpg|jpeg|webp)$/i.test(f) &&
      f.slice(0, f.lastIndexOf(".")).toLowerCase() === carrier.slug,
    );
    if (match) map[carrier.slug] = `/insurance/${match}`;
  }
  return map;
}

const CARRIER_LOGOS = resolveCarrierLogos();

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance & financial assistance"
        title="We're Here to Help You Navigate the Financial Side of Care"
        description="Understanding insurance coverage and treatment costs can feel overwhelming. Our team works closely with patients, providers, and insurance companies to help clarify benefits, explore available assistance programs, and make the process as straightforward as possible."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="What we do for every patient"
            title="Helping You Navigate Insurance With Confidence"
          />
          <ul className="space-y-4">
            {ADVOCACY_LIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-grey-700 sm:text-base"
              >
                <CheckCircle2
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Insurance plans accepted"
            title="We Work With Most Major Insurance Plans"
            description="We accept Medicare and many major commercial insurance plans. Coverage for infusion therapy can vary based on your specific plan and prescribed medication, so our team will verify your benefits and explain your coverage before treatment begins."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CARRIERS.map((carrier) => {
              const logo = CARRIER_LOGOS[carrier.slug];
              return (
                <div
                  key={carrier.slug}
                  title={carrier.name}
                  className="group relative flex h-28 items-center justify-center rounded-xl border border-grey-200 bg-white px-6 py-5 transition hover:border-grey-300 hover:shadow-sm"
                >
                  {logo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo}
                        alt={`${carrier.name} logo`}
                        className="max-h-16 w-auto max-w-[85%] object-contain transition duration-200 group-hover:opacity-0"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center rounded-xl bg-white px-4 text-center text-sm font-semibold text-grey-900 opacity-0 transition duration-200 group-hover:opacity-100"
                      >
                        {carrier.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-center text-sm font-medium text-grey-900">
                      {carrier.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-2">
          <article className="card-soft">
            <h3 className="font-display text-xl text-primary-dark">
              Self-Pay Patients
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
              Some of our wellness and supportive care services are available on
              a self-pay basis. Our team is happy to discuss pricing, answer
              questions, and help you determine whether a self-pay option may be
              right for your needs.
            </p>
            <Link
              href="/medications"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-coral"
            >
              Learn About Self-Pay Services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </article>

          <article className="card-soft">
            <h3 className="font-display text-xl text-primary-dark">
              Need Help Understanding a Bill?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
              Insurance claims and medical billing can be confusing. If something
              doesn&apos;t look right or you have questions about your charges,
              contact our team and we&apos;ll help review the information with
              you.
            </p>
            <a href={`tel:${SITE.phoneTel}`} className="btn-outline-dark mt-6">
              <Phone className="h-4 w-4" aria-hidden />
              Call {SITE.phone} ext. {SITE.phoneExt}
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
