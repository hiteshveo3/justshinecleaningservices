import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, CallIcon, InstagramIcon, SparklesIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { FooterAccordion } from "./footer-accordion";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { SiteSearch } from "./site-search";
import { services, site } from "@/lib/content";

const nav = [
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

const serviceGroups = [
  { title: "Residential", items: ["home-cleaning", "deep-cleaning", "villa-cleaning", "apartment-cleaning", "move-in-out-cleaning"] },
  { title: "Specialty", items: ["sofa-cleaning", "carpet-cleaning", "window-cleaning", "pest-control"] },
  { title: "Commercial", items: ["office-cleaning", "restaurant-cleaning", "showroom-cleaning"] },
];

const popularServices = ["deep-cleaning", "villa-cleaning", "sofa-cleaning"];

const legalLinks = [
  ["Terms & Conditions", "/terms"],
  ["Privacy Policy", "/privacy"],
  ["Refund Policy", "/refund-policy"],
  ["Accessibility", "/accessibility"],
  ["Sustainability", "/sustainability"],
  ["Anti-Discrimination", "/anti-discrimination"],
  ["Disclaimer", "/disclaimer"],
  ["Cookie Policy", "/cookie-policy"],
  ["Service Level Agreement", "/sla"],
];

export function Header() {
  const whatsappHref = `https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent("I need cleaning")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-950/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-medium text-emerald-950">
          <span className="grid size-10 place-items-center rounded bg-lime-300 text-emerald-950"><HugeiconsIcon icon={SparklesIcon} className="icon" size={21} color="currentColor" strokeWidth={2} aria-hidden="true" /></span>
          <span className="leading-tight">
            <span className="block sm:hidden">Just Shine Cleaning Services</span>
            <span className="hidden sm:block">Just Shine Cleaning Services</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-normal text-slate-700 md:flex">
          <div className="group relative py-3">
            <Link href="/services" className="inline-flex items-center gap-1 rounded-lg px-3 py-2 transition hover:bg-lime-50 hover:text-emerald-900">
              Services
              <HugeiconsIcon icon={ArrowDown01Icon} className="icon transition group-hover:rotate-180" size={15} color="currentColor" strokeWidth={2} aria-hidden="true" />
            </Link>
            <div className="invisible fixed left-1/2 top-[3.72rem] w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 pt-2 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-emerald-950/10 bg-white shadow-[0_18px_48px_rgba(16,35,27,.14)]">
                <div className="grid lg:grid-cols-[15rem_1fr_15rem]">
                  <div className="bg-[linear-gradient(145deg,#d9ff42_0%,#efffd6_60%,#f8fff3_100%)] p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-emerald-900">Most booked</p>
                    <div className="mt-3 grid gap-1">
                      {popularServices.map((slug) => {
                        const service = services.find((item) => item.slug === slug)!;
                        return (
                          <Link className="rounded-lg px-3 py-2.5 transition hover:bg-white/80" href={`/services/${service.slug}`} key={service.slug}>
                            <span className="block text-sm font-medium text-emerald-950">{service.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-emerald-900 px-4 text-sm font-medium text-white" href="/services">
                      View all services
                    </Link>
                  </div>

                  <div className="grid gap-4 p-4 lg:grid-cols-3">
                    {serviceGroups.map((group) => (
                      <div key={group.title}>
                        <h3 className="text-sm font-medium text-emerald-950">{group.title}</h3>
                        <div className="mt-2 grid divide-y divide-emerald-950/10">
                          {group.items.map((slug) => {
                            const service = services.find((item) => item.slug === slug)!;
                            return (
                              <Link className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-950 transition hover:bg-lime-50 hover:text-emerald-900 focus:bg-lime-50 focus:text-emerald-900" key={service.slug} href={`/services/${service.slug}`}>
                                {service.name.replace(" Services", "")}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-emerald-950/10 bg-[#f8fff3] p-4 lg:border-l lg:border-t-0">
                    <div>
                      <p className="text-sm font-medium text-emerald-950">Need exact pricing?</p>
                      <p className="mt-2 text-xs leading-5 text-slate-600">Use the advanced calculator for service, property, urgency, add-ons, and savings.</p>
                      <Link className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href="/pricing">
                        Open calculator
                      </Link>
                    </div>
                    <div className="mt-3 grid gap-2">
                      <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-4 text-sm font-medium text-white" href={`tel:${site.tel}`}>
                        <HugeiconsIcon icon={CallIcon} className="icon" size={16} color="currentColor" strokeWidth={2} aria-hidden="true" />
                        Call now
                      </a>
                      <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href={whatsappHref}>
                        <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                        WhatsApp
                      </a>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-slate-600">{site.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {nav.filter(([label]) => label !== "Services").map(([label, href]) => <Link key={href} href={href} className="rounded-lg px-3 py-2 transition hover:bg-lime-50 hover:text-emerald-900">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <SiteSearch />
          <a className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white" href={`tel:${site.tel}`}>
            <HugeiconsIcon icon={CallIcon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
            Call now
          </a>
        </div>
        <a className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-3 py-2 text-sm font-medium text-emerald-950 md:hidden" href={whatsappHref}>
          <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(135deg,#d9ff42_0%,#efffd6_62%,#f8fff3_100%)] pb-24 text-emerald-950 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-xl font-medium">{site.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">{site.location}</p>
          </div>
          <div className="hidden gap-3 md:flex">
            <a className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/80 px-4 py-3 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`tel:${site.tel}`}>
              <HugeiconsIcon icon={CallIcon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
              Call now
            </a>
            <a className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 py-3 text-sm font-medium text-emerald-950 ring-1 ring-lime-600/20" href={`https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent("I need cleaning service details")}`}>
              <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:hidden">
          <FooterAccordion title="Services">
            {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}
          </FooterAccordion>
          <FooterAccordion title="Company">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/testimonials">Testimonials</Link>
          </FooterAccordion>
          <FooterAccordion title="Legal">
            {legalLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </FooterAccordion>
        </div>

        <div className="mt-10 hidden grid-cols-4 gap-8 md:grid">
          <div>
            <h3 className="font-medium">Services</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}
            </div>
          </div>
          <div>
            <h3 className="font-medium">Company</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <Link href="/about">About</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/testimonials">Testimonials</Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Legal</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              {legalLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          </div>
          <div>
            <h3 className="font-medium">Contact</h3>
            <p className="mt-3 text-sm text-slate-700">Business: {site.email}</p>
            <p className="mt-2 text-sm text-slate-700">Gmail: {site.socialEmail}</p>
            <div className="mt-5 flex gap-3 text-sm">
              <a className="inline-flex items-center gap-2 rounded-lg border border-emerald-950/10 bg-white/70 px-3 py-2 text-emerald-950" href={site.instagram} target="_blank" rel="noreferrer">
                <HugeiconsIcon icon={InstagramIcon} className="icon" size={17} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                Instagram
              </a>
              <a className="rounded-lg border border-emerald-950/10 bg-white/70 px-3 py-2 text-emerald-950" href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </footer>
  );
}
