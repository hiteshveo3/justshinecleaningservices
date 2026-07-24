import { ServicesIndex } from "@/components/services-index";
import { JsonLd, breadcrumbSchema } from "@/components/seo";
import { getServices } from "@/lib/data";

export const metadata = {
  title: "Cleaning Services Abu Dhabi | Just Shine Cleaning Services",
  description: "Explore Just Shine Cleaning Services in Abu Dhabi with search, filters, pricing, WhatsApp booking, and service details.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const serviceCount = services.length;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])} />
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] p-5 ring-1 ring-emerald-950/10 sm:p-8 lg:p-10">
          <p className="eyebrow-lime">Services</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl lg:text-[2.65rem]">Find the right cleaning service in Abu Dhabi</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">Search residential, commercial, and specialty cleaning services with clear starting prices and fast WhatsApp booking.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              [`${serviceCount} services`, "Residential, commercial, and specialty"],
              ["Clear prices", "Starting rates shown before booking"],
              ["WhatsApp quote", "Send location, timing, and photos"],
            ].map(([title, text]) => (
              <div className="rounded-xl bg-white/80 p-4 ring-1 ring-emerald-950/10" key={title}>
                <p className="font-medium text-emerald-950">{title}</p>
                <p className="mt-1 text-sm leading-5 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <ServicesIndex services={services} />
        </div>
      </section>
    </>
  );
}
