import { ServicesIndex } from "@/components/services-index";
import { getServices } from "@/lib/data";

export const metadata = {
  title: "Cleaning Services Abu Dhabi | Just Shine Cleaning Services",
  description: "Explore Just Shine Cleaning Services in Abu Dhabi with search, filters, pricing, WhatsApp booking, and service details.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Services</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl lg:text-[2.65rem]">Find the right cleaning service in Abu Dhabi</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">Search residential, commercial, and specialty cleaning services with clear starting prices and fast WhatsApp booking.</p>
        <ServicesIndex services={services} />
      </div>
    </section>
  );
}
