import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/lib/constants";
import { MapPin, Phone, Printer, Mail, Clock } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact & Directions",
  description:
    "Visit, call, fax, or send a message. We are located in Kirkland, Washington — Mon–Fri 7:30 AM – 5:00 PM, free parking on-site.",
  path: "/contact",
});

const mapQuery = encodeURIComponent(
  `${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
);

const INFO_ROWS = [
  {
    icon: MapPin,
    label: "Address",
    value: (
      <>
        {SITE.address.line1}
        <br />
        {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
      </>
    ),
  },
  {
    icon: Phone,
    label: "Phone",
    value: (
      <a href={`tel:${SITE.phoneTel}`} className="hover:text-coral">
        {SITE.phone} ext. {SITE.phoneExt}
      </a>
    ),
  },
  { icon: Printer, label: "Fax", value: SITE.fax },
  {
    icon: Mail,
    label: "Email",
    value: (
      <a href={`mailto:${SITE.email}`} className="hover:text-coral">
        {SITE.email}
      </a>
    ),
  },
  {
    icon: Clock,
    label: "Hours",
    value: (
      <>
        {SITE.hours.weekdays}
        <br />
        {SITE.hours.weekend}
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & directions"
        title="We look forward to welcoming your referrals"
        description="Just off I-405 and easily accessible from Bellevue, Redmond, Bothell, Woodinville, and the greater Eastside. Free parking on-site. Ground-floor, fully wheelchair accessible."
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Visit us" title="Where to find us" />
            <dl className="mt-8 space-y-5">
              {INFO_ROWS.map((row) => (
                <div key={row.label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <row.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-primary">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-base text-grey-900">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 overflow-hidden rounded-2xl border border-grey-200">
              <iframe
                title="Map to Kirkland Specialty Infusion Center"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                className="h-64 w-full sm:h-80"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="We respond the same business day"
              description="Existing patients can schedule, reschedule, or confirm an appointment by phone. New patients will need a referral from their physician — see the For Physicians page for details."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark text-ice">
        <div className="container-prose py-14 sm:py-20">
          <p className="eyebrow text-coral">Final reassurance</p>
          <h2 className="mt-3 max-w-3xl text-balance text-3xl text-white sm:text-4xl">
            {SITE.tagline}
          </h2>
          <p className="mt-5 max-w-3xl text-pretty text-base text-ice/90 sm:text-lg">
            Whether you are a referring physician, a patient walking into your first infusion, or a family member trying to understand a loved one&apos;s care — we are here, we are reachable, and we will treat your questions as if they were our own. Welcome to {SITE.name}.
          </p>
        </div>
      </section>
    </>
  );
}
