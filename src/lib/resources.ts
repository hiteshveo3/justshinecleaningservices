import { servicePriceLabel, services, type Service } from "@/lib/content";

export type ResourcePage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  serviceSlug: string;
  sections: {
    title: string;
    body: string;
    bullets: string[];
  }[];
  faqs: {
    q: string;
    a: string;
    links?: { label: string; href: string }[];
  }[];
};

const checklistIntro: Record<string, string> = {
  "home-cleaning": "A home cleaning checklist keeps regular visits focused on visible dust, bathrooms, kitchens, bedrooms, and high-use living spaces.",
  "deep-cleaning": "A deep cleaning checklist helps cover hidden dust, corners, grout, appliances, baseboards, and neglected areas that regular cleaning misses.",
  "villa-cleaning": "A villa cleaning checklist should account for larger rooms, majlis spaces, bathrooms, balconies, gardens, and parking areas.",
  "office-cleaning": "An office cleaning checklist keeps workstations, reception areas, restrooms, pantry zones, meeting rooms, and floors consistent.",
  "carpet-cleaning": "A carpet cleaning checklist helps identify stains, traffic lanes, odors, pet issues, drying time, and protection needs.",
  "sofa-cleaning": "A sofa cleaning checklist focuses on fabric type, seat count, stains, odors, pet use, and safe drying conditions.",
  "pest-control": "A pest control checklist helps identify pest type, affected rooms, entry points, food sources, and follow-up prevention.",
  "window-cleaning": "A window cleaning checklist covers glass, frames, tracks, sills, interior and exterior access, and streak-free finishing.",
  "move-in-out-cleaning": "A move-in/out cleaning checklist helps reset empty properties before handover, unpacking, tenancy, or inspection.",
  "restaurant-cleaning": "A restaurant cleaning checklist focuses on kitchen hygiene, dining areas, floors, washrooms, grease, and high-touch surfaces.",
  "apartment-cleaning": "An apartment cleaning checklist helps organize studio, 1BHK, 2BHK, and larger apartment cleaning by room and priority.",
  "showroom-cleaning": "A showroom cleaning checklist protects presentation quality across floors, glass, displays, counters, and visitor areas.",
};

const costGuideServices = ["home-cleaning", "deep-cleaning", "sofa-cleaning", "carpet-cleaning", "office-cleaning", "window-cleaning", "pest-control", "move-in-out-cleaning"];

function serviceBySlug(slug: string) {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing service: ${slug}`);
  return service;
}

function checklistPage(service: Service): ResourcePage {
  const title = `${service.name.replace(" Services", "")} Checklist Abu Dhabi`;
  return {
    slug: `${service.slug}-checklist-abu-dhabi`,
    title,
    eyebrow: "Service checklist",
    description: `${title} by Just Shine Cleaning Services. Review scope, priority areas, booking details, and what to share before your visit.`,
    image: service.images[0],
    serviceSlug: service.slug,
    sections: [
      {
        title: "What this checklist is for",
        body: checklistIntro[service.slug] || `This checklist helps you prepare for ${service.name.toLowerCase()} in Abu Dhabi with a clear scope and fewer surprises.`,
        bullets: [
          `Starting guidance: ${servicePriceLabel(service)}`,
          `Typical duration shown on service page: ${service.duration} hours`,
          `Core scope: ${service.scope}`,
        ],
      },
      {
        title: "Before the team arrives",
        body: "The fastest way to get a clear quote is to send the right details first. Photos are especially useful when the property has stains, heavy dust, large rooms, or access restrictions.",
        bullets: [
          "Share location, property type, and preferred date.",
          "Send photos of priority rooms, stains, or problem areas.",
          "Mention pets, allergies, delicate surfaces, or building access rules.",
        ],
      },
      {
        title: "During the service",
        body: "A focused visit should follow the agreed scope first, then handle priorities in order. If extra work appears during the visit, it should be discussed before extending the job.",
        bullets: [
          "Confirm priority areas at the start.",
          "Keep valuables and fragile items clear.",
          "Review the work before the team leaves when possible.",
        ],
      },
    ],
    faqs: [
      {
        q: `Can I use this checklist before booking ${service.name.toLowerCase()}?`,
        a: `Yes. Use it to prepare details, photos, and priority areas before contacting Just Shine Cleaning Services. It helps the team quote ${service.name.toLowerCase()} more clearly.`,
        links: [{ label: "View service", href: `/services/${service.slug}` }],
      },
      {
        q: "Is everything in the checklist included in the starting price?",
        a: "Not always. Starting prices cover the normal scope, while add-ons, heavy condition, specialist work, or larger properties can change the quote. Confirm details before booking.",
        links: [{ label: "View pricing", href: "/pricing" }],
      },
    ],
  };
}

function costPage(service: Service): ResourcePage {
  const title = `${service.name.replace(" Services", "")} Cost Abu Dhabi`;
  return {
    slug: `${service.slug}-cost-abu-dhabi`,
    title,
    eyebrow: "Cost guide",
    description: `${title}: understand starting price, quote factors, add-ons, timing, and how to avoid unclear cleaning prices in Abu Dhabi.`,
    image: service.images[0],
    serviceSlug: service.slug,
    sections: [
      {
        title: "Starting price",
        body: `${service.name} starts from ${servicePriceLabel(service)}. This gives a useful baseline, but the final cost depends on the property, condition, access, and requested scope.`,
        bullets: [
          `Displayed starting price: ${servicePriceLabel(service)}`,
          `Scope: ${service.scope}`,
          "Final quote is confirmed before booking.",
        ],
      },
      {
        title: "What changes the quote",
        body: "Cleaning cost changes when the property is larger, heavily soiled, difficult to access, needs more time, or includes specialist work outside the standard scope.",
        bullets: [
          "Property size, number of rooms, and bathrooms.",
          "Heavy dust, stains, grease, odors, or pest issues.",
          "Add-ons such as windows, carpets, sofas, or deep appliance cleaning.",
        ],
      },
      {
        title: "How to get a clearer price",
        body: "Send photos, location, property size, and preferred timing on WhatsApp. This reduces guesswork and helps the team recommend the right service rather than overquoting or underquoting.",
        bullets: [
          "Send photos before asking for price.",
          "Mention area and access details.",
          "Ask whether recurring plans or bundles make sense.",
        ],
      },
    ],
    faqs: [
      {
        q: `How much does ${service.name.toLowerCase()} cost in Abu Dhabi?`,
        a: `${service.name} starts from ${servicePriceLabel(service)}. The final price depends on property size, condition, access, timing, and add-ons.`,
        links: [{ label: "View service", href: `/services/${service.slug}` }],
      },
      {
        q: "Can photos help reduce pricing confusion?",
        a: "Yes. Photos help the team understand condition, stains, size, and scope before booking. This makes WhatsApp quotes more accurate.",
        links: [{ label: "Contact", href: "/contact" }],
      },
    ],
  };
}

export const resourcePages: ResourcePage[] = [
  ...services.map(checklistPage),
  ...costGuideServices.map((slug) => costPage(serviceBySlug(slug))),
];

export function getResourcePage(slug: string) {
  return resourcePages.find((page) => page.slug === slug);
}
