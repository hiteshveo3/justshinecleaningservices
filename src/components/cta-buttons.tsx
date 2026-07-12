"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CallIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { site } from "@/lib/content";

export function CtaButtons({ service = "home" }: { service?: string }) {
  const text = encodeURIComponent(`Hi Just Shine Cleaning Services, I need ${service} cleaning in Abu Dhabi. Location: Preferred date/time: Home size: Photos/details:`);
  const track = (event: string) => {
    window.gtag?.("event", event, { service });
  };

  return (
    <div className="cta-button-grid">
      <a onClick={() => track("call_click")} href={`tel:${site.tel}`} className="btn-primary">
        <HugeiconsIcon icon={CallIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
        <span className="sm:hidden">Call now</span>
        <span className="hidden whitespace-nowrap sm:inline">Call {site.phone}</span>
      </a>
      <a onClick={() => track("whatsapp_click")} href={`https://wa.me/${site.tel.replace("+", "")}?text=${text}`} className="btn-secondary">
        <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
        <span className="whitespace-nowrap">WhatsApp</span>
      </a>
    </div>
  );
}
