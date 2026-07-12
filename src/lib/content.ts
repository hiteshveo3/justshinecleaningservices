export const site = {
  name: "Just Shine Cleaning Services",
  phone: "+971 55 223 2850",
  tel: "+971552232850",
  email: "info@justshinecleaningservices.com",
  socialEmail: "justshinec@gmail.com",
  location: "Al Jazeera Towers, 613 Hamdan Bin Mohammed Street, Abu Dhabi",
  url: "https://justshinecleaningservices.com",
  facebook: "https://web.facebook.com/justshinecleaningservces",
  instagram: "https://www.instagram.com/justshine.uae/",
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  scope: string;
  duration: number;
  images: string[];
  active: boolean;
  highlights: string[];
};

export const services: Service[] = [
  {
    id: "home-cleaning",
    slug: "home-cleaning",
    name: "Home Cleaning Services",
    description: "Professional cleaning for bedrooms, living rooms, bathrooms, and kitchens to keep your home spotless.",
    price: 30,
    priceUnit: "per hour",
    scope: "Bedrooms, living room, bathrooms",
    duration: 2,
    images: ["/service-home.svg"],
    active: true,
    highlights: ["Bedrooms", "Living room", "Bathrooms", "Kitchen cleaning"],
  },
  {
    id: "deep-cleaning",
    slug: "deep-cleaning",
    name: "Deep Cleaning Services",
    description: "Intensive deep cleaning to remove hidden dust, bacteria, grime, and stains from every corner.",
    price: 100,
    priceUnit: "per hour",
    scope: "Complete deep sanitation for rooms",
    duration: 3,
    images: ["/service-deep.svg"],
    active: true,
    highlights: ["Hidden dust removal", "Deep sanitation", "Stain attention", "Room-by-room detail"],
  },
  {
    id: "villa-cleaning",
    slug: "villa-cleaning",
    name: "Villa Cleaning Services",
    description: "Comprehensive cleaning for villas including interiors, outdoor areas, garden spaces, and parking areas.",
    price: 100,
    priceUnit: "per hour",
    scope: "Villa, garden, and parking areas",
    duration: 4,
    images: ["/service-villa.svg"],
    active: true,
    highlights: ["Villa interiors", "Garden areas", "Parking areas", "Balcony and glass care"],
  },
  {
    id: "office-cleaning",
    slug: "office-cleaning",
    name: "Office Cleaning Services",
    description: "Daily or weekly cleaning for workstations, meeting rooms, floors, glass, restrooms, and office common areas.",
    price: 50,
    priceUnit: "per hour",
    scope: "Workstations, floors, glass, restrooms",
    duration: 3,
    images: ["/service-office.svg"],
    active: true,
    highlights: ["Workstations", "Floors and glass", "Restrooms", "Daily or weekly plans"],
  },
  {
    id: "carpet-cleaning",
    slug: "carpet-cleaning",
    name: "Carpet Cleaning Services",
    description: "Expert shampooing and steam cleaning to remove tough stains, odors, dust, and allergens from carpets.",
    price: 100,
    priceUnit: "per visit",
    scope: "Per carpet or square foot",
    duration: 2,
    images: ["/service-carpet.svg"],
    active: true,
    highlights: ["Shampooing", "Steam cleaning", "Stain removal", "Allergen reduction"],
  },
  {
    id: "sofa-cleaning",
    slug: "sofa-cleaning",
    name: "Sofa Cleaning Services",
    description: "Deep shampoo and steam cleaning for sofas and upholstery to restore freshness and remove stains.",
    price: 80,
    priceUnit: "per seat",
    scope: "Deep shampoo and stain removal",
    duration: 2,
    images: ["/service-sofa.svg"],
    active: true,
    highlights: ["Per-seat cleaning", "Deep shampoo", "Steam cleaning", "Stain removal"],
  },
  {
    id: "pest-control",
    slug: "pest-control",
    name: "Pest Control Services",
    description: "Effective treatment for cockroaches, bed bugs, ants, and other common household pests.",
    price: 80,
    priceUnit: "per visit",
    scope: "Cockroaches, bed bugs, and ants",
    duration: 2,
    images: ["/service-pest.svg"],
    active: true,
    highlights: ["Cockroach treatment", "Bed bug treatment", "Ant control", "Home-safe process"],
  },
  {
    id: "window-cleaning",
    slug: "window-cleaning",
    name: "Window Cleaning Services",
    description: "Streak-free glass cleaning for indoor and outdoor windows of homes, villas, apartments, and offices.",
    price: 30,
    priceUnit: "per hour",
    scope: "Indoor and outdoor window cleaning",
    duration: 2,
    images: ["/service-window.svg"],
    active: true,
    highlights: ["Indoor windows", "Outdoor windows", "Frames and tracks", "Streak-free glass"],
  },
  {
    id: "move-in-out-cleaning",
    slug: "move-in-out-cleaning",
    name: "Move In/Out Cleaning Services",
    description: "Thorough cleaning before you move in or after moving out to ensure a fresh, ready-to-use property.",
    price: 30,
    priceUnit: "per hour",
    scope: "Complete property cleaning package",
    duration: 4,
    images: ["/service-move.svg"],
    active: true,
    highlights: ["Move-in cleaning", "Move-out cleaning", "Full property reset", "Fresh start package"],
  },
  {
    id: "restaurant-cleaning",
    slug: "restaurant-cleaning",
    name: "Restaurant Cleaning Services",
    description: "Specialized hygiene cleaning for restaurant kitchens, dining areas, floors, and washrooms.",
    price: 50,
    priceUnit: "per hour",
    scope: "Kitchen, dining area, washrooms",
    duration: 3,
    images: ["/service-restaurant.svg"],
    active: true,
    highlights: ["Kitchen hygiene", "Dining area cleaning", "Washrooms", "Floors and surfaces"],
  },
  {
    id: "apartment-cleaning",
    slug: "apartment-cleaning",
    name: "Apartment Cleaning Services",
    description: "Reliable cleaning for studios, 1BHK, 2BHK, and larger apartments with flexible hourly or flat plans.",
    price: 50,
    priceUnit: "per hour",
    scope: "Flexible hourly or flat plans",
    duration: 2,
    images: ["/service-apartment.svg"],
    active: true,
    highlights: ["Studio cleaning", "1BHK and 2BHK", "Large apartments", "Flexible plans"],
  },
  {
    id: "showroom-cleaning",
    slug: "showroom-cleaning",
    name: "Showroom Cleaning Services",
    description: "Maintain a pristine professional appearance for retail showrooms, display floors, glass, and product areas.",
    price: 50,
    priceUnit: "per hour",
    scope: "Floors, glass, and displays",
    duration: 3,
    images: ["/service-showroom.svg"],
    active: true,
    highlights: ["Display areas", "Floors", "Glass cleaning", "Retail presentation"],
  },
];

