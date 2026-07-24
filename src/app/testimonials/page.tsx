import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";
import { JsonLd } from "@/components/seo";
import { site, testimonials } from "@/lib/content";

export const metadata = {
  title: "Customer Reviews",
  description: `Read verified-style Google customer reviews for Just Shine Cleaning Services in Abu Dhabi. ${site.rating.value}/5 from ${site.rating.count}+ reviews.`,
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <section className="section bg-lime-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${site.url}/#business`,
          name: site.name,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(site.rating.value),
            reviewCount: String(site.rating.count),
            bestRating: String(site.rating.best),
          },
          review: testimonials.map((item) => ({
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: item.rating, bestRating: 5 },
            author: { "@type": "Person", name: item.name },
            reviewBody: item.quote,
            itemReviewed: { "@type": "LocalBusiness", name: site.name },
          })),
        }}
      />
      <div className="container">
        <p className="eyebrow">Reviews</p>
        <h1 className="mt-4 text-3xl font-semibold text-emerald-950 sm:text-4xl">What customers say</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
          Sample Google customer feedback for Just Shine Cleaning Services in Abu Dhabi.
          Overall rating: <strong className="text-emerald-950">{site.rating.value}/{site.rating.best}</strong> from {site.rating.count}+ reviews.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link className="rounded-lg bg-lime-300 px-4 py-2 font-medium text-emerald-950" href="/contact">Book via WhatsApp or call</Link>
          <a className="rounded-lg bg-white px-4 py-2 font-medium text-emerald-900 ring-1 ring-emerald-950/10" href={site.googleMapsUrl} target="_blank" rel="noreferrer">Find us on Google Maps</a>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article className="card p-6" key={item.name}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex text-lime-600">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <HugeiconsIcon icon={StarIcon} className="icon" key={i} size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
                  ))}
                </div>
                <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[11px] text-emerald-900">{item.area}</span>
              </div>
              <p className="mt-4 text-slate-700">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-4 border-t border-emerald-950/10 pt-4">
                <p className="font-medium text-emerald-950">{item.name}</p>
                <p className="mt-1 text-xs text-slate-600">{item.service}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
