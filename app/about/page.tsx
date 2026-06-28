import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AwardsMarquee } from "@/components/shared/AwardsMarquee";
import { AlternatingFeatures } from "@/components/shared/AlternatingFeatures";
import { SITE } from "@/lib/constants";
import { ArrowRight, ExternalLink } from "lucide-react";

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
    body: "We book the next infusion before the patient leaves the chair. We send reminders. We re-verify insurance well in advance. We anticipate prior authorization renewals before they expire. Adherence is the single biggest determinant of long-term outcomes in chronic immunologic and inflammatory disease, and we treat it that way.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A better infusion experience, built on twenty years of specialty care"
        description="Our story, our standards, and our team, built around the patients we treat and the physicians who refer them."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="Our story"
              title="The infusion suite we wished existed for our own patients"
            />
            <figure className="mt-8 flex items-center gap-4 overflow-hidden rounded-2xl border border-grey-200 bg-white p-4 shadow-sm sm:gap-5 sm:p-5 lg:flex-col lg:items-stretch lg:p-0">
              <div className="group/media relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-grey-100 sm:w-32 lg:aspect-[4/3] lg:w-full lg:rounded-none">
                <Image
                  src="/staff/arinola-dada.jpg"
                  alt="Dr. Arinola Dada, MD, FACR"
                  fill
                  sizes="(min-width: 1024px) 360px, 128px"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover/media:scale-105"
                />
              </div>
              <figcaption className="lg:px-5 lg:py-4">
                <p className="font-display text-lg text-primary-dark">
                  Dr. Arinola Dada, MD, FACR
                </p>
                <p className="mt-1 text-sm text-grey-600">
                  Board Certified Rheumatologist
                </p>
              </figcaption>
            </figure>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-grey-700 sm:text-lg">
            <p>
              {SITE.name} was founded by the physicians and team behind{" "}
              {SITE.affiliatedWith} and Overlake Arthritis and Osteoporosis
              Center, a Bellevue-area practice that has cared for thousands of
              patients with arthritis, autoimmune disease, gout, osteoporosis,
              and other rheumatologic conditions for more than two decades.
            </p>
            <p>
              Over the years, our patients told us the same thing in different
              words: they trusted our practice, but the infusion experience
              elsewhere was the weak link in their care.
            </p>
            <p>
              Long waits, confusing billing, staff who did not know their history, the unsettling
              feeling of receiving a complex medication without a physician
              readily available to answer questions or adjust the plan in real
              time.
            </p>
            <p>
              So we built our own infusion center. We built it the way we wished
              infusion centers were built when we refer our own family members.
              </p>  
              <p>
              Physician-led, financially advocated, communicative, calm and
              open not just to our own patients, but to every referring
              physician in the region who wants their patients to receive the
              same standard of care.
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
          <div className="mt-10">
            <AlternatingFeatures items={DIFFERENCES} />
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-prose grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Our team"
            title="Experienced infusion nurses, supervised by physicians"
            description="A licensed provider is present in the suite for every infusion. Meet the providers and infusion nurses who will care for you, the same faces you will see visit after visit."
          />
          <div>
            <Link href="/team" className="btn-coral">
              Meet our team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-grey-50">
        <div className="container-prose section-y">
          <AwardsMarquee />
        </div>
      </section>

      <section className="section-y bg-primary-dark text-ice">
        <div className="container-prose grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Our affiliated practice"
            title="Same physicians. Same standard of care."
            tone="light"
          />
          <div>
            <p className="text-pretty text-base leading-relaxed text-ice/90 sm:text-lg">
              {SITE.name} is affiliated with {SITE.affiliatedWith}, the Kirkland
              branch of the {SITE.oaoc.name} family of practices. Patients
              receive the same physicians, the same clinical culture, and the
              same standard of care across both locations. {SITE.affiliatedWith}{" "}
              focuses on rheumatologic and immunologic disease; {SITE.name}{" "}
              serves patients across rheumatology, gastroenterology,
              dermatology, neurology, and other specialties referred by
              physicians throughout the region.
            </p>
            <a
              href={SITE.oaoc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-coral mt-6"
            >
              Learn more about our clinical care partner, {SITE.oaoc.shortName}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
