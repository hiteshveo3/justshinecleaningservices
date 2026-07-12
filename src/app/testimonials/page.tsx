import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";
import { JsonLd } from "@/components/seo";
import { site, testimonials } from "@/lib/content";

export const metadata = { title: "Customer Reviews", description: "Read customer testimonials for Just Shine Cleaning Services in Abu Dhabi." };

export default function TestimonialsPage() {
  return (
    <section className="section bg-lime-50">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, review: testimonials.map((item) => ({ "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: item.rating }, author: item.name, reviewBody: item.quote })) }} />
      <div className="container">
        <p className="eyebrow">Reviews</p>
        <h1 className="mt-4 text-3xl font-semibold text-emerald-950 sm:text-4xl">What customers say</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => <article className="card p-6" key={item.name}><div className="flex text-lime-600">{Array.from({ length: 5 }).map((_, i) => <HugeiconsIcon icon={StarIcon} className="icon" key={i} size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />)}</div><p className="mt-4 text-slate-700">&ldquo;{item.quote}&rdquo;</p><p className="mt-4 font-medium text-emerald-950">{item.name}</p></article>)}
        </div>
      </div>
    </section>
  );
}
