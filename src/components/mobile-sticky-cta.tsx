"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { services, site } from "@/lib/content";

const storageKey = "just-shine-mobile-cta-dismissed";

export function MobileStickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const service = services.find((item) => pathname === `/services/${item.slug}`);
  const serviceName = service?.name.replace(" Services", "").toLowerCase() || "cleaning";
  const priceText = service ? `AED ${service.price}/${service.priceUnit.replace("per ", "")}` : "fast quote";
  const whatsappHref = `https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent(`Hi, I'm interested in ${serviceName}. Can you send a quote? Location: Preferred date/time: Photos/details:`)}`;

  useEffect(() => {
    queueMicrotask(() => setDismissed(window.sessionStorage.getItem(storageKey) === "1"));
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div className={`fixed inset-x-3 bottom-[5.25rem] z-50 rounded-xl bg-white p-2 ring-1 ring-emerald-950/10 transition duration-300 md:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <a
          className="inline-flex min-h-[4rem] items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 text-sm font-medium text-emerald-950"
          href={whatsappHref}
          onClick={() => window.gtag?.("event", "sticky_cta_click", { placement: "mobile_sticky_cta", service: service?.slug || "general" })}
        >
          <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
          <span>Get Quote • {priceText}</span>
        </a>
        <button
          className="grid size-16 place-items-center rounded-lg bg-lime-50 text-emerald-950"
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
