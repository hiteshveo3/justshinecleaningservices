import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { AppWindowIcon, BrushCleaningIcon, CheckmarkCircle02Icon, CleaningBucketIcon, CleanIcon, Clock01Icon, CustomerService01Icon, Location01Icon, OfficeIcon, Sofa01Icon, StarIcon, VacuumCleanerIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { CtaButtons } from "@/components/cta-buttons";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd, localBusinessSchema } from "@/components/seo";
import { faqs, servicePriceLabel, services, site, testimonials } from "@/lib/content";

const serviceIcons = [CleaningBucketIcon, CleanIcon, OfficeIcon, VacuumCleanerIcon, Sofa01Icon, AppWindowIcon, BrushCleaningIcon];
const brandCleaningImage = "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp";
const mainServiceSlugs = ["home-cleaning", "deep-cleaning", "villa-cleaning", "office-cleaning", "carpet-cleaning", "sofa-cleaning"];
const mainServices = services.filter((service) => mainServiceSlugs.includes(service.slug));
const processSteps = [
  { title: "Send details", text: "Share service type, location, timing, and photos on WhatsApp.", icon: WhatsappBusinessIcon },
  { title: "Get guidance", text: "We confirm the right scope, starting price, and available slot.", icon: CustomerService01Icon },
  { title: "Team arrives", text: "Trained cleaners bring the standard supplies and follow the agreed plan.", icon: Clock01Icon },
];
const trustPoints = [
  "Residential and commercial cleaning",
  "Clear starting prices before booking",
  "WhatsApp quote with photos and location",
  "Flexible hourly and visit-based services",
];
const cleaningPlans = [
  { title: "Quick refresh", text: "For regular dust, floors, bathrooms, and visible daily mess.", href: "/services/home-cleaning" },
  { title: "Full reset", text: "For hidden dust, grease, grout, corners, and detailed home cleaning.", href: "/services/deep-cleaning" },
  { title: "Special care", text: "For sofas, carpets, windows, pest control, offices, and move-in/out cleaning.", href: "/services" },
];
const serviceAreas = ["Al Danah", "Al Reem Island", "Khalifa City", "Yas Island", "Saadiyat Island", "Mussafah", "Al Reef", "Downtown Abu Dhabi"];
const serviceBenefits: Record<string, string> = {
  "villa-cleaning": "Deep villa cleaning for move-in, weekly, and one-time refreshes.",
  "home-cleaning": "Flexible home cleaning for apartments, families, and busy schedules.",
  "deep-cleaning": "Intensive deep cleaning for hidden dust, bacteria, and hard-to-reach corners.",
  "office-cleaning": "Professional workspace cleaning before, after, or between office hours.",
  "carpet-cleaning": "Fresh carpet care for stains, odors, dust, and high-traffic areas.",
  "sofa-cleaning": "Fabric-safe sofa and upholstery cleaning for fresher living rooms.",
  "pest-control": "Targeted pest control for cockroaches, bed bugs, ants, and common pests.",
  "window-cleaning": "Clear glass, frames, and tracks for brighter homes and offices.",
  "move-in-out-cleaning": "Complete property cleaning before moving in or after moving out.",
  "restaurant-cleaning": "Hygiene-focused cleaning for kitchens, dining spaces, and washrooms.",
  "apartment-cleaning": "Reliable cleaning for studios, 1BHK, 2BHK, and larger apartments.",
  "showroom-cleaning": "Presentation-ready showroom cleaning for floors, glass, and displays.",
};

