import type { Metadata, Viewport } from "next";
import { EB_Garamond, Geist, Silkscreen } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

// Self-hosted at build time by next/font (no runtime Google Fonts request).
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-garamond" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: "400", variable: "--font-silkscreen" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Parco Solutions | ERP, SAP, Web and Fleet Tracking Systems",
    template: "%s | Parco Solutions",
  },
  description: site.description,
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/images/hero-circuit.webp", width: 1600, height: 1067 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0c",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PARCO Solutions",
  url: site.url,
  logo: `${site.url}/apple-touch-icon.png`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address[0]}, ${site.address[1]}`,
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500011",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${garamond.variable} ${geist.variable} ${silkscreen.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only z-[70] bg-signal px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
