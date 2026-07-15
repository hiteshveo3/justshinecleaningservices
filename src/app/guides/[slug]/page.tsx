import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { cleaningGuides, getGuide } from "@/lib/guides";
import { services, site } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cleaningGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article",
      images: [{ url: guide.image, alt: guide.title }],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const primaryService = services.find((service) => service.slug === guide.primaryService);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Guides", url: "/blog" }, { name: guide.title, url: `/guides/${guide.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          image: `${site.url}${guide.image}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">{guide.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.55rem] lg:text-[2.9rem]">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{guide.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10">
                <HugeiconsIcon icon={Clock01Icon} className="icon" size={17} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                {guide.readingTime}
              </span>
              {primaryService && (
                <Link className="rounded-lg bg-white/85 px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${primaryService.slug}`}>
                  {primaryService.name}
                </Link>
              )}
            </div>
            <div className="mt-8 max-w-xl">
              <CtaButtons service={primaryService?.name.toLowerCase().replace(" services", "") || "cleaning guide"} quoteLabel="Ask for service guidance" />
            </div>
          </div>
          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image
                alt={guide.title}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                src={guide.image}
              />
              <div className="absolute bottom-4 left-4 max-w-[20rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">Abu Dhabi cleaning guide</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Practical advice from Just Shine Cleaning Services.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="space-y-8">
            {guide.sections.map((section, index) => (
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

            <section className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3,#efffcf)] p-5 ring-1 ring-emerald-950/10 sm:p-6">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Quick answers</h2>
              <div className="mt-5">
                <FaqAccordion items={guide.faqs} idPrefix={`guide-${guide.slug}`} defaultOpenCount={2} />
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Need help choosing?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Send your location, photos, and preferred timing. We will suggest the right cleaning service.</p>
              <div className="mt-4">
                <CtaButtons service={guide.title.toLowerCase()} quoteLabel="Ask on WhatsApp" callVariant="green" />
              </div>
              {primaryService && (
                <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${primaryService.slug}`}>
                  View related service
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
