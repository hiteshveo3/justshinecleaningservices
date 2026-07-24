import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddCircleIcon, Calendar03Icon, CheckmarkCircle02Icon, CleaningBucketIcon, CustomerService01Icon, SparklesIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { getService, getServices } from "@/lib/data";
import { servicePriceLabel, site, type Service } from "@/lib/content";
import { faqCategories, type FaqItem } from "@/lib/faq-data";
import { abuDhabiLocations } from "@/lib/locations";
import { pricingServices } from "@/lib/pricing";

type Props = { params: Promise<{ slug: string }> };
const brandCleaningImage = "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp";

export async function generateStaticParams() {
  return (await getServices()).map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  const title = `${service.name} Abu Dhabi | Price & Booking`;
  const description = `${service.name} in Abu Dhabi from ${servicePriceLabel(service)}. Compare pricing, scope, process, FAQs, and book Just Shine Cleaning Services by Call or WhatsApp.`;
  const image = service.images[0] || brandCleaningImage;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      type: "website",
      images: [{ url: image, alt: `${service.name} in Abu Dhabi` }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const allServices = await getServices();
  const pricing = pricingServices.find((item) => item.slug === service.slug);
  const serviceFaqs = getServiceFaqs(service.slug);
  const pageContent = getServicePageContent(service);
  const relatedServices = allServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  const serviceImage = service.images[0] || brandCleaningImage;
  const offerCatalog = pricing ? {
    "@type": "OfferCatalog",
    name: `${service.name} pricing and discounts`,
    itemListElement: [
      {
        "@type": "Offer",
        name: `${service.name} starting price`,
        price: service.price,
        priceCurrency: "AED",
        description: pricing.current,
        availability: "https://schema.org/InStock",
        url: `${site.url}/services/${service.slug}`,
      },
      ...pricing.discounts.slice(0, 3).map((tier) => ({
        "@type": "Offer",
        name: tier.label,
        priceCurrency: "AED",
        description: `${tier.price}${tier.note ? ` - ${tier.note}` : ""}`,
        url: `${site.url}/pricing`,
      })),
    ],
  } : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.name,
    url: `${site.url}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      email: site.email,
      address: site.location,
      url: site.url,
    },
    areaServed: "Abu Dhabi",
    offers: offerCatalog || {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: `${site.url}/services/${service.slug}`,
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: String(site.rating.value), reviewCount: String(site.rating.count), bestRating: String(site.rating.best) },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.name, url: `/services/${service.slug}` },
      ])} />
      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow-lime">Service</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.65rem] lg:text-[3rem]">{service.name} in Abu Dhabi</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{service.description}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <span className="rounded-lg bg-white/85 px-3 py-2 font-medium text-emerald-900 ring-1 ring-emerald-950/10">{servicePriceLabel(service)}</span>
              <span className="rounded-lg bg-white/85 px-3 py-2 text-emerald-900 ring-1 ring-emerald-950/10">{service.scope}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.highlights.slice(0, 4).map((highlight) => (
                <span className="rounded-lg bg-white/70 px-3 py-2 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10" key={highlight}>{highlight}</span>
              ))}
            </div>
            <div className="mt-5 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { label: `${site.rating.value} rated`, text: `${site.rating.count} ${site.rating.source} reviews` },
                { label: site.sinceLabel, text: "Abu Dhabi based team" },
                { label: "Eco-friendly", text: "Surface-safe options" },
              ].map((badge) => (
                <a
                  className="rounded-xl bg-white/82 p-3 ring-1 ring-emerald-950/10 transition hover:bg-white"
                  href={badge.label === `${site.rating.value} rated` ? "/testimonials" : badge.label === "Eco-friendly" ? "/sustainability" : badge.label === site.sinceLabel ? "/about" : "/about"}
                  key={badge.label}
                >
                  <span className="block text-sm font-medium text-emerald-950">{badge.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600">{badge.text}</span>
                </a>
              ))}
            </div>
            <div className="mt-8"><CtaButtons service={service.name.toLowerCase().replace(" services", "").replace(" cleaning", "")} quoteLabel={`Get instant quote • ${servicePriceLabel(service)}`} /></div>
          </div>
          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image
                alt={`${service.name} by Just Shine Cleaning Services`}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                src={serviceImage}
              />
              <div className="absolute bottom-4 left-4 max-w-[19rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">From {servicePriceLabel(service)}</p>
                <p className="mt-1 text-xs text-slate-600">{service.duration} hrs typical | Abu Dhabi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0 space-y-10">
            <nav className="sticky top-16 z-20 -mx-4 overflow-x-auto border-y border-emerald-950/10 bg-[#fbfff7]/95 px-4 py-3 backdrop-blur lg:hidden">
              <div className="flex min-w-max gap-2">
                {[
                  ["Overview", "#overview"],
                  ["Pricing", "#pricing"],
                  ["Process", "#process"],
                  ["Compare", "#comparison"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <a className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={href} key={href}>{label}</a>
                ))}
              </div>
            </nav>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" id="overview">
              <p className="eyebrow">Overview</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">{service.name} for Abu Dhabi homes and businesses</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">{pageContent.overview}</p>
              <div className="mt-5 rounded-2xl bg-[#f3ffe8] p-4 ring-1 ring-emerald-950/10">
                <h3 className="text-base font-medium text-emerald-950">Why Abu Dhabi homes need this rhythm</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{pageContent.localContext}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {pageContent.localFactors.map((factor) => (
                    <div className="rounded-xl bg-white/80 p-3 ring-1 ring-emerald-950/10" key={factor.title}>
                      <p className="text-sm font-medium text-emerald-950">{factor.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{factor.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {pageContent.quickFacts.map((fact) => (
                  <div className="rounded-xl border border-emerald-950/10 bg-[#f8fff3] p-4" key={fact.label}>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{fact.label}</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-emerald-950">{fact.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#f7ffef] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Scope</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">What is included, and what is an add-on</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">Clear scope helps avoid surprises. These are typical inclusions and exclusions; final scope is confirmed before booking.</p>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <article className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-emerald-950">
                      <span className="grid size-9 place-items-center rounded-lg bg-lime-300 text-emerald-950">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={19} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      Included in this service
                    </h3>
                    <span className="rounded-lg bg-lime-300 px-3 py-1 text-xs font-medium text-emerald-950">AED scope</span>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {pageContent.included.map((item) => (
                      <div className="grid grid-cols-[1.75rem_1fr] gap-3 rounded-xl bg-[#f8fff3] p-3 ring-1 ring-emerald-950/8" key={item}>
                        <span className="grid size-7 place-items-center rounded-lg bg-lime-300 text-emerald-950">
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={15} color="currentColor" strokeWidth={2} aria-hidden="true" />
                        </span>
                        <p className="text-sm font-medium leading-6 text-emerald-950">{item}</p>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-emerald-950">
                      <span className="grid size-9 place-items-center rounded-lg bg-[#eef8df] text-emerald-900 ring-1 ring-emerald-950/10">
                        <HugeiconsIcon icon={AddCircleIcon} className="icon" size={19} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      Quoted separately if needed
                    </h3>
                    <span className="rounded-lg bg-[#eef8df] px-3 py-1 text-xs font-medium text-emerald-900">Add-ons</span>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {pageContent.notIncluded.map((item) => (
                      <div className="grid grid-cols-[1.75rem_1fr] gap-3 rounded-xl bg-[#fbfff7] p-3 ring-1 ring-emerald-950/8" key={item}>
                        <span className="grid size-7 place-items-center rounded-lg bg-white text-emerald-900 ring-1 ring-emerald-950/10">
                          <HugeiconsIcon icon={AddCircleIcon} className="icon" size={15} color="currentColor" strokeWidth={2} aria-hidden="true" />
                        </span>
                        <p className="text-sm leading-6 text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Room checklist</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">What gets attention room by room</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">Use this as a practical checklist. The final order can be adjusted around your priority rooms, timing, and property condition.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {pageContent.roomChecklist.map((room, index) => (
                  <article className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10" key={room.title}>
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-lime-300 text-emerald-950">
                        <HugeiconsIcon icon={[CleaningBucketIcon, SparklesIcon, CheckmarkCircle02Icon, CustomerService01Icon][index] || CleaningBucketIcon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <h3 className="text-base font-medium text-emerald-950">{room.title}</h3>
                    </div>
                    <ul className="mt-4 grid gap-2">
                      {room.items.map((item) => (
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

            {pricing && (
              <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" id="pricing">
                <p className="eyebrow">Tiered pricing</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-medium text-emerald-950 sm:text-3xl">Pricing options for {service.name}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">{pricing.bestFor}</p>
                  </div>
                  <Link className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/pricing">View pricing</Link>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <article className="rounded-2xl bg-[linear-gradient(135deg,#e8ff87,#f8fff3)] p-5 ring-1 ring-emerald-950/10">
                    <p className="text-sm text-slate-600">Current starting price</p>
                    <p className="mt-2 text-2xl font-medium text-emerald-950">{pricing.current}</p>
                    <p className="mt-1 text-sm text-slate-500 line-through">{pricing.original}</p>
                  </article>
                  {pricing.discounts.slice(0, 2).map((tier) => (
                    <article className="rounded-2xl bg-lime-50 p-5 ring-1 ring-emerald-950/10" key={tier.label}>
                      <p className="text-sm text-slate-600">{tier.label}</p>
                      <p className="mt-2 text-2xl font-medium text-emerald-950">{tier.price}</p>
                      {tier.note && <p className="mt-1 text-sm leading-6 text-slate-600">{tier.note}</p>}
                    </article>
                  ))}
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <div className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10">
                    <h3 className="font-medium text-emerald-950">Current vs original</h3>
                    <div className="mt-3 grid gap-2">
                      {pricing.rows.map((row) => (
                        <div className="grid gap-2 rounded-xl bg-[#f8fff3] p-3 text-sm sm:grid-cols-[1fr_auto_auto]" key={row.label}>
                          <span className="font-medium text-emerald-950">{row.label}<span className="block font-normal text-slate-600">{row.note}</span></span>
                          <span className="text-emerald-950">{row.price}</span>
                          <span className="text-slate-500 line-through">{row.original}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10">
                    <h3 className="font-medium text-emerald-950">Discounts and add-ons</h3>
                    <div className="mt-3 grid gap-2">
                      {[...pricing.discounts, ...(pricing.addOns || [])].map((row) => (
                        <div className="rounded-xl bg-lime-50 p-3 text-sm" key={row.label}>
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-emerald-950">{row.label}</span>
                            <span className="text-emerald-900">{row.price}</span>
                          </div>
                          {row.note && <p className="mt-1 text-slate-600">{row.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="rounded-3xl bg-[#f8fff3] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Best for</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">When to book {service.name}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageContent.bestFor.map((item) => (
                  <article className="rounded-xl border border-emerald-950/10 bg-[#f8fff3] p-5" key={item.title}>
                    <h3 className="text-lg font-medium text-emerald-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Choose a plan</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Pick the right cleaning rhythm</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">Not every home needs the same schedule. Use this as a quick guide before you ask for a quote.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageContent.planGuide.map((plan, index) => (
                  <article className={`rounded-2xl p-5 ring-1 ring-emerald-950/10 ${plan.recommended ? "bg-[#efffcf]" : "bg-[#fbfff7]"}`} key={plan.title}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`grid size-10 place-items-center rounded-xl text-emerald-950 ring-1 ring-emerald-950/10 ${plan.recommended ? "bg-lime-300" : "bg-white"}`}>
                          <HugeiconsIcon icon={[Calendar03Icon, SparklesIcon, CleaningBucketIcon][index] || Calendar03Icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <h3 className="text-lg font-medium text-emerald-950">{plan.title}</h3>
                      </div>
                      {plan.recommended && <span className="rounded-lg bg-lime-300 px-2 py-1 text-xs font-medium text-emerald-950">Best value</span>}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{plan.text}</p>
                    <p className="mt-4 rounded-xl bg-white/75 p-3 text-sm font-medium leading-6 text-emerald-950 ring-1 ring-emerald-950/10">{plan.cta}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6" id="process">
              <p className="eyebrow">Process</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">How the service works</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">The process is built around clear scope first, then scheduling. That keeps pricing practical and avoids last-minute confusion.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {pageContent.process.map((step, index) => (
                  <article className="relative rounded-2xl border border-emerald-950/10 bg-white p-4" key={step.title}>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-lime-300 text-emerald-950">
                        <HugeiconsIcon icon={[WhatsappBusinessIcon, CustomerService01Icon, CleaningBucketIcon, CheckmarkCircle02Icon][index] || SparklesIcon} className="icon" size={18} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="rounded-lg bg-[#eef8df] px-2 py-1 text-xs font-medium text-emerald-900">Step 0{index + 1}</span>
                    </div>
                    <h3 className="mt-3 text-base font-medium text-emerald-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Timing</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Duration and scheduling</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageContent.timing.map((item, index) => (
                  <div className={[
                    "rounded-2xl p-5 ring-1 ring-emerald-950/10",
                    index === 1 ? "bg-[#efffcf]" : "bg-[#f8fff3]",
                  ].join(" ")} key={item.label}>
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-white text-emerald-900 ring-1 ring-emerald-950/10">
                        <HugeiconsIcon icon={[Calendar03Icon, WhatsappBusinessIcon, SparklesIcon][index] || Calendar03Icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <p className="text-sm font-medium text-emerald-800">{item.label}</p>
                    </div>
                    <p className="mt-2 text-xl font-medium text-emerald-950">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  ["View pricing", "#pricing"],
                  ["How it works", "#process"],
                  ["Compare options", "#comparison"],
                  ["Questions", "#faq"],
                ].map(([label, href]) => (
                  <a className="rounded-lg bg-[#f8fff3] px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10 transition hover:bg-lime-100" href={href} key={href}>{label}</a>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Preparation</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Before the team arrives</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {pageContent.preparation.map((item) => (
                  <div className="rounded-xl bg-[#f8fff3] p-4 ring-1 ring-emerald-950/10" key={item}>
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#f8fff3] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Add-ons</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Useful add-on services</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageContent.addOns.map((item) => (
                  <Link className="rounded-xl border border-emerald-950/10 bg-white/85 p-5 transition hover:bg-lime-50" href={item.href} key={item.title}>
                    <h3 className="text-lg font-medium text-emerald-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Abu Dhabi areas</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Service coverage</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">Just Shine Cleaning Services is based near Al Jazeera Towers, Al Danah, and serves homes, villas, offices, apartments, showrooms, and commercial spaces across Abu Dhabi.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Al Danah", "Al Reem Island", "Khalifa City", "Yas Island", "Saadiyat Island", "Mussafah", "Al Reef", "Downtown Abu Dhabi"].map((area) => (
                  <span className="rounded-lg bg-lime-50 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" key={area}>{area}</span>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#f3ffe8] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Quality</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">What makes the result better</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {pageContent.quality.map((item) => (
                  <article className="rounded-xl border border-emerald-950/10 bg-white/85 p-5" key={item.title}>
                    <h3 className="text-lg font-medium text-emerald-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Service promise</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">A cleaner visit with fewer surprises</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageContent.promise.map((item, index) => (
                  <article className="rounded-2xl bg-[#f7ffef] p-5 ring-1 ring-emerald-950/10" key={item.title}>
                    <span className="grid size-10 place-items-center rounded-xl bg-white text-emerald-950 ring-1 ring-emerald-950/10">
                      <HugeiconsIcon icon={[CustomerService01Icon, CheckmarkCircle02Icon, WhatsappBusinessIcon][index] || SparklesIcon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-medium text-emerald-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6" id="comparison">
              <p className="eyebrow">Comparison</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-medium text-emerald-950 sm:text-3xl">Just Shine vs typical Abu Dhabi cleaning options</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">{pageContent.comparison.intro}</p>
                </div>
                <Link className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/testimonials">View reviews</Link>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
                <div className="hidden lg:grid lg:grid-cols-[1.1fr_repeat(4,minmax(0,1fr))]">
                  {["Feature", "Just Shine", "Premium providers", "Budget apps", "Freelance cleaners"].map((heading) => (
                    <div className={`px-4 py-3 text-sm font-medium text-emerald-950 ${heading === "Just Shine" ? "bg-lime-300" : "bg-[#eef8df]"}`} key={heading}>{heading}</div>
                  ))}
                  {pageContent.comparison.rows.map((row) => (
                    <div className="contents" key={row.feature}>
                      <div className="border-t border-emerald-950/10 bg-[#fbfff7] px-4 py-3 text-sm font-medium text-emerald-950">{row.feature}</div>
                      <div className="border-t border-emerald-950/10 bg-[#efffcf] px-4 py-3 text-sm font-medium leading-6 text-emerald-950">{row.justShine}</div>
                      <div className="border-t border-emerald-950/10 bg-white px-4 py-3 text-sm leading-6 text-slate-700">{row.premium}</div>
                      <div className="border-t border-emerald-950/10 bg-[#fbfff7] px-4 py-3 text-sm leading-6 text-slate-700">{row.budget}</div>
                      <div className="border-t border-emerald-950/10 bg-white px-4 py-3 text-sm leading-6 text-slate-700">{row.freelance}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 bg-[#f7ffef] p-3 lg:hidden">
                  {pageContent.comparison.rows.map((row) => (
                    <article className="overflow-hidden rounded-xl bg-white ring-1 ring-emerald-950/10" key={row.feature}>
                      <h3 className="bg-[#eef8df] px-4 py-3 text-base font-medium text-emerald-950">{row.feature}</h3>
                      <div className="grid gap-2 p-3 text-sm leading-6 text-slate-700">
                        <div className="rounded-xl bg-[#efffcf] p-3 ring-1 ring-emerald-950/10">
                          <p className="mb-1 inline-flex rounded-lg bg-lime-300 px-2 py-1 text-xs font-medium text-emerald-950">Just Shine</p>
                          <p className="font-medium text-emerald-950">{row.justShine}</p>
                        </div>
                        <div className="rounded-xl bg-[#fbfff7] p-3"><span className="font-medium text-slate-800">Premium providers:</span> {row.premium}</div>
                        <div className="rounded-xl bg-[#fbfff7] p-3"><span className="font-medium text-slate-800">Budget apps:</span> {row.budget}</div>
                        <div className="rounded-xl bg-[#fbfff7] p-3"><span className="font-medium text-slate-800">Freelance cleaners:</span> {row.freelance}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageContent.comparison.reasons.map((reason) => (
                  <article className="rounded-xl bg-lime-50 p-5 ring-1 ring-emerald-950/10" key={reason.title}>
                    <h3 className="text-lg font-medium text-emerald-950">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{reason.text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">Comparison is based on common booking models in Abu Dhabi. Exact inclusions, pricing, and availability can change by company, property size, and service condition.</p>
            </section>

            <section className="rounded-3xl bg-[#f8fff3] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Service areas</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Book {service.name} across Abu Dhabi</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">Choose your area to view a local service page with property guidance, scope, pricing notes, and WhatsApp booking for that location.</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {abuDhabiLocations.map((location) => (
                  <Link
                    className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10 transition hover:bg-lime-50"
                    href={`/services/${service.slug}/${location.slug}`}
                    key={location.slug}
                  >
                    {service.name} in {location.name}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#f8fff3] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Related services</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Other cleaning services you may need</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {relatedServices.map((item) => (
                  <Link className="overflow-hidden rounded-xl bg-white ring-1 ring-emerald-950/10 transition hover:bg-[#fbfff7]" href={`/services/${item.slug}`} key={item.slug}>
                    <div className="relative aspect-[4/3]">
                      <Image alt={`${item.name} in Abu Dhabi`} className="object-cover" fill sizes="(min-width: 768px) 20vw, 90vw" src={item.images[0] || brandCleaningImage} />
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-medium text-emerald-950">{item.name}</p>
                      <p className="mt-2 text-sm text-slate-700">{servicePriceLabel(item)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3,#e8ff87_70%,#f3ffe8)] p-5 ring-1 ring-emerald-950/10 sm:p-6" id="faq">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">{service.name} questions</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">Quick answers about scope, booking, timing, pricing, and what to expect.</p>
              <div className="mt-5">
                <FaqAccordion items={serviceFaqs} idPrefix={`service-${service.slug}`} searchable={service.slug === "home-cleaning"} defaultOpenCount={service.slug === "home-cleaning" ? 3 : 0} />
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Book this service</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{pricing?.scope || service.scope}</p>
              <div className="mt-4 grid gap-2 rounded-xl bg-[#f6fff0] p-3">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">Starting price</p>
                <p className="text-lg font-medium text-emerald-950">{servicePriceLabel(service)}</p>
              </div>
              <div className="mt-4">
                <CtaButtons service={service.name.toLowerCase().replace(" services", "").replace(" cleaning", "")} quoteLabel={`Get quote • ${servicePriceLabel(service)}`} callVariant="green" />
              </div>
              <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href="/pricing">Compare pricing</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function getServicePageContent(service: Service) {
  const name = service.name;
  const lower = name.toLowerCase();
  const scope = service.scope;
  const price = servicePriceLabel(service);
  const isCommercial = ["office-cleaning", "restaurant-cleaning", "showroom-cleaning"].includes(service.slug);
  const isSpecialist = ["sofa-cleaning", "carpet-cleaning", "window-cleaning", "pest-control"].includes(service.slug);
  const isHomeCleaning = service.slug === "home-cleaning";
  const comparison = getServiceComparison(service);

  return {
    overview: isHomeCleaning
      ? "Home cleaning in Abu Dhabi is a practical maintenance clean for bedrooms, living rooms, bathrooms, kitchens, and high-use surfaces. It is designed for weekly or bi-weekly upkeep, not the heavy hidden-area work of deep cleaning. Most visits take 2-4 hours depending on home size, condition, and priority areas. It is an affordable cleaning option for busy professionals, families, and apartment residents who want the home to stay fresh between deeper resets. Just Shine Cleaning Services confirms the scope by Call or WhatsApp first, so you know what is included, how long it may take, and whether add-ons such as window, sofa, carpet, or deep cleaning are better for your situation. Ready to keep your space clean all week? Send your location, preferred time, and a few photos for a quick quote."
      : `${name} in Abu Dhabi helps keep ${isCommercial ? "commercial spaces, teams, visitors, and customers" : "homes, apartments, villas, and family spaces"} cleaner, healthier, and easier to maintain. Just Shine Cleaning Services focuses on clear scope, practical scheduling, and WhatsApp-first booking so you know what is included before the team arrives.`,
    localContext: isHomeCleaning
      ? "Fine desert dust can settle again within a few days, especially when AC airflow moves particles through bedrooms, living rooms, and window tracks. Coastal humidity and daily foot traffic also make kitchens and bathrooms feel used faster than expected. For many Abu Dhabi homes, a weekly maintenance clean keeps the space comfortable, while periodic deep cleaning handles corners, grout, vents, and appliance interiors."
      : "Abu Dhabi properties deal with fine dust, AC airflow, humidity, busy family routines, and frequent guest traffic. Planning the right cleaning frequency helps protect surfaces, keep indoor spaces fresher, and reduce the need for rushed last-minute cleaning before visitors, inspections, or handovers.",
    localFactors: isHomeCleaning
      ? [
        { title: "Sand returns fast", text: "Windows, shoes, balcony doors, and AC airflow can bring fine dust back within 5-7 days." },
        { title: "AC moves particles", text: "Bedrooms and living rooms often need regular dusting because cooled air keeps dust circulating." },
        { title: "Bathrooms need rhythm", text: "Humidity, hard-water marks, and daily use make weekly surface cleaning more practical." },
      ]
      : [
        { title: "Local dust", text: "Fine sand affects glass, floors, soft furnishings, and corners faster than many cooler climates." },
        { title: "High-use spaces", text: "Families, offices, restaurants, and showrooms need cleaning frequency matched to traffic." },
        { title: "Better planning", text: "Photos and priority notes help avoid vague pricing and make each visit more efficient." },
      ],
    quickFacts: [
      { label: "Starting price", value: price },
      { label: "Typical duration", value: `${service.duration} hours` },
      { label: "Scope", value: scope },
      { label: "Booking", value: "Call or WhatsApp quote" },
    ],
    included: [
      `${scope} handled according to the agreed service scope.`,
      `Dust, marks, buildup, and high-use areas checked before starting ${lower}.`,
      "Standard cleaning supplies and tools used where suitable for the surface.",
      "Priority areas can be shared on WhatsApp with photos before booking.",
      "Final walkthrough guidance so you know what was cleaned and what may need add-ons.",
      "Flexible booking for Abu Dhabi homes, villas, apartments, offices, and commercial spaces.",
    ],
    notIncluded: isHomeCleaning
      ? [
        "Deep kitchen appliance cleaning, heavy grease removal, grout scrubbing, and hidden-area reset.",
        "Carpet shampooing, sofa cleaning, mattress cleaning, or upholstery steam cleaning.",
        "Exterior window work, balcony deep washing, garden, parking, or exterior villa areas.",
        "Pest control, post-construction residue, move-in/move-out reset, or heavy furniture moving.",
      ]
      : [
        "Tasks outside the agreed scope, timing, access, or property condition shared before booking.",
        "Specialist add-ons such as sofa, carpet, pest control, windows, or post-construction cleaning unless included in the quote.",
        "Heavy furniture moving, delicate restoration, repair work, or permanent stain removal guarantees.",
        "Extra rooms, outdoor zones, or urgent same-day extensions beyond the confirmed service plan.",
      ],
    roomChecklist: isHomeCleaning
      ? [
        { title: "Bedrooms", items: ["Accessible dusting and surface wipe-down", "Floor sweeping or mopping", "Bedside and wardrobe exterior attention"] },
        { title: "Living areas", items: ["Tables, shelves, TV area, and visible surfaces", "Sofa-side dust and floor care", "General tidying of accessible areas"] },
        { title: "Bathrooms", items: ["Sink, mirror, toilet, and shower surface cleaning", "Floor cleaning and bin emptying", "Light hard-water mark attention"] },
        { title: "Kitchen", items: ["Countertops, sink, stovetop surface, and exterior cabinets", "Visible appliance exterior wipe-down", "Floor cleaning and daily-use area refresh"] },
      ]
      : [
        { title: "Priority areas", items: ["Confirmed rooms and surfaces handled first", "Photos used to clarify scope", "High-use zones checked before start"] },
        { title: "Surface care", items: ["Method matched to material where possible", "Visible buildup and marks assessed", "Add-ons suggested when specialist tools are needed"] },
        { title: "Timing", items: ["Visit length depends on size and condition", "Extra areas quoted before extension", "Recurring plans available for repeat needs"] },
        { title: "Review", items: ["Final walkthrough guidance", "Missed-priority feedback handled quickly", "Next service suggestions if needed"] },
      ],
    bestFor: [
      { title: "Regular maintenance", text: `${name} is useful when you want a cleaner space without spending your own time on detailed cleaning.` },
      { title: "Before guests or inspections", text: "Book before visitors, handovers, office checks, events, or property viewings for a more polished space." },
      { title: "Dust and hygiene reset", text: "Abu Dhabi dust, AC circulation, and busy routines can make professional cleaning helpful even when surfaces look tidy." },
    ],
    planGuide: isHomeCleaning
      ? [
        {
          title: "One-time clean",
          text: "Best when your home is mostly maintained but needs a refresh before guests, travel, inspection, or a busy week.",
          cta: "Send photos and priority rooms for a quick WhatsApp estimate.",
        },
        {
          title: "Weekly maintenance",
          text: "Best for families, busy professionals, pets, allergies, and homes where Abu Dhabi dust returns within a few days.",
          cta: "Recommended for consistent freshness and lower effort per visit.",
          recommended: true,
        },
        {
          title: "Home + deep clean",
          text: "Best if the home has hidden buildup, kitchen grease, bathroom scale, old dust, or corners that need a stronger reset first.",
          cta: "Start with deep cleaning, then maintain with weekly home cleaning.",
        },
      ]
      : [
        {
          title: "One-time service",
          text: "Best for urgent needs, guests, inspections, handovers, or a specific area that needs professional attention.",
          cta: "Share photos for a clearer starting quote.",
        },
        {
          title: "Recurring schedule",
          text: "Best for homes, offices, villas, and commercial spaces that need consistent cleaning without repeated planning.",
          cta: "Ask about monthly, quarterly, or bundled options.",
          recommended: true,
        },
        {
          title: "Bundle add-ons",
          text: "Best when you want to combine related work such as windows, sofa, carpet, pest control, or deep cleaning.",
          cta: "Bundle planning helps reduce extra visits.",
        },
      ],
    process: [
      { title: "Send details", text: "Share service type, location, preferred timing, home size, and photos if possible." },
      { title: "Confirm scope", text: "We confirm the starting price, expected duration, priority areas, and available slot." },
      { title: "Team arrives", text: "The team follows the agreed plan and focuses on the highest-priority areas first." },
      { title: "Review result", text: "You review the work and ask for add-ons or recurring options if needed." },
    ],
    timing: [
      { label: "Typical visit", value: `${service.duration} hours`, note: "Actual time depends on property size, condition, access, and add-ons." },
      { label: "Fast quote", value: "WhatsApp", note: "Photos help us estimate scope and avoid vague pricing." },
      { label: "Best schedule", value: isSpecialist ? "Every 3-6 months" : "Weekly to quarterly", note: "Frequency depends on traffic, dust, pets, allergies, and usage." },
    ],
    preparation: [
      "Clear loose items from floors, counters, and priority surfaces where possible.",
      "Share stains, delicate materials, pets, access notes, and parking details before arrival.",
      "Send photos on WhatsApp if you want a clearer starting quote or add-on recommendation.",
      "Keep valuables, documents, and fragile decor secured before the cleaning team starts.",
    ],
    addOns: [
      { title: "Deep Cleaning", text: "A stronger reset for hidden dust, corners, grout, kitchen grease, and bathrooms.", href: "/services/deep-cleaning" },
      { title: "Sofa & Carpet", text: "Useful when fabric, upholstery, rugs, or carpets need shampooing or steam attention.", href: "/services/sofa-cleaning" },
      { title: "Window Cleaning", text: "For brighter rooms, glass fronts, indoor/outdoor window areas, frames, and tracks.", href: "/services/window-cleaning" },
    ],
    quality: [
      { title: "Clear scope before work", text: "The best results start with clear expectations: service type, property size, photos, access, and priority areas." },
      { title: "Surface-aware cleaning", text: "Marble, tile, glass, wood, fabric, and commercial surfaces need different methods to avoid damage." },
      { title: "Abu Dhabi dust awareness", text: "Fine sand, AC airflow, and humidity affect cleaning frequency, especially for villas and soft furnishings." },
      { title: "Practical follow-up", text: "For recurring needs, ask about weekly, bi-weekly, monthly, or quarterly cleaning plans." },
    ],
    promise: [
      { title: "Scope before arrival", text: "We confirm service type, location, timing, access, and priority areas before the visit so the team arrives with a clearer plan." },
      { title: "Useful final review", text: "After cleaning, review the result and share quick feedback while details are still fresh. This helps resolve small misses faster." },
      { title: "Direct WhatsApp support", text: "Questions, photos, timing changes, add-ons, and recurring plans can be handled directly through Call or WhatsApp." },
    ],
    comparison,
  };
}

function getServiceComparison(service: Service) {
  const genericRows = [
    {
      feature: "Starting price",
      justShine: servicePriceLabel(service),
      premium: "Often higher hourly or package pricing",
      budget: "May look cheaper upfront",
      freelance: "Varies by cleaner and scope",
    },
    {
      feature: "Scope clarity",
      justShine: "Quote-first booking with service scope, timing, and priority areas confirmed",
      premium: "Usually documented, but add-ons may increase the final bill",
      budget: "Often limited to basic cleaning tasks",
      freelance: "Depends on individual experience and communication",
    },
    {
      feature: "Products and surface care",
      justShine: "Surface-aware cleaning for homes, villas, offices, fabric, glass, and floors",
      premium: "Usually professional, sometimes with higher package minimums",
      budget: "Can be basic or product-limited",
      freelance: "Tools and product quality can vary",
    },
    {
      feature: "Booking speed",
      justShine: "Call and WhatsApp booking for quick Abu Dhabi quotes",
      premium: "Usually scheduled through forms or call centers",
      budget: "App slots may depend on area availability",
      freelance: "Fast when available, less predictable when busy",
    },
    {
      feature: "Best fit",
      justShine: "Customers who want clear pricing, practical service coverage, and direct support",
      premium: "Customers who prefer large packaged contracts",
      budget: "Customers focused mainly on the lowest displayed price",
      freelance: "Small one-off tasks with simple requirements",
    },
  ];

  const serviceRows: Record<string, typeof genericRows> = {
    "deep-cleaning": [
      {
        feature: "Deep cleaning focus",
        justShine: "Kitchen buildup, bathrooms, corners, vents, grout, hidden dust, and room-by-room detail",
        premium: "Detailed packages, often at a higher hourly or fixed rate",
        budget: "May cover visible areas more than hidden buildup",
        freelance: "Depth depends heavily on cleaner experience",
      },
      {
        feature: "Abu Dhabi dust handling",
        justShine: "Built around fine sand, AC circulation, and high-use family spaces",
        premium: "Usually good for scheduled deep cleans",
        budget: "May need extra time or paid add-ons",
        freelance: "Can be strong if personally experienced",
      },
      ...genericRows.slice(0, 3),
    ],
    "sofa-cleaning": [
      {
        feature: "Fabric care",
        justShine: "Shampoo/steam approach with fabric condition checked before cleaning",
        premium: "Professional upholstery packages, often higher per-seat pricing",
        budget: "Basic wash may be unsuitable for delicate upholstery",
        freelance: "Equipment and fabric knowledge can vary",
      },
      {
        feature: "Odor and stain support",
        justShine: "Good for everyday stains, freshness, dust, and upholstery odor attention",
        premium: "Usually available, often as a paid add-on",
        budget: "May focus on quick visual cleaning only",
        freelance: "Depends on tools and stain products available",
      },
      ...genericRows.slice(0, 3),
    ],
    "carpet-cleaning": [
      {
        feature: "Cleaning method",
        justShine: "Steam/shampoo support for embedded dust, sand, odors, and stains",
        premium: "Professional machines, often with package minimums",
        budget: "May use lighter equipment or quicker passes",
        freelance: "Equipment quality varies widely",
      },
      {
        feature: "Allergen and sand attention",
        justShine: "Designed for Abu Dhabi carpets and rugs exposed to fine dust",
        premium: "Usually solid for high-traffic homes",
        budget: "May need repeat service sooner",
        freelance: "Depends on method and drying guidance",
      },
      ...genericRows.slice(0, 3),
    ],
    "villa-cleaning": [
      {
        feature: "Villa coverage",
        justShine: "Interior rooms, bathrooms, kitchens, garden/entry/parking areas based on agreed scope",
        premium: "Often comprehensive but may split outdoor areas into add-ons",
        budget: "Usually focused on indoor basics",
        freelance: "May need multiple cleaners for larger villas",
      },
      {
        feature: "Team fit",
        justShine: "Planned around villa size, access, dust, and priority zones",
        premium: "Good for formal contracts",
        budget: "Can take longer for large properties",
        freelance: "Availability and consistency can vary",
      },
      ...genericRows.slice(0, 3),
    ],
    "office-cleaning": [
      {
        feature: "Commercial routine",
        justShine: "Daily, weekly, bi-weekly, and monthly office cleaning plans",
        premium: "Strong for large corporate contracts",
        budget: "May lack inspection and routine consistency",
        freelance: "Good for small offices, less ideal for scaling",
      },
      {
        feature: "Workplace timing",
        justShine: "Flexible scheduling around teams, visitors, and office hours",
        premium: "Structured schedules, sometimes less flexible",
        budget: "Depends on slot availability",
        freelance: "Flexible if the cleaner is available",
      },
      ...genericRows.slice(0, 3),
    ],
    "window-cleaning": [
      {
        feature: "Glass result",
        justShine: "Streak-free focus for indoor/outdoor windows, frames, and tracks",
        premium: "Professional finish, often higher package pricing",
        budget: "May charge extra for frames, tracks, or exterior glass",
        freelance: "Result depends on tools and access",
      },
      {
        feature: "Best use",
        justShine: "Homes, apartments, villas, offices, and brighter interior spaces",
        premium: "Good for complex buildings",
        budget: "Better for simple windows only",
        freelance: "Best for small, low-risk windows",
      },
      ...genericRows.slice(0, 3),
    ],
    "pest-control": [
      {
        feature: "Treatment fit",
        justShine: "Cockroach, bed bug, ant, and prevention-focused treatments",
        premium: "Often detailed, sometimes with higher call-out charges",
        budget: "May focus on one-time spray only",
        freelance: "Quality depends on certification and products",
      },
      {
        feature: "Prevention",
        justShine: "Recurring prevention options for homes and apartments",
        premium: "Usually available as formal contracts",
        budget: "Follow-up may be limited",
        freelance: "Follow-up depends on individual availability",
      },
      ...genericRows.slice(0, 3),
    ],
  };

  return {
    intro: `${service.name} in Abu Dhabi should be compared by total value, not only the lowest displayed price. Look at scope, product care, booking speed, add-ons, and how clearly the provider explains what is included.`,
    rows: serviceRows[service.slug] || genericRows,
    reasons: [
      { title: "Transparent starting price", text: `Just Shine lists ${servicePriceLabel(service)} as the starting point, then confirms the practical scope before booking.` },
      { title: "WhatsApp-first clarity", text: "Photos, location, priority areas, timing, and add-ons can be discussed before the team arrives." },
      { title: "Built for Abu Dhabi", text: "The service is planned around local dust, AC airflow, apartments, villas, offices, and busy schedules." },
    ],
  };
}

function getServiceFaqs(slug: string): FaqItem[] {
  if (slug === "home-cleaning") {
    return [
      {
        q: "How is home cleaning different from deep cleaning?",
        a: "Home cleaning is a regular maintenance clean for visible and high-use areas such as bedrooms, living rooms, bathrooms, kitchens, floors, counters, and basic dusting. It keeps the home fresh week to week. Deep cleaning is a heavier reset for hidden buildup, grout, corners, kitchen grease, vents, and areas behind furniture. If your home is generally tidy but dusty, home cleaning is usually enough. If it has not been cleaned in weeks, has heavy stains, or needs detailed sanitation, start with deep cleaning.",
        links: [
          { label: "Deep cleaning", href: "/services/deep-cleaning" },
          { label: "Compare pricing", href: "/pricing" },
        ],
      },
      {
        q: "How often should I book home cleaning in Abu Dhabi?",
        a: "Most Abu Dhabi homes benefit from weekly or bi-weekly home cleaning. Fine sand, AC airflow, and daily foot traffic can make surfaces dusty again within 5-7 days, especially in apartments, villas, and homes with children or guests. Weekly cleaning is best for busy families and allergy-sensitive homes. Bi-weekly cleaning can work for smaller apartments or low-traffic spaces. A quarterly deep clean can then handle hidden dust, grout, vents, and appliance interiors.",
        links: [
          { label: "Deep cleaning guide", href: "/blog/deep-cleaning-services-abu-dhabi-guide-2026" },
        ],
      },
      {
        q: "What is included in AED 30 per hour?",
        a: "The AED 30 per hour starting rate covers standard home cleaning tasks agreed before the visit, such as basic dusting, sweeping or mopping, kitchen surface cleaning, bathroom surface cleaning, bedrooms, living room areas, and general tidying of accessible surfaces. The final time depends on home size, condition, and priority list. Specialized work such as sofa shampooing, carpet cleaning, pest control, exterior windows, or heavy deep-cleaning tasks is quoted separately so there are no surprises.",
        links: [
          { label: "Full pricing", href: "/pricing" },
          { label: "Sofa cleaning", href: "/services/sofa-cleaning" },
        ],
      },
      {
        q: "Can I book weekly home cleaning?",
        a: "Yes. Weekly home cleaning is one of the best options for Abu Dhabi homes because dust and sand build up quickly. A recurring weekly slot helps your home stay consistently clean without waiting for a large monthly cleanup. It is also easier to control cost because each visit starts from a cleaner baseline. You can share preferred days, timing, home size, and priority areas on WhatsApp, and the team can suggest a practical schedule.",
        links: [
          { label: "WhatsApp booking", href: `https://wa.me/${site.tel.replace("+", "")}` },
        ],
      },
      {
        q: "Is home cleaning enough or should I book deep cleaning first?",
        a: "If the home has been cleaned recently and only needs dusting, floors, bathrooms, kitchen surfaces, and regular upkeep, home cleaning is enough. If there is heavy grease, stained grout, dusty corners, AC vent buildup, post-party mess, move-in/move-out dirt, or months of buildup, book deep cleaning first. After that, home cleaning can maintain the result weekly or bi-weekly. Photos on WhatsApp help us guide you honestly before booking.",
        links: [
          { label: "Deep cleaning", href: "/services/deep-cleaning" },
          { label: "Move in/out cleaning", href: "/services/move-in-out-cleaning" },
        ],
      },
      {
        q: "Which areas do you cover during home cleaning?",
        a: "Home cleaning can cover bedrooms, living rooms, bathrooms, kitchen surfaces, floors, counters, shelves, accessible dusting areas, and general daily-use spaces. The exact scope depends on your home size and booked time. For example, a small apartment may be completed faster than a large villa with multiple bathrooms. Outdoor areas, balcony deep washing, window exterior work, carpet shampooing, and upholstery cleaning can be added as separate services if needed.",
        links: [
          { label: "Apartment cleaning", href: "/services/apartment-cleaning" },
          { label: "Villa cleaning", href: "/services/villa-cleaning" },
        ],
      },
      {
        q: "Do you bring cleaning supplies?",
        a: "Yes, the team can bring standard cleaning supplies and tools suitable for normal home cleaning. If you prefer a specific product for marble, wood, glass, baby areas, pet areas, or allergy-sensitive rooms, tell us before the visit. Some homes have delicate surfaces that need special care, so sharing photos or surface notes helps us avoid the wrong product. For specialized jobs such as sofa, carpet, or pest control, dedicated tools and pricing apply.",
        links: [
          { label: "Sustainability", href: "/sustainability" },
          { label: "Carpet cleaning", href: "/services/carpet-cleaning" },
        ],
      },
      {
        q: "Can I trust the team if I am not home?",
        a: "Many customers prefer to be present for the first visit, especially to explain priorities, access, pets, and delicate items. Once the routine is clear, recurring visits can be easier to manage. We recommend securing valuables, documents, jewelry, and fragile decor before any cleaning visit. Share access instructions clearly, keep emergency contact details available, and use WhatsApp for any priority notes so the team follows the agreed scope.",
        links: [
          { label: "About Just Shine", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        q: "What should I prepare before home cleaning?",
        a: "Clear loose items from floors, counters, beds, and bathroom surfaces where possible. This helps cleaners spend more time cleaning and less time moving belongings. Secure valuables, move fragile decor, share parking or building access details, and tell us about pets, stains, delicate surfaces, or priority rooms. If you want a faster quote, send photos on WhatsApp with your location, home size, preferred date, and the areas you want cleaned first.",
        links: [
          { label: "Contact us", href: "/contact" },
        ],
      },
      {
        q: "What if I am not satisfied with the cleaning?",
        a: "Tell us as soon as possible, ideally during the final walkthrough or by WhatsApp with photos. Clear feedback helps us understand whether the issue is scope, timing, access, product choice, or a missed area. If the concern is within the agreed home-cleaning scope, we will guide the next step and work to resolve it professionally. For tasks outside the booked scope, such as deep stains or carpet shampooing, we will recommend the right add-on service.",
        links: [
          { label: "Testimonials", href: "/testimonials" },
          { label: "WhatsApp", href: `https://wa.me/${site.tel.replace("+", "")}` },
        ],
      },
    ];
  }
  const categoryBySlug: Record<string, string[]> = {
    "home-cleaning": ["Deep Cleaning", "Cleaning Frequency", "Booking & General"],
    "deep-cleaning": ["Deep Cleaning"],
    "villa-cleaning": ["Villa Cleaning", "Deep Cleaning"],
    "office-cleaning": ["Cleaning Frequency", "Service Comparisons", "Booking & General"],
    "carpet-cleaning": ["Carpet Cleaning", "Service Comparisons"],
    "sofa-cleaning": ["Sofa & Upholstery Cleaning", "Service Comparisons"],
    "window-cleaning": ["Deep Cleaning", "Service Comparisons"],
    "pest-control": ["Cleaning Frequency", "Service Comparisons"],
    "move-in-out-cleaning": ["Villa Cleaning", "Deep Cleaning", "Booking & General"],
    "restaurant-cleaning": ["Cleaning Frequency", "Service Comparisons"],
    "apartment-cleaning": ["Cleaning Frequency", "Deep Cleaning"],
    "showroom-cleaning": ["Cleaning Frequency", "Service Comparisons"],
  };
  const wanted = categoryBySlug[slug] || ["Deep Cleaning", "Booking & General"];
  return faqCategories
    .filter((category) => wanted.includes(category.title))
    .flatMap((category) => category.items)
    .slice(0, 6);
}
