"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CallIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { site } from "@/lib/content";

export function CtaButtons({
  service = "home",
  quoteLabel = "Get instant quote",
}: {
  service?: string;
  quoteLabel?: string;
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
        className="inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-lg bg-[#2ecc71] px-4 text-sm font-medium text-emerald-950 transition hover:bg-[#27c467] hover:-translate-y-0.5"
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
        className="inline-flex min-h-[2.85rem] w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/15 transition hover:bg-[#f8fff3] hover:-translate-y-0.5"
      >
        <HugeiconsIcon icon={CallIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
        <span className="sm:hidden">Call now</span>
        <span className="hidden whitespace-nowrap sm:inline">Call {site.phone}</span>
      </a>
    </div>
  );
}
