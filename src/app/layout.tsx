import type { Metadata } from "next";
import { AnalyticsEvents } from "@/components/analytics-events";
import { BottomCta } from "@/components/bottom-cta";
import { GoToTop } from "@/components/go-to-top";
import { Header, Footer } from "@/components/layout";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { JsonLd, localBusinessSchema } from "@/components/seo";
import { WebVitals } from "@/components/web-vitals";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://justshinecleaningservices.com"),
  title: {
    default: "Cleaning Services Abu Dhabi | Just Shine Cleaning Services",
    template: "%s | Just Shine Cleaning Services",
  },
  description: "Professional villa, home, office, carpet, sofa, and window cleaning in Abu Dhabi. Call or WhatsApp Just Shine Cleaning Services for fast booking.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Just Shine Cleaning Services Abu Dhabi",
    description: "Fast, trusted cleaning services in Abu Dhabi with call and WhatsApp booking.",
    url: "https://justshinecleaningservices.com",
    siteName: "Just Shine Cleaning Services",
    type: "website",
    images: [{ url: "/just-shine-fav.png", width: 1024, height: 1024, alt: "Just Shine Cleaning Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Shine Cleaning Services Abu Dhabi",
    images: ["/just-shine-fav.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <WebVitals />
        <AnalyticsEvents />
        <JsonLd data={localBusinessSchema} />
        <Header />
        <main className="min-h-screen" id="main-content" tabIndex={-1}>{children}</main>
        <BottomCta />
        <Footer />
        <MobileStickyCta />
        <GoToTop />
      </body>
    </html>
  );
}
