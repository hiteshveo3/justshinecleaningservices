import { services, type Service } from "@/lib/content";

export type AbuDhabiLocation = {
  slug: string;
  name: string;
  shortName: string;
  areaType: string;
  audience: string;
  challenge: string;
  scheduling: string;
  propertyFocus: string;
};

export const abuDhabiLocations: AbuDhabiLocation[] = [
  {
    slug: "al-reem-island-abu-dhabi",
    name: "Al Reem Island",
    shortName: "Al Reem",
    areaType: "high-rise apartments and waterfront residential towers",
    audience: "families, professionals, and apartment residents",
    challenge: "balcony dust, AC airflow, lift access, and busy tower schedules",
    scheduling: "morning and evening visits usually work well for tower residents",
    propertyFocus: "studios, 1BR, 2BR, 3BR apartments, and penthouses",
  },
  {
    slug: "downtown-abu-dhabi",
    name: "Downtown Abu Dhabi",
    shortName: "Downtown",
    areaType: "central apartments, offices, shops, and mixed-use buildings",
    audience: "busy professionals, retail teams, offices, and families",
    challenge: "traffic, parking coordination, high footfall, and regular surface dust",
    scheduling: "early morning, afternoon, and after-hours visits can be arranged",
    propertyFocus: "apartments, offices, retail spaces, and commercial units",
  },
  {
    slug: "khalifa-city-abu-dhabi",
    name: "Khalifa City",
    shortName: "Khalifa City",
    areaType: "villas, family homes, schools, and community properties",
    audience: "villa owners, families, tenants, and property managers",
    challenge: "larger rooms, outdoor dust, parking areas, and family traffic",
    scheduling: "larger visits are best booked with a clear room-by-room priority list",
    propertyFocus: "villas, townhouses, large apartments, and family homes",
  },
  {
    slug: "yas-island-abu-dhabi",
    name: "Yas Island",
    shortName: "Yas Island",
    areaType: "villas, apartments, holiday homes, and hospitality spaces",
    audience: "families, short-stay hosts, tenants, and commercial operators",
    challenge: "guest turnover, weekend timing, balcony dust, and event traffic",
    scheduling: "advance booking helps during weekends, holidays, and event periods",
    propertyFocus: "villas, apartments, furnished homes, and rental properties",
  },
  {
    slug: "saadiyat-island-abu-dhabi",
    name: "Saadiyat Island",
    shortName: "Saadiyat",
    areaType: "premium villas, apartments, beachfront homes, and hospitality spaces",
    audience: "villa residents, apartment owners, hotels, and property managers",
    challenge: "sand, salt air, glass marks, premium finishes, and careful surface care",
    scheduling: "planned visits are recommended for larger homes and delicate finishes",
    propertyFocus: "beachfront villas, apartments, offices, and hospitality spaces",
  },
  {
    slug: "hydra-abu-dhabi",
    name: "Hydra Abu Dhabi",
    shortName: "Hydra",
    areaType: "residential communities, apartments, and family homes",
    audience: "families, tenants, and community property managers",
    challenge: "routine dust, family traffic, bathrooms, kitchens, and move schedules",
    scheduling: "weekly or bi-weekly visits keep most homes easier to maintain",
    propertyFocus: "apartments, villas, townhouses, and move-in properties",
  },
  {
    slug: "mussafah-abu-dhabi",
    name: "Mussafah",
    shortName: "Mussafah",
    areaType: "industrial, commercial, warehouse, and accommodation zones",
    audience: "facility managers, business owners, staff accommodation teams, and residents",
    challenge: "industrial dust, heavy vehicle traffic, grease, shared spaces, and high-use floors",
    scheduling: "phased, off-hour, and weekend visits can reduce disruption",
    propertyFocus: "offices, warehouses, workshops, restaurants, homes, and staff housing",
  },
  {
    slug: "al-danah-abu-dhabi",
    name: "Al Danah",
    shortName: "Al Danah",
    areaType: "central apartments, offices, and busy city buildings",
    audience: "apartment residents, office teams, and commercial tenants",
    challenge: "parking coordination, building access, city dust, and frequent visitors",
    scheduling: "central location allows flexible scheduling when access is clear",
    propertyFocus: "apartments, offices, retail spaces, and small commercial units",
  },
  {
    slug: "al-reef-abu-dhabi",
    name: "Al Reef",
    shortName: "Al Reef",
    areaType: "villa communities, apartments, and family neighborhoods",
    audience: "families, villa residents, apartment tenants, and landlords",
    challenge: "community dust, outdoor areas, family traffic, and move-in schedules",
    scheduling: "recurring home and villa cleaning is popular for this community",
    propertyFocus: "villas, apartments, townhouses, and family homes",
  },
  {
    slug: "al-manara-abu-dhabi",
    name: "Al Manara",
    shortName: "Al Manara",
    areaType: "residential buildings, apartments, and city homes",
    audience: "families, professionals, tenants, and building managers",
    challenge: "daily surface dust, kitchens, bathrooms, and flexible access windows",
    scheduling: "shorter maintenance visits and same-week quotes are usually practical",
    propertyFocus: "apartments, homes, offices, and rental units",
  },
  {
    slug: "shakhbout-city-abu-dhabi",
    name: "Shakhbout City",
    shortName: "Shakhbout City",
    areaType: "large villas, family homes, and spacious residential properties",
    audience: "large families, villa owners, tenants, and property managers",
    challenge: "large floor areas, outdoor dust, multiple bathrooms, and detailed scope",
    scheduling: "larger teams and longer time blocks may be needed for full coverage",
    propertyFocus: "villas, majlis areas, kitchens, bathrooms, and outdoor spaces",
  },
  {
    slug: "al-bateen-abu-dhabi",
    name: "Al Bateen",
    shortName: "Al Bateen",
    areaType: "villas, premium homes, offices, and coastal residences",
    audience: "villa residents, families, professionals, and property teams",
    challenge: "premium surfaces, glass, coastal dust, guest areas, and careful handling",
    scheduling: "planned visits are best for villas, guest areas, and premium finishes",
    propertyFocus: "villas, apartments, offices, majlis spaces, and family homes",
  },
  {
    slug: "al-karama-abu-dhabi",
    name: "Al Karama",
    shortName: "Al Karama",
    areaType: "apartments, homes, offices, and residential buildings",
    audience: "families, tenants, professionals, and small businesses",
    challenge: "routine dust, kitchens, bathrooms, high-use rooms, and rental handovers",
    scheduling: "regular visits help prevent dust buildup between deeper cleans",
    propertyFocus: "apartments, homes, offices, and move-in or move-out units",
  },
  {
    slug: "bani-yas-abu-dhabi",
    name: "Bani Yas",
    shortName: "Bani Yas",
    areaType: "family homes, villas, apartments, and community properties",
    audience: "families, villa residents, tenants, and landlords",
    challenge: "larger homes, outdoor dust, family traffic, and periodic deep cleaning needs",
    scheduling: "weekly, bi-weekly, and one-time service plans can be quoted",
    propertyFocus: "villas, apartments, homes, and rental properties",
  },
  {
    slug: "sheikh-zayed-city-abu-dhabi",
    name: "Sheikh Zayed City",
    shortName: "Sheikh Zayed City",
    areaType: "residential properties, villas, apartments, and community buildings",
    audience: "families, tenants, landlords, and property managers",
    challenge: "dust, larger spaces, room-by-room priorities, and flexible access",
    scheduling: "planned cleaning visits work well for full homes and recurring upkeep",
    propertyFocus: "villas, apartments, homes, and community properties",
  },
];

export function getLocation(slug: string) {
  return abuDhabiLocations.find((location) => location.slug === slug);
}

export function getServiceLocationPaths(serviceList: Service[] = services) {
  return serviceList.flatMap((service) =>
    abuDhabiLocations.map((location) => ({
      service,
      location,
      serviceSlug: service.slug,
      locationSlug: location.slug,
    })),
  );
}

export function locationServiceTitle(service: Service, location: AbuDhabiLocation) {
  return `${service.name} in ${location.name}, Abu Dhabi`;
}

export function locationServiceDescription(service: Service, location: AbuDhabiLocation) {
  return `${service.name} in ${location.name}, Abu Dhabi from AED ${service.price} ${service.priceUnit}. Just Shine Cleaning Services handles ${location.propertyFocus.toLowerCase()} with Call and WhatsApp booking.`;
}
