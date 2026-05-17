import type { Metadata } from "next";
import { SITE } from "./constants";

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  ogImage = "/og-image.png",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle =
    title === SITE.name ? SITE.name : `${title} | ${SITE.shortName}`;
  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
