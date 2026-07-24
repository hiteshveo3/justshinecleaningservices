import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best-for cards variations | Design preview",
  robots: { index: false, follow: false },
};

const items = [
  { title: "Regular maintenance", text: "Home Cleaning Services is useful when you want a cleaner space without spending your own time on detailed cleaning." },
  { title: "Before guests or inspections", text: "Book before visitors, handovers, office checks, events, or property viewings for a more polished space." },
  { title: "Dust and hygiene reset", text: "Abu Dhabi dust, AC circulation, and busy routines can make professional cleaning helpful even when surfaces look tidy." },
];

const variations = [
  {
    id: "V1",
    name: "Current pale cards",
    note: "Flat mint boxes — clean but weak hierarchy.",
    render: () => (
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article className="rounded-xl border border-emerald-950/10 bg-[#f8fff3] p-5" key={item.title}>
            <h3 className="text-lg font-medium text-emerald-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "V2",
    name: "Numbered + left lime bar",
    note: "Clear order, stronger scanning.",
    render: () => (
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <article className="rounded-xl border border-emerald-950/10 border-l-4 border-l-[#d9ff42] bg-white p-5" key={item.title}>
            <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700">0{index + 1}</p>
            <h3 className="mt-2 text-lg font-medium text-emerald-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "V3",
    name: "Lime mark + white tile",
    note: "Brand mark without heavy card chrome.",
    render: () => (
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article className="rounded-xl bg-white p-5 ring-1 ring-emerald-950/10" key={item.title}>
            <span className="inline-block size-3 rounded-sm bg-[#d9ff42] ring-1 ring-emerald-950/15" aria-hidden />
            <h3 className="mt-3 text-lg font-medium text-emerald-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "V4",
    name: "Stacked rows (no cards)",
    note: "Less boxy — editorial and calm.",
    render: () => (
      <div className="divide-y divide-emerald-950/10 rounded-xl bg-white ring-1 ring-emerald-950/10">
        {items.map((item, index) => (
          <article className="grid gap-2 px-5 py-5 sm:grid-cols-[4rem_1fr] sm:gap-5" key={item.title}>
            <p className="text-2xl font-medium text-[#0b4f2f]">0{index + 1}</p>
            <div>
              <h3 className="text-lg font-medium text-emerald-950">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "V5",
    name: "Forest header strip",
    note: "Stronger contrast, premium feel.",
    render: () => (
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article className="overflow-hidden rounded-xl ring-1 ring-emerald-950/10" key={item.title}>
            <div className="bg-[#0b4f2f] px-5 py-3">
              <h3 className="text-base font-medium text-white">{item.title}</h3>
            </div>
            <div className="bg-white p-5">
              <p className="text-sm leading-6 text-slate-700">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "V6",
    name: "Lime top border + soft fill",
    note: "Brand accent without looking busy.",
    render: () => (
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article className="rounded-xl border border-emerald-950/10 border-t-4 border-t-[#d9ff42] bg-[#f7fff0] p-5" key={item.title}>
            <h3 className="text-lg font-medium text-emerald-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "V7",
    name: "Minimal bullets (no boxes)",
    note: "Lightest option — good if page already has many cards.",
    render: () => (
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title}>
            <h3 className="flex items-start gap-2 text-lg font-medium text-emerald-950">
              <span className="mt-2 inline-block size-2.5 shrink-0 rounded-sm bg-[#d9ff42]" aria-hidden />
              {item.title}
            </h3>
            <p className="mt-2 pl-4.5 text-sm leading-6 text-slate-700">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "V8",
    name: "Large title + CTA line",
    note: "More conversion-friendly “when to book”.",
    render: () => (
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-emerald-950/10" key={item.title}>
            <h3 className="text-xl font-medium leading-snug text-[#0b4f2f]">{item.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-700">{item.text}</p>
            <p className="mt-4 text-sm font-semibold text-emerald-900">Good time to book →</p>
          </article>
        ))}
      </div>
    ),
  },
] as const;

export default function BestForVariationsPage() {
  return (
    <section className="section bg-[#f4f7f2]">
      <div className="container max-w-5xl">
        <p className="eyebrow">Design preview</p>
        <h1 className="mt-3 text-3xl font-medium text-emerald-950">Best-for cards — 8 variations</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
          Current site uses V1. Reply with a number (e.g. “V2”) and I’ll apply it to service pages.
        </p>
        <div className="mt-10 grid gap-8">
          {variations.map((item) => (
            <section className="rounded-2xl border border-emerald-950/10 bg-white p-5 sm:p-6" key={item.id}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{item.id}</p>
                  <h2 className="mt-1 text-xl font-medium text-emerald-950">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.note}</p>
                </div>
              </div>
              {item.render()}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
