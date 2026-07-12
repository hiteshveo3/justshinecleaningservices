import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { CallIcon, Home01Icon, Search01Icon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { site } from "@/lib/content";

export default function NotFound() {
  const whatsappText = encodeURIComponent("Hi Just Shine Cleaning Services, I need help finding the right cleaning service in Abu Dhabi.");

  return (
    <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#ecffd0_48%,#dff8e9_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[62vh] max-w-5xl content-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow w-fit bg-white/80 text-emerald-900 ring-1 ring-emerald-950/10">Page not found</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-tight text-emerald-950 sm:text-5xl">
            This page is not here, but cleaning help is.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
            The link may have changed. Choose a service, return home, or message Just Shine Cleaning Services for quick help.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link className="btn-primary" href="/">
              <HugeiconsIcon icon={Home01Icon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
              Home
            </Link>
            <Link className="btn-secondary" href="/services">
              <HugeiconsIcon icon={Search01Icon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
              Browse Services
            </Link>
            <a className="btn-primary" href={`tel:${site.tel}`}>
              <HugeiconsIcon icon={CallIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
              Call {site.phone}
            </a>
            <a className="btn-secondary" href={`https://wa.me/${site.tel.replace("+", "")}?text=${whatsappText}`}>
              <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={19} color="currentColor" strokeWidth={2} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="rounded-2xl bg-white/75 p-5 ring-1 ring-emerald-950/10">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-emerald-700">Popular pages</p>
          <div className="mt-4 grid gap-2">
            {[
              ["Deep Cleaning", "/services/deep-cleaning"],
              ["Villa Cleaning", "/services/villa-cleaning"],
              ["Sofa Cleaning", "/services/sofa-cleaning"],
              ["Pricing Calculator", "/pricing"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link className="rounded-lg bg-[#f6fff0] px-4 py-3 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10 transition hover:bg-lime-100" href={href} key={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
