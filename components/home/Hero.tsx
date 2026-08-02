import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { ReferLink } from "@/components/shared/ReferLink";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="container-prose py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text side */}
          <div className="max-w-xl">
            <p className="eyebrow text-coral">Kirkland, Washington</p>
            <h1 className="mt-4 text-balance text-[1.9rem] leading-tight text-primary-dark sm:text-5xl lg:text-[3.4rem]">
              Specialized Infusion Therapy with Compassionate, Physician-Led
              Care
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-grey-700 sm:text-lg">
              Kirkland Specialty Infusion Center provides infusion treatments for
              rheumatology, neurology, gastroenterology, dermatology,
              osteoporosis, inflammatory eye disease, and other specialty
              conditions. Our team supports patients every step of the way, from
              insurance coordination to treatment and follow-up care.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link href="/patients" className="btn-coral">
                See what to expect
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <ReferLink className="btn-outline-dark">
                Refer a Patient
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ReferLink>
            </div>
            <p className="mt-6 text-sm text-grey-700">
              Prefer to call?{" "}
              <a
                href={`tel:${SITE.phoneTel}`}
                className="font-semibold text-primary underline-offset-4 hover:text-coral hover:underline"
              >
                Book an appointment at {SITE.phone}
              </a>
            </p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
              Exceptional specialty care. Every step of the way.
            </p>
          </div>

          {/* Image side */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg sm:aspect-[5/4] lg:aspect-[4/5]">
            <HeroBackground />
          </div>
        </div>
      </div>

      <div className="border-t border-grey-200 bg-grey-50">
        <div className="container-prose flex flex-col items-start gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-grey-700">
            Serving patients throughout Kirkland, Bellevue, and the greater
            Seattle area.
          </p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-coral"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {SITE.phone} ext. {SITE.phoneExt}
          </a>
        </div>
      </div>
    </section>
  );
}
