import { CtaButtons } from "@/components/cta-buttons";
import { ContactForm } from "@/components/contact-form";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { services, site } from "@/lib/content";

export const metadata = {
  title: "Contact Just Shine Cleaning Services Abu Dhabi",
  description: "Contact Just Shine Cleaning Services for professional cleaning in Abu Dhabi. WhatsApp, phone, business email, Gmail, and quote requests.",
};

const bookingFaqs = [
  ["What's the fastest way to book?", "WhatsApp is fastest. Send your service details and photos to get a quick quote."],
  ["Can I book same-day cleaning?", "Yes, same-day cleaning is available when teams have open slots nearby."],
  ["How long does a quote take?", "Phone is immediate, WhatsApp is usually fast, and email responses are normally within 2 hours."],
  ["What information do you need?", "Service type, property size, area, preferred date/time, and photos if the job needs inspection."],
];

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ sent?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const sent = params.sent;
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    telephone: site.phone,
    email: site.email,
    url: site.url,
    image: `${site.url}${site.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
    sameAs: [site.facebook, site.instagram, site.googleMapsUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: site.phone,
      email: site.email,
      areaServed: "Abu Dhabi, UAE",
      availableLanguage: ["English", "Arabic", "Urdu", "Hindi"],
      hoursAvailable: site.openingHoursLabel,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />
      <section className="section hero-gradient">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Contact Just Shine Cleaning Services</p>
            <h1 className="mt-4 text-3xl font-medium leading-tight text-emerald-950 sm:text-4xl">We&apos;re here to help with cleaning quotes.</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">Multiple ways to reach us. Choose what works best for you and get a free quote for cleaning services in Abu Dhabi.</p>
            {sent === "1" && (
              <p className="mt-5 rounded-lg bg-white/85 p-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10">Thanks. Your request was received. We will contact you soon.</p>
            )}
            {sent === "0" && (
              <p className="mt-5 rounded-lg bg-white/85 p-4 text-sm font-medium text-emerald-950 ring-1 ring-red-200">Please fill name, email, phone, service type, and message.</p>
            )}
            <div className="mt-6 max-w-xl"><CtaButtons service="home" /></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Phone", site.phone, "Immediate response"],
              ["WhatsApp", site.phone, "Fastest for photos and quotes"],
              ["Business email", site.email, "Primary email"],
              ["Gmail", site.socialEmail, "Alternate email"],
              ["Location", site.location, site.openingHoursLabel],
              ["Trust", `${site.rating.value}/${site.rating.best} Google`, `${site.rating.count}+ reviews · ${site.yearsExperience}+ years`],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-lg border border-emerald-950/10 bg-white/75 p-5">
                <p className="text-sm text-slate-600">{label}</p>
                <p className="mt-2 font-medium text-emerald-950">{value}</p>
                <p className="mt-2 text-xs text-slate-600">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[.85fr_1fr]">
          <div>
            <p className="eyebrow">Free quote</p>
            <h2 className="mt-3 text-2xl font-medium text-emerald-950">Tell us what needs cleaning.</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">Share the service type, area, preferred time, and special requests. For sofa, carpet, window, or post-construction cleaning, photos help us quote faster.</p>
            <div className="mt-6 rounded-lg border border-emerald-950/10 bg-[#f7fff0] p-5">
              <h3 className="font-medium text-emerald-950">Response times</h3>
              <div className="mt-3 grid gap-2 text-sm text-slate-700">
                <p>WhatsApp: fastest response</p>
                <p>Phone: immediate</p>
                <p>Email: usually within 2 hours</p>
              </div>
            </div>
          </div>
          <ContactForm services={services} />
        </div>
      </section>

      <section className="section bg-lime-50">
        <div className="container">
          <p className="eyebrow">Booking questions</p>
          <h2 className="mt-3 text-2xl font-medium text-emerald-950">Quick answers before you book.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {bookingFaqs.map(([q, a]) => (
              <div key={q} className="rounded-lg border border-emerald-950/10 bg-white p-5">
                <h3 className="font-medium text-emerald-950">{q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
