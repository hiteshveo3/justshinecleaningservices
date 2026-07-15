export type CleaningGuide = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  primaryService: string;
  readingTime: string;
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

export const cleaningGuides: CleaningGuide[] = [
  {
    slug: "home-cleaning-vs-deep-cleaning",
    title: "Home Cleaning vs Deep Cleaning in Abu Dhabi",
    eyebrow: "Decision guide",
    description: "Understand when regular home cleaning is enough, when deep cleaning is better, and how Abu Dhabi dust changes the right schedule.",
    image: "/images/services/home-cleaning.webp",
    primaryService: "home-cleaning",
    readingTime: "7 min read",
    sections: [
      {
        title: "The simple difference",
        body: "Home cleaning is regular maintenance for visible areas. Deep cleaning is a more detailed reset for hidden dust, grease, grout, corners, appliance interiors, and places that daily cleaning usually misses.",
        bullets: ["Home cleaning is best weekly or bi-weekly.", "Deep cleaning is best quarterly, before events, or before moving.", "Many Abu Dhabi homes need both because dust returns quickly."],
      },
      {
        title: "What Abu Dhabi changes",
        body: "AC airflow, balcony dust, humidity, and frequent sand make homes feel dusty faster than cooler cities. A weekly maintenance clean keeps the home comfortable while periodic deep cleaning handles the buildup.",
        bullets: ["Visible dust can return in 5-7 days.", "Bathrooms and kitchens need regular attention.", "Photos help the team recommend the right service."],
      },
      {
        title: "Best plan for most homes",
        body: "For most apartments and family homes, the best routine is weekly or bi-weekly home cleaning plus seasonal deep cleaning. This gives consistency without overpaying for a deep clean every time.",
        bullets: ["Weekly clean for busy homes.", "Bi-weekly clean for lighter traffic.", "Quarterly deep clean for hidden areas."],
      },
    ],
    faqs: [
      { q: "Can home cleaning replace deep cleaning?", a: "Not fully. Home cleaning maintains visible surfaces, but deep cleaning handles hidden areas like grout, corners, appliances, vents, and behind furniture.", links: [{ label: "Deep cleaning", href: "/services/deep-cleaning" }] },
      { q: "Which service should I book first?", a: "If your home has not been professionally cleaned for months, start with deep cleaning. If it is already manageable, begin with regular home cleaning.", links: [{ label: "Home cleaning", href: "/services/home-cleaning" }] },
    ],
  },
  {
    slug: "villa-cleaning-cost-abu-dhabi",
    title: "Villa Cleaning Cost in Abu Dhabi",
    eyebrow: "Pricing guide",
    description: "A practical guide to villa cleaning pricing, scope, visit duration, and what affects the final quote in Abu Dhabi communities.",
    image: "/images/services/villa-cleaning.webp",
    primaryService: "villa-cleaning",
    readingTime: "6 min read",
    sections: [
      {
        title: "Why villa pricing varies",
        body: "Villa cleaning depends on size, number of rooms, bathrooms, outdoor areas, majlis spaces, balconies, parking areas, and the condition of the property.",
        bullets: ["Large villas need more time and sometimes more cleaners.", "Outdoor areas can add dust and sand work.", "Move-in or post-renovation villas need deeper scope."],
      },
      {
        title: "What to share before booking",
        body: "A clear quote is easier when you send the villa location, number of rooms, photos, priority areas, and whether garden, balcony, or parking cleaning is needed.",
        bullets: ["Send photos of dusty or stained areas.", "Mention pets, allergies, or delicate surfaces.", "Confirm access and parking before the team arrives."],
      },
      {
        title: "How to control the cost",
        body: "The best way to manage cost is to prioritize rooms, choose the right service type, and avoid adding specialist work unless it is needed.",
        bullets: ["Start with bedrooms, bathrooms, kitchen, and living areas.", "Book sofa, carpet, or window cleaning separately if required.", "Recurring visits usually reduce buildup and time."],
      },
    ],
    faqs: [
      { q: "Is villa cleaning charged hourly?", a: "Many villa jobs start with hourly pricing, but larger villas may need a custom quote based on size, condition, and scope.", links: [{ label: "Villa cleaning", href: "/services/villa-cleaning" }] },
      { q: "Does villa cleaning include outdoor areas?", a: "It can, but outdoor areas should be confirmed before booking because garden, parking, patio, and balcony work can change timing." },
    ],
  },
  {
    slug: "move-in-cleaning-checklist-abu-dhabi",
    title: "Move-In Cleaning Checklist for Abu Dhabi Apartments",
    eyebrow: "Checklist",
    description: "A room-by-room move-in cleaning checklist for apartments and villas before unpacking furniture, kitchen items, and personal belongings.",
    image: "/images/services/move-in-out-cleaning.webp",
    primaryService: "move-in-out-cleaning",
    readingTime: "8 min read",
    sections: [
      {
        title: "Before furniture arrives",
        body: "Move-in cleaning is easiest before boxes and furniture block access. Empty rooms allow the team to clean floors, corners, cabinets, bathrooms, and kitchen surfaces properly.",
        bullets: ["Clean floors before rugs and beds arrive.", "Clean cabinet interiors before kitchen items are stored.", "Check bathrooms before family use."],
      },
      {
        title: "High-priority areas",
        body: "The most important areas are kitchens, bathrooms, wardrobes, AC vents, windowsills, and floors. These hold dust, odors, and residue from previous occupants or maintenance work.",
        bullets: ["Kitchen cabinets and counters.", "Bathroom fixtures and grout.", "Wardrobes, shelves, and drawers."],
      },
      {
        title: "After the clean",
        body: "Do a walkthrough before unpacking. If anything needs a quick touch-up, it is much easier to handle immediately while the space is still empty.",
        bullets: ["Check corners and behind doors.", "Review bathroom mirrors and glass.", "Confirm floors are dry before moving items."],
      },
    ],
    faqs: [
      { q: "Should I clean before or after moving in?", a: "Before moving in is better. Empty spaces are easier to clean and the team can reach corners, cabinets, and floors without moving furniture.", links: [{ label: "Move-in/out cleaning", href: "/services/move-in-out-cleaning" }] },
      { q: "Does move-in cleaning include pest control?", a: "Pest control is usually separate. If you see cockroaches, ants, or bed bugs, mention it before booking so the right service can be quoted.", links: [{ label: "Pest control", href: "/services/pest-control" }] },
    ],
  },
  {
    slug: "sofa-and-carpet-cleaning-guide",
    title: "Sofa and Carpet Cleaning Guide for Abu Dhabi Homes",
    eyebrow: "Fabric care guide",
    description: "Learn when to book sofa cleaning, carpet cleaning, or both, especially for dust, odors, stains, pets, and allergy-sensitive homes.",
    image: "/images/services/sofa-cleaning.webp",
    primaryService: "sofa-cleaning",
    readingTime: "6 min read",
    sections: [
      {
        title: "Why fabric cleaning matters",
        body: "Sofas and carpets trap dust, odors, skin particles, food crumbs, and pet dander. Regular surface vacuuming helps, but professional cleaning reaches deeper into fabric fibers.",
        bullets: ["Useful for allergies and odors.", "Important after spills or pet accidents.", "Helps refresh living rooms before guests."],
      },
      {
        title: "Sofa vs carpet cleaning",
        body: "Sofa cleaning focuses on upholstery, seats, arms, and stains. Carpet cleaning focuses on pile, dust, allergens, traffic marks, and odor trapped near the floor.",
        bullets: ["Book sofa cleaning for upholstery stains.", "Book carpet cleaning for floor fabric and rugs.", "Book both for a full living room refresh."],
      },
      {
        title: "Before the team arrives",
        body: "Share photos of stains, fabric type, and approximate size. Move small items from the area so the team can work without delay.",
        bullets: ["Send stain photos on WhatsApp.", "Mention pets or allergies.", "Allow drying time after cleaning."],
      },
    ],
    faqs: [
      { q: "Can sofa and carpet cleaning be booked together?", a: "Yes. Booking both can be practical when the living room needs a complete refresh, especially after guests, pets, spills, or long dust buildup.", links: [{ label: "Sofa cleaning", href: "/services/sofa-cleaning" }, { label: "Carpet cleaning", href: "/services/carpet-cleaning" }] },
      { q: "How long does drying take?", a: "Drying depends on fabric, ventilation, humidity, and cleaning method. The team can guide you after seeing the fabric and room conditions." },
    ],
  },
  {
    slug: "office-cleaning-checklist-abu-dhabi",
    title: "Office Cleaning Checklist for Abu Dhabi Businesses",
    eyebrow: "Commercial checklist",
    description: "A practical office cleaning checklist for workstations, meeting rooms, restrooms, floors, glass, and after-hours commercial cleaning.",
    image: "/images/services/office-cleaning.webp",
    primaryService: "office-cleaning",
    readingTime: "7 min read",
    sections: [
      {
        title: "Daily office priorities",
        body: "Offices need clean workstations, floors, restrooms, pantry areas, meeting rooms, glass, and reception spaces. Consistency matters because employees and visitors notice small details.",
        bullets: ["Reception and visitor areas.", "Workstations and shared surfaces.", "Restrooms and pantry areas."],
      },
      {
        title: "After-hours cleaning",
        body: "Many offices prefer cleaning before opening, after closing, or during quiet hours. This reduces disruption and helps the team work through shared areas faster.",
        bullets: ["Confirm access and security rules.", "Share office timing and floor plan.", "List rooms that should not be entered."],
      },
      {
        title: "Monthly deep attention",
        body: "Even with regular cleaning, offices benefit from periodic deeper attention to glass, corners, dust buildup, high-touch surfaces, and storage areas.",
        bullets: ["Glass and partitions.", "Corners and dust buildup.", "High-touch surfaces and shared equipment."],
      },
    ],
    faqs: [
      { q: "Can office cleaning be scheduled after hours?", a: "Yes. Office cleaning can often be arranged before opening, after closing, or at a quiet time depending on building access and team availability.", links: [{ label: "Office cleaning", href: "/services/office-cleaning" }] },
      { q: "Do you provide recurring office cleaning?", a: "Recurring office cleaning can be quoted based on size, frequency, number of rooms, restrooms, pantry areas, and required timing." },
    ],
  },
];

export function getGuide(slug: string) {
  return cleaningGuides.find((guide) => guide.slug === slug);
}
