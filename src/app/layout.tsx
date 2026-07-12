import type { Metadata } from "next";
import { BottomCta } from "@/components/bottom-cta";
import { GoToTop } from "@/components/go-to-top";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://justshinecleaningservices.com"),
  title: {
    default: "Cleaning Services Abu Dhabi | Just Shine Cleaning Services",
    template: "%s | Just Shine Cleaning Services",
  },
  description: "Professional villa, home, office, carpet, sofa, and window cleaning in Abu Dhabi. Call or WhatsApp Just Shine Cleaning Services for fast booking.",
  openGraph: {
    title: "Just Shine Cleaning Services Abu Dhabi",
    description: "Fast, trusted cleaning services in Abu Dhabi with call and WhatsApp booking.",
    url: "https://justshinecleaningservices.com",
    siteName: "Just Shine Cleaning Services",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Just Shine Cleaning Services Abu Dhabi" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <BottomCta />
        <Footer />
        <GoToTop />
      </body>
    </html>
  );
}
