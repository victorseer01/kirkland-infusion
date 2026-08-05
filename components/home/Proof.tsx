import { Syringe, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/constants";
import { AwardsMarquee } from "@/components/shared/AwardsMarquee";

const STATS = [
  {
    icon: Syringe,
    value: "30+",
    label: "Therapies",
    body: "A wide range of IV and injectable therapies.",
  },
  {
    icon: ShieldCheck,
    value: "20+",
    label: "Years of care",
    body: "More than two decades of experience you can trust.",
  },
];

export function Proof() {
  return (
    <section className="bg-grey-50">
      <div className="container-prose section-y">
        <p className="eyebrow text-primary">Affiliated with</p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl text-primary-dark sm:text-4xl lg:text-5xl">
          A trusted network of specialized care
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-grey-700 sm:text-lg">
          Three respected specialty practices. One shared commitment to
          delivering expert infusion care close to home.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SITE.affiliates.map((a) => (
            <article
              key={a.name}
              className="flex flex-col rounded-2xl border border-grey-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-lg text-primary-dark">
                {a.url ? (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-primary hover:underline"
                  >
                    {a.name}
                  </a>
                ) : (
                  a.name
                )}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-grey-700">
                {a.blurb}
              </p>
            </article>
          ))}
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-5 rounded-2xl border border-grey-200 bg-white p-6 shadow-sm"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <dd className="font-display text-3xl text-primary-dark sm:text-4xl">
                  {s.value}
                </dd>
                <dt className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">
                  {s.label}
                </dt>
                <p className="mt-1 text-sm text-grey-700">{s.body}</p>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative isolate overflow-hidden bg-primary-dark text-ice">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(closest-side at 18% 0%, rgba(255,255,255,0.25), transparent 60%), radial-gradient(closest-side at 82% 100%, rgba(74,155,140,0.45), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <blockquote className="container-prose relative py-16 text-center sm:py-24">
          <p className="eyebrow text-coral">Our standard</p>
          <p className="mx-auto mt-5 max-w-4xl text-balance font-display text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
            A licensed provider is present in the suite for{" "}
            <span className="text-coral">every infusion</span>, not nearby, not
            on call, but in the room.
          </p>
        </blockquote>
      </div>

      <div className="container-prose section-y">
        <AwardsMarquee />
      </div>
    </section>
  );
}
