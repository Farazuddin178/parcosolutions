import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";
import { asset } from "@/lib/asset";

// Self-hosted at build time by next/font (no runtime Google Fonts request).
const heading = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-heading" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const code = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-code" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Parco Solutions | Custom Software, Management Systems and Websites",
    template: "%s | Parco Solutions",
  },
  description: site.description,
  icons: {
    icon: [{ url: asset("/favicon.ico") }, { url: asset("/icon.png"), type: "image/png" }],
    apple: asset("/apple-touch-icon.png"),
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: asset("/images/svc-custom.webp") }],
  },
};

export const viewport: Viewport = {
  themeColor: "#020503",
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
    <html
      lang="en"
      className={`${heading.variable} ${geist.variable} ${code.variable}`}
      style={{ "--smoke-img": `url(${asset("/images/smoke.png")})` } as React.CSSProperties}
    >
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
