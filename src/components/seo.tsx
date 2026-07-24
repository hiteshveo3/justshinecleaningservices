import { site } from "@/lib/content";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${site.url}/#business`,
  name: site.name,
  image: [`${site.url}${site.logo}`],
  logo: `${site.url}${site.logo}`,
  telephone: site.phone,
  email: site.email,
  url: site.url,
  priceRange: site.priceRange,
  foundingDate: site.foundingDate,
  identifier: [
    {
      "@type": "PropertyValue",
      name: "Licence No.",
      value: site.tradeLicenseNumber,
    },
    {
      "@type": "PropertyValue",
      name: "Unified Licence No.",
      value: site.unifiedLicenceNo,
    },
    {
      "@type": "PropertyValue",
      name: "Unified Registration No.",
      value: site.unifiedRegistrationNo,
    },
  ],
  founder: {
    "@type": "Person",
    name: site.ownerName,
    nationality: site.ownerNationality,
  },
  areaServed: {
    "@type": "City",
    name: "Abu Dhabi",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.streetAddress,
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    addressCountry: site.addressCountry,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "22:00",
  },
  sameAs: [site.facebook, site.instagram, site.googleMapsUrl],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.4917066,
    longitude: 54.3650786,
  },
  numberOfEmployees: site.teamSize,
  knowsAbout: ["Deep Cleaning", "Villa Cleaning", "Home Cleaning", "Office Cleaning", "Carpet Cleaning", "Sofa Cleaning", "Window Cleaning", "Pest Control"],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `https://wa.me/${site.tel.replace("+", "")}`,
      actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(site.rating.value),
    reviewCount: String(site.rating.count),
    bestRating: String(site.rating.best),
  },
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
