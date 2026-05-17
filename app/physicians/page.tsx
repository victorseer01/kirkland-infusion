import Link from "next/link";
import { Phone, Printer, Mail, FileText, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WHY_REFER, SIX_STEP_PROCESS, SITE } from "@/lib/constants";
import { ReferralForm } from "@/components/forms/ReferralForm";
import { ServiceStack } from "@/components/services/ServiceStack";
import { StickyCallBar } from "@/components/shared/StickyCallBar";

export const metadata = buildMetadata({
  title: "For Referring Physicians",
  description:
    "One referral. Zero hassle. We handle prior authorizations, financial advocacy, lab coordination, scheduling, infusion, and follow-up — and we close the loop with your office.",
  path: "/physicians",
});

const REFER_METHODS = [
  {
    icon: Printer,
    label: "Fax",
    value: SITE.fax,
    sub: "Attention: Infusion Intake",
    href: `tel:${SITE.fax.replace(/\D/g, "")}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: `${SITE.phone} ext. ${SITE.phoneExt}`,
    sub: "Mon–Fri, 7:30 AM – 5:00 PM",
    href: `tel:${SITE.phoneTel}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    sub: "Same-business-day acknowledgment",
    href: `mailto:${SITE.email}`,
  },
  {
    icon: FileText,
    label: "Online referral",
    value: "Submit below",
    sub: "HIPAA-aligned web form",
    href: "#refer",
  },
];

const INCLUDE_ITEMS = [
  "Patient demographics and insurance information",
  "Medication name, dose, frequency, and indication",
  "Recent relevant labs and imaging",
  "TB and hepatitis screening results for biologic-naïve patients",
  "Any premedication orders",
  "Brief clinical summary or copy of recent progress note",
  "Preferred contact information for clinical communication",
];

export default function PhysiciansPage() {
  return (
    <>
      <StickyCallBar variant="refer" />
      <PageHero
        eyebrow="For referring physicians"
        title="One referral. Zero hassle. Your patient is in expert hands."
        description="You spend your time making clinical decisions. We spend ours making sure those decisions translate into infusions that actually happen — on time, on schedule, with full insurance coverage, and with the clinical communication you need."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Why refer to us"
            title="Five things you can rely on, every infusion"
            description="The behaviors that make our suite a different kind of partner for your practice."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 lg:grid-cols-2">
            {WHY_REFER.map((reason) => (
              <article key={reason.title} className="bg-white p-7 sm:p-9">
                <h3 className="font-display text-xl text-primary-dark">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
                  {reason.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grey-50 pb-14 pt-14 sm:pt-20" id="process">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Our six-step process"
            title="Seamless from referral to follow-up"
            description="A walk-through of what happens between the moment we receive your referral and the note that lands back in your inbox after every infusion."
          />
        </div>
        <div className="container-prose mt-12">
          <ServiceStack
            sticky
            items={SIX_STEP_PROCESS.map((step) => ({
              eyebrow: `Step ${step.number}`,
              title: step.title,
              body: step.body,
            }))}
          />
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="How to refer a patient"
            title="Choose whichever method is easiest for your office"
            description="We accept referrals by fax, secure email, phone, or this online form. Every referral is acknowledged the same business day."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REFER_METHODS.map((m) => (
              <a
                key={m.label}
                href={m.href}
                className="group flex flex-col rounded-2xl border border-grey-200 bg-white p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/15">
                  <m.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-primary">
                  {m.label}
                </p>
                <p className="mt-1 font-display text-lg text-primary-dark">
                  {m.value}
                </p>
                <p className="mt-2 text-xs text-grey-500">{m.sub}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-12">
            <aside className="rounded-2xl border border-grey-200 bg-grey-50 p-7 sm:p-9 lg:sticky lg:top-24">
              <h3 className="font-display text-xl text-primary-dark">
                What to include with your referral
              </h3>
              <ul className="mt-5 space-y-3">
                {INCLUDE_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-grey-700 sm:text-base"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl bg-white p-4 text-sm text-grey-700">
                <strong className="text-primary-dark">Missing items?</strong> Send what you have. Our team will follow up with you for anything we need.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-coral"
              >
                Prefer to talk to a person?
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </aside>

            <div>
              <SectionHeading
                eyebrow="Online referral"
                title="Send a referral now"
                description="Submitting below routes directly to our intake team. We acknowledge every referral the same business day."
                className="max-w-none"
              />
              <div className="mt-6">
                <ReferralForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
