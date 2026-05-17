import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageLoader } from "@/components/shared/PageLoader";
import { buildMetadata } from "@/lib/metadata";
import { SITE, SPECIALTIES } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = buildMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
  keywords: [
    "Kirkland infusion center",
    "specialty infusion Kirkland WA",
    "physician supervised infusion",
    "rheumatology infusion Eastside",
    "Evergreen Rheumatology infusion",
    "biologic infusion Kirkland",
    "IVIG Kirkland",
    "Remicade infusion Kirkland",
  ],
});

const medicalBusiness = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  faxNumber: SITE.fax,
  email: SITE.email,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line1,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "17:00",
    },
  ],
  medicalSpecialty: SPECIALTIES.map((s) => s.name),
  parentOrganization: {
    "@type": "MedicalOrganization",
    name: SITE.affiliatedWith,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans">
        <JsonLd data={medicalBusiness} />
        <PageLoader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-coral focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
