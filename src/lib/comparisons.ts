export type ComparisonPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  primaryService: string;
  secondaryService?: string;
  optionA: string;
  optionB: string;
  verdict: string;
  rows: {
    factor: string;
    a: string;
    b: string;
    winner: string;
  }[];
  faqs: {
    q: string;
    a: string;
    links?: { label: string; href: string }[];
  }[];
};

function faq(primaryService: string, secondaryService?: string) {
  const links = [{ label: "Primary service", href: `/services/${primaryService}` }];
  if (secondaryService) links.push({ label: "Related service", href: `/services/${secondaryService}` });
  return [
    {
      q: "Can Just Shine help me choose the right option?",
      a: "Yes. Send your location, photos, property type, and what you want cleaned. The team can suggest the better service before you book.",
      links,
    },
    {
      q: "Can two services be combined in one visit?",
      a: "Often yes, depending on team availability, property size, and scope. Combining services can be useful when visible cleaning and specialist cleaning are both needed.",
      links: [{ label: "Contact", href: "/contact" }],
    },
  ];
}

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "home-cleaning-vs-deep-cleaning-abu-dhabi",
    title: "Home Cleaning vs Deep Cleaning in Abu Dhabi",
    eyebrow: "Service comparison",
    description: "Compare regular home cleaning and deep cleaning so you can choose the right service for dust, upkeep, hidden areas, and budget.",
    image: "/images/services/deep-cleaning.webp",
    primaryService: "home-cleaning",
    secondaryService: "deep-cleaning",
    optionA: "Home Cleaning",
    optionB: "Deep Cleaning",
    verdict: "Choose home cleaning for weekly upkeep. Choose deep cleaning when hidden dust, grout, appliance areas, and corners need a full reset.",
    rows: [
      { factor: "Best use", a: "Weekly or bi-weekly maintenance", b: "Seasonal or one-time detailed reset", winner: "Depends on condition" },
      { factor: "Time", a: "Usually shorter", b: "Usually longer", winner: "Home cleaning for speed" },
      { factor: "Depth", a: "Visible areas", b: "Hidden and detailed areas", winner: "Deep cleaning" },
    ],
    faqs: faq("home-cleaning", "deep-cleaning"),
  },
  {
    slug: "villa-cleaning-vs-home-cleaning-abu-dhabi",
    title: "Villa Cleaning vs Home Cleaning in Abu Dhabi",
    eyebrow: "Villa decision",
    description: "Compare villa cleaning and regular home cleaning for larger rooms, outdoor dust, majlis areas, bathrooms, and family spaces.",
    image: "/images/services/villa-cleaning.webp",
    primaryService: "villa-cleaning",
    secondaryService: "home-cleaning",
    optionA: "Villa Cleaning",
    optionB: "Home Cleaning",
    verdict: "Choose villa cleaning for larger homes and outdoor-related areas. Choose home cleaning for routine indoor upkeep.",
    rows: [
      { factor: "Property fit", a: "Villas, majlis, outdoor areas", b: "Apartments and regular indoor rooms", winner: "Villa cleaning for large homes" },
      { factor: "Scope", a: "Broader room and outdoor planning", b: "Regular indoor maintenance", winner: "Villa cleaning" },
      { factor: "Budget", a: "May need more time", b: "Usually lighter scope", winner: "Home cleaning for smaller jobs" },
    ],
    faqs: faq("villa-cleaning", "home-cleaning"),
  },
  {
    slug: "apartment-cleaning-vs-home-cleaning-abu-dhabi",
    title: "Apartment Cleaning vs Home Cleaning in Abu Dhabi",
    eyebrow: "Apartment decision",
    description: "Compare apartment cleaning and home cleaning for studios, 1BHK, 2BHK, busy households, and regular dust control.",
    image: "/images/services/apartment-cleaning.webp",
    primaryService: "apartment-cleaning",
    secondaryService: "home-cleaning",
    optionA: "Apartment Cleaning",
    optionB: "Home Cleaning",
    verdict: "Both overlap. Choose apartment cleaning when you want apartment-size guidance and home cleaning when you want regular maintenance wording.",
    rows: [
      { factor: "Best fit", a: "Studios, 1BHK, 2BHK, towers", b: "General home upkeep", winner: "Apartment cleaning for flats" },
      { factor: "Access", a: "Building/lift planning matters", b: "Flexible by home type", winner: "Apartment cleaning" },
      { factor: "Routine", a: "Good for compact homes", b: "Good for weekly upkeep", winner: "Tie" },
    ],
    faqs: faq("apartment-cleaning", "home-cleaning"),
  },
  {
    slug: "sofa-cleaning-vs-carpet-cleaning-abu-dhabi",
    title: "Sofa Cleaning vs Carpet Cleaning in Abu Dhabi",
    eyebrow: "Fabric comparison",
    description: "Compare sofa cleaning and carpet cleaning for stains, odors, dust, pet hair, fabric care, and living room refreshes.",
    image: "/images/services/sofa-cleaning.webp",
    primaryService: "sofa-cleaning",
    secondaryService: "carpet-cleaning",
    optionA: "Sofa Cleaning",
    optionB: "Carpet Cleaning",
    verdict: "Choose sofa cleaning for upholstery. Choose carpet cleaning for rugs, carpets, traffic marks, and floor-level dust.",
    rows: [
      { factor: "Surface", a: "Seats, arms, upholstery", b: "Carpets, rugs, floor fabric", winner: "Depends on fabric" },
      { factor: "Common issue", a: "Food, body oils, pet hair", b: "Traffic lanes, dust, spills", winner: "Tie" },
      { factor: "Best bundle", a: "Living room sofa refresh", b: "Full floor fabric refresh", winner: "Book both for full room" },
    ],
    faqs: faq("sofa-cleaning", "carpet-cleaning"),
  },
  {
    slug: "deep-cleaning-vs-move-out-cleaning-abu-dhabi",
    title: "Deep Cleaning vs Move-Out Cleaning in Abu Dhabi",
    eyebrow: "Move decision",
    description: "Compare deep cleaning and move-out cleaning for empty homes, handover, inspection, hidden dust, cabinets, and bathrooms.",
    image: "/images/services/move-in-out-cleaning.webp",
    primaryService: "move-in-out-cleaning",
    secondaryService: "deep-cleaning",
    optionA: "Move-Out Cleaning",
    optionB: "Deep Cleaning",
    verdict: "Choose move-out cleaning for handover and empty-property reset. Choose deep cleaning when you still live in the home but need detailed work.",
    rows: [
      { factor: "Timing", a: "After furniture removal", b: "Any time condition needs detail", winner: "Move-out for handover" },
      { factor: "Goal", a: "Inspection-ready property", b: "Cleaner occupied home", winner: "Depends on goal" },
      { factor: "Access", a: "Empty rooms are easier", b: "May work around belongings", winner: "Move-out cleaning" },
    ],
    faqs: faq("move-in-out-cleaning", "deep-cleaning"),
  },
  {
    slug: "office-cleaning-vs-home-cleaning-abu-dhabi",
    title: "Office Cleaning vs Home Cleaning in Abu Dhabi",
    eyebrow: "Commercial comparison",
    description: "Compare office cleaning and home cleaning for workstations, restrooms, pantry areas, family rooms, and scheduling.",
    image: "/images/services/office-cleaning.webp",
    primaryService: "office-cleaning",
    secondaryService: "home-cleaning",
    optionA: "Office Cleaning",
    optionB: "Home Cleaning",
    verdict: "Choose office cleaning for commercial routines and shared spaces. Choose home cleaning for family rooms and residential upkeep.",
    rows: [
      { factor: "Space type", a: "Workplaces and shared desks", b: "Homes and apartments", winner: "Depends on property" },
      { factor: "Timing", a: "Before/after office hours", b: "Flexible home visits", winner: "Office cleaning for business" },
      { factor: "Focus", a: "Reception, restrooms, pantry", b: "Bedrooms, bathrooms, kitchen", winner: "Tie" },
    ],
    faqs: faq("office-cleaning", "home-cleaning"),
  },
  {
    slug: "restaurant-cleaning-vs-office-cleaning-abu-dhabi",
    title: "Restaurant Cleaning vs Office Cleaning in Abu Dhabi",
    eyebrow: "Commercial scope",
    description: "Compare restaurant cleaning and office cleaning for grease, hygiene, dining areas, workstations, washrooms, and floors.",
    image: "/images/services/restaurant-cleaning.webp",
    primaryService: "restaurant-cleaning",
    secondaryService: "office-cleaning",
    optionA: "Restaurant Cleaning",
    optionB: "Office Cleaning",
    verdict: "Choose restaurant cleaning for food areas, grease, dining spaces, and hygiene routines. Choose office cleaning for desks, reception, and work areas.",
    rows: [
      { factor: "Main risk", a: "Grease and food residue", b: "Dust and shared surfaces", winner: "Depends on business" },
      { factor: "Timing", a: "After service hours", b: "Before/after office hours", winner: "Tie" },
      { factor: "Scope", a: "Kitchen, dining, washrooms", b: "Workstations, pantry, restrooms", winner: "Tie" },
    ],
    faqs: faq("restaurant-cleaning", "office-cleaning"),
  },
  {
    slug: "window-cleaning-vs-deep-cleaning-abu-dhabi",
    title: "Window Cleaning vs Deep Cleaning in Abu Dhabi",
    eyebrow: "Glass or full reset",
    description: "Compare window cleaning and deep cleaning for glass marks, frames, tracks, hidden dust, bathrooms, and kitchens.",
    image: "/images/services/window-cleaning.webp",
    primaryService: "window-cleaning",
    secondaryService: "deep-cleaning",
    optionA: "Window Cleaning",
    optionB: "Deep Cleaning",
    verdict: "Choose window cleaning when glass and frames are the issue. Choose deep cleaning when the whole property needs detailed attention.",
    rows: [
      { factor: "Focus", a: "Glass, frames, tracks", b: "Whole property detail", winner: "Depends on need" },
      { factor: "Visual impact", a: "Brighter rooms and clearer glass", b: "Overall freshness", winner: "Tie" },
      { factor: "Best bundle", a: "Add to home or villa clean", b: "Add windows if glass is dull", winner: "Book together if needed" },
    ],
    faqs: faq("window-cleaning", "deep-cleaning"),
  },
  {
    slug: "pest-control-vs-deep-cleaning-abu-dhabi",
    title: "Pest Control vs Deep Cleaning in Abu Dhabi",
    eyebrow: "Pest or clean",
    description: "Compare pest control and deep cleaning when dealing with cockroaches, ants, food residue, hidden dirt, and prevention.",
    image: "/images/services/pest-control.webp",
    primaryService: "pest-control",
    secondaryService: "deep-cleaning",
    optionA: "Pest Control",
    optionB: "Deep Cleaning",
    verdict: "Choose pest control for active pests. Choose deep cleaning to remove food residue, grease, and hidden dirt that can attract pests.",
    rows: [
      { factor: "Main issue", a: "Active cockroaches, ants, bugs", b: "Dirt, grease, hidden buildup", winner: "Depends on issue" },
      { factor: "Prevention", a: "Treatment and control", b: "Removes attractants", winner: "Often both" },
      { factor: "Urgency", a: "Needed for visible pests", b: "Useful before/after treatment", winner: "Pest control for infestation" },
    ],
    faqs: faq("pest-control", "deep-cleaning"),
  },
  {
    slug: "weekly-cleaning-vs-monthly-cleaning-abu-dhabi",
    title: "Weekly Cleaning vs Monthly Cleaning in Abu Dhabi",
    eyebrow: "Frequency comparison",
    description: "Compare weekly and monthly cleaning for Abu Dhabi dust, busy homes, apartment upkeep, family traffic, and cost control.",
    image: "/images/services/home-cleaning.webp",
    primaryService: "home-cleaning",
    optionA: "Weekly Cleaning",
    optionB: "Monthly Cleaning",
    verdict: "Weekly cleaning is better for dust control and busy homes. Monthly cleaning may work for low-traffic spaces but dust can build up.",
    rows: [
      { factor: "Dust control", a: "Stronger", b: "Light support only", winner: "Weekly cleaning" },
      { factor: "Cost per month", a: "Higher but predictable", b: "Lower upfront", winner: "Monthly for budget" },
      { factor: "Comfort", a: "Consistent clean feel", b: "Can feel dusty between visits", winner: "Weekly cleaning" },
    ],
    faqs: faq("home-cleaning"),
  },
  {
    slug: "professional-cleaning-vs-diy-cleaning-abu-dhabi",
    title: "Professional Cleaning vs DIY Cleaning in Abu Dhabi",
    eyebrow: "DIY comparison",
    description: "Compare professional cleaning and DIY cleaning for time, quality, equipment, consistency, and Abu Dhabi dust.",
    image: "/images/services/home-cleaning.webp",
    primaryService: "home-cleaning",
    optionA: "Professional Cleaning",
    optionB: "DIY Cleaning",
    verdict: "DIY helps with small daily tasks. Professional cleaning is better for consistency, deeper attention, and saving time.",
    rows: [
      { factor: "Time", a: "Team handles it", b: "You spend your own time", winner: "Professional cleaning" },
      { factor: "Control", a: "Agreed checklist", b: "Full personal control", winner: "DIY for small tasks" },
      { factor: "Consistency", a: "Recurring routine", b: "Depends on schedule", winner: "Professional cleaning" },
    ],
    faqs: faq("home-cleaning"),
  },
  {
    slug: "one-time-cleaning-vs-recurring-cleaning-abu-dhabi",
    title: "One-Time Cleaning vs Recurring Cleaning in Abu Dhabi",
    eyebrow: "Booking model",
    description: "Compare one-time and recurring cleaning for events, weekly upkeep, dust control, and long-term home maintenance.",
    image: "/images/services/apartment-cleaning.webp",
    primaryService: "home-cleaning",
    optionA: "One-Time Cleaning",
    optionB: "Recurring Cleaning",
    verdict: "Choose one-time cleaning for urgent or special situations. Choose recurring cleaning for dust control and routine comfort.",
    rows: [
      { factor: "Best use", a: "Guests, move, urgent clean", b: "Weekly or bi-weekly upkeep", winner: "Depends on schedule" },
      { factor: "Dust control", a: "Temporary", b: "Consistent", winner: "Recurring cleaning" },
      { factor: "Flexibility", a: "Book when needed", b: "Set routine", winner: "Tie" },
    ],
    faqs: faq("home-cleaning"),
  },
  {
    slug: "move-in-cleaning-vs-move-out-cleaning-abu-dhabi",
    title: "Move-In Cleaning vs Move-Out Cleaning in Abu Dhabi",
    eyebrow: "Moving comparison",
    description: "Compare move-in and move-out cleaning for tenants, landlords, inspections, empty apartments, and fresh starts.",
    image: "/images/services/move-in-out-cleaning.webp",
    primaryService: "move-in-out-cleaning",
    optionA: "Move-In Cleaning",
    optionB: "Move-Out Cleaning",
    verdict: "Move-in cleaning prepares a space before belongings arrive. Move-out cleaning prepares it for handover or inspection.",
    rows: [
      { factor: "Goal", a: "Fresh start before unpacking", b: "Handover-ready property", winner: "Depends on move stage" },
      { factor: "Timing", a: "Before furniture arrives", b: "After furniture leaves", winner: "Tie" },
      { factor: "Priority", a: "Cabinets, bathrooms, floors", b: "Visible cleanliness and inspection", winner: "Tie" },
    ],
    faqs: faq("move-in-out-cleaning"),
  },
  {
    slug: "carpet-cleaning-vs-vacuuming-abu-dhabi",
    title: "Carpet Cleaning vs Vacuuming in Abu Dhabi",
    eyebrow: "Carpet care",
    description: "Compare carpet cleaning and vacuuming for dust, stains, odors, allergens, pet hair, and high-traffic areas.",
    image: "/images/services/carpet-cleaning.webp",
    primaryService: "carpet-cleaning",
    optionA: "Carpet Cleaning",
    optionB: "Vacuuming",
    verdict: "Vacuuming is routine maintenance. Carpet cleaning is better for stains, odor, deeper dust, and periodic refreshes.",
    rows: [
      { factor: "Depth", a: "Deeper fabric care", b: "Surface dust pickup", winner: "Carpet cleaning" },
      { factor: "Frequency", a: "Periodic", b: "Weekly or more", winner: "Vacuuming for routine" },
      { factor: "Stains", a: "Better option", b: "Not enough", winner: "Carpet cleaning" },
    ],
    faqs: faq("carpet-cleaning"),
  },
  {
    slug: "sofa-cleaning-vs-upholstery-protection-abu-dhabi",
    title: "Sofa Cleaning vs Upholstery Protection in Abu Dhabi",
    eyebrow: "Sofa care",
    description: "Compare sofa cleaning and upholstery protection for stains, family use, spills, pet homes, and long-term fabric care.",
    image: "/images/services/sofa-cleaning.webp",
    primaryService: "sofa-cleaning",
    optionA: "Sofa Cleaning",
    optionB: "Upholstery Protection",
    verdict: "Sofa cleaning refreshes current fabric. Protection helps reduce future staining after the sofa is cleaned.",
    rows: [
      { factor: "Purpose", a: "Clean existing dirt and marks", b: "Help protect after cleaning", winner: "Both together" },
      { factor: "Timing", a: "First step", b: "After cleaning", winner: "Sofa cleaning first" },
      { factor: "Best for", a: "Dust, odor, stains", b: "Spill-prone homes", winner: "Depends on family use" },
    ],
    faqs: faq("sofa-cleaning"),
  },
  {
    slug: "standard-cleaning-vs-sanitization-abu-dhabi",
    title: "Standard Cleaning vs Sanitization in Abu Dhabi",
    eyebrow: "Health comparison",
    description: "Compare standard cleaning and sanitization for visible dirt, high-touch surfaces, illness recovery, offices, and family homes.",
    image: "/images/services/deep-cleaning.webp",
    primaryService: "deep-cleaning",
    optionA: "Standard Cleaning",
    optionB: "Sanitization",
    verdict: "Standard cleaning removes visible dirt. Sanitization focuses more on high-touch areas and hygiene-sensitive needs.",
    rows: [
      { factor: "Main goal", a: "Remove visible mess and dust", b: "Hygiene-focused surface attention", winner: "Depends on need" },
      { factor: "Best for", a: "Routine upkeep", b: "Illness, offices, sensitive homes", winner: "Sanitization for hygiene" },
      { factor: "Frequency", a: "Regular", b: "As needed", winner: "Standard cleaning" },
    ],
    faqs: faq("deep-cleaning"),
  },
  {
    slug: "inside-window-cleaning-vs-outside-window-cleaning-abu-dhabi",
    title: "Inside vs Outside Window Cleaning in Abu Dhabi",
    eyebrow: "Window scope",
    description: "Compare inside and outside window cleaning for glass marks, balcony dust, frames, tracks, access, and building rules.",
    image: "/images/services/window-cleaning.webp",
    primaryService: "window-cleaning",
    optionA: "Inside Window Cleaning",
    optionB: "Outside Window Cleaning",
    verdict: "Inside cleaning is easier to schedule. Outside cleaning depends on access, safety, building rules, height, and exterior conditions.",
    rows: [
      { factor: "Access", a: "Usually straightforward", b: "Depends on building and height", winner: "Inside cleaning" },
      { factor: "Dust source", a: "Fingerprints and indoor dust", b: "Sand, water marks, exterior dust", winner: "Depends on glass" },
      { factor: "Safety", a: "Lower risk", b: "Needs safe access", winner: "Inside cleaning" },
    ],
    faqs: faq("window-cleaning"),
  },
  {
    slug: "bed-bug-treatment-vs-cockroach-control-abu-dhabi",
    title: "Bed Bug Treatment vs Cockroach Control in Abu Dhabi",
    eyebrow: "Pest comparison",
    description: "Compare bed bug treatment and cockroach control so you can describe the issue clearly before pest control booking.",
    image: "/images/services/pest-control.webp",
    primaryService: "pest-control",
    optionA: "Bed Bug Treatment",
    optionB: "Cockroach Control",
    verdict: "Both need pest control, but the preparation, affected areas, and follow-up can differ. Describe signs clearly before booking.",
    rows: [
      { factor: "Affected area", a: "Beds, furniture, bedrooms", b: "Kitchens, drains, cabinets", winner: "Different issue" },
      { factor: "Signs", a: "Bites, spots, mattress signs", b: "Visible roaches, droppings", winner: "Different signs" },
      { factor: "Preparation", a: "Bedroom preparation may be needed", b: "Kitchen hygiene matters", winner: "Tie" },
    ],
    faqs: faq("pest-control"),
  },
  {
    slug: "villa-deep-cleaning-vs-apartment-deep-cleaning-abu-dhabi",
    title: "Villa Deep Cleaning vs Apartment Deep Cleaning in Abu Dhabi",
    eyebrow: "Property comparison",
    description: "Compare villa and apartment deep cleaning for property size, access, outdoor dust, bathrooms, kitchens, and timing.",
    image: "/images/services/villa-cleaning.webp",
    primaryService: "deep-cleaning",
    secondaryService: "villa-cleaning",
    optionA: "Villa Deep Cleaning",
    optionB: "Apartment Deep Cleaning",
    verdict: "Villa deep cleaning usually needs more time and broader planning. Apartment deep cleaning is more compact but may involve building access.",
    rows: [
      { factor: "Size", a: "Larger and more zones", b: "Compact and vertical access", winner: "Apartment for speed" },
      { factor: "Outdoor dust", a: "Often more outdoor exposure", b: "Balcony and window dust", winner: "Villa for scope" },
      { factor: "Planning", a: "More rooms and bathrooms", b: "Lift and building access", winner: "Tie" },
    ],
    faqs: faq("deep-cleaning", "villa-cleaning"),
  },
  {
    slug: "cleaning-company-vs-freelance-cleaner-abu-dhabi",
    title: "Cleaning Company vs Freelance Cleaner in Abu Dhabi",
    eyebrow: "Provider comparison",
    description: "Compare a professional cleaning company and freelance cleaner for reliability, scope, pricing clarity, replacement, and booking support.",
    image: "/images/services/home-cleaning.webp",
    primaryService: "home-cleaning",
    optionA: "Cleaning Company",
    optionB: "Freelance Cleaner",
    verdict: "A company is usually better for reliability, service range, and support. Freelance cleaners may suit small routine tasks when trust is already established.",
    rows: [
      { factor: "Reliability", a: "Team support and scheduling", b: "Depends on individual availability", winner: "Cleaning company" },
      { factor: "Service range", a: "Home, deep, sofa, carpet, pest, office", b: "Usually limited", winner: "Cleaning company" },
      { factor: "Cost", a: "Clear service-based pricing", b: "May be cheaper for small tasks", winner: "Depends on scope" },
    ],
    faqs: faq("home-cleaning"),
  },
];

export function getComparisonPage(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}
