import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, CleaningBucketIcon, RankingIcon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { comparisonPages, getComparisonPage } from "@/lib/comparisons";
import { servicePriceLabel, services, site } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/compare/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/compare/${page.slug}`,
      type: "article",
      images: [{ url: page.image, alt: page.title }],
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = getComparisonPage(slug);
  if (!page) notFound();
  const primaryService = services.find((service) => service.slug === page.primaryService);
  const secondaryService = page.secondaryService ? services.find((service) => service.slug === page.secondaryService) : undefined;
  if (!primaryService) notFound();
  const relatedComparisons = comparisonPages.filter((item) => item.slug !== page.slug && (item.primaryService === page.primaryService || item.secondaryService === page.primaryService)).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Compare", url: "/areas-we-serve" }, { name: page.title, url: `/compare/${page.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          description: page.description,
          image: `${site.url}${page.image}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/compare/${page.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow-lime">{page.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.55rem] lg:text-[2.9rem]">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{page.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${primaryService.slug}`}>
                {primaryService.name}
              </Link>
              {secondaryService && (
                <Link className="rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${secondaryService.slug}`}>
                  {secondaryService.name}
                </Link>
              )}
            </div>
            <div className="mt-8 max-w-xl">
              <CtaButtons service={page.title.toLowerCase()} quoteLabel="Ask which one fits" />
            </div>
          </div>
          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image alt={page.title} className="object-cover" fill priority sizes="(min-width: 1024px) 45vw, 100vw" src={page.image} />
              <div className="absolute bottom-4 left-4 max-w-[20rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">{page.optionA} vs {page.optionB}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Decision guide for Abu Dhabi cleaning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="space-y-8">
            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Quick verdict</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Which one should you choose?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{page.verdict}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[page.optionA, page.optionB].map((option, index) => (
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10" key={option}>
                    <span className="grid size-10 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                      <HugeiconsIcon icon={index === 0 ? CleaningBucketIcon : RankingIcon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-medium text-emerald-950">{option}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{index === 0 ? page.rows[0]?.a : page.rows[0]?.b}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Comparison table</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Side-by-side comparison</h2>
              <div className="mt-5 hidden overflow-hidden rounded-2xl ring-1 ring-emerald-950/10 md:block">
                <table className="w-full border-collapse bg-white text-left text-sm">
                  <thead className="bg-[#f3ffe8] text-emerald-950">
                    <tr>
                      <th className="px-4 py-3 font-medium">Factor</th>
                      <th className="px-4 py-3 font-medium">{page.optionA}</th>
                      <th className="px-4 py-3 font-medium">{page.optionB}</th>
                      <th className="px-4 py-3 font-medium">Best fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.rows.map((row) => (
                      <tr className="border-t border-emerald-950/10" key={row.factor}>
                        <td className="px-4 py-4 font-medium text-emerald-950">{row.factor}</td>
                        <td className="px-4 py-4 text-slate-700">{row.a}</td>
                        <td className="px-4 py-4 text-slate-700">{row.b}</td>
                        <td className="px-4 py-4 text-emerald-900">{row.winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 grid gap-3 md:hidden">
                {page.rows.map((row) => (
                  <article className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10" key={row.factor}>
                    <h3 className="text-base font-medium text-emerald-950">{row.factor}</h3>
                    <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                      <p><span className="font-medium text-emerald-950">{page.optionA}:</span> {row.a}</p>
                      <p><span className="font-medium text-emerald-950">{page.optionB}:</span> {row.b}</p>
                      <p className="rounded-lg bg-white px-3 py-2 font-medium text-emerald-950 ring-1 ring-emerald-950/10">{row.winner}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Related services</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Book the right service</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[primaryService, secondaryService].filter(Boolean).map((service) => (
                  <Link className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`/services/${service!.slug}`} key={service!.slug}>
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-lg bg-lime-200 text-emerald-950">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-emerald-950">{service!.name}</p>
                        <p className="mt-1 text-xs text-slate-600">{servicePriceLabel(service!)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {relatedComparisons.length > 0 && (
              <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
                <p className="eyebrow">Related comparisons</p>
                <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">More decision guides</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {relatedComparisons.map((item) => (
                    <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-[#f3ffe8]" href={`/compare/${item.slug}`} key={item.slug}>
                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{item.eyebrow}</p>
                      <h3 className="mt-3 text-base font-medium leading-6 text-emerald-950">{item.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3,#efffcf)] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Quick answers</h2>
              <div className="mt-5">
                <FaqAccordion items={page.faqs} idPrefix={`compare-${page.slug}`} defaultOpenCount={2} />
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Still unsure?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Send photos and tell us your goal. We will suggest the better option before you book.</p>
              <div className="mt-4">
                <CtaButtons service={page.title.toLowerCase()} quoteLabel="Ask on WhatsApp" callVariant="green" />
              </div>
              <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href="/services">
                View all services
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
