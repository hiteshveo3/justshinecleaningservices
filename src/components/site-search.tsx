"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GlobalSearchIcon } from "@hugeicons/core-free-icons";
import { faqs, posts, services } from "@/lib/content";

type SearchItem = {
  title: string;
  href: string;
  type: "Service" | "FAQ" | "Blog";
  summary: string;
  keywords: string;
};

const searchItems: SearchItem[] = [
  ...services.map((service) => ({
    title: service.name,
    href: `/services/${service.slug}`,
    type: "Service" as const,
    summary: service.description,
    keywords: `${service.name} ${service.description} ${service.highlights.join(" ")}`,
  })),
  ...posts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    type: "Blog" as const,
    summary: post.excerpt,
    keywords: `${post.title} ${post.excerpt} ${post.tags.join(" ")}`,
  })),
  ...faqs.map((faq, index) => ({
    title: faq.q,
    href: `/faq#faq-${index + 1}`,
    type: "FAQ" as const,
    summary: faq.a,
    keywords: `${faq.q} ${faq.a}`,
  })),
];

export function SiteSearch({ onSelect, compact = false }: { onSelect?: () => void; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const cleanedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!cleanedQuery) return searchItems.slice(0, compact ? 4 : 5);

    return searchItems
      .map((item) => {
        const haystack = item.keywords.toLowerCase();
        const title = item.title.toLowerCase();
        let score = 0;
        if (title.includes(cleanedQuery)) score += 3;
        if (haystack.includes(cleanedQuery)) score += 1;
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, compact ? 4 : 6)
      .map(({ item }) => item);
  }, [cleanedQuery, compact]);

  return (
    <div className={compact ? "relative" : "relative w-72"}>
      <label className="sr-only" htmlFor={compact ? "mobile-site-search" : "desktop-site-search"}>Search services</label>
      <div className="relative">
        <HugeiconsIcon icon={GlobalSearchIcon} className="icon absolute left-3 top-1/2 -translate-y-1/2 text-emerald-900" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
        <input
          className="min-h-10 w-full rounded-lg border border-emerald-950/10 bg-white pl-10 pr-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          id={compact ? "mobile-site-search" : "desktop-site-search"}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search services"
          type="search"
          value={query}
        />
      </div>

      {(query || compact) && (
        <div className={compact ? "mt-3 grid gap-2" : "absolute right-0 top-full z-50 mt-2 grid w-80 gap-2 rounded-xl border border-emerald-950/10 bg-white p-3 shadow-lg"}>
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                className="rounded-lg border border-emerald-950/10 p-3 text-left transition hover:border-emerald-700 hover:bg-lime-50"
                href={item.href}
                key={`${item.type}-${item.href}`}
                onClick={onSelect}
              >
                <span className="text-[11px] font-medium uppercase text-emerald-700">{item.type}</span>
                <span className="mt-1 block text-sm font-medium text-emerald-950">{item.title}</span>
                <span className="mt-1 block line-clamp-2 text-xs leading-5 text-slate-600">{item.summary}</span>
              </Link>
            ))
          ) : (
            <p className="rounded-lg bg-lime-50 p-3 text-sm text-slate-700">No matches yet. Try sofa, carpet, villa, office, or FAQ.</p>
          )}
        </div>
      )}
    </div>
  );
}
