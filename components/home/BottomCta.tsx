import Link from "next/link";
import { Phone, Printer } from "lucide-react";
import { SITE } from "@/lib/constants";

export function BottomCta() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-ice">
      <div className="container-prose grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow text-coral">Ready when you are</p>
          <h2 className="mt-3 text-balance text-3xl text-white sm:text-4xl">
            Ready to Take the Next Step? We&apos;re Here to Help.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base text-ice/90 sm:text-lg">
            Whether you&apos;re a patient exploring infusion therapy or a provider
            referring a patient, our team is ready to help. Reach out today and
            we&apos;ll make the next steps clear, simple, and stress-free.
          </p>
        </div>
        <div className="space-y-3">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-5 w-5 text-coral" aria-hidden />
            <span className="text-sm font-semibold">
              {SITE.phone} ext. {SITE.phoneExt}
            </span>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-white">
            <Printer className="h-5 w-5 text-coral" aria-hidden />
            <span className="text-sm font-semibold">Fax {SITE.fax}</span>
          </div>
          <Link href="/contact" className="btn-coral w-full">
            Send a Message
          </Link>
        </div>
      </div>
    </section>
  );
}
