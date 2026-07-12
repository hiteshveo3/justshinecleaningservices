import { CtaButtons } from "@/components/cta-buttons";
import { site } from "@/lib/content";

export const metadata = {
  title: "About Just Shine Cleaning Services Abu Dhabi",
  description: "Discover Just Shine Cleaning Services, a trusted Abu Dhabi cleaning company for homes, villas, offices, sofas, carpets, windows, and more.",
};

const milestones = [
  ["Started locally", "Built around responsive communication, careful cleaning, and repeat customer trust."],
  ["Residential care", "Expanded cleaning support for apartments, homes, and villas across Abu Dhabi."],
  ["Commercial care", "Added office, restaurant, and showroom cleaning for business spaces."],
  ["Specialty cleaning", "Grew service coverage for sofa, carpet, window, move-in/out, and pest control needs."],
  ["Digital booking", "Improved phone and WhatsApp quote paths for faster customer response."],
  ["Today", "Focused on a cleaner mobile-first website, clearer pricing, and easier booking."],
];

const values = ["Professionalism", "Integrity", "Reliability", "Eco-consciousness", "Customer-first service", "Continuous improvement"];
const stats = ["Abu Dhabi based", "Residential services", "Commercial services", "WhatsApp booking", "Eco-friendly options", "Clear quote policy"];
const areas = ["Al Reem Island", "Khalifa City", "Yas Island", "Saadiyat Island", "Al Raha Beach", "Corniche", "Al Bateen", "Al Khalidiyah", "Mussafah", "Tourist Club Area", "Mohammed Bin Zayed", "Electra Street"];

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: "Professional cleaning services in Abu Dhabi",
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Jazeera Towers, 613 Hamdan Bin Mohammed Street",
      addressLocality: "Abu Dhabi",
      addressRegion: "Abu Dhabi",
      addressCountry: "AE",
    },
    sameAs: [site.facebook, site.instagram],
    priceRange: "AED 30-150 per hour",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="section hero-gradient">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_.7fr] lg:items-center">
          <div>
            <p className="eyebrow bg-white/90 text-emerald-900 ring-1 ring-emerald-950/10">About Just Shine Cleaning Services</p>
            <h1 className="mt-4 max-w-3xl text-[2rem] font-medium leading-tight text-emerald-950 sm:text-4xl">Reliable cleaning for Abu Dhabi homes and businesses.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">We&apos;re more than just a cleaning company. We&apos;re your trusted partner for creating spotless, healthy, and welcoming spaces across Abu Dhabi.</p>
            <div className="mt-6 max-w-xl"><CtaButtons service="home" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={stat} className="group rounded-xl border border-emerald-950/10 bg-white/75 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_30px_rgba(16,35,27,.08)]">
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
            <h2 className="mt-3 text-2xl font-medium text-emerald-950">A practical cleaning team for Abu Dhabi spaces.</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">Just Shine Cleaning Services was founded on a simple belief: everyone deserves a clean, healthy home and workspace. What started as a small team dedicated to quality cleaning has grown into a trusted professional cleaning service for Abu Dhabi homes and businesses.</p>
          </div>
          <div className="grid gap-3">
            {milestones.map(([year, text]) => (
              <div key={year} className="rounded-lg border border-emerald-950/10 bg-[#f7fff0] p-4 sm:flex sm:gap-5">
                <span className="text-lg font-medium text-emerald-950">{year}</span>
                <p className="mt-2 text-sm leading-6 text-slate-700 sm:mt-0">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-lime-50">
        <div className="container">
          <p className="eyebrow">Mission and values</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-medium text-emerald-950">Transforming spaces, improving lives.</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">Our mission is to provide reliable, eco-conscious cleaning services that improve the health, comfort, and well-being of Abu Dhabi residents and businesses.</p>
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
            <p className="mt-3 text-sm leading-7 text-slate-700">We proudly provide residential and commercial cleaning across Abu Dhabi, including major communities and business areas.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {areas.map((area) => <span key={area} className="rounded-full bg-white px-3 py-2 text-sm text-emerald-950 ring-1 ring-emerald-950/10">{area}</span>)}
            </div>
          </div>
          <div className="rounded-lg border border-emerald-950/10 bg-[#f7fff0] p-6">
            <h2 className="text-2xl font-medium text-emerald-950">Our guarantees</h2>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-700">
              <p><strong className="text-emerald-950">Satisfaction:</strong> If you&apos;re not happy, we re-clean affected areas.</p>
              <p><strong className="text-emerald-950">Safety:</strong> Trained team members and careful access handling.</p>
              <p><strong className="text-emerald-950">Quality:</strong> Professional equipment, suitable products, and clear scope.</p>
              <p><strong className="text-emerald-950">Transparency:</strong> No hidden charges and clear quote confirmation.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