function serviceWhatsappHref(serviceName: string, priceLabel: string, duration: number, scope: string) {
  const message = [
    `Hi Just Shine Cleaning Services, I need ${serviceName} in Abu Dhabi.`,
    `Please share availability and a quote.`,
    `Service: ${serviceName}`,
    `Starting price shown: ${priceLabel}`,
    `Typical duration shown: ${duration} hours`,
    `Scope shown: ${scope}`,
    "Location:",
    "Preferred date/time:",
    "Photos/details:",
  ].join("\n");

  return `https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">Abu Dhabi cleaning company</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-[2.65rem] lg:text-[3rem]">Professional Cleaning Services in Abu Dhabi</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">Villa, home, office, carpet, sofa, and window cleaning by trained teams with fast Call and WhatsApp booking.</p>
            <div className="mt-8"><CtaButtons service="home" /></div>
            <div className="mt-8 grid gap-3 text-sm font-normal text-emerald-950 sm:grid-cols-3">
              {["Same-week slots", "Trained cleaners", "Supplies included"].map((item) => <span key={item} className="flex items-center gap-2"><HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />{item}</span>)}
            </div>
          </div>
          <div className="relative">
            <div className="elevated relative aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
              <Image
                alt="Professional cleaner preparing a bright Abu Dhabi home"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                src={brandCleaningImage}
              />
              <div className="absolute bottom-4 left-4 max-w-[18rem] rounded-xl bg-white/92 p-3 ring-1 ring-emerald-950/10 backdrop-blur">
                <p className="text-sm font-medium text-emerald-950">Homes | Offices</p>
                <p className="mt-1 text-xs text-slate-600">Fast cleaning quotes in Abu Dhabi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4">
            {trustPoints.map((point) => (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-950/10 bg-[#f8fff3] p-4" key={point}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-lime-300 text-emerald-950">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="icon" size={18} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <p className="text-sm font-medium leading-5 text-emerald-950">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container">
          <p className="eyebrow">Services</p>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-2xl font-medium text-emerald-950 sm:text-3xl">Main services</h2>
            <Link className="font-medium text-emerald-800 underline" href="/services">View all services</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {mainServices.map((service, index) => (
              <article className="service-card p-3" key={service.slug}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-lime-100">
                  <Image
                    alt={`${service.name} by Just Shine Cleaning Services`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={service.images[0] || brandCleaningImage}
                  />
                  <span className="absolute left-4 top-4 service-icon bg-white/95">
                    <HugeiconsIcon icon={serviceIcons[index] || CleaningBucketIcon} className="icon" size={23} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs text-emerald-900 ring-1 ring-emerald-950/10">{servicePriceLabel(service)}</span>
                </div>
                <div className="p-2 pt-5">
                  <h3 className="text-xl font-medium text-emerald-950">{service.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{serviceBenefits[service.slug] || service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.highlights.slice(0, 3).map((highlight) => (
                      <span className="rounded-lg bg-white px-2.5 py-1 text-xs text-emerald-950 ring-1 ring-emerald-950/10" key={highlight}>{highlight}</span>
                    ))}
                  </div>
                  <div className="mt-5 rounded-lg bg-white/80 px-3 py-2 ring-1 ring-emerald-950/10">
                    <span className="text-sm font-medium text-emerald-950">{servicePriceLabel(service)} <span className="font-normal text-slate-600">| {service.duration} hrs</span></span>
                  </div>
                  <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                    <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href={serviceWhatsappHref(service.name, servicePriceLabel(service), service.duration, service.scope)}>
                      <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
                      WhatsApp
                    </a>
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-950/10 px-4 text-sm font-medium text-emerald-900" href={`/services/${service.slug}`}>Details</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-lime-50">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="mt-3 max-w-md text-2xl font-medium leading-tight text-emerald-950 sm:text-3xl">Trusted across Abu Dhabi.</h2>
            </div>
            <Link className="inline-flex text-sm font-medium text-emerald-800 underline" href="/testimonials">View all reviews</Link>
          </div>

          <div className="reviews-marquee mt-8">
            <div className="reviews-track gap-4 py-1">
              {[...testimonials, ...testimonials].map((item, index) => (
                <figure className="flex w-[18rem] shrink-0 flex-col justify-between rounded-xl border border-emerald-950/10 bg-white p-5 sm:w-[21rem]" key={`${item.name}-${index}`}>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex gap-1 text-lime-600">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <HugeiconsIcon icon={StarIcon} className="icon" key={i} size={16} color="currentColor" strokeWidth={2} aria-hidden="true" />
                        ))}
                      </div>
                      <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[11px] text-emerald-900">{item.area}</span>
                    </div>
                    <blockquote className="mt-4 text-sm leading-6 text-slate-700">&ldquo;{item.quote}&rdquo;</blockquote>
                  </div>
                  <figcaption className="mt-5 border-t border-emerald-950/10 pt-4">
                    <span className="block font-medium text-emerald-950">{item.name}</span>
                    <span className="mt-1 block text-xs text-slate-600">{item.service}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

        </div>
      </section>
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="mt-3 text-2xl font-medium leading-tight text-emerald-950 sm:text-3xl">Simple booking.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-700 sm:text-base">No complicated booking flow for Phase 1. Call or WhatsApp, share the details, and we guide you to the right cleaning service.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <article className="rounded-xl border border-emerald-950/10 bg-[#f8fff3] p-5" key={step.title}>
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-lg bg-lime-300 text-emerald-950">
                      <HugeiconsIcon icon={step.icon} className="icon" size={21} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-emerald-800">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-emerald-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-lime-50">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Choose a plan</p>
              <h2 className="mt-3 max-w-xl text-2xl font-medium leading-tight text-emerald-950 sm:text-3xl">Pick the cleaning level that fits the job.</h2>
            </div>
            <Link className="font-medium text-emerald-800 underline" href="/pricing">See pricing</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cleaningPlans.map((plan, index) => (
              <Link className="rounded-xl border border-emerald-950/10 bg-white p-5 transition hover:bg-[#f8fff3]" href={plan.href} key={plan.title}>
                <span className="text-sm font-medium text-emerald-700">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-medium text-emerald-950">{plan.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{plan.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-[linear-gradient(135deg,#f8fff3_0%,#efffd6_60%,#dff8e8_100%)]">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Coverage</p>
              <h2 className="mt-3 text-2xl font-medium leading-tight text-emerald-950 sm:text-3xl">Abu Dhabi service areas.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">Based near Al Jazeera Towers, Al Danah. Share your location and we will confirm team availability for your area.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" key={area}>
                  <HugeiconsIcon icon={Location01Icon} className="icon" size={17} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-3 text-2xl font-medium text-emerald-950 sm:text-3xl">Quick questions</h2>
            </div>
            <Link className="font-medium text-emerald-800 underline" href="/faq">View all FAQs</Link>
          </div>
          <div className="mt-8"><FaqAccordion items={faqs.slice(0, 3)} /></div>
        </div>
      </section>
    </>
  );
}
