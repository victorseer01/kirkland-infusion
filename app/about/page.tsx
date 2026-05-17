import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE } from "@/lib/constants";
import { UserRound } from "lucide-react";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Our story, our standards, and our team. Kirkland Specialty Infusion Center is a physician-led outpatient infusion suite affiliated with Evergreen Rheumatology.",
  path: "/about",
});

const DIFFERENCES = [
  {
    title: "A Physician Is Always Present",
    body: "Every infusion administered at our center is supervised in real time by a physician or licensed provider physically present in the suite. This is not the industry standard. In many outpatient infusion centers, a supervising physician is on call from another building, or even another city, available by phone if a reaction occurs. We do not consider that good enough for our patients, and we do not consider it good enough for yours. The physician is here. In the building. Every infusion. Every day.",
  },
  {
    title: "We Close the Loop",
    body: "After every infusion, your referring office receives a note confirming the medication was administered, how the patient tolerated it, any clinical observations worth flagging, and the date of the next scheduled visit. You will never wonder whether your patient showed up. You will never be surprised at the follow-up appointment.",
  },
  {
    title: "We Handle Everything Your Office Should Not Have To",
    body: "Prior authorizations. Peer-to-peer reviews. Insurance appeals. Manufacturer copay cards. Patient assistance program applications. Foundation grant applications. Pre-infusion lab and DEXA coordination. Patient education calls. Same-day scheduling adjustments. All of it. Your staff sends the referral. We do the rest.",
  },
  {
    title: "Patients Arrive Prepared",
    body: "Before every infusion, our team confirms labs are current, screens the patient for recent illness or vaccination, verifies premedications are in place, and reviews the patient's clinical baseline. Patients arrive ready, infusion chairs stay productive, and treatment plans stay on schedule.",
  },
  {
    title: "We Keep Patients on Schedule",
    body: "We book the next infusion before the patient leaves the chair. We send reminders. We re-verify insurance well in advance. We anticipate prior authorization renewals before they expire. Adherence is the single biggest determinant of long-term outcomes in chronic immunologic and inflammatory disease — and we treat it that way.",
  },
];

const TEAM_PLACEHOLDERS = [
  { role: "Lead Physician" },
  { role: "Supervising Physician" },
  { role: "Nurse Manager" },
  { role: "Clinical Pharmacist" },
  { role: "Financial Counselor" },
  { role: "Patient Intake Coordinator" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A better infusion experience, built on twenty years of specialty care"
        description="Our story, our standards, and our team — built around the patients we treat and the physicians who refer them."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Our story"
            title="The infusion suite we wished existed for our own patients"
          />
          <div className="space-y-5 text-base leading-relaxed text-grey-700 sm:text-lg">
            <p>
              {SITE.name} was founded by the physicians and team behind {SITE.affiliatedWith} and Overlake Arthritis and Osteoporosis Center — a Bellevue-area practice that has cared for thousands of patients with arthritis, autoimmune disease, gout, osteoporosis, and other rheumatologic conditions for more than two decades.
            </p>
            <p>
              Over the years, our patients told us the same thing in different words: they trusted our practice, but the infusion experience elsewhere was the weak link in their care. Long waits. Confusing billing. Staff who did not know their history. The unsettling feeling of receiving a complex medication without a physician readily available to answer questions or adjust the plan in real time.
            </p>
            <p>
              So we built our own infusion center. We built it the way we wished infusion centers were built when we refer our own family members. Physician-led. Financially advocated. Communicative. Calm. And open not just to our own patients, but to every referring physician in the region who wants their patients to receive the same standard of care.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose">
          <SectionHeading
            eyebrow="What makes us different"
            title="Five standards we will not compromise on"
            description="The promises that shape every infusion, every chart note, and every call back to your office."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 lg:grid-cols-2">
            {DIFFERENCES.map((d) => (
              <article key={d.title} className="bg-white p-7 sm:p-9">
                <h3 className="font-display text-xl text-primary-dark">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey-700 sm:text-base">
                  {d.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Our team"
            title="Experienced infusion nurses, supervised by board-certified physicians"
            description="Detailed bios for each physician and clinical leader will live on this page with professional photographs. The placeholders below show the roles we expect to publish."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_PLACEHOLDERS.map((member, i) => (
              <article
                key={i}
                className="card-soft flex flex-col items-start"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg text-primary-dark">
                  {member.role}
                </h3>
                <p className="mt-2 text-sm text-grey-500">
                  Bio and photograph pending — to be supplied by Dr. Dada and the SGSL ops team.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-primary-dark text-ice">
        <div className="container-prose grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Our affiliated practice"
            title="Same physicians. Same standard of care."
            tone="light"
          />
          <p className="text-pretty text-base leading-relaxed text-ice/90 sm:text-lg">
            {SITE.name} is affiliated with {SITE.affiliatedWith}, the Kirkland branch of the Overlake Arthritis and Osteoporosis Center family of practices. Patients receive the same physicians, the same clinical culture, and the same standard of care across both locations. {SITE.affiliatedWith} focuses on rheumatologic and immunologic disease; {SITE.name} serves patients across rheumatology, gastroenterology, oncology, dermatology, neurology, and other specialties referred by physicians throughout the region.
          </p>
        </div>
      </section>
    </>
  );
}
