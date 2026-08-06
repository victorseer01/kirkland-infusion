import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { JsonLd } from "@/components/shared/JsonLd";
import { FAQ_CATEGORIES, SITE, type FaqItem } from "@/lib/constants";
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
    "Honest answers to the questions patients actually ask about specialty infusion treatment in Kirkland, Washington, from billing and insurance to what to expect before, during, and after your infusion.",
  path: "/faqs",
});

const ALL_FAQS = FAQ_CATEGORIES.flatMap((c) => c.items);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: [f.a.replace(/\n\n/g, " "), ...(f.bullets ?? []), f.note]
        .filter(Boolean)
        .join(" "),
    },
  })),
};

function FaqAnswer({ item }: { item: FaqItem }) {
  return (
    <div className="space-y-3 text-grey-700">
      {item.a.split("\n\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      {item.bullets ? (
        <ul className="ml-1 space-y-2">
          {item.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {item.note ? <p className="text-grey-600">{item.note}</p> : null}
    </div>
  );
}

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="Frequently asked questions"
        title="Clear Answers, Every Step of the Way"
        description="From your first appointment through ongoing treatment, we're committed to making infusion therapy as straightforward and stress-free as possible. Browse answers to common questions about our services, insurance, treatment expectations, and more."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-grey-200 bg-grey-50 p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <p className="font-display text-lg text-primary-dark sm:text-xl">
                Can&apos;t Find What You&apos;re Looking For?
              </p>
              <p className="mt-1 text-sm text-grey-700">
                We&apos;re committed to making infusion therapy as clear and
                straightforward as possible. If you still have questions, our
                team is just a phone call or message away and happy to help.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={`tel:${SITE.phoneTel}`} className="btn-coral">
                <Phone className="h-4 w-4" aria-hidden />
                Call {SITE.phone} ext. {SITE.phoneExt}
              </a>
              <Link href="/contact" className="btn-outline-dark">
                Send a message
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            </div>
            <MediaPlaceholder
              aspect="wide"
              tone="primary"
              src="/faqs/help.jpg"
              alt="An infusion nurse reassuring a patient"
              className="hidden lg:block"
            />
          </div>

          <div className="space-y-14">
            {FAQ_CATEGORIES.map((category, ci) => (
              <div key={category.name}>
                <SectionHeading
                  eyebrow={category.name}
                  title={category.blurb ?? category.name}
                  description={category.intro}
                />
                <Accordion type="single" collapsible className="mt-8 w-full">
                  {category.items.map((item, i) => (
                    <AccordionItem key={item.q} value={`faq-${ci}-${i}`}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent>
                        <FaqAnswer item={item} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
