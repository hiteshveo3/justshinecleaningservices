import Image from "next/image";
import { JsonLd } from "@/components/seo";
import { FaqAccordion } from "@/components/faq-accordion";
import { allFaqs, faqCategories } from "@/lib/faq-data";

const brandCleaningImage = "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp";

export const metadata = {
  title: "Cleaning FAQ Abu Dhabi | Just Shine Cleaning Services",
  description: "Detailed answers about deep cleaning, villa cleaning, cleaning frequency, booking, supplies, and Just Shine Cleaning Services in Abu Dhabi.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: allFaqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }} />
      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#ecffd0_42%,#c9f7d9_100%)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow w-fit bg-white/75 text-emerald-900 ring-1 ring-emerald-950/10">FAQ</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-tight text-emerald-950 sm:text-5xl">
              Cleaning FAQs for Abu Dhabi
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Categorized answers about deep cleaning, villa cleaning, schedules, booking, supplies, and service scope.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-lime-100 ring-1 ring-emerald-950/10">
            <Image alt="Just Shine Cleaning Services team ready for home cleaning in Abu Dhabi" className="h-full w-full object-cover" fill priority sizes="(min-width: 1024px) 36rem, 100vw" src={brandCleaningImage} />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-[#f6fff0] p-4 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">FAQ categories</p>
              <div className="mt-3 grid gap-1 text-sm">
                {faqCategories.map((category) => (
                  <a className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-white hover:text-emerald-900" href={`#${slugify(category.title)}`} key={category.title}>
                    {category.title}
                  </a>
                ))}
              </div>
              <a className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/pricing">View pricing</a>
            </div>
          </aside>
          <div className="space-y-10">
            <div className="no-scrollbar sticky top-16 z-20 -mx-4 flex gap-2 overflow-x-auto border-y border-emerald-950/10 bg-white/95 px-4 py-2 backdrop-blur lg:hidden">
              {faqCategories.map((category) => (
                <a className="shrink-0 rounded-lg bg-[#f6fff0] px-3 py-2 text-sm text-emerald-950 ring-1 ring-emerald-950/10" href={`#${slugify(category.title)}`} key={category.title}>
                  {category.title}
                </a>
              ))}
            </div>
            {faqCategories.map((category, index) => (
              <section className="scroll-mt-28" id={slugify(category.title)} key={category.title}>
                <div className="mb-5 rounded-2xl bg-[linear-gradient(135deg,#f7fff1_0%,#efffcb_58%,#ddf8e8_100%)] p-5 ring-1 ring-emerald-950/10 sm:p-6">
                  <p className="eyebrow w-fit bg-white/80 text-emerald-900 ring-1 ring-emerald-950/10">{category.title}</p>
                  <div className="mt-3">
                    <h2 className="text-2xl font-medium text-emerald-950 sm:text-3xl">{category.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">{category.description}</p>
                  </div>
                </div>
                <FaqAccordion items={category.items} idPrefix={`faq-${index + 1}`} />
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
