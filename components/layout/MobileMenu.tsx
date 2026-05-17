"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!mounted || !open) return null;

  const drawer = (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ backgroundColor: "#ffffff" }}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-primary-dark px-6 py-4">
        <Logo variant="light" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-full p-2 text-ice transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              return (
                <li key={link.label} className="mt-2 first:mt-0">
                  <p className="px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {link.label}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {link.children.map((c) => {
                      const active = pathname === c.href;
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={cn(
                              "flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors",
                              active
                                ? "bg-primary/10 text-primary-dark"
                                : "text-grey-900 hover:bg-grey-100",
                            )}
                          >
                            <span className="text-base font-medium">
                              {c.label}
                            </span>
                            {c.description && (
                              <span className="text-xs text-grey-500">
                                {c.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }

            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href!}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary-dark"
                      : "text-grey-900 hover:bg-grey-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-grey-200 px-6 py-4">
        <a href={`tel:${SITE.phoneTel}`} className="btn-coral w-full">
          <Phone className="h-4 w-4" aria-hidden />
          Call {SITE.phone}
        </a>
        <Link
          href="/physicians#refer"
          className="btn-outline-dark mt-3 w-full"
        >
          Refer a Patient
        </Link>
      </div>
    </div>
  );

  return createPortal(drawer, document.body);
}
