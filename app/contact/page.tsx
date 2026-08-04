import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE, AFFILIATED_LOCATIONS } from "@/lib/constants";
import {
  MapPin,
  Phone,
  Printer,
  Mail,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact & Directions",
  description:
    "Visit, call, fax, or send a message. We are located in Kirkland, Washington, Mon to Fri 7:30 AM to 5:00 PM, free parking on-site.",
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
        title="We're Here to Help You Get Started"
        description="Whether you're a patient exploring treatment options, preparing for an upcoming infusion, or a provider looking to refer a patient, our team is ready to help. Contact us with questions, referrals, scheduling needs, or general inquiries."
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
                    <dd className="mt-1 text-base text-grey-900">
                      {row.value}
                    </dd>
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
              title="We Respond Within One Business Day"
              description="Existing patients may schedule, reschedule, or confirm appointments by phone. New patients will need a referral from their physician before scheduling. If you have questions about treatment, insurance, billing, referrals, or our services, send us a message and a member of our team will be happy to assist you."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-grey-50">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Affiliated locations"
            title="Our Affiliated Practices"
            description="We work closely with a network of affiliated specialty practices across the Eastside. Reach out to any of the locations below for their specific services."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {AFFILIATED_LOCATIONS.map((loc) => {
              const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${loc.name}, ${loc.address}`,
              )}`;
              return (
                <article
                  key={loc.name}
                  className="flex flex-col rounded-2xl border border-grey-200 bg-white p-6 shadow-sm sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  {loc.url ? (
                    <a
                      href={loc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex items-center gap-1.5 font-display text-lg text-primary-dark hover:text-coral"
                    >
                      {loc.name}
                      <ExternalLink
                        className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <h3 className="mt-4 font-display text-lg text-primary-dark">
                      {loc.name}
                    </h3>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-grey-700">
                    {loc.address}
                  </p>
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark hover:text-coral"
                  >
                    Get directions
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark text-ice">
        <div className="container-prose py-14 sm:py-20">
          <p className="eyebrow text-coral">Final reassurance</p>
          <h2 className="mt-3 max-w-3xl text-balance text-3xl text-white sm:text-4xl">
            Expert Care. Personal Attention.
          </h2>
          <p className="mt-5 max-w-3xl text-pretty text-base text-ice/90 sm:text-lg">
            Whether you&apos;re visiting us for treatment, referring a patient,
            or helping a loved one navigate care, you&apos;ll find a team that
            values relationships, clear communication, and personalized support
            every step of the way.
          </p>
        </div>
      </section>
    </>
  );
}
