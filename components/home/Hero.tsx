import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-ice/50 via-white to-white">
      {/* Soft decorative background so the hero isn't flat white */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-28 h-[28rem] w-[28rem] rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute -left-28 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,60,85,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>
      <div className="container-prose py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text side */}
          <div className="max-w-xl">
            <p className="eyebrow text-coral">Kirkland, Washington</p>
            <h1 className="mt-4 text-balance text-[1.65rem] leading-[1.12] text-primary-dark sm:text-[2.5rem] lg:text-[3rem]">
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
              <Link href="/physicians#how-to-refer" className="btn-outline-dark">
                Refer a Patient
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
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