export function servicePriceLabel(service: Pick<Service, "price" | "priceUnit">) {
  return `AED ${service.price} ${service.priceUnit}`;
}

export const testimonials = [
  {
    name: "muhammad usman",
    area: "Google review",
    service: "Deep Cleaning",
    quote: "They came out for a deep clean and did an absolutely phenomenal job. They paid attention to details I did not even think of.",
    rating: 5,
  },
  {
    name: "Henessa mae Arnaiz",
    area: "Google review",
    service: "Home Cleaning",
    quote: "Very good in services. They manage the cleanliness and organize things, and they have very good and well-mannered staff.",
    rating: 5,
  },
  {
    name: "Naeem Khan",
    area: "Google review",
    service: "Cleaning Service",
    quote: "Just Shine Cleaning Services provide good services on time. I am satisfied with this company.",
    rating: 5,
  },
  {
    name: "Moha Sabir",
    area: "Google review",
    service: "Deep Cleaning",
    quote: "I found this company perfect for deep cleaning in Abu Dhabi. They did a good job. Appreciate their good work.",
    rating: 5,
  },
  {
    name: "Waed Al Hnaity",
    area: "Google review",
    service: "Customer Care",
    quote: "Very good company, all staff, especially Madam Maika, the manager. The best company to deal with.",
    rating: 5,
  },
  {
    name: "MOHSIN DRIVING INSTRUCTOR",
    area: "Google review",
    service: "Cleaning Service",
    quote: "Excellent work.",
    rating: 5,
  },
  {
    name: "Ellene Saeed",
    area: "Google review",
    service: "Home Cleaning",
    quote: "A recent Google reviewer for Just Shine Cleaning Services in Abu Dhabi.",
    rating: 5,
  },
  {
    name: "haider khan",
    area: "Google review",
    service: "Cleaning Service",
    quote: "A recent Google reviewer for Just Shine Cleaning Services.",
    rating: 5,
  },
  {
    name: "Just Shine Cleaning Services customer",
    area: "Facebook",
    service: "Home Cleaning",
    quote: "A clean home is a happy home. Let Just Shine Cleaning Services make your home sparkle.",
    rating: 5,
  },
];

