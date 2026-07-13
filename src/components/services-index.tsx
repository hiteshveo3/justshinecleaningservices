"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Cancel01Icon, FilterHorizontalIcon, GlobalSearchIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { servicePriceLabel, site, type Service } from "@/lib/content";

const brandCleaningImage = "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp";

const categoryBySlug: Record<string, string> = {
  "home-cleaning": "Residential",
  "deep-cleaning": "Residential",
  "villa-cleaning": "Residential",
  "apartment-cleaning": "Residential",
  "move-in-out-cleaning": "Residential",
  "office-cleaning": "Commercial",
  "restaurant-cleaning": "Commercial",
  "showroom-cleaning": "Commercial",
  "carpet-cleaning": "Specialty",
  "sofa-cleaning": "Specialty",
  "pest-control": "Specialty",
  "window-cleaning": "Specialty",
};

function serviceCategory(service: Service) {
  return categoryBySlug[service.slug] || "Specialty";
}

function serviceWhatsappHref(service: Service) {
  const message = [
    `Hi Just Shine Cleaning Services, I need ${service.name} in Abu Dhabi.`,
    "Please share availability and a quote.",
    `Service: ${service.name}`,
    `Starting price shown: ${servicePriceLabel(service)}`,
    `Scope shown: ${service.scope}`,
    "Location:",
    "Preferred date/time:",
    "Photos/details:",
  ].join("\n");

  return `https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function ServicesIndex({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [priceUnit, setPriceUnit] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState("Recommended");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(services.map(serviceCategory)))], [services]);
  const priceUnits = useMemo(() => ["All", ...Array.from(new Set(services.map((service) => service.priceUnit)))], [services]);

  const filteredServices = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [...services]
      .filter((service) => category === "All" || serviceCategory(service) === category)
      .filter((service) => priceUnit === "All" || service.priceUnit === priceUnit)
      .filter((service) => service.price <= maxPrice)
      .filter((service) => {
        if (!search) return true;
        return `${service.name} ${service.description} ${service.scope} ${service.highlights.join(" ")}`.toLowerCase().includes(search);
      })
      .sort((a, b) => {
        if (sort === "Price low") return a.price - b.price;
        if (sort === "Price high") return b.price - a.price;
        return services.findIndex((service) => service.slug === a.slug) - services.findIndex((service) => service.slug === b.slug);
      });
  }, [category, maxPrice, priceUnit, query, services, sort]);

  const activeFilters = [category !== "All", priceUnit !== "All", maxPrice !== 100, sort !== "Recommended"].filter(Boolean).length;
  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setPriceUnit("All");
    setMaxPrice(100);
    setSort("Recommended");
  };

  return (
    <div className="mt-8">
      <div className="rounded-2xl bg-lime-50 p-4 ring-1 ring-emerald-950/10">
        <label className="relative">
          <span className="sr-only">Search services</span>
          <HugeiconsIcon icon={GlobalSearchIcon} className="icon absolute left-3 top-1/2 -translate-y-1/2 text-emerald-900" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
          <input className="min-h-11 w-full rounded-lg border border-emerald-950/10 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" onChange={(event) => setQuery(event.target.value)} placeholder="Search home, sofa, pest, office..." type="search" value={query} />
        </label>

        <div className="mt-4 hidden items-center justify-between gap-3 lg:flex">
          <div className="flex flex-wrap gap-3">
            <FilterDropdown label="Category" name="category" options={categories} value={category} onChange={setCategory} openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <FilterDropdown label="Price type" name="priceUnit" options={priceUnits} value={priceUnit} onChange={setPriceUnit} openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <FilterDropdown label="Sort" name="sort" options={["Recommended", "Price low", "Price high"]} value={sort} onChange={setSort} openFilter={openFilter} setOpenFilter={setOpenFilter} />
          </div>
          {activeFilters > 0 && <button className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-950/10" onClick={resetFilters} type="button">Reset</button>}
        </div>

        <div className="mt-4 hidden max-w-md lg:block">
          <PriceRange maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
        </div>

        <button className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-900 px-4 text-sm font-medium text-white lg:hidden" onClick={() => setDrawerOpen(true)} type="button">
          <HugeiconsIcon icon={FilterHorizontalIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
          Filters {activeFilters > 0 ? `(${activeFilters})` : ""}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">{filteredServices.length} services found</p>
        {(query || activeFilters > 0) && (
          <div className="flex flex-wrap gap-2">
            {query && <span className="rounded-lg bg-lime-50 px-3 py-1.5 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10">Search: {query}</span>}
            {category !== "All" && <span className="rounded-lg bg-lime-50 px-3 py-1.5 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10">{category}</span>}
            {priceUnit !== "All" && <span className="rounded-lg bg-lime-50 px-3 py-1.5 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10">{priceUnit}</span>}
            {maxPrice !== 100 && <span className="rounded-lg bg-lime-50 px-3 py-1.5 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10">Max AED {maxPrice}</span>}
            {sort !== "Recommended" && <span className="rounded-lg bg-lime-50 px-3 py-1.5 text-xs font-medium text-emerald-950 ring-1 ring-emerald-950/10">{sort}</span>}
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <article className="service-card group p-3" key={service.slug}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-lime-100">
              <Image alt={`${service.name} by Just Shine Cleaning Services`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={service.images[0] || brandCleaningImage} />
              <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1 text-xs font-medium text-emerald-900 ring-1 ring-emerald-950/10">{serviceCategory(service)}</span>
              <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs text-emerald-900 ring-1 ring-emerald-950/10">{servicePriceLabel(service)}</span>
            </div>
            <div className="p-2 pt-5">
              <h2 className="text-xl font-medium text-emerald-950">{service.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{service.description}</p>
              <p className="mt-3 rounded-lg bg-white px-3 py-2 text-xs text-emerald-900 ring-1 ring-emerald-950/10">{service.scope}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.highlights.slice(0, 3).map((highlight) => <span className="rounded-lg bg-white px-2.5 py-1 text-xs text-slate-700 ring-1 ring-emerald-950/10" key={highlight}>{highlight}</span>)}
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950" href={serviceWhatsappHref(service)}>
                  <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
                  WhatsApp
                </a>
                <Link className="inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-950/10 px-4 text-sm font-medium text-emerald-900" href={`/services/${service.slug}`}>Details</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="mt-6 rounded-xl bg-lime-50 p-5 text-sm text-slate-700 ring-1 ring-emerald-950/10">
          <p className="font-medium text-emerald-950">No services matched.</p>
          <p className="mt-2">Try resetting filters or searching sofa, office, home, pest, or window cleaning.</p>
          <button className="mt-4 rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white" onClick={resetFilters} type="button">Reset filters</button>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Service filters">
          <button className="absolute inset-0 bg-emerald-950/35" onClick={() => setDrawerOpen(false)} type="button" aria-label="Close filters" />
          <div className="absolute bottom-0 right-0 top-0 flex w-[min(22rem,90vw)] flex-col bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-emerald-950">Service filters</h2>
              <button className="grid size-10 place-items-center rounded-lg bg-lime-50 text-emerald-950" onClick={() => setDrawerOpen(false)} type="button" aria-label="Close filters">
                <HugeiconsIcon icon={Cancel01Icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} />
              </button>
            </div>
            <div className="mt-5 flex-1 space-y-5 overflow-y-auto">
              <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} />
              <FilterGroup label="Price type" options={priceUnits} value={priceUnit} onChange={setPriceUnit} />
              <FilterGroup label="Sort" options={["Recommended", "Price low", "Price high"]} value={sort} onChange={setSort} />
              <PriceRange maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-emerald-950/10 pt-4">
              <button className="rounded-lg bg-lime-50 px-4 py-3 text-sm font-medium text-emerald-900" onClick={resetFilters} type="button">Reset</button>
              <button className="rounded-lg bg-emerald-900 px-4 py-3 text-sm font-medium text-white" onClick={() => setDrawerOpen(false)} type="button">Show results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PriceRange({ maxPrice, setMaxPrice }: { maxPrice: number; setMaxPrice: (value: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase text-emerald-800">Max starting price</p>
        <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-emerald-900 ring-1 ring-emerald-950/10">AED {maxPrice}</span>
      </div>
      <input className="pricing-range mt-3 w-full" max="100" min="30" onChange={(event) => setMaxPrice(Number(event.target.value))} step="10" type="range" value={maxPrice} />
    </div>
  );
}

function FilterDropdown({ label, name, options, value, onChange, openFilter, setOpenFilter }: { label: string; name: string; options: string[]; value: string; onChange: (value: string) => void; openFilter: string | null; setOpenFilter: (value: string | null) => void }) {
  const open = openFilter === name;
  return (
    <div className="relative">
      <button className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" onClick={() => setOpenFilter(open ? null : name)} type="button" aria-expanded={open}>
        <span className="text-slate-600">{label}</span>
        <span>{value}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} className={`icon transition ${open ? "rotate-180" : ""}`} size={16} color="currentColor" strokeWidth={2} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 grid max-h-72 w-64 gap-1 overflow-y-auto rounded-xl border border-emerald-950/10 bg-white p-2 shadow-lg">
          {options.map((option) => (
            <button className={`rounded-lg px-3 py-2 text-left text-sm ${option === value ? "bg-emerald-900 text-white" : "text-slate-700 hover:bg-lime-50"}`} key={option} onClick={() => { onChange(option); setOpenFilter(null); }} type="button">
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-emerald-800">{label}</p>
      <div className="mt-2 grid gap-2">
        {options.map((option) => (
          <button className={`rounded-lg px-3 py-2 text-left text-sm ${option === value ? "bg-emerald-900 text-white" : "bg-lime-50 text-slate-700"}`} key={option} onClick={() => onChange(option)} type="button">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
