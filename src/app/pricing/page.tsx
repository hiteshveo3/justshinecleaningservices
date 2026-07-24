import Link from "next/link";
import { PricingCalculator } from "@/components/pricing-calculator";
import { JsonLd } from "@/components/seo";
import { discountSummary, pricingPackages, pricingServices } from "@/lib/pricing";
import { site } from "@/lib/content";

export const metadata = {
  title: "Cleaning Services Pricing Abu Dhabi",
  description: "Transparent Just Shine Cleaning Services pricing in Abu Dhabi with original prices, current rates, discounts, bundles, and quote calculator.",
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Just Shine Cleaning Services Pricing",
        itemListElement: pricingServices.map((service) => ({ "@type": "Offer", name: service.name, priceCurrency: "AED", description: service.current })),
      }} />
      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_48%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow-lime">Transparent pricing</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-medium leading-tight text-emerald-950 sm:text-5xl">No hidden charges. Clear cleaning prices.</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
                Home cleaning: AED {site.priceWithoutMaterials}/hour without materials, AED {site.priceWithMaterials}/hour with materials.
                Villa and deep cleaning from AED {site.priceWithMaterials}/hour. Minimum booking {site.minBookingHours} hours.
                Same-day and weekend slots when available — no surcharge. All Abu Dhabi areas, no extra travel fee.
              </p>
            </div>
            <div className="rounded-2xl bg-white/75 p-5 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Most common discounts</p>
              <div className="mt-4 grid gap-2">
                {discountSummary.slice(0, 4).map(([label, value]) => (
                  <div className="flex items-center justify-between rounded-lg bg-[#f6fff0] px-3 py-2 text-sm" key={label}>
                    <span className="text-slate-700">{label}</span>
                    <span className="font-medium text-emerald-950">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {pricingServices.slice(0, 3).map((service) => (
              <Link className="rounded-2xl bg-[#f6fff0] p-5 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`#${service.slug}`} key={service.slug}>
                <span className="text-sm text-slate-600">{service.category}</span>
                <span className="mt-2 block text-xl font-medium text-emerald-950">{service.name}</span>
                <span className="mt-3 block text-2xl font-medium text-emerald-950">{service.current}</span>
                <span className="mt-1 block text-sm text-slate-500 line-through">{service.original}</span>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <p className="eyebrow">All services</p>
            <h2 className="mt-4 text-3xl font-medium text-emerald-950">Quick pricing table</h2>
            <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-emerald-950/10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[58rem] border-collapse bg-white text-left text-sm">
                  <thead className="bg-emerald-950 text-white">
                    <tr>
                      <th className="px-4 py-3 font-medium">Service</th>
                      <th className="px-4 py-3 font-medium">Current</th>
                      <th className="px-4 py-3 font-medium">Original</th>
                      <th className="px-4 py-3 font-medium">Best for</th>
                      <th className="px-4 py-3 font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingServices.map((service) => (
                      <tr className="border-b border-emerald-950/10 even:bg-[#f8fff3]" key={service.slug}>
                        <td className="px-4 py-4 font-medium text-emerald-950">{service.name}</td>
                        <td className="px-4 py-4 text-emerald-950">{service.current}</td>
                        <td className="px-4 py-4 text-slate-500 line-through">{service.original}</td>
                        <td className="px-4 py-4 text-slate-700">{service.bestFor}</td>
                        <td className="px-4 py-4"><a className="text-emerald-800 underline" href={`#${service.slug}`}>View</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="eyebrow">Calculator</p>
            <h2 className="mt-4 text-3xl font-medium text-emerald-950">Estimate your savings</h2>
            <div className="mt-5"><PricingCalculator /></div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {pricingPackages.map((item) => (
              <article className="rounded-2xl bg-[#f6fff0] p-5 ring-1 ring-emerald-950/10" key={item.name}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Popular package</p>
                    <h3 className="mt-1 text-2xl font-medium text-emerald-950">{item.name}</h3>
                  </div>
                  <span className="w-fit rounded-full bg-lime-300 px-4 py-2 text-sm font-medium text-emerald-950">{item.savings}</span>
                </div>
                <p className="mt-4 text-xl font-medium text-emerald-950">{item.price}</p>
                <div className="mt-4 grid gap-2 text-sm text-slate-700">
                  {item.details.map((detail) => <span className="rounded-lg bg-white px-3 py-2 ring-1 ring-emerald-950/10" key={detail}>{detail}</span>)}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 space-y-8">
            {pricingServices.map((service) => (
              <section className="scroll-mt-28 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" id={service.slug} key={service.slug}>
                <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
                  <div>
                    <p className="eyebrow">{service.category}</p>
                    <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">{service.name}</h2>
                    <p className="mt-3 max-w-3xl leading-7 text-slate-700">{service.bestFor}</p>
                  </div>
                  <div className="rounded-xl bg-[#f6fff0] p-4">
                    <p className="text-sm text-slate-600">Starting from</p>
                    <p className="mt-1 text-2xl font-medium text-emerald-950">{service.current}</p>
                    <p className="mt-1 text-sm text-slate-500 line-through">{service.original}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-emerald-950">Current vs original</h3>
                    <div className="mt-3 grid gap-2">
                      {service.rows.map((row) => (
                        <div className="grid gap-2 rounded-xl bg-[#f8fff3] p-3 text-sm ring-1 ring-emerald-950/10 sm:grid-cols-[1fr_auto_auto]" key={row.label}>
                          <span className="font-medium text-emerald-950">{row.label}<span className="block font-normal text-slate-600">{row.note}</span></span>
                          <span className="text-emerald-950">{row.price}</span>
                          <span className="text-slate-500 line-through">{row.original}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-emerald-950">Discount structures</h3>
                    <div className="mt-3 grid gap-2">
                      {service.discounts.map((row) => (
                        <div className="rounded-xl bg-lime-50 p-3 text-sm ring-1 ring-emerald-950/10" key={row.label}>
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-emerald-950">{row.label}</span>
                            <span className="text-emerald-900">{row.price}</span>
                          </div>
                          {row.note && <p className="mt-1 text-slate-600">{row.note}</p>}
                        </div>
                      ))}
                      {service.addOns?.map((row) => (
                        <div className="rounded-xl bg-white p-3 text-sm ring-1 ring-emerald-950/10" key={row.label}>
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
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-emerald-900 px-5 text-sm font-medium text-white" href={`https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent(`Hi Just Shine Cleaning Services, I need a quote for ${service.name}. Pricing shown: ${service.current}.`)}`}>WhatsApp for Quote</a>
                  <Link className="inline-flex min-h-12 items-center justify-center rounded-lg bg-lime-300 px-5 text-sm font-medium text-emerald-950" href={`/services/${service.slug}`}>View service</Link>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-2xl bg-emerald-950 p-6 text-white">
            <h2 className="text-2xl font-medium">Why professional cleaning pays for itself</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {["Time saved: 8 hours can be worth AED 2,000-4,000", "Furniture and carpets can last 3-5 years longer", "Cleaner air, fewer odors, better hygiene, and less stress"].map((item) => (
                <p className="rounded-xl bg-white/10 p-4 text-sm leading-6 text-lime-50" key={item}>{item}</p>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
