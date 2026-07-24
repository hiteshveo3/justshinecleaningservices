import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  CheckmarkCircle02Icon,
  CleaningBucketIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { getService, getServices } from "@/lib/data";
import { servicePriceLabel, services, site, type Service } from "@/lib/content";
import {
  abuDhabiLocations,
  getLocation,
  getServiceLocationPaths,
  locationServiceDescription,
  locationServiceTitle,
  type AbuDhabiLocation,
} from "@/lib/locations";

type Props = { params: Promise<{ slug: string; locationSlug: string }> };

const fallbackImage = "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp";

export const dynamicParams = false;

export async function generateStaticParams() {
  const allServices = await getServices();
  return getServiceLocationPaths(allServices).map(({ serviceSlug, locationSlug }) => ({
    slug: serviceSlug,
    locationSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locationSlug } = await params;
  const service = await getService(slug);
  const location = getLocation(locationSlug);
  if (!service || !location) return {};

  const title = `${locationServiceTitle(service, location)} | Price & Booking`;
  const description = locationServiceDescription(service, location);
  const image = service.images[0] || fallbackImage;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}/${location.slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}/${location.slug}`,
      type: "website",
      images: [{ url: image, alt: `${service.name} in ${location.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { slug, locationSlug } = await params;
  const service = await getService(slug);
  const location = getLocation(locationSlug);
  if (!service || !location) notFound();

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 4);
  const nearbyLocations = abuDhabiLocations.filter((item) => item.slug !== location.slug).slice(0, 6);
  const image = service.images[0] || fallbackImage;
  const serviceLabel = `${service.name.replace(" Services", "").toLowerCase()} in ${location.name}`;
  const title = locationServiceTitle(service, location);
  const description = locationServiceDescription(service, location);
  const faqItems = locationFaqs(service, location);
  const pageDetails = serviceLocationDetails(service, location);
  const schemaUrl = `${site.url}/services/${service.slug}/${location.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: title,
          description,
          serviceType: service.name,
          url: schemaUrl,
          image: `${site.url}${image}`,
          provider: {
            "@type": "LocalBusiness",
            name: site.name,
            telephone: site.phone,
            email: site.email,
            address: site.location,
            url: site.url,
          },
          areaServed: {
            "@type": "Place",
            name: `${location.name}, Abu Dhabi`,
          },
          offers: {
            "@type": "Offer",
            price: service.price,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
            url: schemaUrl,
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: String(site.rating.value), reviewCount: String(site.rating.count), bestRating: String(site.rating.best) },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
          { name: location.name, url: `/services/${service.slug}/${location.slug}` },
        ])}
      />

      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow-lime">{location.shortName} service area</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.45rem] lg:text-[2.75rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              Book {service.name.toLowerCase()} for {location.propertyFocus.toLowerCase()}. Just Shine plans the visit around {location.challenge}, with clear pricing from {servicePriceLabel(service)}.
            </p>
            <div className="mt-5 grid max-w-2xl gap-2 sm:grid-cols-3">
              {[
                ["Starting price", servicePriceLabel(service)],
                ["Local focus", location.propertyFocus],
                ["Booking", "Call or WhatsApp"],
              ].map(([label, value]) => (
                <div className="rounded-xl bg-white/85 p-3 ring-1 ring-emerald-950/10" key={label}>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{label}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-emerald-950">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-2xl">
              <CtaButtons
                service={serviceLabel}
                quoteLabel={`Get ${location.shortName} quote • ${servicePriceLabel(service)}`}
              />
            </div>
          </div>

          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image
                alt={`${service.name} in ${location.name}, Abu Dhabi`}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                src={image}
              />
              <div className="absolute bottom-4 left-4 right-4 max-w-[22rem] rounded-xl bg-white/92 p-4 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-base font-medium text-emerald-950">{service.name.replace(" Services", "")} | {location.shortName}</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">{location.areaType}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-8">
            <nav className="sticky top-16 z-20 -mx-4 overflow-x-auto border-y border-emerald-950/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
              <div className="flex min-w-max gap-2">
                {[
                  ["Overview", "#overview"],
                  ["Scope", "#scope"],
                  ["Pricing", "#pricing"],
                  ["Checklist", "#checklist"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <a className="rounded-lg bg-[#f8fff3] px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={href} key={href}>{label}</a>
                ))}
              </div>
            </nav>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6" id="overview">
              <p className="eyebrow">Local overview</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                Cleaning planned for {location.name} properties
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
                {location.name} has {location.areaType}, so the best cleaning plan should match building access, property size, surface condition, and daily use. For {service.name.toLowerCase()}, our team focuses on {service.scope.toLowerCase()} while keeping the visit practical for {location.audience}.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  { title: "Local challenge", text: location.challenge, icon: SparklesIcon },
                  { title: "Best scheduling", text: location.scheduling, icon: Calendar03Icon },
                  { title: "Property fit", text: location.propertyFocus, icon: CleaningBucketIcon },
                ].map((item) => (
                  <article className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10" key={item.title}>
                    <span className="grid size-10 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                      <HugeiconsIcon icon={item.icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-medium text-emerald-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-[1fr_.85fr] lg:items-start">
                <div>
                  <p className="eyebrow">Local fit</p>
                  <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                    Why this service fits {location.shortName}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{pageDetails.localFit}</p>
                </div>
                <div className="grid gap-3 rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10">
                  {pageDetails.quickNotes.map((note) => (
                    <div className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl bg-white p-3 ring-1 ring-emerald-950/10" key={note.label}>
                      <span className="grid size-8 place-items-center rounded-lg bg-lime-200 text-emerald-950">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{note.label}</p>
                        <p className="mt-1 text-sm font-medium leading-6 text-emerald-950">{note.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" id="scope">
              <p className="eyebrow">What we cover</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                {service.name} scope in {location.shortName}
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.highlights.concat(localHighlights(service, location)).slice(0, 8).map((item) => (
                  <div className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-[#f8fff3] p-4 ring-1 ring-emerald-950/10" key={item}>
                    <span className="grid size-8 place-items-center rounded-lg bg-lime-200 text-emerald-950">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <p className="text-sm font-medium leading-6 text-emerald-950">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6" id="pricing">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Pricing guidance</p>
                  <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                    Clear quote for {location.shortName}, not vague pricing
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                    Starting price is {servicePriceLabel(service)}. Final pricing depends on property size, condition, access, timing, and requested add-ons. Photos help us estimate scope faster and avoid unclear pricing.
                  </p>
                </div>
                <Link className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/pricing">
                  View pricing
                </Link>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageDetails.priceFactors.map((factor) => (
                  <article className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10" key={factor.title}>
                    <p className="text-base font-medium text-emerald-950">{factor.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{factor.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" id="checklist">
              <p className="eyebrow">Local checklist</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                What the team checks in {location.shortName}
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {pageDetails.checklists.map((list) => (
                  <article className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10" key={list.title}>
                    <h3 className="text-base font-medium text-emerald-950">{list.title}</h3>
                    <ul className="mt-3 grid gap-2">
                      {list.items.map((item) => (
                        <li className="flex gap-2 text-sm leading-6 text-slate-700" key={item}>
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#f7ffef] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Process</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                How booking works in {location.shortName}
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-4">
                {[
                  ["Send details", "Share your location, property type, photos, and preferred timing."],
                  ["Confirm scope", `We confirm the ${service.name.toLowerCase()} scope and expected time.`],
                  ["Team visit", "The team arrives with supplies and follows the agreed checklist."],
                  ["Final check", "You review the work and can ask for quick touch-ups if needed."],
                ].map(([step, text], index) => (
                  <article className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10" key={step}>
                    <span className="inline-flex rounded-lg bg-lime-200 px-3 py-1 text-xs font-medium text-emerald-950">Step {index + 1}</span>
                    <h3 className="mt-4 text-base font-medium text-emerald-950">{step}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Before booking</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                Send these details for a faster quote
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Exact area and building or villa community",
                  "Property type, size, and number of rooms",
                  "Photos of priority areas or stains",
                  "Preferred date, time, and access notes",
                ].map((item) => (
                  <div className="rounded-2xl bg-[#f8fff3] p-4 text-sm font-medium leading-6 text-emerald-950 ring-1 ring-emerald-950/10" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Related services</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                More cleaning services in {location.shortName}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedServices.map((item) => (
                  <Link
                    className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-[#f3ffe8]"
                    href={`/services/${item.slug}/${location.slug}`}
                    key={item.slug}
                  >
                    <p className="text-sm font-medium text-emerald-950">{item.name}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{servicePriceLabel(item)}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Nearby areas</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                Nearby Abu Dhabi service pages
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {nearbyLocations.map((item) => (
                  <Link
                    className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10 transition hover:bg-lime-50"
                    href={`/services/${service.slug}/${item.slug}`}
                    key={item.slug}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3,#efffcf)] p-5 ring-1 ring-emerald-950/10 sm:p-6" id="faq">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                {service.name} in {location.shortName}: quick answers
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">
                These answers use the same global FAQ accordion styling as the rest of the website, with local internal links where useful.
              </p>
              <div className="mt-5">
                <FaqAccordion items={faqItems} idPrefix={`area-${service.slug}-${location.slug}`} defaultOpenCount={2} />
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Book in {location.shortName}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{service.name} from {servicePriceLabel(service)}.</p>
              <div className="mt-4 rounded-xl bg-[#f6fff0] p-3 ring-1 ring-emerald-950/10">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">Best for</p>
                <p className="mt-1 text-sm font-medium leading-6 text-emerald-950">{location.propertyFocus}</p>
              </div>
              <div className="mt-4">
                <CtaButtons
                  service={serviceLabel}
                  quoteLabel={`Get quote • ${servicePriceLabel(service)}`}
                  callVariant="green"
                />
              </div>
              <Link
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10"
                href={`/services/${service.slug}`}
              >
                View main service page
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function localHighlights(service: Service, location: AbuDhabiLocation) {
  return [
    `${location.shortName} access and timing coordination`,
    `${location.areaType} cleaning plan`,
    `Call or WhatsApp quote for ${location.propertyFocus.toLowerCase()}`,
    `${servicePriceLabel(service)} starting price guidance`,
  ];
}

function serviceLocationDetails(service: Service, location: AbuDhabiLocation) {
  const isCommercial = ["office-cleaning", "restaurant-cleaning", "showroom-cleaning"].includes(service.slug);
  const isSpecialist = ["sofa-cleaning", "carpet-cleaning", "window-cleaning", "pest-control"].includes(service.slug);
  const visitType = isCommercial ? "business" : isSpecialist ? "specialist" : "home";

  return {
    localFit: `${service.name} in ${location.name} works best when the visit is planned around the property type, access, and actual condition. ${location.shortName} includes ${location.areaType}, so a one-size-fits-all checklist is not enough. Just Shine Cleaning Services confirms ${location.propertyFocus.toLowerCase()}, priority areas, timing, and add-ons before arrival. This helps the team focus on the right rooms and surfaces instead of wasting time on unclear scope.`,
    quickNotes: [
      { label: "Visit type", value: `${visitType.charAt(0).toUpperCase()}${visitType.slice(1)} cleaning visit` },
      { label: "Best for", value: location.propertyFocus },
      { label: "Quote method", value: "WhatsApp photos, location, and preferred timing" },
    ],
    priceFactors: [
      {
        title: "Property size",
        text: `A studio, apartment, villa, office, or commercial unit in ${location.shortName} needs different time and team planning.`,
      },
      {
        title: "Condition and access",
        text: `Heavy dust, stains, parking, lift access, security check-in, and outdoor areas can change the visit duration.`,
      },
      {
        title: "Add-ons",
        text: "Sofa, carpet, window, pest control, deep appliance cleaning, and move-in work can be quoted separately if needed.",
      },
    ],
    checklists: [
      {
        title: "Before arrival",
        items: [
          "Confirm building name, villa community, or exact map pin.",
          "Share priority rooms, stains, dusty areas, or access restrictions.",
          "Move fragile personal items if the team needs to clean shelves or counters.",
          "Confirm whether parking, elevator, or security access is required.",
        ],
      },
      {
        title: "During the visit",
        items: [
          `Focus on ${service.scope.toLowerCase()} and the agreed priority areas.`,
          "Use practical room-by-room order to reduce missed spots.",
          "Flag add-ons if the property needs work outside the original scope.",
          "Complete a final walkthrough or photo confirmation where possible.",
        ],
      },
    ],
  };
}

function locationFaqs(service: Service, location: AbuDhabiLocation) {
  return [
    {
      q: `Do you provide ${service.name.toLowerCase()} in ${location.name}?`,
      a: `Yes. Just Shine Cleaning Services provides ${service.name.toLowerCase()} in ${location.name}, Abu Dhabi. Share your property type, location, preferred time, and a few photos on WhatsApp so the team can confirm scope and availability.`,
      links: [
        { label: "View all areas", href: "/areas-we-serve" },
        { label: "Main service page", href: `/services/${service.slug}` },
      ],
    },
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${location.shortName}?`,
      a: `The starting price is ${servicePriceLabel(service)}. Final cost depends on property size, condition, access, number of rooms, and add-ons. We confirm the estimate before booking so there are no vague surprises.`,
      links: [{ label: "View pricing", href: "/pricing" }],
    },
    {
      q: `What makes ${location.shortName} cleaning different?`,
      a: `${location.name} properties often need planning around ${location.challenge}. That is why we ask for basic details before arrival and create a practical checklist for the visit.`,
    },
    {
      q: "Can I book by WhatsApp?",
      a: `Yes. WhatsApp is usually the fastest way to book. Send the service name, ${location.name} location, property size, preferred date, and photos if available. The team will reply with timing and price guidance.`,
      links: [{ label: "Contact Just Shine", href: "/contact" }],
    },
  ];
}
