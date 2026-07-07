import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FORMULARY_UPDATE } from "@/lib/constants";

// Announces newly added medications, shown directly below the hero. Medication
// names come from `FORMULARY_UPDATE` (placeholder set from the client feedback
// doc — confirm before launch).
export function FormularyUpdate() {
  const meds = FORMULARY_UPDATE.medications;

  return (
    <section className="bg-white">
      <div className="container-prose py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-8 bg-coral/50" />
            <p className="eyebrow text-coral">Formulary Update</p>
            <span aria-hidden className="h-px w-8 bg-coral/50" />
          </div>

          <p className="mt-5 text-balance font-display text-2xl leading-snug text-primary-dark sm:text-3xl">
            We are pleased to announce the addition of{" "}
            {meds.map((med, i) => (
              <span key={med}>
                {i > 0 && i === meds.length - 1 ? ", and " : i > 0 ? ", " : ""}
                <em className="not-italic text-primary">{med}</em>
              </span>
            ))}{" "}
            to our infusion formulary.
          </p>

          <Link
            href="/medications"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
          >
            View our full formulary
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
