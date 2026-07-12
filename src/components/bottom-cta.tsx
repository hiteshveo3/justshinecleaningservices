import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappBusinessIcon, DollarCircleIcon } from "@hugeicons/core-free-icons";
import { site } from "@/lib/content";

export function BottomCta() {
  const whatsappHref = `https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent("Hi Just Shine Cleaning Services, I need a cleaning quote in Abu Dhabi. Location: Service type: Preferred date/time: Photos/details:")}`;

  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-emerald-950/10 bg-[linear-gradient(135deg,#f8fff3_0%,#efffca_52%,#dff8e8_100%)] px-5 py-10 text-center sm:px-8 lg:px-16">
        <h2 className="mx-auto max-w-4xl text-2xl font-medium leading-tight text-emerald-950 sm:text-3xl lg:text-4xl">
          Need cleaning in Abu Dhabi? Send the details.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-800 sm:text-lg">
          Share photos, location, service type, and timing on WhatsApp for a clear starting quote.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-emerald-900 px-7 text-base font-medium text-white ring-1 ring-emerald-950/10 transition hover:bg-emerald-800 sm:w-auto" href={whatsappHref}>
            <HugeiconsIcon icon={WhatsappBusinessIcon} className="icon" size={22} color="currentColor" strokeWidth={2} aria-hidden="true" />
            WhatsApp for Quote
          </a>
          <Link className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-lime-300 px-7 text-base font-medium text-emerald-950 ring-1 ring-lime-500/30 transition hover:bg-lime-200 sm:w-auto" href="/pricing">
            <HugeiconsIcon icon={DollarCircleIcon} className="icon" size={20} color="currentColor" strokeWidth={2} aria-hidden="true" />
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
