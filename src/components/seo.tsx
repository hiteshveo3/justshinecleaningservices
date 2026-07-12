import { site } from "@/lib/content";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  telephone: site.phone,
  email: site.email,
  address: site.location,
  url: site.url,
  areaServed: "Abu Dhabi",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "48" },
};
