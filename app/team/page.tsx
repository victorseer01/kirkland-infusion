import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamGallery } from "@/components/team/TeamGallery";
import { TEAM, SITE } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the providers and infusion nurses at Kirkland Specialty Infusion Center, the same faces you will see visit after visit, who know your name and your treatment.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Meet the Team Behind Your Care"
        description="From physicians and infusion nurses to clinical support staff, our team is dedicated to providing expert care, personalized support, and a welcoming experience at every visit."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Providers & infusion nurses"
            title="The Faces Behind the Experience"
            description="One of the things that makes our center different is the people who care for our patients. Get to know the physicians, infusion nurses, and team members dedicated to providing thoughtful, personalized care."
          />
          <div className="mt-12">
            <TeamGallery members={TEAM} />
          </div>
        </div>
      </section>

      <section className="bg-grey-50">
        <div className="container-prose grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Questions about your care?"
            title="We're Here When You Need Us"
            description="Have questions about infusion therapy, treatment planning, or referrals? Reach out to our team and we'll help guide you through the next steps."
          />
          <div className="space-y-3">
            <a href={`tel:${SITE.phoneTel}`} className="btn-coral w-full">
              <Phone className="h-4 w-4" aria-hidden />
              Call {SITE.phone} ext. {SITE.phoneExt}
            </a>
            <Link href="/contact" className="btn-outline-dark w-full">
              Send a message
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
