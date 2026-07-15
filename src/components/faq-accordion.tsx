"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, MessageQuestionIcon, Search01Icon } from "@hugeicons/core-free-icons";

type FaqItem = {
  q: string;
  a: string;
  links?: { label: string; href: string }[];
};

export function FaqAccordion({
  items,
  idPrefix = "faq",
  searchable = false,
  defaultOpenCount = 0,
}: {
  items: FaqItem[];
  idPrefix?: string;
  searchable?: boolean;
  defaultOpenCount?: number;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>(() => items.slice(0, defaultOpenCount).map((item) => item.q));
  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(normalized));
  }, [items, query]);

  return (
    <div className="grid gap-3">
      {searchable && (
        <label className="relative block">
          <span className="sr-only">Search FAQs</span>
          <HugeiconsIcon icon={Search01Icon} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900" size={19} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
          <input
            className="min-h-12 w-full rounded-xl border border-emerald-950/10 bg-white py-3 pl-11 pr-4 text-sm text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-800 focus:ring-4 focus:ring-lime-200"
            placeholder="Search home cleaning questions"
            type="search"
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              window.gtag?.("event", "faq_searched", { query: value });
            }}
          />
        </label>
      )}

      {filteredItems.map((item, index) => (
        <FaqRow
          item={item}
          id={`${idPrefix}-${index + 1}`}
          key={item.q}
          open={open.includes(item.q)}
          onToggle={() => setOpen((current) => current.includes(item.q) ? current.filter((key) => key !== item.q) : [...current, item.q])}
        />
      ))}
      {filteredItems.length === 0 && (
        <div className="rounded-xl bg-white p-5 text-sm leading-6 text-slate-700 ring-1 ring-emerald-950/10">
          No matching FAQ found. Try searching price, weekly, supplies, trust, or deep cleaning.
        </div>
      )}
    </div>
  );
}

function FaqRow({ item, id, open, onToggle }: { item: FaqItem; id: string; open: boolean; onToggle: () => void }) {
  const [showFull, setShowFull] = useState(false);
  const isLong = item.a.length > 950;
  const answer = isLong && !showFull ? `${item.a.slice(0, 900).trim()}...` : item.a;
  const handleToggle = () => {
    if (!open) window.gtag?.("event", "faq_expanded", { question: item.q });
    onToggle();
  };

  return (
    <div className="scroll-mt-24 rounded-xl border border-emerald-950/10 bg-[#f6fff0] transition hover:border-emerald-900/20 hover:bg-[#f3ffe8]" id={id}>
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-medium text-emerald-950"
        type="button"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-emerald-800 ring-1 ring-emerald-950/10">
            <HugeiconsIcon icon={MessageQuestionIcon} className="icon" size={19} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span>{item.q}</span>
        </span>
        <span className={`grid size-8 shrink-0 place-items-center rounded-full bg-white text-emerald-900 ring-1 ring-emerald-950/10 transition-transform duration-500 ${open ? "rotate-180" : ""}`}>
          <HugeiconsIcon icon={ArrowDown01Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${open ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-5 pb-5 md:pl-[4.25rem]">
          <div className="whitespace-pre-line border-l-2 border-lime-300 py-1 pl-4 text-sm leading-7 text-slate-700 sm:text-base">
            {answer}
          </div>
          {isLong && (
            <button
              className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950 transition hover:bg-lime-200"
              type="button"
              onClick={() => setShowFull((value) => !value)}
            >
              {showFull ? "Show shorter answer" : "Read full answer"}
            </button>
          )}
          {item.links && item.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.links.map((link) => (
                link.href.startsWith("http") ? (
                  <a className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-900 ring-1 ring-emerald-950/10" href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ) : (
                  <Link className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-900 ring-1 ring-emerald-950/10" href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
