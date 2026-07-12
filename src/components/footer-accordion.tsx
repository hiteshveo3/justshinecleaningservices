"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

export function FooterAccordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-emerald-950/10 bg-white/55 px-4 py-3">
      <button
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-3 text-left text-sm font-medium text-emerald-950"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span>{title}</span>
        <span className={`grid size-8 place-items-center rounded-full bg-white/70 text-emerald-900 transition-transform duration-500 ${open ? "rotate-180" : ""}`}>
          <HugeiconsIcon icon={ArrowDown01Icon} className="icon" size={17} color="currentColor" strokeWidth={2} aria-hidden="true" />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="grid gap-2 pt-3 text-sm text-slate-700">{children}</div>
      </div>
    </div>
  );
}
