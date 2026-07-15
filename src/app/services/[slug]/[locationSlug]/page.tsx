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
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "48" },
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

      <section className="bg-[linear-gradient(135deg,#fbfff7_0%,#efffcf_48%,#d9f8d8_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">{location.shortName} service area</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.55rem] lg:text-[2.9rem]">
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
              <div className="absolute bottom-4 left-4 max-w-[20rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">{service.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{location.areaType}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-8">
            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
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

            <section className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3,#efffcf)] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
                {service.name} in {location.shortName}: quick answers
              </h2>
              <div className="mt-5 grid gap-3">
                {faqItems.map((item) => (
                  <article className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10" key={item.q}>
                    <h3 className="text-base font-medium leading-7 text-emerald-950">{item.q}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.a}</p>
                  </article>
                ))}
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

function locationFaqs(service: Service, location: AbuDhabiLocation) {
  return [
    {
      q: `Do you provide ${service.name.toLowerCase()} in ${location.name}?`,
      a: `Yes. Just Shine Cleaning Services provides ${service.name.toLowerCase()} in ${location.name}, Abu Dhabi. Share your property type, location, preferred time, and a few photos on WhatsApp so the team can confirm scope and availability.`,
    },
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${location.shortName}?`,
      a: `The starting price is ${servicePriceLabel(service)}. Final cost depends on property size, condition, access, number of rooms, and add-ons. We confirm the estimate before booking so there are no vague surprises.`,
    },
    {
      q: `What makes ${location.shortName} cleaning different?`,
      a: `${location.name} properties often need planning around ${location.challenge}. That is why we ask for basic details before arrival and create a practical checklist for the visit.`,
    },
    {
      q: "Can I book by WhatsApp?",
      a: `Yes. WhatsApp is usually the fastest way to book. Send the service name, ${location.name} location, property size, preferred date, and photos if available. The team will reply with timing and price guidance.`,
    },
  ];
}
