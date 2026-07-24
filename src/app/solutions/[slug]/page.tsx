import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, CheckmarkCircle02Icon, CleaningBucketIcon, Idea01Icon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { servicePriceLabel, services, site } from "@/lib/content";
import { cleaningSolutions, getCleaningSolution } from "@/lib/solutions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cleaningSolutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getCleaningSolution(slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.description,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: solution.title,
      description: solution.description,
      url: `/solutions/${solution.slug}`,
      type: "article",
      images: [{ url: solution.image, alt: solution.title }],
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getCleaningSolution(slug);
  if (!solution) notFound();
  const service = services.find((item) => item.slug === solution.serviceSlug);
  if (!service) notFound();
  const relatedSolutions = cleaningSolutions.filter((item) => item.slug !== solution.slug && item.serviceSlug === solution.serviceSlug).slice(0, 3);
  const alternateServices = services.filter((item) => item.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Solutions", url: "/areas-we-serve" }, { name: solution.title, url: `/solutions/${solution.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: solution.title,
          description: solution.description,
          image: `${site.url}${solution.image}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/solutions/${solution.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: solution.faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow-lime">{solution.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.55rem] lg:text-[2.9rem]">{solution.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{solution.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${service.slug}`}>
                {service.name}
              </Link>
              <span className="rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10">{servicePriceLabel(service)}</span>
            </div>
            <div className="mt-8 max-w-xl">
              <CtaButtons service={solution.title.toLowerCase()} quoteLabel="Ask for solution quote" />
            </div>
          </div>
          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image alt={solution.title} className="object-cover" fill priority sizes="(min-width: 1024px) 45vw, 100vw" src={solution.image} />
              <div className="absolute bottom-4 left-4 max-w-[20rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">{solution.eyebrow}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Problem-led cleaning guidance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="space-y-8">
            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Problem</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">What is happening?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{solution.problem}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {solution.bullets.map((bullet) => (
                  <div className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10" key={bullet}>
                    <span className="grid size-8 place-items-center rounded-lg bg-lime-200 text-emerald-950">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <p className="text-sm font-medium leading-6 text-emerald-950">{bullet}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Why it matters", body: solution.whyItMatters, icon: Alert02Icon },
                { title: "Best cleaning plan", body: solution.bestPlan, icon: Idea01Icon },
              ].map((item) => (
                <article className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6" key={item.title}>
                  <span className="grid size-10 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                    <HugeiconsIcon icon={item.icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-2xl font-medium text-emerald-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{item.body}</p>
                </article>
              ))}
            </section>

            <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Related options</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Services that may help</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[service, ...alternateServices].slice(0, 4).map((item) => (
                  <Link className="rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={`/services/${item.slug}`} key={item.slug}>
                    <p className="text-sm font-medium text-emerald-950">{item.name}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{servicePriceLabel(item)}</p>
                  </Link>
                ))}
              </div>
            </section>

            {relatedSolutions.length > 0 && (
              <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
                <p className="eyebrow">Related solutions</p>
                <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Similar cleaning problems</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {relatedSolutions.map((item) => (
                    <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-[#f3ffe8]" href={`/solutions/${item.slug}`} key={item.slug}>
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
                <FaqAccordion items={solution.faqs} idPrefix={`solution-${solution.slug}`} defaultOpenCount={2} />
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <span className="grid size-10 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                <HugeiconsIcon icon={CleaningBucketIcon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-medium text-emerald-950">Need this solved?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Send photos and location for the fastest service guidance.</p>
              <div className="mt-4">
                <CtaButtons service={solution.title.toLowerCase()} quoteLabel="Ask on WhatsApp" callVariant="green" />
              </div>
              <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${service.slug}`}>
                View related service
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
