export type PricingTier = {
  label: string;
  price: string;
  original?: string;
  note?: string;
};

export type PricingService = {
  slug: string;
  name: string;
  category: string;
  current: string;
  original: string;
  bestFor: string;
  scope: string;
  rows: PricingTier[];
  discounts: PricingTier[];
  addOns?: PricingTier[];
};

export const pricingServices: PricingService[] = [
  {
    slug: "home-cleaning",
    name: "Home Cleaning Services",
    category: "Residential",
    current: "AED 30/hour",
    original: "AED 45/hour",
    bestFor: "Bedrooms, living rooms, bathrooms, and kitchens",
    scope: "1BR AED 60-90, 2BR AED 90-120, 3BR villa AED 120-150",
    rows: [
      { label: "Home Cleaning", price: "AED 30/hour", original: "AED 45/hour" },
      { label: "1BR Apartment", price: "AED 60-90", original: "AED 90-135", note: "2-3 hours" },
      { label: "2BR Apartment", price: "AED 90-120", original: "AED 135-180", note: "3-4 hours" },
      { label: "3BR Villa", price: "AED 120-150", original: "AED 180-225", note: "4-5 hours" },
    ],
    discounts: [
      { label: "Monthly Contract", price: "AED 25.50/hour", note: "15% off, 3BR monthly AED 127.50" },
      { label: "Quarterly Bundle", price: "AED 27/hour", note: "10% off" },
      { label: "Annual Prepay", price: "AED 24/hour", note: "20% off" },
      { label: "Referral Bonus", price: "AED 28.50/hour", note: "5% off for both" },
    ],
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning Services",
    category: "Residential",
    current: "AED 35/hour",
    original: "AED 50/hour",
    bestFor: "Hidden dust, grout, vents, corners, kitchen grease, and full-home reset",
    scope: "Starts from AED 35/hour; final quote by size and condition",
    rows: [
      { label: "Deep Cleaning", price: "AED 35/hour", original: "AED 50/hour" },
      { label: "1BR Apartment", price: "AED 105-140", original: "AED 150-200", note: "3-4 hours" },
      { label: "2BR Apartment", price: "AED 140-175", original: "AED 200-250", note: "4-5 hours" },
      { label: "3BR Villa", price: "AED 175-210", original: "AED 250-300", note: "5-6 hours" },
      { label: "4BR Villa", price: "AED 210-245", original: "AED 300-350", note: "6-7 hours" },
      { label: "5BR+ Villa", price: "AED 245-280", original: "AED 350-400", note: "7-8 hours" },
    ],
    discounts: [
      { label: "Monthly Contract", price: "AED 28/hour", note: "20% off for regular deep cleans" },
      { label: "Quarterly Deep Clean", price: "AED 30/hour", note: "15% off" },
      { label: "Bundle Same Day", price: "AED 30/hour", note: "15% off with carpet or sofa" },
      { label: "Annual Prepay", price: "AED 26/hour", note: "25% off" },
      { label: "Referral Program", price: "AED 33/hour", note: "5% off" },
    ],
  },
  {
    slug: "villa-cleaning",
    name: "Villa Cleaning Services",
    category: "Residential",
    current: "AED 35/hour",
    original: "AED 50/hour",
    bestFor: "Interior, kitchen, bathrooms, garden, entrance, and parking areas",
    scope: "Starts from AED 35/hour; final quote by villa size and scope",
    rows: [
      { label: "Villa Cleaning", price: "AED 35/hour", original: "AED 50/hour" },
      { label: "3BR Villa", price: "AED 175-210", original: "AED 250-300", note: "5-6 hours" },
      { label: "4BR Villa", price: "AED 210-245", original: "AED 300-350", note: "6-7 hours" },
      { label: "5BR Villa", price: "AED 245-280", original: "AED 350-400", note: "7-8 hours" },
      { label: "5BR+ Villa", price: "AED 280-350", original: "AED 400-500", note: "8-10 hours" },
    ],
    discounts: [
      { label: "Monthly Contract", price: "AED 28/hour", note: "20% off, best for villas" },
      { label: "Quarterly Villa + Carpet + Sofa", price: "Bundle quote", note: "15% total discount" },
      { label: "Move-In/Move-Out Special", price: "AED 30/hour", note: "Different model" },
      { label: "Annual Prepay", price: "AED 26/hour", note: "25% off" },
      { label: "Multi-Villa Discount", price: "15-25% off", note: "2+ managed villas" },
    ],
  },
  {
    slug: "office-cleaning",
    name: "Office Cleaning Services",
    category: "Commercial",
    current: "AED 50/hour",
    original: "AED 75/hour",
    bestFor: "Workstations, floors, glass, restrooms, pantry, and meeting rooms",
    scope: "Small AED 100-150, medium AED 150-200, large AED 200-250",
    rows: [
      { label: "Office Cleaning", price: "AED 50/hour", original: "AED 75/hour" },
      { label: "Small Office", price: "AED 100-150", original: "AED 150-225", note: "50-100 sqm" },
      { label: "Medium Office", price: "AED 150-200", original: "AED 225-300", note: "100-200 sqm" },
      { label: "Large Office", price: "AED 200-250", original: "AED 300-375", note: "200-300 sqm" },
    ],
    discounts: [
      { label: "Daily Contract", price: "AED 37.50/hour", note: "25% off" },
      { label: "Weekly Cleaning", price: "AED 40/hour", note: "20% off" },
      { label: "Bi-Weekly Cleaning", price: "AED 42.50/hour", note: "15% off" },
      { label: "Monthly Flat Rate", price: "AED 45/hour", note: "10% off" },
      { label: "Rush Service", price: "AED 60/hour", note: "20% premium" },
    ],
  },
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning Services",
    category: "Specialty",
    current: "AED 100/visit",
    original: "AED 150/visit",
    bestFor: "Steam extraction, dry cleaning, stains, odors, and embedded sand",
    scope: "Small room AED 100-150, entire home AED 300-400",
    rows: [
      { label: "Carpet Cleaning", price: "AED 100/visit", original: "AED 150/visit" },
      { label: "Small Room", price: "AED 100-150", original: "AED 150-225", note: "20-50 sqm" },
      { label: "Medium Room", price: "AED 150-200", original: "AED 225-300", note: "50-100 sqm" },
      { label: "Large Room", price: "AED 200-250", original: "AED 300-375", note: "100-150 sqm" },
      { label: "Entire Home", price: "AED 300-400", original: "AED 450-600", note: "150-300 sqm" },
    ],
    discounts: [
      { label: "Quarterly Cleaning", price: "AED 88/visit", note: "12% off" },
      { label: "Bi-Annual Deep Clean", price: "AED 85/visit", note: "15% off" },
      { label: "Bundle with Villa", price: "AED 88/visit", note: "12% off" },
      { label: "Annual Prepay", price: "AED 320/year", note: "4 cleanings, 20% off" },
      { label: "Pet Owner Program", price: "AED 90/visit", note: "10% off with odor treatment" },
    ],
    addOns: [{ label: "Protective Treatment", price: "+AED 150-200", note: "Lasts 12-24 months" }],
  },
  {
    slug: "sofa-cleaning",
    name: "Sofa Cleaning Services",
    category: "Specialty",
    current: "AED 80/seat",
    original: "AED 120/seat",
    bestFor: "Deep shampoo, steam cleaning, stains, odors, and upholstery refresh",
    scope: "3-seater AED 240-320, sectional AED 400-800+",
    rows: [
      { label: "Single Seater", price: "AED 80-160", original: "AED 120-240" },
      { label: "Two-Seater", price: "AED 160-240", original: "AED 240-360" },
      { label: "Three-Seater", price: "AED 240-320", original: "AED 360-480" },
      { label: "Four-Seater", price: "AED 320-400", original: "AED 480-600" },
      { label: "Sectional", price: "AED 160-240 per 2 seats", original: "AED 240-360" },
    ],
    discounts: [
      { label: "Semi-Annual", price: "AED 72/seat", note: "10% off" },
      { label: "Quarterly", price: "AED 70.40/seat", note: "12% off" },
      { label: "Monthly Heavy Use/Pets", price: "AED 68/seat", note: "15% off" },
      { label: "Bundle with Villa + Carpet", price: "AED 68/seat", note: "15% off" },
      { label: "Annual Prepay", price: "AED 768/year", note: "4 quarterly cleanings for 3 seats" },
      { label: "Loyalty", price: "10% off", note: "After 4+ cleanings" },
    ],
    addOns: [
      { label: "Fabric Guard", price: "+AED 100-200", note: "12-24 month protection" },
      { label: "Pet Odor Treatment", price: "+AED 50-100", note: "Enzymatic odor elimination" },
    ],
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning Services",
    category: "Specialty",
    current: "AED 30/hour",
    original: "AED 45/hour",
    bestFor: "Indoor/outdoor windows, frames, tracks, villas, apartments, and offices",
    scope: "Small apartment AED 60-90, large villa AED 120-150",
    rows: [
      { label: "Window Cleaning", price: "AED 30/hour", original: "AED 45/hour" },
      { label: "Small Apartment", price: "AED 60-90", original: "AED 90-135" },
      { label: "Medium Villa", price: "AED 90-120", original: "AED 135-180" },
      { label: "Large Villa", price: "AED 120-150", original: "AED 180-225" },
    ],
    discounts: [
      { label: "Quarterly Service", price: "AED 25.50/hour", note: "15% off" },
      { label: "Bi-Annual Deep Clean", price: "AED 27/hour", note: "10% off" },
      { label: "Bundle with Villa", price: "AED 26.40/hour", note: "12% off" },
      { label: "Annual Prepay", price: "AED 255/year", note: "4 cleanings, 20% off" },
    ],
  },
  {
    slug: "pest-control",
    name: "Pest Control Services",
    category: "Specialty",
    current: "AED 80/visit",
    original: "AED 120/visit",
    bestFor: "Cockroaches, bed bugs, ants, and prevention treatments",
    scope: "Cockroach AED 80, bed bug AED 80, full home AED 100-150",
    rows: [
      { label: "Pest Control", price: "AED 80/visit", original: "AED 120/visit" },
      { label: "Cockroach Treatment", price: "AED 80", original: "AED 120" },
      { label: "Bed Bug Treatment", price: "AED 80", original: "AED 120" },
      { label: "Ant Control", price: "AED 80", original: "AED 120" },
      { label: "Full Home Treatment", price: "AED 100-150", original: "AED 150-225" },
    ],
    discounts: [
      { label: "Monthly Prevention", price: "AED 64/visit", note: "20% off" },
      { label: "Quarterly Treatment", price: "AED 68/visit", note: "15% off" },
      { label: "Bundle with Villa", price: "AED 70.40/visit", note: "12% off" },
      { label: "Emergency Same-Day", price: "AED 100/visit", note: "25% premium" },
      { label: "Annual Prevention", price: "AED 720/year", note: "25% off" },
    ],
  },
  {
    slug: "move-in-out-cleaning",
    name: "Move-In/Move-Out Cleaning",
    category: "Residential",
    current: "AED 30/hour",
    original: "AED 45/hour",
    bestFor: "Property handover, move-in freshness, move-out deposit readiness",
    scope: "1BR AED 180-240, 3BR AED 300-360, 4BR+ AED 360-450",
    rows: [
      { label: "1BR Apartment", price: "AED 180-240", original: "AED 270-360", note: "6-8 hours" },
      { label: "2BR Apartment", price: "AED 240-300", original: "AED 360-450", note: "8-10 hours" },
      { label: "3BR Villa", price: "AED 300-360", original: "AED 450-540", note: "10-12 hours" },
      { label: "4BR+ Villa", price: "AED 360-450", original: "AED 540-675", note: "12-15 hours" },
    ],
    discounts: [
      { label: "Fixed Pricing", price: "No traditional discount", note: "Already competitive block pricing" },
      { label: "Post-Construction", price: "30-50% premium", note: "Extra dust and debris" },
      { label: "Bundle with Carpet/Sofa", price: "12% off add-ons", note: "Same-day convenience" },
      { label: "Express Service", price: "20% premium", note: "Same-day or next-day" },
    ],
  },
  {
    slug: "restaurant-cleaning",
    name: "Restaurant Cleaning Services",
    category: "Commercial",
    current: "AED 50/hour",
    original: "AED 75/hour",
    bestFor: "Kitchen hygiene, dining areas, floors, washrooms, and grease attention",
    scope: "Small AED 100-150, medium AED 150-200, large AED 200-300",
    rows: [
      { label: "Restaurant Cleaning", price: "AED 50/hour", original: "AED 75/hour" },
      { label: "Small Restaurant", price: "AED 100-150", original: "AED 150-225" },
      { label: "Medium Restaurant", price: "AED 150-200", original: "AED 225-300" },
      { label: "Large Restaurant", price: "AED 200-300", original: "AED 300-450" },
    ],
    discounts: [
      { label: "Daily Cleaning", price: "AED 37.50/hour", note: "25% off" },
      { label: "Weekly Deep Clean", price: "AED 40/hour", note: "20% off" },
      { label: "Bi-Weekly Service", price: "AED 42.50/hour", note: "15% off" },
      { label: "Annual Contract", price: "25% off", note: "Daily service prepay" },
    ],
    addOns: [
      { label: "Kitchen Grease Treatment", price: "+AED 50-100", note: "Specialized degreasing" },
      { label: "Hygiene Certification", price: "+AED 200-500", note: "Professional sanitation certification" },
    ],
  },
  {
    slug: "apartment-cleaning",
    name: "Apartment Cleaning Services",
    category: "Residential",
    current: "AED 50/hour",
    original: "AED 75/hour",
    bestFor: "Studios, 1BR, 2BR, and larger apartments with hourly or flat plans",
    scope: "Studio AED 100-150, 1BR AED 150-200, 2BR AED 200-250",
    rows: [
      { label: "Studio", price: "AED 50/hour", original: "AED 75/hour" },
      { label: "1BR", price: "AED 50/hour", original: "AED 75/hour" },
      { label: "2BR", price: "AED 50/hour", original: "AED 75/hour" },
      { label: "Larger Apartments", price: "AED 50/hour", original: "AED 75/hour" },
    ],
    discounts: [
      { label: "Monthly Recurring", price: "AED 40/hour", note: "20% off" },
      { label: "Bi-Weekly Cleaning", price: "AED 42.50/hour", note: "15% off" },
      { label: "Weekly Cleaning", price: "AED 41/hour", note: "18% off" },
      { label: "Annual Prepay", price: "AED 32/hour effective", note: "25% off" },
      { label: "Bundle with Carpet/Sofa", price: "12% off", note: "Same-day bundle" },
    ],
  },
  {
    slug: "showroom-cleaning",
    name: "Showroom Cleaning Services",
    category: "Commercial",
    current: "AED 50/hour",
    original: "AED 75/hour",
    bestFor: "Floors, glass, displays, product areas, and presentation cleaning",
    scope: "Small AED 100-150, medium AED 150-200, large AED 200-300",
    rows: [
      { label: "Showroom Cleaning", price: "AED 50/hour", original: "AED 75/hour" },
      { label: "Small Showroom", price: "AED 100-150", original: "AED 150-225" },
      { label: "Medium Showroom", price: "AED 150-200", original: "AED 225-300" },
      { label: "Large Showroom", price: "AED 200-300", original: "AED 300-450" },
    ],
    discounts: [
      { label: "Daily Cleaning", price: "AED 37.50/hour", note: "25% off" },
      { label: "Weekly Deep Clean", price: "AED 40/hour", note: "20% off" },
      { label: "Bi-Weekly Service", price: "AED 42.50/hour", note: "15% off" },
      { label: "Annual Contract", price: "25% off", note: "250 working days prepaid" },
    ],
    addOns: [{ label: "Professional Polish & Shine", price: "+AED 50-100", note: "Premium finishing" }],
  },
];

