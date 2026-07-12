import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/seo";
import { getService, getServices } from "@/lib/data";
import { servicePriceLabel, site } from "@/lib/content";
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
  return {
    title: `${service.name} Abu Dhabi | Fast Booking`,
    description: `${service.description} Call or WhatsApp Just Shine Cleaning Services for ${service.name.toLowerCase()} in Abu Dhabi.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const pricing = pricingServices.find((item) => item.slug === service.slug);
  const serviceFaqs = getServiceFaqs(service.slug);
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
                src={brandCleaningImage}
              />
              <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/92 p-4 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">Starting from {servicePriceLabel(service)}</p>
                <p className="mt-1 text-xs text-slate-600">Typical duration: {service.duration} hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0 space-y-10">
            {pricing && (
              <section>
                <p className="eyebrow">Tiered pricing</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-medium text-emerald-950 sm:text-3xl">Pricing options for {service.name}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">{pricing.bestFor}</p>
                  </div>
                  <Link className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/pricing">Full pricing</Link>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <article className="rounded-2xl bg-[#f6fff0] p-5 ring-1 ring-emerald-950/10">
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
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10">
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
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10">
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

            <section>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">{service.name} questions</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">Quick answers about scope, booking, timing, pricing, and what to expect.</p>
              <div className="mt-5">
                <FaqAccordion items={serviceFaqs} idPrefix={`service-${service.slug}`} />
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-[#f6fff0] p-5 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Book this service</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{pricing?.scope || service.scope}</p>
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
