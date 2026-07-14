"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { site } from "@/lib/content";

const storageKey = "just-shine-mobile-cta-dismissed";

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const whatsappHref = `https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent("Hi Just Shine Cleaning Services, I need a cleaning quote in Abu Dhabi. Service type: Location: Preferred date/time: Photos/details:")}`;

  useEffect(() => {
    queueMicrotask(() => setDismissed(window.sessionStorage.getItem(storageKey) === "1"));
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div className={`fixed inset-x-3 bottom-[5.25rem] z-50 rounded-xl bg-white p-2 ring-1 ring-emerald-950/10 transition md:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950"
          href={whatsappHref}
          onClick={() => window.gtag?.("event", "sticky_whatsapp_click", { placement: "mobile_sticky_cta" })}
        >
          <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
          Book via WhatsApp
        </a>
        <button
          className="grid size-12 place-items-center rounded-lg bg-lime-50 text-emerald-950"
          type="button"
          aria-label="Dismiss WhatsApp booking button"
          onClick={() => {
            window.sessionStorage.setItem(storageKey, "1");
            setDismissed(true);
          }}
        >
          <HugeiconsIcon icon={Cancel01Icon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
