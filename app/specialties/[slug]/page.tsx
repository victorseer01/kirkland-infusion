import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SPECIALTIES, SITE } from "@/lib/constants";

// Per-specialty detail page. Overview / conditions / therapies come from the
// client-approved copy in `SPECIALTIES` (KSI-UPDATES doc). TODO: drop a
// representative photo at /public/specialties/<slug>.jpg to replace the
// gradient placeholder.

function getSpecialty(slug: string) {
  return SPECIALTIES.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const specialty = getSpecialty(params.slug);
  if (!specialty) return buildMetadata({ title: "Specialty", description: "" });
  return buildMetadata({
    title: `${specialty.name} Infusions`,
    description: `${specialty.body} Conditions we treat include ${specialty.conditions
      .slice(0, 4)
      .join(", ")}.`,
    path: `/specialties/${specialty.slug}`,
  });
}

export default function SpecialtyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const specialty = getSpecialty(params.slug);
  if (!specialty) notFound();

  return (
    <>
      <PageHero
        eyebrow="Specialty"
        title={specialty.name}
        description={specialty.body}
      />

      <section className="section-y-lg bg-white">
        <div className="container-prose">
          <Link
            href="/specialties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All specialties &amp; conditions
          </Link>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <MediaPlaceholder
              aspect="wide"
              tone="primary"
              src={`/specialties/${specialty.slug}.jpg`}
              alt={`${specialty.name} infusion care at ${SITE.name}`}
            />

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Overview
              </p>
              <div className="mt-3 space-y-4 text-pretty text-base leading-relaxed text-grey-700 sm:text-lg">
                {specialty.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Conditions we treat
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {specialty.conditions.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary-dark"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-grey-200 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Therapies &amp; treatments available
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {specialty.therapies.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-sm text-grey-700"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-grey-50">
        <div className="container-prose grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Ready when you are"
            title="Have a referral for this specialty?"
            description="Call us and our team will verify your benefits, handle prior authorization, and schedule your first infusion. If your therapy is not listed here, call anyway, our formulary is broader than this page."
          />
          <div className="space-y-3">
            <a href={`tel:${SITE.phoneTel}`} className="btn-coral w-full">
              <Phone className="h-4 w-4" aria-hidden />
              Call {SITE.phone} ext. {SITE.phoneExt}
            </a>
            <Link href="/medications" className="btn-outline-dark w-full">
              See full formulary
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
