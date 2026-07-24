import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Building03Icon, CheckmarkCircle02Icon, Factory01Icon, Location01Icon, TimeQuarter02Icon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { site } from "@/lib/content";

const pageUrl = `${site.url}/services/deep-cleaning/mussafah-abu-dhabi`;

export const metadata: Metadata = {
  title: "Deep Cleaning Services in Mussafah Abu Dhabi",
  description: "Professional deep cleaning services in Mussafah, Abu Dhabi for warehouses, offices, worker accommodations, industrial facilities, and commercial spaces.",
  alternates: { canonical: "/services/deep-cleaning/mussafah-abu-dhabi" },
  openGraph: {
    title: "Deep Cleaning Services in Mussafah Abu Dhabi",
    description: "Industrial, commercial, warehouse, office, and accommodation cleaning in Mussafah with flexible scheduling and WhatsApp quotes.",
    url: "/services/deep-cleaning/mussafah-abu-dhabi",
    type: "website",
    images: [{ url: "/images/services/deep-cleaning.webp", alt: "Deep cleaning services in Mussafah Abu Dhabi" }],
  },
};

const coverage = [
  { title: "Industrial facilities", text: "Warehouse floors, shelving areas, machinery surroundings, corners, high-dust zones, and operational support areas.", icon: Factory01Icon },
  { title: "Commercial offices", text: "Workstations, meeting rooms, bathrooms, windows, pantry areas, high-touch surfaces, and industrial-zone office dust.", icon: Building03Icon },
  { title: "Worker accommodations", text: "Common areas, corridors, canteens, prayer rooms, washrooms, outdoor entries, and high-traffic shared spaces.", icon: Location01Icon },
];

const packages = [
  { title: "Weekly deep cleaning", cost: "AED 400-600/week typical", text: "Best for facilities that need consistent dust control, high-touch sanitization, and operational cleanliness." },
  { title: "Bi-weekly deep cleaning", cost: "AED 800-900/month typical", text: "Best for mid-size facilities that need a deeper scheduled reset without weekly cleaning." },
  { title: "Custom maintenance plan", cost: "Quoted by scope", text: "Best for large sites, multiple buildings, night cleaning, phased cleaning, or 24/7 operations." },
  { title: "Emergency cleanup", cost: "AED 100-150/hour guide", text: "Best for spillages, post-incident cleaning, pest issues, post-renovation, or urgent facility resets." },
];

const checklist = [
  "Warehouse floors and shelving areas are free from visible industrial dust.",
  "Office desks, floors, doors, handles, and bathrooms are cleaned and sanitized.",
  "Canteens, break rooms, and high-touch shared spaces are disinfected.",
  "Outdoor entrances, yards, walkways, and parking-facing areas are swept where included.",
  "Waste, drain, and food-adjacent areas are managed for pest prevention.",
  "Cleaning work is phased around operations so the facility can keep moving.",
];

const faqs = [
  {
    q: "Can you clean Mussafah facilities that operate 24/7?",
    a: "Yes. Cleaning can be planned around shift changes, slow periods, night schedules, weekends, or phased zones so the facility does not need a full shutdown.",
  },
  {
    q: "Do you handle industrial dust, oil, or grease residue?",
    a: "Yes, scope permitting. Industrial areas may need stronger degreasing, professional equipment, and careful non-destructive cleaning around machinery or equipment zones.",
  },
  {
    q: "Can you provide cleaning documentation?",
    a: "If needed, the team can support checklists, dated service records, and photo notes for facility managers or internal quality tracking.",
  },
  {
    q: "How fast can you respond in Mussafah?",
    a: "Availability depends on schedule and team location, but WhatsApp is the fastest way to share facility type, size, urgency, and photos for a quick quote.",
  },
];

