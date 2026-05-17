import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";

const TESTIMONIALS = [
  {
    question: "What surprised you most about being treated here?",
    answer:
      "How quickly everyone learned my name. From my first phone call to my third infusion, every person who walked into the suite already knew why I was there and what we were doing. After years of explaining myself to a new chair each visit, that was the first thing I noticed.",
    attribution: "Annie P.",
  },
  {
    question: "How is this different from previous infusion experiences?",
    answer:
      "Calmer. The room is quiet, and there is a physician here every time — I do not have to wait twenty minutes for someone to come from another building when a question comes up. My old infusion center felt like a busy clinic. This feels like a place built for what I am here to do.",
    attribution: "Marcus T.",
  },
  {
    question:
      "What would you tell another patient who is nervous about their first infusion?",
    answer:
      "That the first day is the hardest only because it is unfamiliar. By the second visit, you will know exactly what to expect, who to ask for, and where to put your coat. They make sure of it. I bring a book now and I am usually home by lunch.",
    attribution: "Diane K.",
  },
];

export function PatientStories() {
  return (
    <section className="bg-white section-y">
      <div className="container-prose">
        <SectionHeading
          eyebrow="A different kind of infusion center"
          title="Where serious medicine meets gentle hands"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-grey-700 sm:text-lg">
            <p>
              Many of our patients arrive nervous. Some have had difficult experiences in larger hospital infusion suites — long waits, rotating staff, the feeling of being a name on a chart rather than a person. We built Kirkland Specialty Infusion Center as the antidote to that experience.
            </p>
            <p>
              Our suite is calm and private. Our staff knows your name, your treatment, and the small details that make your visit easier. You will see the same faces visit after visit. And there is always a physician in the building, available the moment a question, a concern, or a clinical decision arises.
            </p>
            <p className="text-primary-dark">
              Patients live full lives — they work, travel, garden, hike the Cascades, hold their grandchildren. Our job is to make the time they spend with us so unremarkable that the rest of their week stays remarkable.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MediaPlaceholder
              aspect="portrait"
              tone="accent"
              src="/home/patient-1-gardening.jpg"
              alt="Patient tending to a garden"
            />
            <MediaPlaceholder
              aspect="portrait"
              tone="primary"
              src="/home/patient-2-cascades.jpg"
              alt="Patient hiking in the Cascades"
            />
            <MediaPlaceholder
              aspect="portrait"
              tone="navy"
              src="/home/patient-3-grandchildren.jpg"
              alt="Patient with grandchildren"
            />
            <MediaPlaceholder
              aspect="portrait"
              tone="coral"
              src="/home/patient-4-work.jpg"
              alt="Patient back at the desk"
            />
          </div>
        </div>

        <div className="mt-16">
          <p className="eyebrow text-coral">What patients say</p>
          <h3 className="mt-3 text-balance font-display text-2xl text-primary-dark sm:text-3xl">
            Honest stories, gathered with consent
          </h3>
          <p className="mt-3 max-w-2xl text-base text-grey-700">
            Testimonials will be collected from our Evergreen Rheumatology and Overlake patient base with their consent. Three patients, three answers in their own words.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.question}
                className="flex h-full flex-col rounded-2xl border border-grey-200 bg-grey-50 p-7 shadow-sm"
              >
                <Quote className="h-7 w-7 text-coral" aria-hidden />
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {t.question}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-700 sm:text-base">
                  &ldquo;{t.answer}&rdquo;
                </p>
                <div className="mt-6 border-t border-grey-200 pt-4 text-xs uppercase tracking-[0.16em] text-grey-500">
                  {t.attribution}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
