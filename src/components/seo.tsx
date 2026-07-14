import { site } from "@/lib/content";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: site.name,
  telephone: site.phone,
  email: site.email,
  address: site.location,
  url: site.url,
  areaServed: "Abu Dhabi",
  knowsAbout: ["Deep Cleaning", "Villa Cleaning", "Home Cleaning", "Office Cleaning", "Carpet Cleaning", "Sofa Cleaning", "Window Cleaning", "Pest Control"],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `https://wa.me/${site.tel.replace("+", "")}`,
      actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
    },
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "48" },
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${site.url}${item.url}`,
    })),
  };
}
