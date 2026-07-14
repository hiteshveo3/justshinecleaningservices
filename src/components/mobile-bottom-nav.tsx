"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  CallIcon,
  Cancel01Icon,
  Contact01Icon,
  Home02Icon,
  MoreHorizontalCircle01Icon,
  NewsIcon,
  ServiceIcon,
  WhatsappBusinessIcon,
} from "@hugeicons/core-free-icons";
import { SiteSearch } from "./site-search";
import { services, site } from "@/lib/content";

const whatsappHref = `https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent("Hi Just Shine Cleaning Services, I need cleaning in Abu Dhabi. Location: Service type: Preferred date/time:")}`;

export function MobileBottomNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-950/10 bg-white/95 px-2 pb-[max(.55rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          <MobileNavLink href="/" icon={Home02Icon} label="Home" active={pathname === "/"} />
          <MobileNavLink href="/services" icon={ServiceIcon} label="Services" active={pathname.startsWith("/services")} />
          <MobileNavLink href="/blog" icon={NewsIcon} label="Blog" active={pathname.startsWith("/blog")} />
          <MobileNavLink href="/contact" icon={Contact01Icon} label="Contact" active={pathname === "/contact"} />
          <button className="mobile-nav-item" type="button" onClick={() => setOpen(true)} aria-label="Open more navigation" aria-haspopup="dialog" aria-expanded={open}>
            <span className="mobile-nav-icon inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-900/10 bg-lime-100 text-emerald-900">
              <HugeiconsIcon icon={MoreHorizontalCircle01Icon} className="icon" size={21} color="currentColor" strokeWidth={2.2} />
            </span>
            <span>More</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="More navigation">
          <button className="absolute inset-0 bg-emerald-950/35" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-200" />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-emerald-950">More</h2>
              <button className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-700" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <HugeiconsIcon icon={Cancel01Icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a className="btn-primary" href={`tel:${site.tel}`}><HugeiconsIcon icon={CallIcon} className="icon" size={19} color="currentColor" strokeWidth={2} /> Call</a>
              <a className="btn-secondary" href={whatsappHref}><HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={19} color="currentColor" strokeWidth={2} /> WhatsApp</a>
            </div>

            <div className="mt-5">
              <SiteSearch compact onSelect={() => setOpen(false)} />
            </div>

            <div className="mt-5 grid gap-2">
              {[
                ["About", "/about"],
                ["FAQ", "/faq"],
                ["Testimonials", "/testimonials"],
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
              ].map(([label, href]) => (
                <Link className="rounded-lg border border-emerald-950/10 px-4 py-3 text-sm text-slate-800" href={href} key={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-lime-50 p-4 ring-1 ring-emerald-950/10">
              <p className="text-sm font-medium text-emerald-950">Popular services</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {services.slice(0, 4).map((service) => (
                  <Link className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" href={`/services/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>
                    {service.name.replace(" Services", "")}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavLink({ href, icon, label, active }: { href: string; icon: IconSvgElement; label: string; active: boolean }) {
  return (
    <Link className={`mobile-nav-item ${active ? "text-emerald-950" : ""}`} href={href}>
      <span className={`mobile-nav-icon inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-900/10 text-emerald-900 ${active ? "bg-lime-300" : "bg-lime-100"}`}>
        <HugeiconsIcon icon={icon} className="icon" size={21} color="currentColor" strokeWidth={2.2} />
      </span>
      <span>{label}</span>
    </Link>
  );
}
