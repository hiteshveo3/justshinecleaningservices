import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { getService, getServices } from "@/lib/data";
import { servicePriceLabel, site, type Service } from "@/lib/content";
import { faqCategories, type FaqItem } from "@/lib/faq-data";
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone },
    areaServed: "Abu Dhabi",
    offers: { "@type": "Offer", price: service.price, priceCurrency: "AED" },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.name, url: `/services/${service.slug}` },
      ])} />
      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">Service</p>
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
            <div className="mt-8"><CtaButtons service={service.name.toLowerCase().replace(" cleaning", "")} /></div>
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
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {pageContent.quickFacts.map((fact) => (
                  <div className="rounded-xl border border-emerald-950/10 bg-[#f8fff3] p-4" key={fact.label}>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{fact.label}</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-emerald-950">{fact.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#f3ffe8] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Scope</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">What is included</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {pageContent.included.map((item) => (
                  <div className="rounded-xl border border-emerald-950/10 bg-white/80 p-4" key={item}>
                    <p className="text-sm font-medium leading-6 text-emerald-950">{item}</p>
                  </div>
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
                  <Link className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/pricing">Full pricing</Link>
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

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" id="process">
              <p className="eyebrow">Process</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">How the service works</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-4">
                {pageContent.process.map((step, index) => (
                  <article className="relative rounded-xl border border-emerald-950/10 bg-[#fbfff7] p-4" key={step}>
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-lime-300 text-sm font-medium text-emerald-950">0{index + 1}</span>
                    <p className="mt-3 text-sm font-medium leading-6 text-emerald-950">{step}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#f3ffe8] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Timing</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Duration and scheduling</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pageContent.timing.map((item) => (
                  <div className="rounded-xl border border-emerald-950/10 bg-lime-50 p-5" key={item.label}>
                    <p className="text-sm text-slate-600">{item.label}</p>
                    <p className="mt-2 text-xl font-medium text-emerald-950">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>
                  </div>
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

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" id="comparison">
              <p className="eyebrow">Comparison</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-medium text-emerald-950 sm:text-3xl">Just Shine vs typical Abu Dhabi cleaning options</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">{pageContent.comparison.intro}</p>
                </div>
                <Link className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/testimonials">View reviews</Link>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-950/10 bg-[#f7ffef]">
                <div className="hidden lg:grid lg:grid-cols-[1.1fr_repeat(4,minmax(0,1fr))]">
                  {["Feature", "Just Shine", "Premium providers", "Budget apps", "Freelance cleaners"].map((heading) => (
                    <div className={`px-4 py-3 text-sm font-medium text-emerald-950 ${heading === "Just Shine" ? "bg-lime-300" : "bg-[#eaffcf]"}`} key={heading}>{heading}</div>
                  ))}
                  {pageContent.comparison.rows.map((row) => (
                    <div className="contents" key={row.feature}>
                      <div className="border-t border-emerald-950/10 bg-white/65 px-4 py-3 text-sm font-medium text-emerald-950">{row.feature}</div>
                      <div className="border-t border-emerald-950/10 bg-[#efffd4] px-4 py-3 text-sm font-medium leading-6 text-emerald-950">{row.justShine}</div>
                      <div className="border-t border-emerald-950/10 bg-white/65 px-4 py-3 text-sm leading-6 text-slate-700">{row.premium}</div>
                      <div className="border-t border-emerald-950/10 bg-white/45 px-4 py-3 text-sm leading-6 text-slate-700">{row.budget}</div>
                      <div className="border-t border-emerald-950/10 bg-white/65 px-4 py-3 text-sm leading-6 text-slate-700">{row.freelance}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 p-3 lg:hidden">
                  {pageContent.comparison.rows.map((row) => (
                    <article className="rounded-xl bg-[#f8fff3] p-4 ring-1 ring-emerald-950/10" key={row.feature}>
                      <h3 className="text-base font-medium text-emerald-950">{row.feature}</h3>
                      <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                        <p><span className="font-medium text-emerald-900">Just Shine:</span> {row.justShine}</p>
                        <p><span className="font-medium text-slate-700">Premium providers:</span> {row.premium}</p>
                        <p><span className="font-medium text-slate-700">Budget apps:</span> {row.budget}</p>
                        <p><span className="font-medium text-slate-700">Freelance cleaners:</span> {row.freelance}</p>
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
                <FaqAccordion items={serviceFaqs} idPrefix={`service-${service.slug}`} />
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
                <CtaButtons service={service.name.toLowerCase().replace(" cleaning", "")} />
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
  const comparison = getServiceComparison(service);

  return {
    overview: `${name} in Abu Dhabi helps keep ${isCommercial ? "commercial spaces, teams, visitors, and customers" : "homes, apartments, villas, and family spaces"} cleaner, healthier, and easier to maintain. Just Shine Cleaning Services focuses on clear scope, practical scheduling, and WhatsApp-first booking so you know what is included before the team arrives.`,
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
    bestFor: [
      { title: "Regular maintenance", text: `${name} is useful when you want a cleaner space without spending your own time on detailed cleaning.` },
      { title: "Before guests or inspections", text: "Book before visitors, handovers, office checks, events, or property viewings for a more polished space." },
      { title: "Dust and hygiene reset", text: "Abu Dhabi dust, AC circulation, and busy routines can make professional cleaning helpful even when surfaces look tidy." },
    ],
    process: [
      "Send service type, location, preferred timing, and photos if possible.",
      "We confirm scope, starting price, expected duration, and available slot.",
      "The team arrives with the agreed plan and focuses on priority areas first.",
      "You review the result and ask for add-ons or recurring options if needed.",
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
