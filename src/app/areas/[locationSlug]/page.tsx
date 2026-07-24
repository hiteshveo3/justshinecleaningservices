import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, CleaningBucketIcon, MapsLocation01Icon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { servicePriceLabel, services, site } from "@/lib/content";
import { abuDhabiLocations, getLocation } from "@/lib/locations";

type Props = { params: Promise<{ locationSlug: string }> };

const heroImage = "/images/services/deep-cleaning.webp";
const mainServiceSlugs = ["home-cleaning", "deep-cleaning", "villa-cleaning", "apartment-cleaning", "office-cleaning", "sofa-cleaning", "carpet-cleaning", "window-cleaning"];
const mainServices = services.filter((service) => mainServiceSlugs.includes(service.slug));

export async function generateStaticParams() {
  return abuDhabiLocations.map((location) => ({ locationSlug: location.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug } = await params;
  const location = getLocation(locationSlug);
  if (!location) return {};
  const title = `Cleaning Services in ${location.name}, Abu Dhabi`;
  const description = `Book Just Shine Cleaning Services in ${location.name}, Abu Dhabi. Explore home, deep, villa, office, sofa, carpet, and window cleaning with Call and WhatsApp booking.`;
  return {
    title,
    description,
    alternates: { canonical: `/areas/${location.slug}` },
    openGraph: {
      title,
      description,
      url: `/areas/${location.slug}`,
      type: "website",
      images: [{ url: heroImage, alt: title }],
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { locationSlug } = await params;
  const location = getLocation(locationSlug);
  if (!location) notFound();
  const nearbyLocations = abuDhabiLocations.filter((item) => item.slug !== location.slug).slice(0, 8);
  const faqs = [
    {
      q: `Do you provide cleaning services in ${location.name}?`,
      a: `Yes. Just Shine Cleaning Services provides residential, commercial, and specialist cleaning services in ${location.name}, Abu Dhabi. Share your property type, photos, and preferred time by WhatsApp for a clearer quote.`,
      links: [{ label: "View services", href: "/services" }],
    },
    {
      q: `Which cleaning service is most popular in ${location.shortName}?`,
      a: `Home cleaning, deep cleaning, and villa or apartment cleaning are common requests, depending on the property type. ${location.name} properties often need planning around ${location.challenge}.`,
      links: [{ label: "Deep cleaning in this area", href: `/services/deep-cleaning/${location.slug}` }],
    },
    {
      q: "Can I book same-day cleaning?",
      a: `Same-day availability depends on team schedule, area access, and property size. WhatsApp is the fastest way to check availability for ${location.shortName}.`,
      links: [{ label: "Contact", href: "/contact" }],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Areas We Serve", url: "/areas-we-serve" }, { name: location.name, url: `/areas/${location.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Cleaning Services in ${location.name}`,
          description: `Area hub for cleaning services in ${location.name}, Abu Dhabi.`,
          url: `${site.url}/areas/${location.slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: mainServices.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${service.name} in ${location.name}`,
              url: `${site.url}/services/${service.slug}/${location.slug}`,
            })),
          },
        }}
      />

      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow-lime">Cleaning area</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.55rem] lg:text-[2.9rem]">
              Cleaning Services in {location.name}, Abu Dhabi
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              Book home, deep, villa, apartment, office, sofa, carpet, window, and specialist cleaning in {location.name}. We plan visits around {location.challenge}.
            </p>
            <div className="mt-5 grid max-w-2xl gap-2 sm:grid-cols-3">
              {[
                ["Area type", location.areaType],
                ["Best for", location.propertyFocus],
                ["Booking", "Call or WhatsApp"],
              ].map(([label, value]) => (
                <div className="rounded-xl bg-white/85 p-3 ring-1 ring-emerald-950/10" key={label}>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{label}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-emerald-950">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-xl">
              <CtaButtons service={`cleaning in ${location.name}`} quoteLabel={`Get ${location.shortName} quote`} />
            </div>
          </div>
          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image alt={`Cleaning services in ${location.name}`} className="object-cover" fill priority sizes="(min-width: 1024px) 45vw, 100vw" src={heroImage} />
              <div className="absolute bottom-4 left-4 max-w-[20rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">{location.shortName} service hub</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{location.propertyFocus}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-8">
            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Local cleaning plan</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">What to consider in {location.shortName}</h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
                {location.name} includes {location.areaType}, so cleaning needs can change by building access, family traffic, AC dust, outdoor exposure, and property size. Just Shine confirms the right service before booking so you do not pay for the wrong scope.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  { title: "Local challenge", text: location.challenge, icon: MapsLocation01Icon },
                  { title: "Scheduling", text: location.scheduling, icon: Calendar03Icon },
                  { title: "Property focus", text: location.propertyFocus, icon: CleaningBucketIcon },
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
              <p className="eyebrow">Choose a service</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Popular cleaning services in {location.shortName}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {mainServices.map((service) => (
                  <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-[#f3ffe8]" href={`/services/${service.slug}/${location.slug}`} key={service.slug}>
                    <p className="text-sm font-medium text-emerald-950">{service.name}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{service.description}</p>
                    <p className="mt-3 inline-flex rounded-lg bg-white px-3 py-1 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10">{servicePriceLabel(service)}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3,#efffcf)] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Cleaning in {location.shortName}: quick answers</h2>
              <div className="mt-5">
                <FaqAccordion items={faqs} idPrefix={`area-hub-${location.slug}`} defaultOpenCount={2} />
              </div>
            </section>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Nearby areas</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">More Abu Dhabi areas</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {nearbyLocations.map((item) => (
                  <Link className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`/areas/${item.slug}`} key={item.slug}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Book in {location.shortName}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Choose a service page or send your property details for guidance.</p>
              <div className="mt-4">
                <CtaButtons service={`cleaning in ${location.name}`} quoteLabel="Ask on WhatsApp" callVariant="green" />
              </div>
              <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href="/areas-we-serve">
                View all areas
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
