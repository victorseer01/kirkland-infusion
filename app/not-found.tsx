import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-primary-dark text-ice">
      <div className="container-prose flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="eyebrow text-coral">404</p>
        <h1 className="mt-3 max-w-2xl text-balance text-4xl text-white sm:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base text-ice/90 sm:text-lg">
          It may have moved, or the link is older than the site. Try the homepage, or call us — we are happy to help.
        </p>
        <Link href="/" className="btn-coral mt-8">
          Back to home
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
