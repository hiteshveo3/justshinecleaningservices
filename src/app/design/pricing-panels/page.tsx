import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing panels variations | Design preview",
  robots: { index: false, follow: false },
};

const priceRows = [
  { label: "Without materials", note: "Labor only", price: "AED 30/hour", original: "AED 45/hour" },
  { label: "With materials", note: "Supplies included", price: "AED 35/hour", original: "AED 50/hour" },
  { label: "Minimum booking", note: "All hourly services", price: "2 hours", original: "" },
  { label: "1BR Apartment", note: "2-3 hours", price: "AED 60-90", original: "AED 90-135" },
  { label: "2BR Apartment", note: "3-4 hours", price: "AED 90-120", original: "AED 135-180" },
];

const addOnRows = [
  { label: "Monthly Contract", note: "Best rate for weekly/bi-weekly homes", price: "Custom quote" },
  { label: "Same-day booking", note: "When nearby slots are open", price: "No extra fee" },
  { label: "Weekend booking", note: "Subject to availability", price: "No surcharge" },
  { label: "Referral Bonus", note: "Share and save together", price: "Ask on WhatsApp" },
];

const variations = [
  {
    id: "P1",
    name: "Deep green editorial (like Best-for C4)",
    note: "One forest band, two columns, row dividers — no pale cards.",
    shell: "rounded-3xl bg-[#063d25] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h3 className="text-lg font-medium text-white">Current vs original</h3>
          <div className="mt-4 divide-y divide-white/15">
            {priceRows.map((row) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-4" key={row.label}>
                <div>
                  <p className="font-medium text-white">{row.label}</p>
                  <p className="text-sm text-emerald-50/75">{row.note}</p>
                </div>
                <p className="font-medium text-[#d9ff42]">{row.price}</p>
                {row.original ? <p className="text-sm text-emerald-100/45 line-through">{row.original}</p> : <span />}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Discounts and add-ons</h3>
          <div className="mt-4 divide-y divide-white/15">
            {addOnRows.map((row) => (
              <div className="flex items-start justify-between gap-4 py-3" key={row.label}>
                <div>
                  <p className="font-medium text-white">{row.label}</p>
                  <p className="mt-1 text-sm text-emerald-50/75">{row.note}</p>
                </div>
                <p className="shrink-0 font-medium text-[#d9ff42]">{row.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "P2",
    name: "Split lime + forest",
    note: "Prices on lime (dark type), add-ons on forest (lime values).",
    shell: "overflow-hidden rounded-3xl",
    render: () => (
      <div className="grid lg:grid-cols-2">
        <div className="bg-[#d9ff42] p-5 sm:p-8">
          <h3 className="text-lg font-medium text-[#10231b]">Current vs original</h3>
          <div className="mt-4 divide-y divide-[#10231b]/15">
            {priceRows.map((row) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-4" key={row.label}>
                <div>
                  <p className="font-medium text-[#10231b]">{row.label}</p>
                  <p className="text-sm text-[#10231b]/70">{row.note}</p>
                </div>
                <p className="font-semibold text-[#0b4f2f]">{row.price}</p>
                {row.original ? <p className="text-sm text-[#10231b]/45 line-through">{row.original}</p> : <span />}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0b4f2f] p-5 sm:p-8">
          <h3 className="text-lg font-medium text-white">Discounts and add-ons</h3>
          <div className="mt-4 divide-y divide-white/15">
            {addOnRows.map((row) => (
              <div className="flex items-start justify-between gap-4 py-3" key={row.label}>
                <div>
                  <p className="font-medium text-white">{row.label}</p>
                  <p className="mt-1 text-sm text-emerald-50/75">{row.note}</p>
                </div>
                <p className="shrink-0 font-medium text-[#d9ff42]">{row.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "P3",
    name: "Mint ground + solid forest blocks",
    note: "Light section, but each panel is high-contrast forest — not pale cards.",
    shell: "rounded-3xl bg-[#e7f6ea] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-[#0b4f2f] p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Current vs original</h3>
          <div className="mt-4 divide-y divide-white/15">
            {priceRows.map((row) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-4" key={row.label}>
                <div>
                  <p className="font-medium text-white">{row.label}</p>
                  <p className="text-sm text-emerald-50/75">{row.note}</p>
                </div>
                <p className="font-medium text-[#d9ff42]">{row.price}</p>
                {row.original ? <p className="text-sm text-emerald-100/40 line-through">{row.original}</p> : <span />}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#063d25] p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Discounts and add-ons</h3>
          <div className="mt-4 divide-y divide-white/15">
            {addOnRows.map((row) => (
              <div className="flex items-start justify-between gap-4 py-3" key={row.label}>
                <div>
                  <p className="font-medium text-white">{row.label}</p>
                  <p className="mt-1 text-sm text-emerald-50/75">{row.note}</p>
                </div>
                <p className="shrink-0 font-medium text-[#d9ff42]">{row.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "P4",
    name: "Single table band",
    note: "One deep panel — prices and add-ons as one editorial list with section labels.",
    shell: "rounded-3xl bg-[#0b4f2f] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d9ff42]">Current vs original</p>
          <div className="mt-3 divide-y divide-white/12">
            {priceRows.map((row) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[1.2fr_0.6fr_0.6fr] sm:items-baseline" key={row.label}>
                <p className="text-white"><span className="font-medium">{row.label}</span> <span className="text-emerald-50/70">· {row.note}</span></p>
                <p className="font-medium text-[#d9ff42] sm:text-right">{row.price}</p>
                <p className="text-sm text-emerald-100/40 line-through sm:text-right">{row.original || "—"}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d9ff42]">Discounts and add-ons</p>
          <div className="mt-3 divide-y divide-white/12">
            {addOnRows.map((row) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[1.4fr_0.6fr] sm:items-baseline" key={row.label}>
                <p className="text-white"><span className="font-medium">{row.label}</span> <span className="text-emerald-50/70">· {row.note}</span></p>
                <p className="font-medium text-[#d9ff42] sm:text-right">{row.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "P5",
    name: "Charcoal pricing + lime values",
    note: "Near-black left for prices, forest right for add-ons — max contrast.",
    shell: "overflow-hidden rounded-3xl ring-1 ring-emerald-950/20",
    render: () => (
      <div className="grid lg:grid-cols-2">
        <div className="bg-[#10231b] p-5 sm:p-8">
          <h3 className="text-lg font-medium text-white">Current vs original</h3>
          <div className="mt-4 divide-y divide-white/12">
            {priceRows.map((row) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-4" key={row.label}>
                <div>
                  <p className="font-medium text-white">{row.label}</p>
                  <p className="text-sm text-white/60">{row.note}</p>
                </div>
                <p className="font-semibold text-[#d9ff42]">{row.price}</p>
                {row.original ? <p className="text-sm text-white/35 line-through">{row.original}</p> : <span />}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#063d25] p-5 sm:p-8">
          <h3 className="text-lg font-medium text-white">Discounts and add-ons</h3>
          <div className="mt-4 divide-y divide-white/12">
            {addOnRows.map((row) => (
              <div className="flex items-start justify-between gap-4 py-3" key={row.label}>
                <div>
                  <p className="font-medium text-white">{row.label}</p>
                  <p className="mt-1 text-sm text-emerald-50/75">{row.note}</p>
                </div>
                <p className="shrink-0 rounded-md bg-[#d9ff42] px-2.5 py-1 text-sm font-semibold text-[#10231b]">{row.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
] as const;

export default function PricingPanelsVariationsPage() {
  return (
    <section className="section bg-[#dfe8e2]">
      <div className="container max-w-5xl">
        <p className="eyebrow">Design preview</p>
        <h1 className="mt-3 text-3xl font-medium text-emerald-950">Pricing panels — contrast variations</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
          Current pale mint nested cards removed from these options. Reply with <strong>P1–P5</strong> to apply on service pricing.
        </p>
        <div className="mt-10 grid gap-8">
          {variations.map((item) => (
            <section className="overflow-hidden rounded-2xl ring-1 ring-emerald-950/15" key={item.id}>
              <div className="bg-white px-5 py-4 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{item.id}</p>
                <h2 className="mt-1 text-xl font-medium text-emerald-950">{item.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{item.note}</p>
              </div>
              <div className={item.shell}>
                {item.id !== "P2" && item.id !== "P5" && (
                  <>
                    <p className={item.id === "P3" ? "eyebrow" : "eyebrow-lime"}>Tiered pricing</p>
                    <h3 className={`mt-4 text-2xl font-medium sm:text-3xl ${item.id === "P3" ? "text-emerald-950" : "text-white"}`}>
                      Pricing options
                    </h3>
                    <div className="mt-6">{item.render()}</div>
                  </>
                )}
                {(item.id === "P2" || item.id === "P5") && item.render()}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