export const posts = [
  {
    id: "deep-cleaning-services-abu-dhabi-guide-2026",
    slug: "deep-cleaning-services-abu-dhabi-guide-2026",
    title: "Deep Cleaning Services Abu Dhabi: 2026 Guide",
    excerpt: "Everything Abu Dhabi residents need to know about professional deep cleaning, inclusions, costs, schedules, myths, and booking.",
    content: `<p>Your home is your sanctuary. It is where you relax, entertain, and create memories with your family. But maintaining a spotless, healthy living space requires more than regular vacuuming and dusting. It requires professional deep cleaning services.</p>
<p>If you live in Abu Dhabi and wonder whether professional deep cleaning is worth the investment, this guide explains what is included, how often you need it, what it costs, and how to choose the right cleaning company.</p>
<h2>What Is Deep Cleaning?</h2>
<p>Many homeowners confuse regular cleaning with deep cleaning. Regular cleaning handles visible dust and daily mess, while deep cleaning targets hidden areas, buildup, bacteria, and details that are easy to miss.</p>
<table><thead><tr><th>Cleaning Type</th><th>Frequency</th><th>Focus Areas</th><th>Time Required</th><th>Cost</th></tr></thead><tbody><tr><td>Regular Cleaning</td><td>Weekly/Bi-weekly</td><td>Floors, counters, dusting</td><td>2-3 hours</td><td>AED 100-200</td></tr><tr><td>Deep Cleaning</td><td>Monthly/Quarterly</td><td>Hidden areas, baseboards, grout, vents</td><td>6-8 hours</td><td>AED 400-800</td></tr><tr><td>Spring Cleaning</td><td>Annually</td><td>Full home detail</td><td>8+ hours</td><td>AED 1,000-1,500</td></tr></tbody></table>
<p>Deep cleaning addresses behind and under furniture, inside kitchen appliances, grout lines, window frames, HVAC vents, light fixtures, baseboards, cabinets, closets, and corners where dust accumulates.</p>
<h2>Why Deep Cleaning Matters in Abu Dhabi</h2>
<p>Abu Dhabi homes face unique climate challenges. Desert sand enters small gaps, heat and humidity accelerate dust buildup, air conditioning systems recirculate particles, and pet allergens can settle into fabric and corners.</p>
<p>Professional deep cleaning is not only about appearance. In Abu Dhabi, it is part of healthy home maintenance.</p>
<h2>What Is Included in Professional Deep Cleaning?</h2>
<h3>Kitchen Deep Cleaning</h3>
<p>The kitchen is where cleanliness matters most for food safety. A professional deep clean can include refrigerator interiors and exteriors, microwave and oven degreasing, cabinet interiors, countertop sanitization, sink and faucet descaling, appliance surfaces, baseboards, tile grout, light fixtures, and exhaust fan cleaning.</p>
<p>Abu Dhabi hard water can leave mineral deposits on kitchen surfaces. Professional cleaners use suitable products to remove buildup without damaging finishes.</p>
<h3>Bathroom Deep Cleaning</h3>
<p>Bathrooms need special care because moisture encourages bacteria, soap scum, and mildew. A comprehensive service includes tile and grout scrubbing, bathtub and shower cleaning, toilet sanitization, mirror and glass cleaning, ventilation cleaning, under-sink cabinet cleaning, soap scum removal, and corner detailing.</p>
<h3>Living Rooms and Bedrooms</h3>
<p>Deep cleaning focuses on ceiling corners, wall spots, window frames, air vents, light fixtures, baseboards, areas behind and under furniture, and floor edges. These details make the difference between a tidy home and a truly refreshed home.</p>
<h3>Flooring Deep Cleaning</h3>
<table><thead><tr><th>Floor Type</th><th>Deep Cleaning Method</th><th>Frequency</th></tr></thead><tbody><tr><td>Marble/Granite</td><td>Specialized stone cleaner and sealing</td><td>Every 6 months</td></tr><tr><td>Tiles</td><td>Grout cleaning and protection</td><td>Every 3 months</td></tr><tr><td>Carpets</td><td>Hot water extraction or encapsulation</td><td>Every 6 months</td></tr><tr><td>Wood</td><td>Professional polishing and sealing</td><td>Every 12 months</td></tr></tbody></table>
<p>The mix of sand, heat, and dust means Abu Dhabi flooring often needs more frequent detailed care than homes in cooler climates.</p>
<h2>How Often Should You Get Deep Cleaning?</h2>
<table><thead><tr><th>Situation</th><th>Recommended Frequency</th><th>Reason</th></tr></thead><tbody><tr><td>Family with pets</td><td>Every 4-6 weeks</td><td>Pet dander, hair, allergens</td></tr><tr><td>Family with allergies</td><td>Every 4-6 weeks</td><td>Dust builds faster in heat</td></tr><tr><td>Regular household</td><td>Every 8-12 weeks</td><td>Normal dust buildup</td></tr><tr><td>Single person/minimal traffic</td><td>Every 12-16 weeks</td><td>Slower dirt accumulation</td></tr><tr><td>Post-renovation</td><td>Immediately + follow-up</td><td>Construction dust settles over time</td></tr><tr><td>Before guests/events</td><td>As needed</td><td>Special occasions</td></tr></tbody></table>
<p>A simple rule: if regular cleaning takes around 3 hours, deep cleaning every 3 months is usually a smart schedule.</p>
<h2>Benefits of Professional Deep Cleaning</h2>
<h3>Health and Wellness</h3>
<p>Deep cleaning removes dust, pet dander, allergens, bacteria, and hidden buildup. This matters for children, elderly family members, and anyone with allergies or respiratory sensitivity.</p>
<h3>Home Maintenance</h3>
<p>Regular deep cleaning extends the life of furniture, carpets, marble, granite, and tile surfaces. It can also reduce pest attractions by removing hidden debris and food particles.</p>
<h3>Time and Peace of Mind</h3>
<p>Instead of spending a full day scrubbing grout lines and appliance interiors, you can let a trained team handle the work and reclaim that time for family, rest, or business.</p>
<h2>Deep Cleaning vs Sofa Cleaning vs Carpet Cleaning</h2>
<table><thead><tr><th>Service</th><th>Focus</th><th>Frequency</th><th>Included in Deep Clean?</th></tr></thead><tbody><tr><td>Deep Cleaning</td><td>Entire home surfaces</td><td>Every 8-12 weeks</td><td>No, it is separate</td></tr><tr><td>Sofa Cleaning</td><td>Furniture and upholstery</td><td>Every 6 months</td><td>No, separate equipment</td></tr><tr><td>Carpet Cleaning</td><td>Carpets and rugs</td><td>Every 6 months</td><td>No, separate extraction</td></tr><tr><td>Regular Cleaning</td><td>Weekly maintenance</td><td>Weekly</td><td>N/A</td></tr></tbody></table>
<p>Deep cleaning covers detailed surfaces, but upholstery and carpet extraction usually require specialized tools and are booked separately.</p>
<h2>Common Deep Cleaning Myths</h2>
<h3>Myth 1: Deep cleaning is a luxury</h3>
<p>In Abu Dhabi's climate, it is a health and maintenance need. Desert dust and heat accelerate allergen and bacteria buildup.</p>
<h3>Myth 2: DIY deep cleaning is the same</h3>
<p>DIY cleaning can help, but it often misses appliance interiors, vents, grout lines, and hidden buildup. Professional tools and methods are more thorough.</p>
<h3>Myth 3: Deep cleaning damages surfaces</h3>
<p>Professional cleaners use appropriate products for marble, granite, tile, glass, and other surfaces. Harsh DIY chemicals are usually the bigger risk.</p>
<h3>Myth 4: All companies offer the same quality</h3>
<p>Quality depends on training, products, equipment, supervision, and attention to detail. Always check reviews, service scope, and pricing clarity.</p>
<h2>The Professional Deep Cleaning Process</h2>
<p>A strong deep cleaning process usually starts with a pre-cleaning inspection, followed by preparation, kitchen deep cleaning, bathroom deep cleaning, living area detailing, floor care, and a final inspection.</p>
<p>Typical timing can include 15 minutes for inspection, 20 minutes for preparation, around 90 minutes for kitchen detailing, 60 minutes for bathrooms, 90 minutes for living areas, and 20 minutes for final touch-ups. Larger villas or heavily soiled homes need more time.</p>
<h2>Cost of Deep Cleaning Services in Abu Dhabi</h2>
<table><thead><tr><th>Home Size</th><th>Bedrooms</th><th>Time Required</th><th>Cost Range</th></tr></thead><tbody><tr><td>Studio/1BR</td><td>1-2</td><td>3-4 hours</td><td>AED 400-600</td></tr><tr><td>2BR Apartment</td><td>2</td><td>4-5 hours</td><td>AED 600-800</td></tr><tr><td>3BR Villa</td><td>3</td><td>6-7 hours</td><td>AED 800-1,000</td></tr><tr><td>4BR+ Villa</td><td>4+</td><td>7-8+ hours</td><td>AED 1,000-1,500</td></tr></tbody></table>
<p>Final price depends on home condition, square footage, add-ons such as sofa or carpet cleaning, frequency, and special treatments such as grout sealing or stone polishing.</p>
<h2>How to Choose a Deep Cleaning Company</h2>
<table><thead><tr><th>Criteria</th><th>What Matters</th></tr></thead><tbody><tr><td>Certification and insurance</td><td>Licensed, accountable company</td></tr><tr><td>Experience</td><td>Local Abu Dhabi home experience</td></tr><tr><td>Products</td><td>Safe, family-friendly, eco-conscious options</td></tr><tr><td>Reviews</td><td>Detailed customer feedback</td></tr><tr><td>Pricing</td><td>Clear quote, no hidden charges</td></tr><tr><td>Team</td><td>Trained and supervised staff</td></tr></tbody></table>
<p>Avoid vague service descriptions, very low prices with unclear scope, cash-only arrangements, no reviews, and companies unwilling to explain their process.</p>
<h2>Why Choose Just Shine Cleaning Services?</h2>
<p>Just Shine Cleaning Services provides professional deep cleaning for Abu Dhabi villas and apartments with trained teams, flexible scheduling, eco-conscious products, transparent pricing, and add-on services such as sofa, carpet, window, pest control, move in/out, office, restaurant, apartment, and showroom cleaning.</p>
<p>Our goal is simple: a cleaner, healthier, fresher space with practical booking by phone or WhatsApp.</p>
<h2>Frequently Asked Questions</h2>
<h3>How long does deep cleaning take?</h3>
<p>Most homes take 4-8 hours depending on size and condition. Large villas may require a longer visit or larger team.</p>
<h3>Is deep cleaning safe for pets and children?</h3>
<p>Yes, professional teams can use family-safe products. Tell the team about pets, allergies, or sensitive surfaces before the visit.</p>
<h3>What should I do before cleaners arrive?</h3>
<p>Clear floors, secure valuables, move lightweight items, and share priority areas or photos on WhatsApp.</p>
<h3>Can deep cleaning remove all stains?</h3>
<p>Most stains improve, but permanent damage cannot always be reversed. It is best to discuss expectations before starting.</p>
<h3>How often should villas get deep cleaning in Abu Dhabi?</h3>
<p>Every 8-12 weeks works for many villas. Homes with pets, allergies, or high traffic may benefit from monthly deep cleaning.</p>
<h2>Conclusion</h2>
<p>Abu Dhabi's climate makes deep cleaning an important investment in health, comfort, and home maintenance. A deeply cleaned home feels fresher, supports better indoor air quality, and helps protect your property over time.</p>
<p>Ready to experience the Just Shine Cleaning Services difference? Contact Just Shine Cleaning Services for a free quote and consultation. Your spotless, healthy home is one booking away.</p>`,
    author: "Just Shine Cleaning Services Team",
    publishedAt: "2026-07-15",
    featured_image: "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp",
    tags: ["deep cleaning", "abu dhabi", "villa cleaning", "home cleaning", "cleaning guide"],
  },
  {
    id: "abu-dhabi-deep-cleaning-checklist",
    slug: "abu-dhabi-deep-cleaning-checklist",
    title: "Deep Cleaning Checklist for Abu Dhabi Homes",
    excerpt: "A room-by-room guide to preparing your home for a professional deep clean.",
    content: "<p>A deep cleaning checklist helps Abu Dhabi homes stay organized before a professional team arrives. Clear scope, access, and priorities help the cleaning visit move faster and deliver better results.</p><h2>Start with priority rooms</h2><p>Begin with kitchens, bathrooms, bedrooms, balconies, and majlis areas. These zones usually need the most detailed cleaning because they collect grease, scale, dust, and daily-use marks.</p><h2>Prepare access and surfaces</h2><p>Move personal items from counters, floors, and soft furnishings. This helps cleaners focus on sanitizing, degreasing, dusting, and mopping instead of spending time sorting belongings.</p><h2>Confirm extras before arrival</h2><p>Window tracks, sofa cleaning, carpet shampooing, and post-construction residue may require extra tools or time. Share photos on WhatsApp so the team can plan properly.</p>",
    author: "Just Shine Cleaning Services Team",
    publishedAt: "2026-01-12",
    featured_image: "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp",
    tags: ["deep cleaning", "abu dhabi"],
  },
  {
    id: "how-often-clean-sofa",
    slug: "how-often-clean-sofa",
    title: "How Often Should You Clean Your Sofa?",
    excerpt: "Practical timing for families, pets, guests, and humid UAE weather.",
    content: "<p>Sofa cleaning frequency depends on family size, humidity, food habits, pets, and guest traffic. In Abu Dhabi, dust and AC use can make upholstery feel dull faster than expected.</p><h2>General cleaning frequency</h2><p>Most homes benefit from professional sofa cleaning every 6 to 12 months. Light-use seating can wait longer, while family rooms need a shorter cycle.</p><h2>When to clean sooner</h2><p>Book earlier if you notice odor, visible stains, sticky fabric, allergy symptoms, or heavy dust. Homes with children, pets, or frequent visitors often need cleaning every 3 to 6 months.</p><h2>Maintain between services</h2><p>Vacuum cushions weekly, blot spills quickly, and avoid harsh chemicals. If stains spread or fabric changes color, stop DIY cleaning and ask for professional advice.</p>",
    author: "Just Shine Cleaning Services Team",
    publishedAt: "2026-02-08",
    featured_image: "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp",
    tags: ["sofa cleaning", "upholstery"],
  },
];

