import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { CleaningBucketIcon, Location01Icon, MapsLocation01Icon, SparklesIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { comparisonPages } from "@/lib/comparisons";
import { services, site } from "@/lib/content";
import { cleaningGuides } from "@/lib/guides";
import { localGuidePages, shortServiceName } from "@/lib/local-guide-pages";
import { abuDhabiLocations } from "@/lib/locations";
import { resourcePages } from "@/lib/resources";
import { cleaningSolutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Areas We Serve in Abu Dhabi | Just Shine Cleaning Services",
  description:
    "Explore Just Shine Cleaning Services areas across Abu Dhabi, including Al Reem Island, Downtown, Khalifa City, Yas Island, Saadiyat, Mussafah, Al Danah, Al Reef, and more.",
  alternates: { canonical: "/areas-we-serve" },
  openGraph: {
    title: "Areas We Serve in Abu Dhabi | Just Shine Cleaning Services",
    description: "Find professional cleaning services by Abu Dhabi area with local service pages and WhatsApp booking.",
    url: "/areas-we-serve",
    type: "website",
  },
};

const heroImage = "/images/services/deep-cleaning.webp";
const featuredServiceSlugs = ["home-cleaning", "deep-cleaning", "villa-cleaning", "sofa-cleaning", "carpet-cleaning", "office-cleaning"];
const featuredServices = featuredServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(Boolean) as typeof services;

export default function AreasWeServePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Areas We Serve", url: "/areas-we-serve" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Areas We Serve in Abu Dhabi",
          description: "Abu Dhabi cleaning service area hub for Just Shine Cleaning Services.",
          url: `${site.url}/areas-we-serve`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: abuDhabiLocations.map((location, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${location.name} cleaning services`,
              url: `${site.url}/services/deep-cleaning/${location.slug}`,
            })),
          },
        }}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] p-5 ring-1 ring-emerald-950/10 sm:p-8 lg:grid-cols-[1.04fr_.96fr] lg:p-10">
          <div>
            <p className="eyebrow-lime">Areas we serve</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl lg:text-[2.7rem]">
              Professional cleaning services across Abu Dhabi
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
              Choose your area to see local cleaning pages for homes, villas, apartments, offices, carpets, sofas, windows, pest control, and deep cleaning. Every area page includes local scope, pricing guidance, and WhatsApp booking.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                [`${abuDhabiLocations.length} areas`, "Abu Dhabi coverage"],
                [`${services.length} services`, "Residential and commercial"],
                ["180 local URLs", "Service + area pages"],
              ].map(([title, text]) => (
                <div className="rounded-xl bg-white/82 p-4 ring-1 ring-emerald-950/10" key={title}>
                  <p className="font-medium text-emerald-950">{title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-xl">
              <CtaButtons service="cleaning service in Abu Dhabi" quoteLabel="Ask for your area quote" />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-emerald-950/10">
            <Image
              alt="Just Shine Cleaning Services areas in Abu Dhabi"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={heroImage}
            />
            <div className="absolute bottom-4 left-4 max-w-[21rem] rounded-xl bg-white/92 p-4 ring-1 ring-emerald-950/10 backdrop-blur">
              <p className="font-medium text-emerald-950">Call or WhatsApp your location</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">Share area, property type, photos, and preferred time for a clearer quote.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Abu Dhabi locations</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Choose your area</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                Start with your nearest area, then choose the exact service page. These pages are built for local SEO and for customers who want area-specific details before booking.
              </p>
            </div>
            <Link className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/services">
              View all services
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {abuDhabiLocations.map((location) => (
              <article className="rounded-2xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 transition hover:bg-[#f7ffef]" key={location.slug}>
                <div className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                    <HugeiconsIcon icon={MapsLocation01Icon} className="icon" size={22} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-emerald-950">
                      <Link className="hover:underline" href={`/areas/${location.slug}`}>{location.name}</Link>
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{location.areaType}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-white p-3 ring-1 ring-emerald-950/10">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">Local cleaning focus</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{location.challenge}</p>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <Link className="rounded-lg bg-lime-300 px-3 py-2 text-center text-sm font-medium text-emerald-950" href={`/areas/${location.slug}`}>
                    Area guide
                  </Link>
                  <Link className="rounded-lg bg-emerald-900 px-3 py-2 text-center text-sm font-medium text-white" href={`/services/deep-cleaning/${location.slug}`}>
                    Deep cleaning
                  </Link>
                  <Link className="rounded-lg bg-white px-3 py-2 text-center text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10 sm:col-span-2" href={`/services/home-cleaning/${location.slug}`}>
                    Home cleaning
                  </Link>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {featuredServices.slice(2, 6).map((service) => (
                    <Link className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10 hover:bg-lime-50" href={`/services/${service.slug}/${location.slug}`} key={service.slug}>
                      {service.name.replace(" Services", "")}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfff7] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Popular local service links</p>
          <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Quick links by service</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service, index) => (
              <article className="rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10" key={service.slug}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                    <HugeiconsIcon icon={[CleaningBucketIcon, SparklesIcon, Location01Icon][index % 3]} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-medium text-emerald-950">{service.name}</h3>
                </div>
                <div className="mt-4 grid gap-2">
                  {abuDhabiLocations.slice(0, 6).map((location) => (
                    <Link className="flex items-center justify-between gap-3 rounded-lg bg-[#fbfff7] px-3 py-2 text-sm text-slate-700 ring-1 ring-emerald-950/10 hover:bg-lime-50" href={`/services/${service.slug}/${location.slug}`} key={location.slug}>
                      <span>{location.name}</span>
                      <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon text-emerald-800" size={16} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">100 local cleaning guides</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Detailed guides by service and area</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                These pages explain local scope, access notes, pricing factors, checklists, and FAQs for high-intent service searches across Abu Dhabi.
              </p>
            </div>
            <span className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950">
              {localGuidePages.length} guides
            </span>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {localGuidePages.map((page) => (
              <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`/local-guides/${page.slug}`} key={page.slug}>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{page.location.name}</p>
                <h3 className="mt-3 text-sm font-medium leading-6 text-emerald-950">{shortServiceName(page.service)} guide</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{page.service.price ? `From AED ${page.service.price} ${page.service.priceUnit}` : "Local guide"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Cleaning guides</p>
          <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Helpful guides before you book</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {cleaningGuides.map((guide) => (
              <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-[#f3ffe8]" href={`/guides/${guide.slug}`} key={guide.slug}>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{guide.eyebrow}</p>
                <h3 className="mt-3 text-base font-medium leading-6 text-emerald-950">{guide.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{guide.readingTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfff7] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Service resources</p>
          <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Checklists and cost guides</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">Use these pages to understand scope, pricing factors, preparation steps, and what to send before booking.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resourcePages.map((page) => (
              <Link className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`/resources/${page.slug}`} key={page.slug}>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{page.eyebrow}</p>
                <h3 className="mt-3 text-sm font-medium leading-6 text-emerald-950">{page.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Cleaning solutions</p>
          <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Find help by cleaning problem</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">These pages answer problem-led searches like dust control, stains, pet odor, move-in dust, office hygiene, and guest-ready cleaning.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cleaningSolutions.map((solution) => (
              <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`/solutions/${solution.slug}`} key={solution.slug}>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{solution.eyebrow}</p>
                <h3 className="mt-3 text-sm font-medium leading-6 text-emerald-950">{solution.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfff7] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Compare services</p>
          <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Choose the right cleaning option</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">These comparison pages help customers decide between service types, frequency, DIY, specialist cleaning, and provider options.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {comparisonPages.map((page) => (
              <Link className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`/compare/${page.slug}`} key={page.slug}>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{page.eyebrow}</p>
                <h3 className="mt-3 text-sm font-medium leading-6 text-emerald-950">{page.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
