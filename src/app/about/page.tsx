import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { site } from "@/lib/content";

export const metadata = {
  title: "About Just Shine Cleaning Services Abu Dhabi",
  description: "Just Shine Cleaning Services started in February 2024 in Abu Dhabi. Clear prices, trained teams, WhatsApp booking, and Google-reviewed cleaning for homes and businesses.",
  alternates: { canonical: "/about" },
};

const milestones = [
  [`${site.foundingMonth} ${site.foundingYear}`, "Started serving Abu Dhabi homes from Al Jazeera Towers, Al Danah, with responsive Call and WhatsApp booking."],
  ["Residential growth", "Expanded apartment, home, and villa cleaning across Abu Dhabi communities."],
  ["Commercial + specialty", "Added office, restaurant, showroom, sofa, carpet, window, move-in/out, and in-house pest control."],
  ["Today", `A practical team of about ${site.teamSize} people focused on clear quotes, trained cleaners, and repeat customer care.`],
];

const values = ["Professionalism", "Integrity", "Reliability", "Eco-consciousness", "Customer-first service", "Clear pricing"];
const stats = [
  site.sinceLabel,
  `${site.rating.value} ${site.rating.source} rating`,
  `${site.rating.count} Google reviews`,
  `Team of ~${site.teamSize}`,
  "All Abu Dhabi areas",
  "Min 2-hour booking",
];
const areas = ["Al Danah", "Al Reem Island", "Khalifa City", "Yas Island", "Saadiyat Island", "Al Raha Beach", "Corniche", "Al Bateen", "Mussafah", "Al Reef", "MBZ City", "Downtown Abu Dhabi"];

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: `${site.tagline} ${site.sinceLabel}.`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}${site.logo}`,
    foundingDate: `${site.foundingYear}-02`,
    priceRange: site.priceRange,
    numberOfEmployees: site.teamSize,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.4917066,
      longitude: 54.3650786,
    },
    sameAs: [site.facebook, site.instagram, site.googleMapsUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(site.rating.value),
      reviewCount: String(site.rating.count),
      bestRating: String(site.rating.best),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="section hero-gradient">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_.7fr] lg:items-center">
          <div>
            <p className="eyebrow-lime">About Just Shine Cleaning Services</p>
            <h1 className="mt-4 max-w-3xl text-[2rem] font-medium leading-tight text-emerald-950 sm:text-4xl">Abu Dhabi cleaning with clear prices and fast booking.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
              Just Shine Cleaning Services started in {site.foundingMonth} {site.foundingYear} and operates from {site.location}.
              We clean homes, villas, offices, and specialty spaces across Abu Dhabi with a team of about {site.teamSize} people.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-700">{site.tagline}</p>
            <div className="mt-6 max-w-xl"><CtaButtons service="home" /></div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link className="rounded-lg bg-white/90 px-4 py-2 font-medium text-emerald-950 ring-1 ring-emerald-950/10" href="/testimonials">Read 5-star Google reviews</Link>
              <a className="rounded-lg bg-lime-300 px-4 py-2 font-medium text-emerald-950" href={site.googleMapsUrl} target="_blank" rel="noreferrer">Google Business Profile</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={stat} className="group rounded-xl border border-emerald-950/10 bg-white/75 p-4 transition duration-300 hover:bg-white">
                <span className="text-xs font-medium text-emerald-700">0{index + 1}</span>
                <p className="mt-2 text-base font-medium leading-snug text-emerald-950 sm:text-lg">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1fr]">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-2xl font-medium text-emerald-950">Built for busy Abu Dhabi homes and workplaces.</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              We keep booking simple: Call or WhatsApp, share the job details, get a clear starting quote, and book a trained team.
              Home cleaning is AED {site.priceWithoutMaterials}/hour without materials or AED {site.priceWithMaterials}/hour with materials.
              Villa and deep cleaning start from AED {site.priceWithMaterials}/hour. Minimum booking is {site.minBookingHours} hours.
            </p>
          </div>
          <div className="grid gap-3">
            {milestones.map(([year, text]) => (
              <div key={year} className="rounded-lg border border-emerald-950/10 bg-[#f7fff0] p-4 sm:flex sm:gap-5">
                <span className="min-w-[8rem] text-lg font-medium text-emerald-950">{year}</span>
                <p className="mt-2 text-sm leading-6 text-slate-700 sm:mt-0">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-lime-50">
        <div className="container">
          <p className="eyebrow">Mission and values</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-medium text-emerald-950">Clean spaces, clear standards.</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">Our mission is reliable, eco-conscious cleaning that improves comfort for Abu Dhabi residents and businesses — without hidden charges.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value} className="rounded-lg border border-emerald-950/10 bg-white p-5">
                <h3 className="font-medium text-emerald-950">{value}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">Clear communication, careful service, and professional standards on every booking.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-emerald-950/10 bg-[#f7fff0] p-6">
            <h2 className="text-2xl font-medium text-emerald-950">Serving all of Abu Dhabi</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">Based at {site.location}. We serve all Abu Dhabi areas at the same starting rates — no extra city travel fee.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {areas.map((area) => <span key={area} className="rounded-full bg-white px-3 py-2 text-sm text-emerald-950 ring-1 ring-emerald-950/10">{area}</span>)}
            </div>
          </div>
          <div className="rounded-lg border border-emerald-950/10 bg-[#f7fff0] p-6">
            <h2 className="text-2xl font-medium text-emerald-950">Why customers book us</h2>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
              <p><strong className="text-emerald-950">Fast booking:</strong> WhatsApp or call for a quick quote — photos help, but are not required.</p>
              <p><strong className="text-emerald-950">Clear pricing:</strong> AED {site.priceWithoutMaterials} without materials / AED {site.priceWithMaterials} with materials for hourly home cleaning.</p>
              <p><strong className="text-emerald-950">Flexible timing:</strong> Daily {site.openingHoursLabel}. Same-day and weekend slots when available, no surcharge.</p>
              <p><strong className="text-emerald-950">Full cleaning range:</strong> Homes, villas, offices, sofa, carpet, windows, move-in/out, and in-house pest control.</p>
              <p><strong className="text-emerald-950">Satisfaction:</strong> If something was missed in scope, we arrange re-clean support for affected areas.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