export default function MussafahDeepCleaningPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Deep Cleaning Services in Mussafah Abu Dhabi",
        description: "Professional deep cleaning for Mussafah industrial, commercial, warehouse, office, and worker accommodation facilities.",
        serviceType: "Industrial and commercial deep cleaning",
        url: pageUrl,
        provider: {
          "@type": "LocalBusiness",
          name: site.name,
          telephone: site.phone,
          email: site.email,
          address: site.location,
          url: site.url,
        },
        areaServed: ["Mussafah", "Abu Dhabi"],
        offers: {
          "@type": "Offer",
          priceCurrency: "AED",
          price: "80",
          description: "Mussafah industrial and commercial cleaning guide rates start from AED 80-150/hour depending on scope.",
          availability: "https://schema.org/InStock",
          url: pageUrl,
        },
      }} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Deep Cleaning", url: "/services/deep-cleaning" },
        { name: "Mussafah Abu Dhabi", url: "/services/deep-cleaning/mussafah-abu-dhabi" },
      ])} />

      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <p className="eyebrow-lime">Mussafah cleaning</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.65rem] lg:text-[3rem]">Deep Cleaning Services in Mussafah, Abu Dhabi</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">Professional cleaning for industrial facilities, warehouses, commercial offices, worker accommodations, and high-traffic Mussafah properties.</p>
            <div className="mt-6 max-w-xl">
              <CtaButtons service="deep cleaning in Mussafah" quoteLabel="Get Mussafah quote" />
            </div>
          </div>
          <aside className="rounded-2xl bg-white/90 p-5 ring-1 ring-emerald-950/10">
            <div className="grid gap-4">
              {[
                ["Guide rate", "AED 80-150/hour"],
                ["Best for", "Industrial and commercial sites"],
                ["Scheduling", "Weekly, bi-weekly, custom"],
              ].map(([label, value]) => (
                <div className="rounded-xl bg-[#f8fff3] p-4 ring-1 ring-emerald-950/10" key={label}>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{label}</p>
                  <p className="mt-2 text-lg font-medium text-emerald-950">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <main className="min-w-0 space-y-10">
            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Industrial challenge</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Why Mussafah needs specialized cleaning</h2>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>Mussafah is Abu Dhabi&apos;s industrial and commercial hub. Warehouses, factories, workshops, logistics centers, offices, worker accommodations, and storage sites face heavier dust and residue than normal residential areas.</p>
                <p>Standard home cleaning is often not enough for industrial dust, machinery-area residue, high-touch shared spaces, canteens, washrooms, and large operational floors. Professional deep cleaning helps maintain hygiene, safety, worker comfort, and a better client-facing facility.</p>
              </div>
            </section>

            <section className="rounded-3xl bg-[#f8fff3] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Coverage</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Deep cleaning services we provide in Mussafah</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {coverage.map((item) => (
                  <article className="rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10" key={item.title}>
                    <span className="grid size-11 place-items-center rounded-xl bg-lime-300 text-emerald-950">
                      <HugeiconsIcon icon={item.icon} className="icon" size={22} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-medium text-emerald-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Cost structure</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Mussafah industrial cleaning packages</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {packages.map((item) => (
                  <article className="rounded-2xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10" key={item.title}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-medium text-emerald-950">{item.title}</h3>
                      <span className="rounded-lg bg-lime-300 px-3 py-1 text-xs font-medium text-emerald-950">{item.cost}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
              <Link className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/pricing">View pricing</Link>
            </section>

            <section className="rounded-3xl bg-[#f8fff3] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Quality checklist</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Facility cleaning checklist</h2>
              <div className="mt-5 grid gap-3">
                {checklist.map((item) => (
                  <div className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl bg-white p-4 ring-1 ring-emerald-950/10" key={item}>
                    <span className="grid size-8 place-items-center rounded-lg bg-lime-300 text-emerald-950">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Mussafah industrial cleaning questions</h2>
              <div className="mt-5 grid gap-4">
                {faqs.map((item) => (
                  <article className="rounded-2xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10" key={item.q}>
                    <h3 className="text-base font-medium text-emerald-950">{item.q}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.a}</p>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-[#f8fff3] p-5 ring-1 ring-emerald-950/10">
              <div className="flex items-center gap-2 text-emerald-950">
                <HugeiconsIcon icon={TimeQuarter02Icon} className="icon" size={19} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                <p className="font-medium">Fast quote</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">Send facility type, size, photos, preferred timing, and operational constraints on WhatsApp.</p>
              <div className="mt-4">
                <CtaButtons service="Mussafah facility deep cleaning" quoteLabel="WhatsApp facility details" callVariant="green" />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <p className="font-medium text-emerald-950">Related services</p>
              <div className="mt-3 grid gap-2 text-sm">
                {[
                  ["Deep Cleaning", "/services/deep-cleaning"],
                  ["Office Cleaning", "/services/office-cleaning"],
                  ["Restaurant Cleaning", "/services/restaurant-cleaning"],
                  ["Pest Control", "/services/pest-control"],
                ].map(([label, href]) => (
                  <Link className="rounded-lg bg-[#f8fff3] px-3 py-2 font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={href} key={href}>{label}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
