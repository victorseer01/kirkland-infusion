import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-ice">
      <HeroBackground />

      <div className="container-prose relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-coral">Kirkland, Washington</p>
          <h1 className="mt-4 text-balance text-[1.75rem] leading-tight text-white sm:text-5xl lg:text-6xl">
            The infusion partner your patients deserve
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-ice/90 sm:text-lg">
            Physician-supervised infusions. Financial advocacy for every patient. Seamless communication back to your referring office. Welcome to a different kind of infusion experience in Kirkland, Washington.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/physicians#refer" className="btn-coral">
              Refer a Patient
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="btn-outline-light">
              Book an appointment
            </a>
          </div>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-ice/85">
            {SITE.tagline}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-primary-dark/70 backdrop-blur-sm">
        <div className="container-prose flex flex-col items-start gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ice/80">
            One referral. Zero hassle. Your patient is in expert hands.
          </p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-coral"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {SITE.phone} ext. {SITE.phoneExt}
          </a>
        </div>
      </div>
    </section>
  );
}
