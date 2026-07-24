import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, CleaningBucketIcon, DocumentValidationIcon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { servicePriceLabel, services, site } from "@/lib/content";
import { getResourcePage, resourcePages } from "@/lib/resources";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return resourcePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/resources/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/resources/${page.slug}`,
      type: "article",
      images: [{ url: page.image, alt: page.title }],
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) notFound();
  const service = services.find((item) => item.slug === page.serviceSlug);
  if (!service) notFound();
  const relatedResources = resourcePages.filter((item) => item.slug !== page.slug && item.serviceSlug === page.serviceSlug).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Resources", url: "/areas-we-serve" }, { name: page.title, url: `/resources/${page.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          description: page.description,
          image: `${site.url}${page.image}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/resources/${page.slug}`,
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
              <Link className="rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${service.slug}`}>
                {service.name}
              </Link>
              <span className="rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10">
                {servicePriceLabel(service)}
              </span>
            </div>
            <div className="mt-8 max-w-xl">
              <CtaButtons service={service.name.toLowerCase().replace(" services", "")} quoteLabel="Ask for a quote" />
            </div>
          </div>
          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image alt={page.title} className="object-cover" fill priority sizes="(min-width: 1024px) 45vw, 100vw" src={page.image} />
              <div className="absolute bottom-4 left-4 max-w-[20rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">{page.eyebrow}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{service.name} support page.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="space-y-8">
            {page.sections.map((section, index) => (
              <section className="rounded-3xl bg-[#fbfff7] p-5 ring-1 ring-emerald-950/10 sm:p-6" key={section.title}>
                <p className="eyebrow">0{index + 1}</p>
                <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{section.body}</p>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {section.bullets.map((bullet) => (
                    <div className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-white p-4 ring-1 ring-emerald-950/10" key={bullet}>
                      <span className="grid size-8 place-items-center rounded-lg bg-lime-200 text-emerald-950">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <p className="text-sm font-medium leading-6 text-emerald-950">{bullet}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-3xl bg-white p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">Related resources</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Continue planning</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {relatedResources.map((item) => (
                  <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-[#f3ffe8]" href={`/resources/${item.slug}`} key={item.slug}>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{item.eyebrow}</p>
                    <h3 className="mt-3 text-base font-medium leading-6 text-emerald-950">{item.title}</h3>
                  </Link>
                ))}
                <Link className="rounded-2xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10 transition hover:bg-[#f3ffe8]" href={`/services/${service.slug}`}>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">Service page</p>
                  <h3 className="mt-3 text-base font-medium leading-6 text-emerald-950">View {service.name}</h3>
                </Link>
              </div>
            </section>

            <section className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3,#efffcf)] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Quick answers</h2>
              <div className="mt-5">
                <FaqAccordion items={page.faqs} idPrefix={`resource-${page.slug}`} defaultOpenCount={2} />
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <span className="grid size-10 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                <HugeiconsIcon icon={DocumentValidationIcon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-medium text-emerald-950">Resource for {service.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Use this page to prepare your quote, then send details on WhatsApp.</p>
              <div className="mt-4">
                <CtaButtons service={service.name.toLowerCase().replace(" services", "")} quoteLabel="Ask on WhatsApp" callVariant="green" />
              </div>
              <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href="/services">
                <HugeiconsIcon icon={CleaningBucketIcon} className="icon" size={17} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                All services
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
