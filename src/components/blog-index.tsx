"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Cancel01Icon, FilterHorizontalIcon, GlobalSearchIcon } from "@hugeicons/core-free-icons";
import type { BlogPost } from "@/lib/content";

function postCategory(post: BlogPost) {
  const firstTag = post.tags[0] || "cleaning";
  if (firstTag.includes("abu dhabi")) return "Location Guide";
  if (firstTag.includes("sofa") || firstTag.includes("deep cleaning")) return "Service Guide";
  return "How-To";
}

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState("Recent");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map(postCategory)))], [posts]);
  const tags = useMemo(() => ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags)))], [posts]);

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [...posts]
      .filter((post) => category === "All" || postCategory(post) === category)
      .filter((post) => tag === "All" || post.tags.includes(tag))
      .filter((post) => {
        if (!search) return true;
        return `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase().includes(search);
      })
      .sort((a, b) => sort === "Oldest" ? a.publishedAt.localeCompare(b.publishedAt) : b.publishedAt.localeCompare(a.publishedAt));
  }, [category, posts, query, sort, tag]);
  const activeFilters = [category !== "All", tag !== "All", sort !== "Recent"].filter(Boolean).length;
  const resetFilters = () => {
    setCategory("All");
    setTag("All");
    setSort("Recent");
  };

  return (
    <div className="mt-8">
      <div className="rounded-2xl bg-lime-50 p-4">
        <label className="relative">
          <span className="sr-only">Search blog</span>
          <HugeiconsIcon icon={GlobalSearchIcon} className="icon absolute left-3 top-1/2 -translate-y-1/2 text-emerald-900" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
          <input className="min-h-11 w-full rounded-lg border border-emerald-950/10 bg-white pl-10 pr-3 text-sm outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" onChange={(event) => setQuery(event.target.value)} placeholder="Search cleaning guides" type="search" value={query} />
        </label>

        <div className="mt-4 hidden items-center justify-between gap-3 lg:flex">
          <div className="flex flex-wrap gap-3">
            <FilterDropdown label="Category" name="category" options={categories} value={category} onChange={setCategory} openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <FilterDropdown label="Tag" name="tag" options={tags} value={tag} onChange={setTag} openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <FilterDropdown label="Sort" name="sort" options={["Recent", "Oldest"]} value={sort} onChange={setSort} openFilter={openFilter} setOpenFilter={setOpenFilter} />
          </div>
          {activeFilters > 0 && <button className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-950/10" onClick={resetFilters} type="button">Reset</button>}
        </div>

        <button className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-900 px-4 text-sm font-medium text-white lg:hidden" onClick={() => setDrawerOpen(true)} type="button">
          <HugeiconsIcon icon={FilterHorizontalIcon} className="icon" size={18} color="currentColor" strokeWidth={2} aria-hidden="true" />
          Filters {activeFilters > 0 ? `(${activeFilters})` : ""}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link className="service-card p-3" href={`/blog/${post.slug}`} key={post.slug}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-lime-100">
              <Image alt={post.title} className="h-full w-full object-cover" fill sizes="(min-width: 768px) 50vw, 100vw" src={post.featured_image} />
            </div>
            <div className="p-2 pt-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-950/10">{postCategory(post)}</span>
                <span className="text-xs text-slate-600">{post.publishedAt}</span>
              </div>
              <h2 className="mt-3 text-xl font-medium leading-tight text-emerald-950">{post.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((item) => <span className="rounded-lg bg-white px-2.5 py-1 text-xs text-slate-700 ring-1 ring-emerald-950/10" key={item}>{item}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="mt-6 rounded-xl bg-lime-50 p-5 text-sm text-slate-700">No blog posts matched that search. Try villa, sofa, carpet, deep cleaning, or Abu Dhabi.</p>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Blog filters">
          <button className="absolute inset-0 bg-emerald-950/35" onClick={() => setDrawerOpen(false)} type="button" aria-label="Close filters" />
          <div className="absolute bottom-0 right-0 top-0 flex w-[min(22rem,90vw)] flex-col bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-emerald-950">Filters</h2>
              <button className="grid size-10 place-items-center rounded-lg bg-lime-50 text-emerald-950" onClick={() => setDrawerOpen(false)} type="button" aria-label="Close filters">
                <HugeiconsIcon icon={Cancel01Icon} className="icon" size={20} color="currentColor" strokeWidth={1.8} />
              </button>
            </div>
            <div className="mt-5 flex-1 space-y-5 overflow-y-auto">
              <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} />
              <FilterGroup label="Tag" options={tags} value={tag} onChange={setTag} />
              <FilterGroup label="Sort" options={["Recent", "Oldest"]} value={sort} onChange={setSort} />
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-emerald-950/10 pt-4">
              <button className="rounded-lg bg-lime-50 px-4 py-3 text-sm font-medium text-emerald-900" onClick={resetFilters} type="button">Reset</button>
              <button className="rounded-lg bg-emerald-900 px-4 py-3 text-sm font-medium text-white" onClick={() => setDrawerOpen(false)} type="button">Show results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterDropdown({ label, name, options, value, onChange, openFilter, setOpenFilter }: { label: string; name: string; options: string[]; value: string; onChange: (value: string) => void; openFilter: string | null; setOpenFilter: (value: string | null) => void }) {
  const open = openFilter === name;
  return (
    <div className="relative">
      <button className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-emerald-950 ring-1 ring-emerald-950/10" onClick={() => setOpenFilter(open ? null : name)} type="button" aria-expanded={open}>
        <span className="text-slate-600">{label}</span>
        <span>{value}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} className={`icon transition ${open ? "rotate-180" : ""}`} size={16} color="currentColor" strokeWidth={2} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 grid max-h-72 w-64 gap-1 overflow-y-auto rounded-xl border border-emerald-950/10 bg-white p-2 shadow-lg">
          {options.map((option) => (
            <button className={`rounded-lg px-3 py-2 text-left text-sm ${option === value ? "bg-emerald-900 text-white" : "text-slate-700 hover:bg-lime-50"}`} key={option} onClick={() => { onChange(option); setOpenFilter(null); }} type="button">
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-emerald-800">{label}</p>
      <div className="mt-2 grid gap-2">
        {options.map((option) => (
          <button className={`rounded-lg px-3 py-2 text-left text-sm ${option === value ? "bg-emerald-900 text-white" : "bg-lime-50 text-slate-700"}`} key={option} onClick={() => onChange(option)} type="button">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
