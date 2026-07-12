"use client";

import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddCircleIcon, Calendar03Icon, CleaningBucketIcon, Home01Icon, MinusSignIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { pricingServices } from "@/lib/pricing";

const plans = [
  { label: "One-time", discount: 0, note: "Single visit" },
  { label: "Monthly", discount: 0.18, note: "Best home care" },
  { label: "Quarterly", discount: 0.12, note: "Seasonal refresh" },
  { label: "Annual", discount: 0.23, note: "Maximum saving" },
];

const propertyTypes = [
  { label: "Apartment", multiplier: 1, icon: Home01Icon },
  { label: "Villa", multiplier: 1.25, icon: Home01Icon },
  { label: "Office", multiplier: 1.1, icon: CleaningBucketIcon },
  { label: "Restaurant", multiplier: 1.35, icon: CleaningBucketIcon },
];

const urgencyOptions = [
  { label: "Flexible", multiplier: 1, note: "Best price" },
  { label: "48 hours", multiplier: 1.08, note: "Priority slot" },
  { label: "Same day", multiplier: 1.18, note: "Rush visit" },
];

const addOns = [
  { label: "Inside appliances", price: 60 },
  { label: "Balcony / outdoor", price: 80 },
  { label: "Pet odor care", price: 75 },
  { label: "Fabric guard", price: 120 },
  { label: "Window tracks", price: 50 },
  { label: "Post-construction dust", price: 150 },
];

