"use client";

import { Phone, FileText } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export function StickyCallBar({
  variant = "default",
}: {
  variant?: "default" | "refer";
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 sm:hidden">
      <div className="pointer-events-auto mx-3 mb-3 flex gap-2 rounded-2xl border border-grey-200 bg-white p-2 shadow-lg">
        <a
          href={`tel:${SITE.phoneTel}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call
        </a>
        {variant === "refer" ? (
          <Link
            href="#refer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 py-3 text-sm font-semibold text-white"
          >
            <FileText className="h-4 w-4" aria-hidden />
            Refer
          </Link>
        ) : (
          <Link
            href="/physicians#refer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 py-3 text-sm font-semibold text-primary-dark"
          >
            <FileText className="h-4 w-4" aria-hidden />
            Refer a Patient
          </Link>
        )}
      </div>
    </div>
  );
}
