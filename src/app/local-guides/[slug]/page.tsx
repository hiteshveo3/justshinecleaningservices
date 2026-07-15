import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  CheckmarkCircle02Icon,
  CleaningBucketIcon,
  Clock01Icon,
  DocumentValidationIcon,
  Location01Icon,
  MapsLocation01Icon,
  SparklesIcon,
  WhatsappBusinessIcon,
} from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { servicePriceLabel, site } from "@/lib/content";
import {
  getLocalGuidePage,
  localGuideChecklist,
  localGuideFaqs,
  localGuidePages,
  localGuidePriceFactors,
  shortServiceName,
} from "@/lib/local-guide-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return localGuidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalGuidePage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/local-guides/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/local-guides/${page.slug}`,
      type: "article",
      images: [{ url: page.service.images[0], alt: page.title }],
    },
  };
}

export default async function LocalGuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getLocalGuidePage(slug);
  if (!page) notFound();

  const serviceName = shortServiceName(page.service);
  const checklist = localGuideChecklist(page);
  const priceFactors = localGuidePriceFactors(page);
  const faqs = localGuideFaqs(page);
  const heroImage = page.service.images[0] || "/images/services/deep-cleaning.webp";
  const serviceAreaHref = `/services/${page.service.slug}/${page.location.slug}`;
  const recommendedCards = [
    { label: "Scope", value: page.service.scope, icon: DocumentValidationIcon },
    { label: "Typical duration", value: `${page.service.duration}+ hours`, icon: Clock01Icon },
    { label: "Area fit", value: page.location.propertyFocus, icon: Location01Icon },
    { label: "Best timing", value: page.location.scheduling, icon: Calendar03Icon },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Local Guides", url: "/areas-we-serve" },
          { name: page.title, url: `/local-guides/${page.slug}` },
        ])}
      />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          description: page.description,
          image: `${site.url}${heroImage}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/local-guides/${page.slug}`,
          about: [page.service.name, page.location.name, "Cleaning services Abu Dhabi"],
        }}
      />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] p-5 ring-1 ring-emerald-950/10 sm:p-8 lg:grid-cols-[1.04fr_.96fr] lg:p-10">
          <div>
            <p className="eyebrow">Local cleaning guide</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl lg:text-[2.65rem]">
              {serviceName} in {page.location.name}, Abu Dhabi
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
              {page.description} This guide helps you understand what to send, what affects timing, and how to book a clearer quote without guessing.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                [servicePriceLabel(page.service), "Starting guide"],
                [page.location.shortName, "Local area"],
                ["WhatsApp quote", "Photos help pricing"],
              ].map(([title, text]) => (
                <div className="rounded-xl bg-white/82 p-4 ring-1 ring-emerald-950/10" key={title}>
                  <p className="font-medium text-emerald-950">{title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-xl">
              <CtaButtons service={`${serviceName} in ${page.location.name}`} quoteLabel={`Get ${serviceName.toLowerCase()} quote`} />
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-emerald-950/10">
            <Image
              alt={`${serviceName} in ${page.location.name}, Abu Dhabi`}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={heroImage}
            />
            <div className="absolute bottom-4 left-4 max-w-[22rem] rounded-xl bg-white/92 p-4 ring-1 ring-emerald-950/10 backdrop-blur">
              <p className="font-medium text-emerald-950">{page.location.name} booking note</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{page.location.scheduling}.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <article className="rounded-2xl bg-[#fbfff7] p-6 ring-1 ring-emerald-950/10">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                <HugeiconsIcon icon={MapsLocation01Icon} className="icon" size={22} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">Local overview</p>
                <h2 className="mt-1 text-2xl font-medium text-emerald-950">{page.location.name} cleaning context</h2>
              </div>
            </div>
            <p className="mt-5 text-base leading-8 text-slate-700">
              {page.location.name} is known for {page.location.areaType}. Customers here often need {page.service.name.toLowerCase()} for {page.location.propertyFocus.toLowerCase()}, with special attention to {page.location.challenge}. Just Shine keeps the visit practical by confirming scope, photos, access, and preferred timing before the team arrives.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-700">
              The goal is simple: make the property feel cleaner, healthier, and easier to maintain while keeping the quote transparent. If the job needs a deeper scope, specialist add-on, or longer visit, the team will guide you before booking.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 ring-1 ring-emerald-950/10">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                <HugeiconsIcon icon={CleaningBucketIcon} className="icon" size={22} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">Recommended plan</p>
                <h2 className="mt-1 text-2xl font-medium text-emerald-950">What to confirm before booking</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {recommendedCards.map((card) => (
                <div className="rounded-xl bg-[#fbfff7] p-4 ring-1 ring-emerald-950/10" key={card.label}>
                  <HugeiconsIcon icon={card.icon} className="icon text-emerald-800" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">{card.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{card.value}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#fbfff7] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Visit checklist</p>
          <h2 className="mt-4 max-w-3xl text-2xl font-medium text-emerald-950 sm:text-3xl">
            Details that make your {serviceName.toLowerCase()} visit smoother
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {checklist.map((item, index) => (
              <div className="rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10" key={item}>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">Step {index + 1}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-2xl bg-[#fbfff7] p-6 ring-1 ring-emerald-950/10">
            <p className="eyebrow">Pricing notes</p>
            <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">What affects the final quote?</h2>
            <div className="mt-6 grid gap-3">
              {priceFactors.map((factor) => (
                <div className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-emerald-950/10" key={factor}>
                  <HugeiconsIcon icon={SparklesIcon} className="mt-1 shrink-0 text-emerald-800" size={18} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  <p className="text-sm leading-7 text-slate-700">{factor}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl bg-emerald-950 p-6 text-white">
            <p className="text-sm font-medium text-lime-200">Fast booking</p>
            <h2 className="mt-3 text-2xl font-medium">Send photos for a clearer quote</h2>
            <p className="mt-3 text-sm leading-7 text-white/78">
              For {page.location.name}, send the property type, service needed, photos, access notes, and preferred day. The team can confirm availability and guide you if a different service is better.
            </p>
            <div className="mt-5 grid gap-3">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href={serviceAreaHref}>
                <HugeiconsIcon icon={DocumentValidationIcon} className="icon" size={18} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                View service + area page
              </Link>
              <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-emerald-950" href={`https://wa.me/971552232850?text=Hi%2C%20I%20need%20${encodeURIComponent(serviceName)}%20in%20${encodeURIComponent(page.location.name)}.%20Can%20you%20send%20a%20quote%3F`}>
                <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={18} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                WhatsApp Just Shine
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#fbfff7] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Related pages</p>
          <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">Continue with the most relevant page</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [`${serviceName} details`, `/services/${page.service.slug}`, "Main service scope and pricing"],
              [`${page.location.name} area guide`, `/areas/${page.location.slug}`, "All services in this area"],
              [`${serviceName} in ${page.location.shortName}`, serviceAreaHref, "Combined service and area page"],
              ["Pricing and discounts", "/pricing", "Rates, packages, and booking notes"],
            ].map(([title, href, text]) => (
              <Link className="rounded-2xl bg-white p-5 ring-1 ring-emerald-950/10 transition hover:bg-lime-50" href={href} key={href}>
                <h3 className="text-base font-medium text-emerald-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Local FAQs</p>
          <h2 className="mt-4 text-2xl font-medium text-emerald-950 sm:text-3xl">
            Questions about {serviceName.toLowerCase()} in {page.location.name}
          </h2>
          <div className="mt-7">
            <FaqAccordion items={faqs} idPrefix={`local-guide-${page.slug}`} defaultOpenCount={2} />
          </div>
        </div>
      </section>
    </>
  );
}