function extractNumber(value: string) {
  const match = value.match(/AED\s?([\d.]+)/i);
  return match ? Number(match[1]) : 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function PricingCalculator() {
  const [serviceSlug, setServiceSlug] = useState(pricingServices[1].slug);
  const [planLabel, setPlanLabel] = useState("Monthly");
  const [propertyLabel, setPropertyLabel] = useState("Villa");
  const [urgencyLabel, setUrgencyLabel] = useState("Flexible");
  const [hours, setHours] = useState(6);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["Inside appliances"]);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const selected = pricingServices.find((service) => service.slug === serviceSlug) || pricingServices[0];
  const plan = plans.find((item) => item.label === planLabel) || plans[0];
  const property = propertyTypes.find((item) => item.label === propertyLabel) || propertyTypes[0];
  const urgency = urgencyOptions.find((item) => item.label === urgencyLabel) || urgencyOptions[0];
  const rate = extractNumber(selected.current);
  const adjustedRate = Math.round(rate * property.multiplier * urgency.multiplier);
  const baseTotal = adjustedRate * hours;
  const addOnTotal = addOns.filter((item) => selectedAddOns.includes(item.label)).reduce((sum, item) => sum + item.price, 0);
  const beforeDiscount = baseTotal + addOnTotal;
  const discountAmount = Math.round(beforeDiscount * plan.discount);
  const estimatedTotal = beforeDiscount - discountAmount;
  const originalTotal = Math.round(extractNumber(selected.original) * hours * property.multiplier + addOnTotal);
  const totalSavings = Math.max(0, originalTotal - estimatedTotal);

  const whatsappText = useMemo(() => {
    return [
      "Hi Just Shine Cleaning Services, I want a detailed quote.",
      `Service: ${selected.name}`,
      `Property: ${property.label}`,
      `Frequency: ${plan.label}`,
      `Urgency: ${urgency.label}`,
      `Hours / units: ${hours}`,
      `Add-ons: ${selectedAddOns.length ? selectedAddOns.join(", ") : "None"}`,
      `Estimated total: AED ${estimatedTotal}`,
      `Estimated saving: AED ${totalSavings}`,
      "Area/location:",
      "Preferred date/time:",
      "Photos/details:",
    ].join("\n");
  }, [estimatedTotal, hours, plan.label, property.label, selected.name, selectedAddOns, totalSavings, urgency.label]);

  const toggleAddOn = (label: string) => {
    setSelectedAddOns((items) => (items.includes(label) ? items.filter((item) => item !== label) : [...items, label]));
  };

  return (
    <div className="rounded-lg bg-[linear-gradient(135deg,#f8fff3_0%,#e7ffd1_50%,#d9ff42_100%)] p-4 ring-1 ring-emerald-950/10 sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <FilterBlock title="Service" subtitle="Pick the main cleaning type">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {pricingServices.map((service) => (
                <button
                  className={`rounded-lg border px-3 py-3 text-left transition ${serviceSlug === service.slug ? "border-emerald-900 bg-emerald-900 text-white" : "border-emerald-950/10 bg-white/75 text-emerald-950 hover:bg-white"}`}
                  key={service.slug}
                  onClick={() => setServiceSlug(service.slug)}
                  type="button"
                >
                  <span className="block text-sm font-medium">{service.name.replace(" Services", "")}</span>
                  <span className={`mt-1 block text-xs ${serviceSlug === service.slug ? "text-lime-100" : "text-slate-600"}`}>{service.current}</span>
                </button>
              ))}
            </div>
          </FilterBlock>

          <div className="grid gap-6 lg:grid-cols-2">
            <FilterBlock title="Frequency" subtitle="Apply contract savings">
              <div className="grid gap-2">
                {plans.map((item) => (
                  <button
                    className={`flex items-center justify-between rounded-lg border px-3 py-3 text-left transition ${planLabel === item.label ? "border-emerald-900 bg-emerald-900 text-white" : "border-emerald-950/10 bg-white/75 text-emerald-950 hover:bg-white"}`}
                    key={item.label}
                    onClick={() => setPlanLabel(item.label)}
                    type="button"
                  >
                    <span>
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className={`block text-xs ${planLabel === item.label ? "text-lime-100" : "text-slate-600"}`}>{item.note}</span>
                    </span>
                    <span className="rounded-full bg-lime-300 px-2 py-1 text-xs text-emerald-950">{Math.round(item.discount * 100)}%</span>
                  </button>
                ))}
              </div>
            </FilterBlock>
            <FilterBlock title="Hours / units" subtitle="Use slider or stepper">
              <div className="rounded-lg bg-white/75 p-4 ring-1 ring-emerald-950/10">
                <div className="flex items-center justify-between gap-3">
                  <button className="grid size-11 place-items-center rounded-lg bg-lime-200 text-emerald-950" onClick={() => setHours((value) => clamp(value - 1, 1, 20))} type="button" aria-label="Decrease hours">
                    <HugeiconsIcon icon={MinusSignIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
                  </button>
                  <div className="text-center">
                    <p className="text-3xl font-medium text-emerald-950">{hours}</p>
                    <p className="text-xs text-slate-600">hours / units</p>
                  </div>
                  <button className="grid size-11 place-items-center rounded-lg bg-lime-200 text-emerald-950" onClick={() => setHours((value) => clamp(value + 1, 1, 20))} type="button" aria-label="Increase hours">
                    <HugeiconsIcon icon={AddCircleIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
                <input className="pricing-range mt-5 w-full" min="1" max="20" type="range" value={hours} onChange={(event) => setHours(Number(event.target.value))} />
              </div>
            </FilterBlock>
          </div>

          <button className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white/75 px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10 transition hover:bg-white sm:w-auto" onClick={() => setAdvancedOpen((value) => !value)} type="button" aria-expanded={advancedOpen}>
            {advancedOpen ? "Hide advanced options" : "Show advanced options"}
          </button>

          {advancedOpen && (
            <div className="space-y-6 rounded-lg bg-white/45 p-4 ring-1 ring-emerald-950/10">
              <div className="grid gap-6 lg:grid-cols-2">
                <FilterBlock title="Property" subtitle="Custom designed filter">
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((item) => (
                      <button
                        className={`min-h-20 rounded-lg border p-3 text-left transition ${propertyLabel === item.label ? "border-emerald-900 bg-[#d9ff42] text-emerald-950" : "border-emerald-950/10 bg-white/75 text-slate-700 hover:bg-white"}`}
                        key={item.label}
                        onClick={() => setPropertyLabel(item.label)}
                        type="button"
                      >
                        <HugeiconsIcon icon={item.icon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
                        <span className="mt-2 block text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </FilterBlock>

                <FilterBlock title="Urgency" subtitle="Schedule preference">
                  <div className="grid gap-2">
                    {urgencyOptions.map((item) => (
                      <button
                        className={`rounded-lg border px-3 py-3 text-left transition ${urgencyLabel === item.label ? "border-emerald-900 bg-[#d9ff42] text-emerald-950" : "border-emerald-950/10 bg-white/75 text-slate-700 hover:bg-white"}`}
                        key={item.label}
                        onClick={() => setUrgencyLabel(item.label)}
                        type="button"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <HugeiconsIcon icon={Calendar03Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs">{item.note}</span>
                      </button>
                    ))}
                  </div>
                </FilterBlock>
              </div>

              <FilterBlock title="Add-ons" subtitle="Optional details for accurate quote">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {addOns.map((item) => {
                    const active = selectedAddOns.includes(item.label);
                    return (
                      <button
                        className={`rounded-lg border p-3 text-left transition ${active ? "border-emerald-900 bg-emerald-900 text-white" : "border-emerald-950/10 bg-white/75 text-emerald-950 hover:bg-white"}`}
                        key={item.label}
                        onClick={() => toggleAddOn(item.label)}
                        type="button"
                      >
                        <span className="block text-sm font-medium">{item.label}</span>
                        <span className={`mt-1 block text-xs ${active ? "text-lime-100" : "text-slate-600"}`}>+AED {item.price}</span>
                      </button>
                    );
                  })}
                </div>
              </FilterBlock>
            </div>
          )}
        </div>

        <aside className="rounded-lg border border-emerald-950/10 bg-white/85 p-5 xl:sticky xl:top-24 xl:self-start">
          <p className="eyebrow w-fit">Live estimate</p>
          <h3 className="mt-3 text-2xl font-medium text-emerald-950">AED {estimatedTotal}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">Final quote may change after photos, access, stains, furniture moving, or exact area details.</p>
          <div className="mt-5 grid gap-2 text-sm">
            <SummaryRow label="Base rate" value={`AED ${adjustedRate} x ${hours}`} />
            <SummaryRow label="Base total" value={`AED ${baseTotal}`} />
            <SummaryRow label="Add-ons" value={`AED ${addOnTotal}`} />
            <SummaryRow label={`${plan.label} discount`} value={`-AED ${discountAmount}`} />
            <SummaryRow label="Saving vs original" value={`AED ${totalSavings}`} highlight />
          </div>
          <a className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 text-sm font-medium text-emerald-950" href={`https://wa.me/971552232850?text=${encodeURIComponent(whatsappText)}`}>
            <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
            WhatsApp estimate
          </a>
        </aside>
      </div>
    </div>
  );
}

function FilterBlock({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-base font-medium text-emerald-950">{title}</h3>
          <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function SummaryRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 ${highlight ? "bg-lime-200 text-emerald-950" : "bg-[#f7fff0] text-slate-700"}`}>
      <span>{label}</span>
      <span className="font-medium text-emerald-950">{value}</span>
    </div>
  );
}
