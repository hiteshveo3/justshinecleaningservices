"use client";

import { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons";

type FaqItem = {
  q: string;
  a: string;
  links?: { label: string; href: string }[];
};

export function FaqAccordion({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  const [open, setOpen] = useState<string[]>([]);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <FaqRow
          item={item}
          id={`${idPrefix}-${index + 1}`}
          key={item.q}
          open={open.includes(item.q)}
          onToggle={() => setOpen((current) => current.includes(item.q) ? current.filter((key) => key !== item.q) : [...current, item.q])}
        />
      ))}
    </div>
  );
}

function FaqRow({ item, id, open, onToggle }: { item: FaqItem; id: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="scroll-mt-24 rounded-xl border border-emerald-950/10 bg-[#f6fff0] transition hover:border-emerald-900/20 hover:bg-[#f3ffe8]" id={id}>
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-medium text-emerald-950"
        type="button"
        aria-expanded={open}
        onClick={onToggle}
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
          <div className="whitespace-pre-line rounded-lg bg-white/70 p-4 text-sm leading-7 text-slate-700 ring-1 ring-emerald-950/10 sm:text-base">
            {item.a}
          </div>
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
