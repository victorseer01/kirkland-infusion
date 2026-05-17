import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { JsonLd } from "@/components/shared/JsonLd";
import { FAQS, SITE } from "@/lib/constants";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { Phone, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Honest answers to the questions patients actually ask about specialty infusion treatment in Kirkland, Washington.",
  path: "/faqs",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="Frequently asked questions"
        title="Honest answers to the questions patients actually ask"
        description="Browse the answers below. Still have a question? Call us — a real human will pick up the phone."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Browse"
              title="Quick answers, in plain English"
              description="Sixteen of the most common questions our intake team hears. If yours is not here, please reach out."
            />
            <div className="mt-8 space-y-3 rounded-2xl border border-grey-200 bg-grey-50 p-6">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="btn-coral w-full"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call {SITE.phone} ext. {SITE.phoneExt}
              </a>
              <Link href="/contact" className="btn-outline-dark w-full">
                Send a Message
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-grey-700">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
