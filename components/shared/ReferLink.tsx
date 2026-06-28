import Link from "next/link";
import { REFERRAL_URL, REFERRAL_IS_EXTERNAL } from "@/lib/constants";

// Renders a "Refer a Patient" link that points at NEXT_PUBLIC_REFERRAL_URL when
// set (opening externally in a new tab), or the on-site referral section
// otherwise. Centralizes the behavior so every referral CTA stays in sync.
export function ReferLink({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (REFERRAL_IS_EXTERNAL) {
    return (
      <a
        href={REFERRAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={REFERRAL_URL} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
