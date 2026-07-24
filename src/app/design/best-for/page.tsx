import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best-for contrast variations | Design preview",
  robots: { index: false, follow: false },
};

const items = [
  { title: "Regular maintenance", text: "Useful when you want a cleaner space without spending your own time on detailed cleaning." },
  { title: "Before guests or inspections", text: "Book before visitors, handovers, office checks, events, or property viewings for a more polished space." },
  { title: "Dust and hygiene reset", text: "Abu Dhabi dust, AC circulation, and busy routines make professional cleaning helpful even when surfaces look tidy." },
];

const variations = [
  {
    id: "C1",
    name: "Forest panel + lime numbers (applied live)",
    note: "Dark section, bright numbers, no pale cards. Strong contrast.",
    shell: "rounded-3xl bg-[#0b4f2f] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-0 divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item, index) => (
          <article className="px-0 py-5 md:px-5 md:py-0 md:first:pl-0 md:last:pr-0" key={item.title}>
            <p className="text-3xl font-semibold text-[#d9ff42]">0{index + 1}</p>
            <h3 className="mt-3 text-lg font-medium text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-50/85">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "C2",
    name: "Lime wash + charcoal type",
    note: "Bright brand ground, dark readable text, no white boxes.",
    shell: "rounded-3xl bg-[#d9ff42] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <article key={item.title}>
            <p className="text-sm font-semibold tracking-[0.16em] text-[#0b4f2f]/0{index + 1}</p>
            <h3 className="mt-2 text-xl font-medium text-[#10231b]">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#10231b]/90">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "C3",
    name: "Split contrast tiles",
    note: "Each tile is forest or lime alternating — maximum punch.",
    shell: "rounded-3xl bg-[#eef6ea] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item, index) => {
          const dark = index !== 1;
          return (
            <article
              className={`rounded-2xl p-5 ${dark ? "bg-[#0b4f2f] text-white" : "bg-[#d9ff42] text-[#10231b]"}`}
              key={item.title}
            >
              <p className={`text-sm font-semibold tracking-[0.14em] ${dark ? "text-[#d9ff42]" : "text-[#0b4f2f]"}`}>0{index + 1}</p>
              <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
              <p className={`mt-2 text-sm leading-6 ${dark ? "text-emerald-50/90" : "text-[#10231b]/90"}`}>{item.text}</p>
            </article>
          );
        })}
      </div>
    ),
  },
  {
    id: "C4",
    name: "Editorial on deep green (no cards)",
    note: "One composition — stacked rows, high contrast type only.",
    shell: "rounded-3xl bg-[#063d25] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-6">
        {items.map((item, index) => (
          <article className="grid gap-2 border-b border-white/15 pb-6 last:border-0 last:pb-0 sm:grid-cols-[5rem_1fr] sm:gap-6" key={item.title}>
            <p className="text-4xl font-medium leading-none text-[#d9ff42]">0{index + 1}</p>
            <div>
              <h3 className="text-xl font-medium text-white">{item.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-emerald-50/85">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    ),
  },
  {
    id: "C5",
    name: "Soft mint section + solid forest blocks",
    note: "Light page feel, but each item is a dark high-contrast block.",
    shell: "rounded-3xl bg-[#e7f6ea] p-5 sm:p-8",
    render: () => (
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item, index) => (
          <article className="rounded-2xl bg-[#0b4f2f] p-5" key={item.title}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-[0.14em] text-[#d9ff42]">0{index + 1}</p>
              <span className="size-2.5 rounded-sm bg-[#d9ff42]" aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-50/90">{item.text}</p>
          </article>
        ))}
      </div>
    ),
  },
] as const;

export default function BestForVariationsPage() {
  return (
    <section className="section bg-[#dfe8e2]">
      <div className="container max-w-5xl">
        <p className="eyebrow">Design preview</p>
        <h1 className="mt-3 text-3xl font-medium text-emerald-950">Best-for — high contrast only</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
          White-on-white / pale cards removed. Live site currently uses <strong>C1</strong>. Reply with C2–C5 to switch.
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
                <p className={item.id === "C2" ? "eyebrow" : "eyebrow-lime"}>Best for</p>
                <h3 className={`mt-4 text-2xl font-medium sm:text-3xl ${item.id === "C2" ? "text-[#10231b]" : item.id === "C3" || item.id === "C5" ? "text-emerald-950" : "text-white"}`}>
                  When to book Home Cleaning
                </h3>
                <div className="mt-6">{item.render()}</div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