export type BlogPost = (typeof posts)[number];

export const faqs = [
  {
    q: "What is deep cleaning and how is it different from regular cleaning?",
    a: "Deep cleaning is a comprehensive, thorough cleaning service that goes far beyond surface-level tidiness. While regular cleaning focuses on visible surfaces like floors, countertops, and dusting, deep cleaning addresses hidden areas and neglected spaces that accumulate dirt and allergens over time.\n\nKey Differences:\n- Regular Cleaning: 2-3 hours | Surface cleaning only | Weekly/bi-weekly | AED 100-200\n- Deep Cleaning: 6-8 hours | Comprehensive (hidden areas) | Monthly/quarterly | AED 400-1,500\n\nHidden Areas Covered in Deep Cleaning:\n- Behind and under all furniture\n- Inside kitchen appliances (refrigerator coils, oven interior)\n- Grout lines between tiles\n- Light fixtures and ceiling fans\n- Window frames and sills\n- Baseboards and crown molding\n- Inside cabinets and closets\n- Vents and air filters\n- Corners and crevices where dust accumulates\n\nDeep cleaning is essential because dust, bacteria, and allergens continuously settle in areas regular cleaning cannot reach, contributing to poor air quality and health issues.",
  },
  {
    q: "How often should I get deep cleaning done for my villa in Abu Dhabi?",
    a: "The frequency of deep cleaning depends on your specific household situation, but general guidelines are:\n\nRecommended Schedule:\n- Standard Households: Every 8-12 weeks (quarterly)\n- Homes with Pets: Every 4-6 weeks (monthly)\n- Families with Allergies: Every 4 weeks (monthly)\n- High-Traffic Homes: Every 4-6 weeks (monthly)\n- Low-Traffic Homes: Every 12-16 weeks\n\nWhy Abu Dhabi is Special: Abu Dhabi's desert climate creates unique cleaning challenges:\n1. Sand Infiltration: Desert sand constantly finds its way inside through windows and doors, settling on all surfaces\n2. Heat Acceleration: High temperatures speed up dust accumulation and dust mite proliferation\n3. Humidity Issues: AC systems recirculate dust, requiring more frequent vent cleaning\n4. Pet Issues: If you have pets, allergens and dander accumulate faster in heat\n\nThe 12-Week Rule: If regular cleaning takes 3 hours, you likely need deep cleaning every 12 weeks. This timeframe prevents excessive hidden dirt accumulation.",
  },
  {
    q: "What areas are included in a deep cleaning service?",
    a: "Professional deep cleaning covers every area of your home systematically:\n\nKitchen Deep Cleaning:\n- Interior and exterior of refrigerator (including coils and vents)\n- Oven interior and exterior (heavy degreasing)\n- Stovetop, burners, and surrounding areas\n- Microwave interior (steam cleaning)\n- Cabinet interiors and organization\n- Countertop deep sanitization\n- Sink and faucet descaling\n- Tile grout cleaning and sealing\n- Baseboards and kickboards\n- Light fixtures\n\nBathroom Deep Cleaning:\n- Tile and grout deep scrubbing (professional pressure)\n- Bathtub and shower enclosure cleaning\n- Toilet bowl and exterior sanitization\n- Soap scum and mineral deposit removal\n- Mirror and glass cleaning (streak-free)\n- Exhaust fan and vent cleaning\n- Sink and faucet descaling\n- Baseboard thorough scrubbing\n- Mold and mildew prevention treatment\n\nLiving Areas & Bedrooms:\n- Ceiling and wall spot cleaning\n- Light fixture deep cleaning\n- Air vent cleaning and filter replacement\n- Window frame and sill cleaning\n- Baseboard thorough scrubbing\n- Behind and under furniture (with moving if necessary)\n- Floor deep cleaning (method varies by type)\n\nFlooring:\n- Hard surface cleaning (marble, granite, tile, wood)\n- Grout and sealing (if applicable)\n- Carpet spot treatment (if included)\n\nImportant Note: Deep cleaning typically does NOT include upholstered furniture (sofas, chairs) or deep carpet extraction, which require separate specialized services.",
  },
  {
    q: "How much does deep cleaning cost in Abu Dhabi?",
    a: "Costs vary based on home size, condition, and add-on services. Current guide pricing is:\n\nBy Home Size:\n- Studio/1BR Apartment: AED 400-600 (3-4 hours)\n- 2BR Apartment: AED 600-800 (4-5 hours)\n- 3BR Villa: AED 800-1,000 (6-7 hours)\n- 4BR+ Villa: AED 1,000-1,500+ (7-8+ hours)\n\nFactors Affecting Price:\n- Heavily soiled home: +20-30%\n- Additional services (sofa, carpet): +AED 200-500 each\n- Grout sealing: +AED 100-300\n- Stone polishing: +AED 150-250\n- Post-renovation cleaning: +AED 300-500\n- Urgent/same-day booking: +10-15%\n\nDiscounts Available:\n- Monthly contracts: 15-20% savings\n- Quarterly contracts: 10-15% savings\n- Bundled services: 10-25% savings\n- Loyalty programs: 5-10% ongoing\n\nCost-Benefit Analysis:\n- Professional deep cleaning saves significant time\n- Regular care may extend furniture and flooring life\n- Better cleaning can reduce dust, odors, and hidden buildup\n- Clear scope helps avoid surprise charges",
  },
  {
    q: "Is deep cleaning safe for pets and children?",
    a: "Yes, professional deep cleaning is completely safe for pets and children when using appropriate products and methods.\n\nSafety Measures:\n1. Product Safety: Reputable companies use non-toxic, eco-friendly solutions\n2. Communication: Always inform the cleaning company about pets, children, and allergies\n3. Precautions: Professional cleaners take care around sensitive areas and secure pets appropriately\n4. Ventilation: Areas are properly ventilated after cleaning to remove any odors\n5. Timing: Some families prefer cleaning when pets/children are temporarily out\n\nPet-Specific Precautions:\n- Use pet-safe disinfectants\n- Avoid harmful chemicals around pet bedding areas\n- Use odor-neutralizing solutions for pet accidents\n- Ensure pets don't contact wet surfaces during cleaning\n\nChild-Safe Practices:\n- Use non-toxic cleaning products\n- Avoid harsh chemical fumes\n- Cover or secure small objects during cleaning\n- Ensure proper ventilation\n- Allow adequate drying time before child contact\n\nWhat to Tell Your Cleaner:\n- Number and type of pets\n- Any pet behavioral concerns\n- Child ages and sensitivities\n- Known allergies or health concerns\n- Preferred cleaning products (if relevant)",
  },
  {
    q: "Can deep cleaning remove all stains from my home?",
    a: "Professional deep cleaning removes most stains very effectively, but some permanent damage cannot be reversed.\n\nStain Removal Success Rates:\n- Fresh spills: 95%+ | Easiest to remove\n- Pet accidents: 85-90% | Enzymatic treatment works well\n- Grout stains: 80-95% | Professional cleaning highly effective\n- Hard water deposits: 90%+ | Specialized descaling solutions work great\n- Set-in discoloration: 50-70% | Older stains harder to remove\n- Deep etching (marble): 0% | Physical damage, irreversible\n- Permanent discoloration: 20-50% | Depends on stain age and type\n\nWhat Professional Cleaners Can Remove:\n- Dust and dirt accumulation\n- Grease and cooking residue\n- Water spots and mineral deposits\n- Pet stains and odors\n- Mold and mildew\n- Soap scum\n\nWhat Cannot Be Removed:\n- Permanent surface damage (etching, scratches)\n- Deep-set color changes\n- Structural damage to materials\n- Bleached or faded areas\n\nBefore Booking Tip: Always discuss specific stains with the cleaning company beforehand. Show photos and describe the stain history. Professional cleaners will provide honest assessment of removal likelihood.",
  },
  {
    q: "What's the best time to schedule deep cleaning?",
    a: "Best scheduling depends on availability, cost, and your needs:\n\nCost-Effective Timing:\n- Off-Peak Months: June-August typically have better availability and discounts (10-15% savings)\n- Weekday Bookings: Monday-Thursday usually 10% cheaper than weekends\n- Early Booking: Advance booking (2-3 weeks) often provides better rates\n- Off-Hours: Early morning or evening bookings may have discounts\n\nEvent-Based Timing:\n- Before Major Events: Book 2-3 weeks in advance for guests or celebrations\n- Post-Construction: Schedule immediately after renovations\n- Seasonal: Spring (March-April) ideal for annual deep cleaning\n- Move-In/Out: Schedule for property handover or occupancy\n\nHealth-Based Timing:\n- Allergy Season: More frequent deep cleaning during high pollen periods\n- Sand Storm Season: Increased frequency during spring dust storms\n- Post-Illness: Sanitizing deep clean after family illness\n\nAvailability: WhatsApp inquiries can be sent anytime, while same-day or next-day service depends on team availability and booking slots.",
  },
  {
    q: "How long does deep cleaning take?",
    a: "Duration depends on home size, condition, and specific needs:\n\nTime by Home Size:\n- Studio/1BR Apartment: 3-4 hours\n- 2BR Apartment: 4-5 hours\n- 3BR Villa: 6-7 hours\n- 4BR+ Villa: 7-8+ hours\n- 5BR+ Large Villa: 8-10+ hours\n\nFactors Affecting Duration:\n- Home condition (heavily soiled = longer)\n- Number of people helping (2-3 cleaners speeds up work)\n- Special requests (add 1-2 hours)\n- Appliance complexity (modern appliances longer)\n- Flooring types (marble, granite require careful treatment)\n- Square footage and layout\n\nTypical Timeline:\n- Inspection & Setup: 15-20 minutes\n- Kitchen Deep Cleaning: 90 minutes\n- Bathroom Deep Cleaning: 60 minutes\n- Living Areas: 90 minutes\n- Flooring: 60-90 minutes\n- Final Inspection: 20 minutes\n- Total: 6-8 hours average\n\nCompletion: Most deep cleans complete within a single day. Professional teams with multiple staff can reduce time 20-30%.",
  },
  {
    q: "Should I move furniture before deep cleaning?",
    a: "You don't need to move furniture, but clear access helps:\n\nProfessional Movers Will:\n- Move lightweight furniture (chairs, side tables)\n- Shift furniture to access baseboards and areas beneath\n- Reposition carefully without damaging floors or walls\n- Return furniture to original positions\n\nWhat You Should Do:\n- Clear floors and surfaces of small items\n- Secure valuables in safe location\n- Brief cleaners on any furniture concerns\n- Move fragile decorative items\n- Ensure clear pathways through home\n\nHeavy Furniture:\n- Inform cleaners beforehand about heavy pieces\n- Professional teams may charge extra for heavy furniture moving (AED 100-300)\n- Ensure floor protection under furniture being moved\n- Some homes have heavy furniture cleaners cannot safely move\n\nPro Tip: Clearing surfaces yourself saves cleaners time and reduces costs. Moving heavy furniture yourself (if comfortable) can save AED 150-200.",
  },
  {
    q: "Do I need to be home during deep cleaning?",
    a: "Not necessary, but there are advantages and disadvantages to both:\n\nAdvantages of Being Home:\n- Can answer questions or clarify concerns\n- Monitor progress and quality in real-time\n- Inspect results immediately\n- Address issues on the spot\n- Confirm satisfaction before cleaners leave\n\nAdvantages of Being Away:\n- Don't need to manage access or logistics\n- Quieter workspace for cleaning team\n- Not home during potentially dusty phases\n- Team can work faster without distractions\n\nTypical Procedures:\n1. First-Time Clients: Recommended to be home to review and approve\n2. Repeat Clients: Many provide access codes for keyless entry\n3. Pet Owners: Home beneficial to manage pet safety\n4. Detailed Instructions: Leave clear notes for special requests\n\nAccess Methods:\n- You're present (traditional)\n- Key provided to cleaners\n- Building security allows access\n- Keypad code access\n- Smart lock access\n- Trusted neighbor holds key\n\nSecurity Tip: Always verify contractor credentials before providing access. Get references from previous clients.",
  },
  {
    q: "Do you offer same-day cleaning in Abu Dhabi?",
    a: "Same-day slots are available when teams are nearby. WhatsApp is the fastest way to check availability.",
  },
  {
    q: "Are supplies and equipment included?",
    a: "Yes, standard supplies and equipment are included. Special surfaces or delicate fabrics are checked before cleaning.",
  },
  {
    q: "Can I book by WhatsApp?",
    a: "Yes. Every main service page includes a WhatsApp button with the service name pre-filled.",
  },
  {
    q: "Do you clean offices after hours?",
    a: "Yes, office cleaning can be scheduled before opening, after hours, or on weekends.",
  },
];
