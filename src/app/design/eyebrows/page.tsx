import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eyebrow badge variations | Design preview",
  robots: { index: false, follow: false },
};

const label = "About Just Shine Cleaning Services";

const variations = [
  {
    id: "V1",
    name: "Current soft lime",
    note: "Pale lime fill — light, but low contrast punch.",
    className: "eyebrow",
  },
  {
    id: "V2",
    name: "Forest solid",
    note: "Deep green + white — stronger authority.",
    className:
      "inline-flex rounded-md bg-[#0b4f2f] px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white",
  },
  {
    id: "V3",
    name: "Lime punch",
    note: "Full brand lime — energetic and visible.",
    className:
      "inline-flex rounded-md bg-[#d9ff42] px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#10231b]",
  },
  {
    id: "V4",
    name: "Left accent bar",
    note: "Clean editorial feel, less “pill”.",
    className:
      "inline-flex border-l-4 border-[#0b4f2f] bg-white px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#0b4f2f] shadow-sm",
  },
  {
    id: "V5",
    name: "Outline emerald",
    note: "Minimal outline — calm and premium.",
    className:
      "inline-flex rounded-md border border-[#047857] bg-transparent px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#047857]",
  },
  {
    id: "V6",
    name: "Charcoal + lime text",
    note: "High contrast, modern cleaning brand.",
    className:
      "inline-flex rounded-md bg-[#10231b] px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#d9ff42]",
  },
  {
    id: "V7",
    name: "Soft mint elevated",
    note: "Gentle mint with clearer edge.",
    className:
      "inline-flex rounded-md bg-[#e8f8ef] px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#065f46] ring-1 ring-[#047857]/20 shadow-sm",
  },
  {
    id: "V8",
    name: "Underline only",
    note: "No chip — just a sharp lime underline.",
    className:
      "inline-flex border-b-2 border-[#d9ff42] px-0.5 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#0b4f2f]",
  },
  {
    id: "V9",
    name: "Mark + text",
    note: "Small lime mark + label — brand signal without a fat pill.",
    className: "inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#0b4f2f]",
    custom: true,
  },
  {
    id: "V10",
    name: "Frosted glass + lime ring",
    note: "Light glass look with a crisp lime outline.",
    className:
      "inline-flex rounded-md bg-white/80 px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#065f46] shadow-sm ring-2 ring-[#d9ff42]/80 backdrop-blur",
  },
] as const;

export default function EyebrowVariationsPage() {
  return (
    <section className="section bg-[#f4f7f2]">
      <div className="container max-w-4xl">
        <p className="text-sm font-medium text-emerald-800">Design preview · not indexed</p>
        <h1 className="mt-2 text-3xl font-medium text-emerald-950">Eyebrow badge — 10 variations</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
          Pick a number (V1–V10). Current site style is V1. Reply with e.g. “V3 use karo” and I’ll apply it site-wide.
        </p>

        <div className="mt-10 grid gap-4">
          {variations.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-emerald-950/10 bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{item.id}</p>
                <h2 className="mt-1 text-lg font-medium text-emerald-950">{item.name}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.note}</p>
              </div>
              <div className="mt-4 shrink-0 sm:mt-0">
                {"custom" in item && item.custom ? (
                  <p className={item.className}>
                    <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#d9ff42] ring-1 ring-[#0b4f2f]/20" aria-hidden />
                    {label}
                  </p>
                ) : (
                  <p className={item.className}>{label}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
