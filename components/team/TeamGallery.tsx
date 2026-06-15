"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { TeamMember } from "@/lib/constants";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

// Category headings are plural ("Providers"); an individual profile reads better
// singular ("Provider").
const SINGULAR: Record<string, string> = {
  Providers: "Provider",
  "Infusion Nurses": "Infusion Nurse",
};
const singularCategory = (category: string) =>
  SINGULAR[category] ?? category.replace(/s$/, "");

/** Staff photo with a graceful initials fallback until a real image exists. */
function StaffImage({
  member,
  sizes,
  className,
  onReady,
}: {
  member: TeamMember;
  sizes: string;
  className?: string;
  onReady?: () => void;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        aria-hidden
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-navy"
      >
        <span className="font-display text-5xl text-ice/90">
          {initials(member.name)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={member.photo}
      alt={member.name}
      fill
      sizes={sizes}
      className={cn("object-cover object-top", className)}
      onLoad={onReady}
      onError={() => {
        setError(true);
        onReady?.();
      }}
    />
  );
}

export function TeamGallery({ members }: { members: readonly TeamMember[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const count = members.length;
  const isOpen = openIndex !== null;

  const open = useCallback((index: number) => {
    setLoading(true);
    setOpenIndex(index);
  }, []);

  const close = useCallback(() => {
    setOpenIndex((i) => {
      if (i !== null) triggerRefs.current[i]?.focus();
      return null;
    });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setLoading(true);
      setOpenIndex((i) => (i === null ? i : (i + dir + count) % count));
    },
    [count],
  );

  // Hold the loader until the active photo reports ready, with a safety timeout
  // so it can never hang (e.g. if onLoad does not fire).
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, [openIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, go]);

  // Group consecutive members by category for section headings, keeping each
  // member's global index so the modal can page across the whole team.
  const groups: { category: string; items: { member: TeamMember; index: number }[] }[] =
    [];
  members.forEach((member, index) => {
    const last = groups[groups.length - 1];
    if (last && last.category === member.category) {
      last.items.push({ member, index });
    } else {
      groups.push({ category: member.category, items: [{ member, index }] });
    }
  });

  const active = openIndex !== null ? members[openIndex] : null;

  return (
    <>
      <div className="space-y-14">
        {groups.map((group) => (
          <div key={group.category}>
            {groups.length > 1 ? (
              <h2 className="mb-6 font-display text-xl text-primary-dark">
                {group.category}
              </h2>
            ) : null}
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map(({ member, index }) => (
                <li key={member.slug}>
                  <button
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[index] = el;
                    }}
                    onClick={() => open(index)}
                    aria-haspopup="dialog"
                    className="group block w-full overflow-hidden rounded-2xl border border-grey-200 bg-white text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-grey-100">
                      <StaffImage
                        member={member}
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                        className="transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      {member.badge ? (
                        <span className="absolute left-3 top-3 rounded-full bg-coral px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow">
                          {member.badge}
                        </span>
                      ) : null}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-primary-dark">
                        {member.name}
                        {member.credentials ? (
                          <span className="text-grey-500">
                            , {member.credentials}
                          </span>
                        ) : null}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {member.role}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-dark group-hover:text-coral">
                        View profile
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {active && openIndex !== null ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-name"
        >
          <button
            type="button"
            aria-label="Close profile"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-primary-dark/80 backdrop-blur-sm"
          />

          {count > 1 ? (
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous team member"
              className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-dark shadow-lg transition-colors hover:bg-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral sm:left-4 sm:h-14 sm:w-14 lg:left-8"
            >
              <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
            </button>
          ) : null}

          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative z-10 grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl outline-none md:h-[34rem] md:grid-cols-[minmax(0,2fr)_3fr]"
          >
            <div className="relative h-72 w-full bg-grey-100 md:h-full">
              <StaffImage
                key={active.slug}
                member={active}
                sizes="(min-width: 768px) 440px, 100vw"
                onReady={() => setLoading(false)}
              />
            </div>

            <div className="flex max-h-[90vh] flex-col overflow-y-auto p-6 sm:p-8 md:max-h-none md:h-full">
              <p className="eyebrow text-primary">
                {singularCategory(active.category)}
              </p>
              <h2
                id="team-modal-name"
                className="mt-2 font-display text-2xl text-primary-dark sm:text-3xl"
              >
                {active.name}
              </h2>
              {active.credentials ? (
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-grey-500">
                  {active.credentials}
                </p>
              ) : null}
              <p className="mt-2 text-sm font-semibold text-primary">
                {active.role}
              </p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-grey-700 sm:text-base">
                {active.bio.map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </div>
            </div>

            {/* Loader overlay — keeps image + content hidden until the photo is
                ready so they reveal together. Sits below the close button. */}
            {loading ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                <span
                  aria-label="Loading"
                  role="status"
                  className="h-10 w-10 animate-spin rounded-full border-4 border-grey-200 border-t-primary"
                />
              </div>
            ) : null}

            <button
              type="button"
              onClick={close}
              aria-label="Close profile"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary-dark shadow transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {count > 1 ? (
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next team member"
              className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-dark shadow-lg transition-colors hover:bg-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral sm:right-4 sm:h-14 sm:w-14 lg:right-8"
            >
              <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
