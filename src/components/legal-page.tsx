import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import type { LegalPage } from "@/lib/legal-pages";
import { site } from "@/lib/content";

export function LegalPageView({ page }: { page: LegalPage }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${page.title} - Just Shine Cleaning Services`,
    description: page.description,
    url: `${site.url}/${page.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="section hero-gradient">
        <div className="container grid gap-8 lg:grid-cols-[.9fr_.6fr] lg:items-end">
          <div>
            <p className="eyebrow-lime">Just Shine Cleaning Services policy</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-medium leading-tight text-emerald-950 sm:text-4xl">{page.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">{page.description}</p>
            {page.effectiveDate ? <p className="mt-4 text-sm text-emerald-900">Effective date: {page.effectiveDate}</p> : null}
          </div>
          <div className="rounded-lg border border-emerald-950/10 bg-white/70 p-5">
            <p className="text-sm font-medium text-emerald-950">Need help with a booking?</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">Call or WhatsApp us for cleaning service questions, policy clarification, or a free quote.</p>
            <div className="mt-4">
              <CtaButtons service="policy support" />
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-[16rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-emerald-950/10 bg-lime-50 p-4">
              <p className="text-sm font-medium text-emerald-950">On this page</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-700">
                {page.sections.map((section) => (
                  <a key={section.title} href={`#${slugify(section.title)}`} className="rounded px-2 py-1 hover:bg-white hover:text-emerald-900">
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>
          <div className="space-y-4">
            {page.sections.map((section) => (
              <article id={slugify(section.title)} key={section.title} className="rounded-lg border border-emerald-950/10 bg-[#f7fff0] p-5 sm:p-6">
                <h2 className="text-xl font-medium text-emerald-950">{section.title}</h2>
                {section.body ? <p className="mt-3 text-base leading-7 text-slate-700">{section.body}</p> : null}
                {section.bullets ? (
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
            <div className="rounded-lg border border-emerald-950/10 bg-white p-5">
              <p className="text-sm leading-6 text-slate-700">
                For questions, contact <Link className="font-medium text-emerald-900" href="/contact">Just Shine Cleaning Services</Link> at {site.email}, {site.socialEmail}, or {site.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
