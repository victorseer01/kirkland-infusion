import { Stethoscope, HandCoins, MessagesSquare } from "lucide-react";
import { THREE_PILLARS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";

const META = [
  {
    icon: Stethoscope,
    tone: "primary" as const,
    src: "/home/pillar-1-physician.jpg",
    alt: "Physician supervising an infusion",
  },
  {
    icon: HandCoins,
    tone: "coral" as const,
    src: "/home/pillar-2-financial.jpg",
    alt: "Financial counselor reviewing coverage with a patient",
  },
  {
    icon: MessagesSquare,
    tone: "accent" as const,
    src: "/home/pillar-3-communication.jpg",
    alt: "Care coordinator on a call with a referring office",
  },
];

export function ThreePillars() {
  return (
    <section className="bg-white section-y">
      <div className="container-prose">
        <SectionHeading
          eyebrow="What sets us apart"
          title="Three commitments, on every chart"
          description="The promises that show up in every appointment, every chart note, and every call back to your office."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {THREE_PILLARS.map((pillar, i) => {
            const meta = META[i];
            const Icon = meta.icon;
            return (
              <article
                key={pillar.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative">
                  <MediaPlaceholder
                    aspect="video"
                    tone={meta.tone}
                    src={meta.src}
                    alt={meta.alt}
                    className="rounded-none"
                  />
                  <span className="absolute -bottom-5 left-6 flex h-12 w-12 items-center justify-center rounded-xl border border-grey-200 bg-white text-primary shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 pt-9">
                  <h3 className="font-display text-xl text-primary-dark">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                    {pillar.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
