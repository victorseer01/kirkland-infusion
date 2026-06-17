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
  "Estimate your out-of-pocket cost in writing, before treatment begins",
  "Apply for prior authorization on every covered medication",
  "Identify and apply for manufacturer copay assistance programs",
  "Identify and apply for patient assistance programs (PAPs) when copay assistance is not available",
  "Identify and apply for foundation grants from organizations such as the HealthWell Foundation, Patient Advocate Foundation, and Good Days, when appropriate",
  "Re-verify your benefits each calendar year and at any plan change",
  "Renew prior authorizations before they expire",
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
      f.slice(0, f.lastIndexOf(".")) === carrier.slug,
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
        title="Cost should not stand between you and treatment"
        description="Our financial advocacy program exists because we have watched too many patients delay treatment, ration medication, or decline care altogether because they were afraid of the bill. We will not let that happen on our watch if there is any way to prevent it."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="What we do for every patient"
            title="A standing order, on every chart"
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
            title="Most major commercial plans and Medicare"
            description="We accept most major commercial insurance plans, Medicare, and many Medicare Advantage plans. The list below is being confirmed with our billing team, call us with your card in hand and we will give you a clear answer for your specific plan and medication."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CARRIERS.map((carrier) => {
              const logo = CARRIER_LOGOS[carrier.slug];
              return (
                <div
                  key={carrier.slug}
                  className="flex items-center gap-4 rounded-xl border border-grey-200 bg-white px-4 py-3"
                >
                  {logo ? (
                    <span className="flex h-10 w-16 shrink-0 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo}
                        alt={`${carrier.name} logo`}
                        className="max-h-10 w-auto object-contain"
                      />
                    </span>
                  ) : null}
                  <span className="text-sm font-medium text-grey-900">
                    {carrier.name}
                  </span>
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
              Self-pay patients
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
              We welcome self-pay patients for our cash-pay wellness services
              (B12, vitamin D, Myers Cocktail IV, iron infusions, joint
              injections, and PRP). For specialty infusion medications, the
              medication cost is generally too high to self-pay, but we will
              explore every available assistance program before any patient is
              turned away for financial reasons.
            </p>
            <Link
              href="/medications"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-coral"
            >
              See cash-pay services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </article>

          <article className="card-soft">
            <h3 className="font-display text-xl text-primary-dark">
              Questions about a bill
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
              If you receive a bill that does not look right, or that exceeds
              what we told you to expect, please call us immediately. We will
              review the charges with you and contact the insurance company on
              your behalf if needed.
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
