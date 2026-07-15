"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CallIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { site } from "@/lib/content";

export function CtaButtons({
  service = "home",
  quoteLabel = "Get instant quote",
  callVariant = "white",
}: {
  service?: string;
  quoteLabel?: string;
  callVariant?: "white" | "green";
}) {
  const text = encodeURIComponent(`Hi Just Shine Cleaning Services, I need ${service} cleaning in Abu Dhabi. Location: Preferred date/time: Home size: Photos/details:`);
  const track = (event: string) => {
    window.gtag?.("event", event, { service });
  };

  return (
    <div className="cta-button-grid">
      <a
        onClick={() => track("whatsapp_click")}
        href={`https://wa.me/${site.tel.replace("+", "")}?text=${text}`}
        className="inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950 transition hover:bg-lime-200 hover:-translate-y-0.5"
      >
        <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={20} color="currentColor" strokeWidth={2} aria-hidden="true" />
        <span className="grid gap-0.5 text-left leading-tight">
          <span className="whitespace-nowrap">{quoteLabel}</span>
          <span className="text-xs font-normal text-emerald-950/75">5-minute WhatsApp response</span>
        </span>
      </a>
      <a
        onClick={() => track("call_click")}
        href={`tel:${site.tel}`}
        className={[
          "inline-flex min-h-[2.85rem] w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium ring-1 transition hover:-translate-y-0.5",
          callVariant === "green"
            ? "bg-[#0b4f2f] text-white ring-emerald-950/10 hover:bg-[#063d25]"
            : "bg-white text-emerald-950 ring-emerald-950/15 hover:bg-[#f8fff3]",
        ].join(" ")}
      >
        <HugeiconsIcon icon={CallIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
        <span className="sm:hidden">Call now</span>
        <span className="hidden whitespace-nowrap sm:inline">Call {site.phone}</span>
      </a>
    </div>
  );
}