export const pricingPackages = [
  { name: "Complete Home Care", price: "AED 595/month average", savings: "AED 1,420/year", details: ["Monthly villa deep cleaning", "Quarterly carpet cleaning", "Quarterly sofa cleaning"] },
  { name: "Quarterly Complete Refresh", price: "AED 918/quarter", savings: "AED 432/year", details: ["Deep villa cleaning", "Carpet cleaning", "3-seater sofa cleaning", "Window cleaning"] },
  { name: "Pet Owner Premium", price: "AED 456/month", savings: "AED 1,368/year", details: ["Carpet cleaning with enzymatic treatment", "Sofa odor treatment", "Deep cleaning of pet areas"] },
  { name: "Office Professional", price: "AED 3,050/month", savings: "AED 7,560/year", details: ["Daily office cleaning", "Weekly deep clean included", "Monthly pest control discounted"] },
];

export const discountSummary = [
  ["Monthly Contracts", "15-20%"],
  ["Quarterly Bundles", "10-15%"],
  ["Semi-Annual", "12-15%"],
  ["Annual Prepay", "20-25%"],
  ["Referral Program", "5-10%"],
  ["Multi-Property", "15-25%"],
  ["Loyalty after 4+ visits", "10%"],
  ["Multiple services same visit", "10-15%"],
];
