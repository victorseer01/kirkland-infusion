import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AwardsMarquee } from "@/components/shared/AwardsMarquee";
import { DifferencesScroller } from "@/components/about/DifferencesScroller";
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
    title: "Physician-Led Care",
    body: "Every infusion is overseen by a physician or licensed provider who is physically present on site. When questions arise or clinical decisions need to be made, support is available in real time, providing patients with peace of mind and referring providers with confidence that their patients are receiving attentive, coordinated care.",
  },
  {
    title: "We Keep Providers Connected",
    body: "Exceptional care depends on clear communication. After each infusion, referring providers receive timely updates on treatment administration, patient response, and any clinically relevant observations. By keeping everyone informed, we help ensure continuity of care beyond the infusion chair.",
  },
  {
    title: "We Handle Everything Your Office Should Not Have To",
    body: "Prior authorizations. Peer-to-peer reviews. Insurance appeals. Manufacturer copay cards. Patient assistance program applications. Foundation grant applications. Pre-infusion lab and DEXA coordination. Patient education calls. Same-day scheduling adjustments. All of it. Your staff sends the referral. We do the rest.",
  },
  {
    title: "We Help Patients Stay on Track",
    body: "Consistent treatment is essential to achieving the best possible outcomes. We proactively coordinate scheduling, verify insurance requirements, confirm clinical readiness, and provide reminders to help patients stay engaged in their care and avoid unnecessary delays.",
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
              <blockquote className="border-l-2 border-coral pl-5 font-display text-xl leading-snug text-primary-dark sm:text-2xl">
                We built the infusion center we wished existed when we refer our
                own family members.
              </blockquote>
              <p>
              Physician-led, financially advocated, communicative, calm and
              open not just to our own patients, but to every referring
              physician in the region who wants their patients to receive the
              same standard of care.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-grey-50 pt-8 sm:pt-10">
        <div className="container-prose">
          <SectionHeading
            eyebrow="What makes us different"
            title="The Standards That Guide Every Patient Experience"
            description="From physician oversight and personalized support to seamless communication and care coordination, these are the principles that shape everything we do."
          />
        </div>
        <div className="mt-4 sm:mt-6">
          <DifferencesScroller items={DIFFERENCES} />
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-prose grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Our team"
            title="Expertise You Can Trust. People Who Truly Care."
            description="Every member of our team shares a commitment to exceptional clinical care, clear communication, and treating patients with the compassion and respect they deserve."
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
        <div className="container-prose">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionHeading
              eyebrow="Our affiliated practice"
              title="Same Physicians. Same Standard of Care."
              tone="light"
            />
            <div>
              <p className="text-pretty text-base leading-relaxed text-ice/90 sm:text-lg">
                {SITE.name} is affiliated with Evergreen Rheumatology and
                Overlake Arthritis and Osteoporosis Center. Patients benefit from
                the same trusted physicians, shared commitment to clinical
                excellence, and coordinated approach to care that have served the
                greater Seattle community for more than two decades.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="font-display text-lg text-white sm:text-xl">
              Learn More About Our Clinical Care Partners
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <a
                href={SITE.oaoc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <span className="flex items-center gap-1.5 font-display text-lg text-white transition-colors group-hover:text-coral">
                  Overlake Arthritis &amp; Osteoporosis Center
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                </span>
                <span className="mt-2 text-sm text-ice/80">
                  Leading rheumatology and specialty care in Bellevue.
                </span>
              </a>

              <div className="flex flex-col rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10">
                <span className="font-display text-lg text-white">
                  Evergreen Rheumatology
                </span>
                <span className="mt-2 text-sm text-ice/80">
                  Leading rheumatology and specialty care in Kirkland.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
