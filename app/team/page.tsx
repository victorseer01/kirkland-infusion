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
    "Meet the providers and infusion nurses at Kirkland Specialty Infusion Center — the same faces you will see visit after visit, who know your name and your treatment.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people who will care for you"
        description="You will see the same faces visit after visit — staff who know your name, your treatment, and the small details that make your visit easier. Select anyone below to read their full profile."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Providers & infusion nurses"
            title="Experienced clinicians, supervised by physicians"
            description="A licensed provider is present in the suite for every infusion. Meet the team behind your care."
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
            title="A real human will pick up the phone"
            description="Whether you are a patient preparing for your first infusion or a physician considering a referral, our team is here to help."
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
