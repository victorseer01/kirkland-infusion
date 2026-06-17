import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PATIENT_JOURNEY } from "@/lib/constants";
import {
  ClipboardList,
  CalendarClock,
  PhoneCall,
  RefreshCw,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "For Patients",
  description:
    "Your infusion journey in three clear stages, Pre-Infusion, Infusion Day, and Post-Infusion Follow-Up. From the day your referral arrives to the free nurse check-in after you go home, here is exactly what to expect.",
  path: "/patients",
});

const STAGE_ICONS = [ClipboardList, CalendarClock, PhoneCall] as const;

export default function PatientsPage() {
  return (
    <>
      <PageHero
        eyebrow="For patients"
        title="Your infusion journey, in three clear stages"
        description="If your doctor has referred you to us, welcome. We have broken down exactly what happens, before, during, and after your infusion, so there is no black box, no guessing, and nothing to worry about."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="What to expect"
            title="Pre-Infusion, Infusion Day, and Post-Infusion Follow-Up"
            description="Three stages, each with a clear set of things we take care of. It is a managed, repeating cycle, you are guided through every step."
          />

          <div className="mt-14 space-y-14">
            {PATIENT_JOURNEY.map((stage, i) => {
              const Icon = STAGE_ICONS[i];
              return (
                <div
                  key={stage.stage}
                  className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12"
                >
                  <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:gap-3">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-ice">
                      <Icon className="h-7 w-7" aria-hidden />
                    </span>
                    <span className="font-display text-sm uppercase tracking-[0.18em] text-primary lg:text-center">
                      Stage {stage.stage}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-primary-dark sm:text-3xl">
                      {stage.name}
                    </h3>
                    <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-grey-700 sm:text-base">
                      {stage.lede}
                    </p>

                    <ol className="mt-8 space-y-4">
                      {stage.points.map((point, pi) => (
                        <li
                          key={point.title}
                          className="grid gap-5 rounded-2xl border border-grey-200 bg-white p-6 shadow-sm sm:grid-cols-[48px_1fr]"
                        >
                          <span
                            aria-hidden
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-display text-lg text-primary"
                          >
                            {pi + 1}
                          </span>
                          <div>
                            <h4 className="font-display text-lg text-primary-dark">
                              {point.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-grey-700 sm:text-base">
                              {point.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex items-start gap-4 rounded-2xl border border-primary/20 bg-ice/60 p-6 sm:p-7">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <RefreshCw className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg text-primary-dark">
                A managed cycle, not a one-off
              </p>
              <p className="mt-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                Your post-infusion follow-up flows straight back into preparing
                for your next visit, coverage re-checked, your appointment
                booked, reminders sent. You will always know what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark text-ice">
        <div className="container-prose grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            eyebrow="Infusion day"
            title="What to bring on infusion day"
            tone="light"
          />
          <ul className="grid gap-3 text-sm text-ice/90 sm:text-base">
            <li className="flex items-start gap-3">
              <ClipboardList
                className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                aria-hidden
              />
              A list of current medications, supplements, and recent changes
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList
                className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                aria-hidden
              />
              Insurance card and a form of photo ID
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList
                className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                aria-hidden
              />
              Something to keep you occupied, book, tablet, headphones
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList
                className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                aria-hidden
              />
              Loose, comfortable clothing, easy access to one arm
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList
                className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                aria-hidden
              />
              And drink plenty of water beforehand, it makes starting your IV
              easier
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
