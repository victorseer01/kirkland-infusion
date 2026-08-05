import Link from "next/link";
import {
  Phone,
  Printer,
  Mail,
  FileText,
  ArrowRight,
  ClipboardCheck,
  HeartHandshake,
  Stethoscope,
  MessagesSquare,
  CalendarCheck,
  ClipboardList,
  Syringe,
  Download,
  ExternalLink,
} from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  SITE,
  REFERRAL_FORMS,
  REFERRAL_FORMS_URL,
  REFERRAL_PORTALS,
} from "@/lib/constants";
import { resolveReferralForm } from "@/lib/referralForms";
import { StickyCallBar } from "@/components/shared/StickyCallBar";

export const metadata = buildMetadata({
  title: "For Referring Physicians",
  description:
    "One referral. Zero hassle. We handle prior authorizations, financial advocacy, lab coordination, scheduling, infusion, and follow-up, and we close the loop with your office.",
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
    sub: "Mon to Fri, 7:30 AM to 5:00 PM",
    href: `tel:${SITE.phoneTel}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    sub: "Same-business-day acknowledgment",
    href: `mailto:${SITE.email}`,
  },
];

// Icons for the white-glove cards, in the same order as WHITE_GLOVE.
const WHITE_GLOVE_ICONS = [
  ClipboardCheck,
  HeartHandshake,
  Stethoscope,
  MessagesSquare,
  CalendarCheck,
  ClipboardList,
  Syringe,
] as const;

const INCLUDE_ITEMS = [
  "Patient demographics and insurance information",
  "Medication name, dose, frequency, and indication",
  "Recent relevant laboratory results and imaging",
  "TB and hepatitis screening results (when applicable)",
  "Premedication orders, if required",
  "Recent progress note or clinical summary",
  "Preferred contact information for clinical communication",
];

const WHITE_GLOVE = [
  {
    title: "Insurance & Authorization Management",
    body: "We manage benefits verification, prior authorizations, appeals, and assistance programs to help minimize delays in treatment initiation.",
  },
  {
    title: "We Provide Pre-Infusion Patient Support",
    body: "Before infusion, patients meet with an Advanced Practice Provider (APP) to review treatment, discuss what to expect, and ask any remaining questions about side effects or their care plan, helping patients feel prepared while minimizing follow-up calls to your office.",
  },
  {
    title: "A Physician is Always On Site",
    body: "A Physician or experienced Advanced Practice Provider (APP) is present during every infusion to provide clinical oversight and support throughout treatment.",
  },
  {
    title: "We Keep the Care Loop Closed",
    body: "Your office receives timely communication after infusion, including treatment status, patient tolerance, and next steps to support continuity of care.",
  },
  {
    title: "We Support Treatment Adherence",
    body: "We coordinate follow-up scheduling and patient reminders to help keep therapy on track and reduce missed infusions.",
  },
  {
    title: "Referral & Patient Coordination",
    body: "We receive your referral, verify insurance, and schedule the patient at their earliest convenience.",
  },
  {
    title: "Infusion Day",
    body: "Patients receive care in a calm, private setting with licensed medical staff and a provider available for clinical oversight, guidance, and medication questions.",
  },
];

export default function PhysiciansPage() {
  return (
    <>
      <StickyCallBar variant="refer" />
      <PageHero
        eyebrow="For referring physicians"
        title="White-Glove Support for Your Patients and Your Practice"
        description="You focus on making clinical decisions. We focus on helping patients start treatment sooner, stay on therapy, and receive the coordinated support they need throughout their infusion journey. From insurance approvals and patient outreach to clinical communication and follow-up, our team manages the details while keeping your office informed every step of the way."
      />

      <section id="how-to-refer" className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="How to refer a patient"
            title="Send the Referral. We'll Handle the Rest."
            description="Once we receive your referral, our team begins coordinating insurance approvals, patient outreach, scheduling, and treatment preparation, keeping both your office and your patient informed along the way."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
                Helping Patients Get Started Quickly
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-grey-700">
                To help us begin coordinating care as efficiently as possible,
                please include the following information with your referral when
                available:
              </p>
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
                <strong className="text-primary-dark">
                  Don&apos;t have everything yet?
                </strong>{" "}
                That&apos;s okay. Send what you have, and our team will work with
                you to obtain any additional information needed to coordinate
                care.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-coral"
              >
                Prefer to talk to a person?
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </aside>

            <div className="flex flex-col justify-center rounded-2xl border border-grey-200 bg-primary-dark p-8 text-ice sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-coral">
                <FileText className="h-6 w-6" aria-hidden />
              </span>
              <SectionHeading
                eyebrow="Online referral"
                title="Submit a referral through a secure portal"
                description="Prefer to refer online? Upload a referral and supporting documents through one of our secure portals. We acknowledge every referral the same business day."
                tone="light"
                className="mt-5 max-w-none"
              />
              <div className="mt-6 space-y-3">
                {REFERRAL_PORTALS.map((portal) => (
                  <a
                    key={portal.url}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-coral/15 text-coral">
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="font-display text-base text-white transition-colors group-hover:text-coral">
                        {portal.name}
                      </span>
                      <span className="mt-1 block text-sm text-ice/80">
                        {portal.blurb}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="referral-forms" className="section-y bg-grey-50">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Referral forms"
            title="Medication-Specific Referral Forms"
            description="Browse our library of medication-specific referral forms. Select the form that matches your patient's prescribed therapy to view and download it."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REFERRAL_FORMS.map((name) => {
              const pdf = resolveReferralForm(name);
              return (
                <a
                  key={name}
                  href={pdf ?? REFERRAL_FORMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...(pdf ? { download: "" } : {})}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-grey-200 bg-white px-4 py-3.5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
                >
                  <span className="flex items-center gap-3">
                    <FileText
                      className="h-4 w-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="text-sm font-medium text-primary-dark">
                      {name}
                    </span>
                  </span>
                  <Download
                    className="h-4 w-4 shrink-0 text-grey-400 transition-colors group-hover:text-coral"
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="The white-glove promise"
            title="What we do for your office, on every referral"
            description="One referral from you sets all of this in motion. You send the referral; we do the rest."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHITE_GLOVE.map((item, i) => {
              const Icon = WHITE_GLOVE_ICONS[i];
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-primary-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
