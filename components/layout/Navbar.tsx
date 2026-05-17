"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS, type NavLink } from "@/lib/constants";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";
import { cn } from "@/lib/utils";

function isLinkActive(link: NavLink, pathname: string): boolean {
  if (link.href) return pathname === link.href;
  return !!link.children?.some((c) => c.href === pathname);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all",
          scrolled
            ? "bg-white/95 shadow-sm backdrop-blur-md"
            : "bg-white",
        )}
      >
        <div className="container-prose flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />

          <div className="flex items-center gap-3 lg:gap-6">
            <nav className="hidden lg:block" aria-label="Primary">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isLinkActive(link, pathname);
                  if (link.children) {
                    return (
                      <li key={link.label}>
                        <NavDropdown
                          label={link.label}
                          items={link.children}
                          active={active}
                        />
                      </li>
                    );
                  }
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href!}
                        className={cn(
                          "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "text-primary-dark"
                            : "text-grey-700 hover:text-primary-dark",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/physicians#refer"
                className="btn-coral hidden sm:inline-flex"
              >
                Refer a Patient
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="inline-flex items-center justify-center rounded-full p-2 text-primary-dark hover:bg-primary/5 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
