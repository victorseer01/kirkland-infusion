import Link from "next/link";
import { MapPin, Phone, Printer, Mail, Clock } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "./Logo";

const FOOTER_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  ...NAV_LINKS.flatMap((link) =>
    link.href
      ? [{ href: link.href, label: link.label }]
      : link.children?.map((c) => ({ href: c.href, label: c.label })) ?? [],
  ),
];

export function Footer() {
  return (
    <footer className="border-t border-primary-dark/20 bg-primary-dark text-ice">
      <div className="container-prose py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ice/80">
              {SITE.name} is a physician-led outpatient infusion suite affiliated with {SITE.affiliatedWith}, serving the greater Kirkland and Eastside community.
            </p>
            {/* <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ice/70">
              {SITE.tagline}
            </p> */}
            <p className="mt-8 text-xs text-ice/60">
              Affiliated with {SITE.affiliatedWith} — part of the Overlake Arthritis and Osteoporosis Center family of practices.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg text-white">Visit Us</h2>
            <ul className="mt-4 space-y-3 text-sm text-ice/90">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden />
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-white">
                  {SITE.phone} ext. {SITE.phoneExt}
                </a>
              </li>
              <li className="flex gap-3">
                <Printer className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden />
                <span>Fax {SITE.fax}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden />
                <span>
                  {SITE.hours.weekdays}
                  <br />
                  {SITE.hours.weekend}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg text-white">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ice/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ice/60 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>
            For medical emergencies, call 911 or go to the nearest emergency department.
          </p>
        </div>
      </div>
    </footer>
  );
}
