import { servicePriceLabel, services, type Service } from "@/lib/content";
import { abuDhabiLocations, type AbuDhabiLocation } from "@/lib/locations";

const localGuideServiceSlugs = [
  "home-cleaning",
  "deep-cleaning",
  "villa-cleaning",
  "office-cleaning",
  "carpet-cleaning",
  "sofa-cleaning",
  "window-cleaning",
  "move-in-out-cleaning",
  "apartment-cleaning",
  "pest-control",
];

const localGuideLocationSlugs = [
  "al-reem-island-abu-dhabi",
  "downtown-abu-dhabi",
  "khalifa-city-abu-dhabi",
  "yas-island-abu-dhabi",
  "saadiyat-island-abu-dhabi",
  "mussafah-abu-dhabi",
  "al-danah-abu-dhabi",
  "al-reef-abu-dhabi",
  "al-bateen-abu-dhabi",
  "shakhbout-city-abu-dhabi",
];

const selectedServices = localGuideServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(Boolean) as Service[];

const selectedLocations = localGuideLocationSlugs
  .map((slug) => abuDhabiLocations.find((location) => location.slug === slug))
  .filter(Boolean) as AbuDhabiLocation[];

export type LocalGuidePage = {
  slug: string;
  service: Service;
  location: AbuDhabiLocation;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
};

export const localGuidePages: LocalGuidePage[] = selectedServices.flatMap((service) =>
  selectedLocations.map((location) => {
    const serviceName = shortServiceName(service);
    return {
      slug: `${service.slug}-in-${location.slug}-guide`,
      service,
      location,
      title: `${serviceName} in ${location.name}: Local Cleaning Guide`,
      description: `A practical ${serviceName.toLowerCase()} guide for ${location.name}, Abu Dhabi with local scope, timing, pricing notes, access tips, and WhatsApp booking steps from Just Shine Cleaning Services.`,
      metaTitle: `${serviceName} in ${location.name} | Local Guide | Just Shine`,
      metaDescription: `Plan ${serviceName.toLowerCase()} in ${location.name}, Abu Dhabi. See local cleaning scope, ${servicePriceLabel(service)} pricing notes, access tips, FAQs, and booking links.`,
    };
  }),
);

export function getLocalGuidePage(slug: string) {
  return localGuidePages.find((page) => page.slug === slug);
}

export function shortServiceName(service: Service) {
  return service.name.replace(" Services", "").replace("Move In/Out", "Move In/Out Cleaning");
}

export function localGuideChecklist(page: LocalGuidePage) {
  const { service, location } = page;
  return [
    `Share photos of ${location.propertyFocus.toLowerCase()} so the team can estimate scope before arrival.`,
    `Confirm building access, parking, lift timing, and any security instructions for ${location.shortName}.`,
    `List priority rooms first: ${service.highlights.slice(0, 3).join(", ").toLowerCase()}.`,
    "Move fragile decor, valuables, and personal paperwork before the cleaning visit starts.",
    "Ask for add-ons early if you need windows, sofa, carpet, pest control, or extra bathrooms covered.",
    `Book a time that matches local access patterns: ${location.scheduling}.`,
  ];
}

export function localGuidePriceFactors(page: LocalGuidePage) {
  const { service, location } = page;
  return [
    `Base service guide: ${servicePriceLabel(service)} for ${service.scope.toLowerCase()}.`,
    `Property type matters because ${location.name} includes ${location.propertyFocus.toLowerCase()}.`,
    "Condition affects time: light maintenance is faster than post-renovation, move-out, or neglected spaces.",
    "Access and parking can change timing, especially in towers, offices, compounds, and busy commercial areas.",
    "Photos help reduce vague quotes and make WhatsApp booking faster.",
  ];
}

export function localGuideFaqs(page: LocalGuidePage) {
  const { service, location } = page;
  const serviceName = shortServiceName(service).toLowerCase();
  return [
    {
      q: `Do you provide ${serviceName} in ${location.name}?`,
      a: `Yes. Just Shine Cleaning Services provides ${service.name.toLowerCase()} in ${location.name}, Abu Dhabi for ${location.propertyFocus.toLowerCase()}. Share your area, property type, photos, and preferred time on WhatsApp so the team can confirm the right visit length and scope.`,
      links: [
        { label: `${shortServiceName(service)} page`, href: `/services/${service.slug}` },
        { label: `${location.name} area page`, href: `/areas/${location.slug}` },
      ],
    },
    {
      q: `How much does ${serviceName} cost in ${location.name}?`,
      a: `The starting guide is ${servicePriceLabel(service)}. Final pricing depends on property size, condition, access, add-ons, and whether you need one-time or recurring service. For the clearest quote, send photos and mention any priority rooms or stains.`,
      links: [
        { label: "View pricing", href: "/pricing" },
        { label: "Get WhatsApp quote", href: `https://wa.me/971552232850?text=Hi%2C%20I%20need%20${encodeURIComponent(shortServiceName(service))}%20in%20${encodeURIComponent(location.name)}.%20Can%20you%20send%20a%20quote%3F` },
      ],
    },
    {
      q: `What should I prepare before the cleaning team arrives?`,
      a: `Clear personal items, keep access ready, secure valuables, and send notes for priority rooms. In ${location.name}, access details are important because local properties often involve ${location.challenge}. This helps the team start faster and avoid delays.`,
      links: [{ label: "Contact team", href: "/contact" }],
    },
    {
      q: `Can I book recurring ${serviceName} for ${location.name}?`,
      a: `Yes. Recurring weekly, bi-weekly, monthly, and scheduled maintenance visits can be arranged depending on the service type. Recurring cleaning is useful in Abu Dhabi because dust, AC circulation, humidity, and daily traffic can make homes and workplaces feel dusty quickly.`,
      links: [{ label: "Service and area page", href: `/services/${service.slug}/${location.slug}` }],
    },
  ];
}
