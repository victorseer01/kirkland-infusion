import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CalendarClock, FileText, HandCoins, ClipboardList, Users, ShieldCheck } from "lucide-react";

export const metadata = buildMetadata({
  title: "For Patients",
  description:
    "What to expect, before, during, and after your infusion. From the first phone call to the moment you walk back out the door — no surprises.",
  path: "/patients",
});

const BEFORE_STEPS = [
  {
    title: "We will reach out to you",
    body: "Once we receive your referral, a member of our team will call you within one to two business days. We will introduce ourselves, confirm your insurance, answer your initial questions, and schedule your first infusion at a time that works for you.",
  },
  {
    title: "We will handle the paperwork",
    body: "Most specialty infusion medications require prior authorization from your insurance company. Our team handles this entire process for you, including any appeals, peer-to-peer reviews, and supporting documentation. You should not need to call your insurance company yourself.",
  },
  {
    title: "We will look at the cost",
    body: "Our financial advocates will review your coverage and out-of-pocket costs. If there is a copay, deductible, or coinsurance you would otherwise be responsible for, we will explore copay assistance programs, manufacturer support programs, and foundation grants to reduce or eliminate that cost. Many of our patients pay little or nothing out of pocket. Cost should not stand between you and treatment, and we will make sure it does not.",
  },
  {
    title: "We will get your labs and history in order",
    body: "Before your first infusion, our team will work with your referring physician to confirm any necessary labs, imaging, or screening (for example, tuberculosis or hepatitis screening, DEXA bone density for osteoporosis treatments) are complete and current. We do this in advance so your infusion day is smooth.",
  },
];

export default function PatientsPage() {
  return (
    <>
      <PageHero
        eyebrow="For patients"
        title="What to expect, before, during, and after your infusion"
        description="If your doctor has referred you to us, welcome. You are in capable, caring hands. This page walks you through what to expect — so there are no surprises and nothing to worry about."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Before your first infusion"
            title="Four things we will take care of, in order"
            description="From the moment your referral arrives, four steps happen before you sit in the chair."
          />

          <ol className="mt-12 space-y-6">
            {BEFORE_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-6 rounded-2xl border border-grey-200 bg-white p-6 sm:grid-cols-[80px_1fr] sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 font-display text-2xl text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl text-primary-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey-700 sm:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose grid gap-10 lg:grid-cols-2 lg:gap-12">
          <article className="card-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarClock className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-2xl text-primary-dark">
              The day of your infusion
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-grey-700 sm:text-base">
              <p>
                Plan to arrive about fifteen minutes before your scheduled time. Wear comfortable, loose clothing. Bring something to keep yourself occupied — a book, your phone, a tablet, headphones, knitting. Some patients sleep. Some catch up on email. Some chat with our staff or with other patients in the suite.
              </p>
              <p>
                Eat a normal meal before you arrive unless your physician has told you otherwise. Continue your regular medications unless specifically instructed to hold one. Bring a list of your current medications, supplements, and any recent changes.
              </p>
              <p>
                When you arrive, our team will check your vital signs, review any changes since your last visit, and prepare your medication. A licensed nurse will start your IV. Your physician or supervising provider will be available in the suite throughout your infusion to answer questions and respond to any concerns.
              </p>
              <p>
                Most infusions take between thirty minutes and several hours, depending on the medication. We will tell you exactly how long to expect at the time of scheduling. You may eat, drink, use the restroom, and move around comfortably during your visit.
              </p>
            </div>
          </article>

          <article className="card-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-2xl text-primary-dark">
              After your infusion
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-grey-700 sm:text-base">
              <p>
                When your infusion is complete, we will remove your IV, check your vital signs one more time, and review any aftercare instructions specific to your medication. We will schedule your next infusion before you leave so it is on your calendar and ours.
              </p>
              <p>
                We will also send a note to your referring physician&apos;s office confirming that you received your medication, how you tolerated it, and when you are scheduled next. Your physician will know everything that happened during your visit.
              </p>
              <p>
                Most patients return to their normal activities immediately. A small number of patients feel tired for the rest of the day — this is normal and usually resolves overnight.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-3">
          <article className="card-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10 text-coral">
              <HandCoins className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-xl text-primary-dark">
              Financial advocacy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
              Cost should not stand between you and the treatment your doctor prescribed. We work copay assistance programs, manufacturer support, and foundation grants for every patient who needs them. Many of our patients pay little or nothing out of pocket. Before you decline a treatment for financial reasons, please let us run the numbers.
            </p>
          </article>

          <article className="card-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-xl text-primary-dark">
              Bringing a companion
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
              You are welcome to bring one companion to your infusion. Most patients prefer to sit alone or with one trusted person. If you would like company, just let us know.
            </p>
          </article>

          <article className="card-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-xl text-primary-dark">
              Privacy and comfort
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
              Our infusion suite is private and quiet. You will not be in a crowded room. Our staff knows the rhythms of long-term infusion care — when to chat, when to leave you alone, when to bring you a warm blanket without being asked.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-primary-dark text-ice">
        <div className="container-prose grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            eyebrow="Bring a list"
            title="What to bring on infusion day"
            tone="light"
          />
          <ul className="grid gap-3 text-sm text-ice/90 sm:text-base">
            <li className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden />
              A list of current medications, supplements, and recent changes
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden />
              Insurance card and a form of photo ID
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden />
              Something to keep you occupied — book, tablet, headphones
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden />
              Loose, comfortable clothing — easy access to one arm
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
