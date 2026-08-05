import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Stethoscope,
  ClipboardList,
  LogIn,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { SITE, PATIENT_PORTAL_URL, SELF_REFERRAL_URL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "How to Get Started",
  description:
    "Starting specialty infusion care is simple. Ask your doctor to send a referral, submit your own information through our secure portal, or log in to the patient portal. Our team guides you through insurance, scheduling, and your first treatment.",
  path: "/get-started",
});

const READY_ITEMS = [
  "Your insurance information",
  "Your prescribed medication or diagnosis, if known",
  "Your referring provider's name and contact information",
  "Any recent labs or records related to your treatment",
];

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="For patients"
        title="How to Get Started"
        description="Beginning specialty infusion care is simple. Whether your doctor sends a referral or you reach out to us directly, our team guides you through every step, from insurance and scheduling to your very first treatment."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Getting started"
            title="Three Ways to Begin Your Care"
            description="Choose whichever option is easiest for you. However you reach us, a member of our team will follow up to walk you through what comes next."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* 1. Ask your doctor */}
            <article className="flex flex-col rounded-2xl border border-grey-200 bg-white p-7 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Stethoscope className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl text-primary-dark">
                Ask your doctor to refer you
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                Most infusion therapies require a referral and prescription from
                your physician. Ask your provider to send a referral to Kirkland
                Specialty Infusion Center, and our team handles the rest, from
                insurance approvals to scheduling.
              </p>
              <Link
                href="/physicians#how-to-refer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-coral"
              >
                What your provider needs
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>

            {/* 2. Self-referral */}
            <article className="flex flex-col rounded-2xl border border-primary/30 bg-ice/40 p-7 shadow-sm ring-1 ring-primary/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl text-primary-dark">
                Submit your own information
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                Don&apos;t have a referral yet? Share your details with us
                through our secure, HIPAA-compliant form, no account or login
                required. Our team will follow up to guide you through the next
                steps.
              </p>
              <a
                href={SELF_REFERRAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-coral mt-6"
              >
                Start a Self-Referral
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </article>

            {/* 3. Patient portal */}
            <article className="flex flex-col rounded-2xl border border-grey-200 bg-white p-7 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LogIn className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl text-primary-dark">
                Log in to the Patient Portal
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                Already a patient? Sign in to your Patient Portal to view
                upcoming appointments, message your care team, and access your
                health information.
              </p>
              <a
                href={PATIENT_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark mt-6"
              >
                Open Patient Portal
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Before you reach out"
              title="What to Have Ready"
              description="You don't need everything to get started, but having these details on hand helps us begin coordinating your care more quickly."
            />
            <ul className="mt-8 space-y-4">
              {READY_ITEMS.map((item) => (
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
          <MediaPlaceholder
            aspect="portrait"
            tone="primary"
            src="/get-started/welcome.jpg"
            alt="A patient meeting with a provider at Kirkland Specialty Infusion Center"
            className="lg:h-full"
          />
        </div>
      </section>

      <section className="bg-primary-dark text-ice">
        <div className="container-prose grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            eyebrow="Prefer to talk to us?"
            title="We're Here to Help You Take the First Step"
            description="Not sure which option is right for you? Give us a call and our team will point you in the right direction, answer your questions, and help you get started."
            tone="light"
          />
          <div className="space-y-3">
            <a href={`tel:${SITE.phoneTel}`} className="btn-coral w-full">
              <Phone className="h-4 w-4" aria-hidden />
              Call {SITE.phone} ext. {SITE.phoneExt}
            </a>
            <Link href="/patients" className="btn-outline-light w-full">
              See What to Expect
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
