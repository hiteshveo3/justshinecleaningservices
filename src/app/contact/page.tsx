import { CtaButtons } from "@/components/cta-buttons";
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

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    telephone: site.phone,
    email: site.email,
    address: site.location,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: site.phone,
      email: site.email,
      areaServed: "Abu Dhabi, UAE",
      availableLanguage: ["English", "Arabic", "Urdu", "Hindi"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="section hero-gradient">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Contact Just Shine Cleaning Services</p>
            <h1 className="mt-4 text-3xl font-medium leading-tight text-emerald-950 sm:text-4xl">We&apos;re here to help with cleaning quotes.</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">Multiple ways to reach us. Choose what works best for you and get a free quote for cleaning services in Abu Dhabi.</p>
            <div className="mt-6 max-w-xl"><CtaButtons service="home" /></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Phone", site.phone, "Immediate response"],
              ["WhatsApp", site.phone, "Fastest for photos and quotes"],
              ["Business email", site.email, "Primary email"],
              ["Gmail", site.socialEmail, "Alternate email"],
              ["Location", site.location, "8:00 AM - 8:00 PM daily"],
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
          <form className="card grid gap-4 bg-[#f7fff0] p-5 sm:p-6" action="/api/contact" method="post">
            <input className="rounded-lg border border-emerald-950/10 bg-white p-3" name="name" placeholder="Name" required />
            <input className="rounded-lg border border-emerald-950/10 bg-white p-3" name="email" type="email" placeholder="Email" required />
            <input className="rounded-lg border border-emerald-950/10 bg-white p-3" name="phone" placeholder="Phone" required />
            <select className="rounded-lg border border-emerald-950/10 bg-white p-3" name="serviceType" required>
              <option value="">Service type</option>
              {services.map((service) => <option key={service.slug}>{service.name}</option>)}
              <option>Other</option>
            </select>
            <input className="rounded-lg border border-emerald-950/10 bg-white p-3" name="area" placeholder="Address / Area" />
            <textarea className="min-h-32 rounded-lg border border-emerald-950/10 bg-white p-3" name="message" placeholder="Message / special requests" required />
            <button className="btn-primary" type="submit">Get free quote</button>
          </form>
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
