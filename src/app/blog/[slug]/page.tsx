import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Facebook01Icon, Linkedin01Icon, Mail01Icon, NewTwitterIcon, Share08Icon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { FaqAccordion } from "@/components/faq-accordion";
import { ReadingProgress } from "@/components/reading-progress";
import { JsonLd } from "@/components/seo";
import { getBlogPosts } from "@/lib/data";
import { authors, servicePriceLabel, services, site } from "@/lib/content";
import { extractHeadings, readingTime, relatedPosts, withHeadingIds } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getBlogPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.featured_image], type: "article" },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.featured_image] },
  };
}

function extractFaqBlock(html: string) {
  const faqHeading = /<h2>(Frequently Asked Questions|FAQ|Common Questions[^<]*)<\/h2>/i.exec(html);
  if (!faqHeading || faqHeading.index === undefined) return { html, title: "", items: [] as { q: string; a: string }[] };
  const start = faqHeading.index;
  const contentStart = start + faqHeading[0].length;
  const nextHeading = html.slice(contentStart).search(/<h2>/i);
  const end = nextHeading === -1 ? html.length : contentStart + nextHeading;
  const faqHtml = html.slice(contentStart, end);
  const items = Array.from(faqHtml.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi)).map((match) => ({
    q: match[1].replace(/<[^>]+>/g, "").trim(),
    a: match[2].replace(/<[^>]+>/g, "").trim(),
  })).filter((item) => item.q && item.a);
  if (items.length === 0) return { html, title: "", items };
  return {
    html: `${html.slice(0, start)}${html.slice(end)}`,
    title: faqHeading[1].replace(/<[^>]+>/g, "").trim(),
    items,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const isDeepCleaningGuide = post.slug === "deep-cleaning-services-abu-dhabi-guide-2026";
  const faqBlock = extractFaqBlock(post.content);
  const mainArticleContent = faqBlock.html;
  const headings = extractHeadings(mainArticleContent);
  const content = withHeadingIds(mainArticleContent);
  const faqItems = faqBlock.items;
  const relatedServices = services.filter((service) => ["deep-cleaning", "sofa-cleaning", "carpet-cleaning", "move-in-out-cleaning"].includes(service.slug));
  const related = relatedPosts(post, posts);
  const minutes = readingTime(post.content);
  const postUrl = `${site.url}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(postUrl);
  const author = authors["just-shine-team"];
  const authorImage = author.image;
  const authorUrl = `${site.url}/blog/author/${author.id}`;

  return (
    <article className="bg-white">
      <ReadingProgress />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: `${site.url}${post.featured_image}`,
        author: {
          "@type": "Organization",
          name: post.author,
          url: authorUrl,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          logo: {
            "@type": "ImageObject",
            url: `${site.url}${site.logo}`,
          },
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        mainEntityOfPage: postUrl,
      }} />
      {faqItems.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }} />
      )}
      <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="min-w-0">
            <p className="eyebrow-lime">Cleaning guide</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl lg:text-[2.65rem]">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{post.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>By <Link className="font-medium text-emerald-900 underline" href={`/blog/author/${author.id}`}>{post.author}</Link></span>
              <span>{post.publishedAt}</span>
              <span>{minutes} min read</span>
              <span>Reviewed by operations</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-emerald-950">
              <span className="rounded-lg bg-white/80 px-3 py-2 ring-1 ring-emerald-950/10">Abu Dhabi cleaning experts</span>
              <span className="rounded-lg bg-white/80 px-3 py-2 ring-1 ring-emerald-950/10">Updated 2026</span>
              <span className="rounded-lg bg-white/80 px-3 py-2 ring-1 ring-emerald-950/10">Fast WhatsApp quote</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-lime-100 ring-1 ring-emerald-950/10">
            <Image alt={post.title} className="h-full w-full object-cover" fill priority sizes="(min-width: 1024px) 18rem, 100vw" src={post.featured_image} />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            {headings.length > 0 && (
              <div className="sticky top-16 z-20 -mx-4 mb-4 border-y border-emerald-950/10 bg-white/95 px-4 py-2 backdrop-blur lg:hidden">
                <div className="no-scrollbar flex gap-2 overflow-x-auto text-sm text-slate-700">
                  <span className="shrink-0 rounded-lg bg-lime-100 px-3 py-2 text-xs font-medium uppercase tracking-wide text-emerald-900">On this page</span>
                  {headings.map((heading, index) => <a className="shrink-0 rounded-lg bg-[#f6fff0] px-3 py-2 ring-1 ring-emerald-950/10" href={`#${heading.id}`} key={heading.id}>{index + 1}. {heading.text}</a>)}
                </div>
              </div>
            )}

            {isDeepCleaningGuide && (
              <>
                <div className="rounded-2xl bg-lime-50 p-5 ring-1 ring-emerald-950/10">
                  <p className="text-xs font-medium uppercase text-emerald-800">Quick answer</p>
                  <p className="mt-3 text-lg leading-8 text-emerald-950">Deep cleaning in Abu Dhabi is best every 8-12 weeks for most homes, with higher frequency for pets, allergies, or villas exposed to heavy dust. Just Shine Cleaning Services starts deep cleaning from {servicePriceLabel(services.find((service) => service.slug === "deep-cleaning")!)}.</p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f6fff0] p-5 ring-1 ring-emerald-950/10">
                    <p className="text-sm font-medium text-emerald-950">Regular Cleaning</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">Best for weekly maintenance, visible dust, floors, counters, bathrooms, and day-to-day freshness.</p>
                  </div>
                  <div className="rounded-2xl bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] p-5 ring-1 ring-emerald-950/10">
                    <p className="text-sm font-medium text-emerald-950">Deep Cleaning</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">Best for hidden dust, kitchen grease, grout, vents, corners, baseboards, and full-home reset.</p>
                  </div>
                </div>
              </>
            )}

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />

            {isDeepCleaningGuide && (
              <div className="mt-8 rounded-2xl bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] p-5 ring-1 ring-emerald-950/10">
                <p className="font-medium text-emerald-950">Want an exact quote?</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Send your home size, location, preferred timing, and photos on WhatsApp. We will guide you with the right service scope.</p>
                <a className="mt-4 inline-flex rounded-lg bg-lime-300 px-4 py-3 text-sm font-medium text-emerald-950" href={`https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent("Hi Just Shine Cleaning Services, I need a deep cleaning quote in Abu Dhabi. Home size: Location: Preferred date/time: Photos/details:")}`}>WhatsApp for Quote</a>
              </div>
            )}

            {faqItems.length > 0 && (
              <section className="mt-10">
                <p className="eyebrow">FAQ</p>
                <h2 className="mt-4 text-2xl font-medium text-emerald-950">{faqBlock.title || "Cleaning questions"}</h2>
                <div className="mt-5"><FaqAccordion items={faqItems} /></div>
              </section>
            )}

            <div className="mt-8 rounded-2xl bg-lime-50 p-5">
              <p className="font-medium text-emerald-950">Need help with cleaning?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Share photos, location, and preferred timing with Just Shine Cleaning Services for a quick quote.</p>
              <Link className="mt-4 inline-flex rounded-lg bg-emerald-900 px-4 py-3 text-sm font-medium text-white" href="/contact">Contact Just Shine Cleaning Services</Link>
            </div>

            {isDeepCleaningGuide && (
              <section className="mt-10">
                <h2 className="text-2xl font-medium text-emerald-950">Related services</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {relatedServices.map((service) => (
                    <div className="rounded-2xl bg-lime-50 p-5 ring-1 ring-emerald-950/10" key={service.slug}>
                      <p className="font-medium text-emerald-950">{service.name}</p>
                      <p className="mt-2 text-sm text-slate-700">{servicePriceLabel(service)}</p>
                      <div className="mt-4 flex gap-2">
                        <Link className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-900 ring-1 ring-emerald-950/10" href={`/services/${service.slug}`}>Details</Link>
                        <a className="rounded-lg bg-lime-300 px-3 py-2 text-sm font-medium text-emerald-950" href={`https://wa.me/${site.tel.replace("+", "")}?text=${encodeURIComponent(`Hi Just Shine Cleaning Services, I need ${service.name} in Abu Dhabi.`)}`}>WhatsApp</a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {headings.length > 0 && (
              <div className="rounded-2xl bg-lime-50 p-5">
                <p className="font-medium text-emerald-950">Table of contents</p>
                <div className="mt-3 grid gap-2 text-sm text-slate-700">
                  {headings.map((heading, index) => <a className="grid grid-cols-[1.5rem_1fr] gap-2 rounded-lg px-2 py-1.5 transition hover:bg-white" href={`#${heading.id}`} key={heading.id}><span className="text-emerald-700">{index + 1}.</span><span>{heading.text}</span></a>)}
                </div>
              </div>
            )}
            <div className="rounded-2xl bg-lime-50 p-5">
              <div className="flex items-center gap-2 text-emerald-950">
                <HugeiconsIcon icon={Share08Icon} className="icon" size={18} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                <p className="font-medium">Share</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: Facebook01Icon },
                  { label: "X", href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, icon: NewTwitterIcon },
                  { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: Linkedin01Icon },
                  { label: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${shareUrl}`, icon: WhatsappBusinessIcon },
                ].map((item) => (
                  <a aria-label={`Share on ${item.label}`} className="grid size-11 place-items-center rounded-lg bg-white text-emerald-900 ring-1 ring-emerald-950/10 transition hover:bg-lime-100" href={item.href} key={item.label} target="_blank" rel="noreferrer">
                    <HugeiconsIcon icon={item.icon} className="icon" size={19} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                  </a>
                ))}
                <a aria-label="Share by email" className="grid size-11 place-items-center rounded-lg bg-white text-emerald-900 ring-1 ring-emerald-950/10 transition hover:bg-lime-100" href={`mailto:?subject=${shareText}&body=${shareUrl}`}>
                  <HugeiconsIcon icon={Mail01Icon} className="icon" size={19} color="currentColor" strokeWidth={1.8} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-lime-50 p-5">
              <div className="flex items-center gap-3">
                <div className="relative size-14 overflow-hidden rounded-xl bg-lime-100 ring-1 ring-emerald-950/10">
                  <Image alt={post.author} className="object-cover" fill sizes="3.5rem" src={authorImage} />
                </div>
                <div>
                  <p className="font-medium text-emerald-950">{post.author}</p>
                  <p className="text-xs text-slate-600">Abu Dhabi cleaning team</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">Expert cleaning tips from the Just Shine Cleaning Services team in Abu Dhabi.</p>
              <Link className="mt-3 inline-flex text-sm font-medium text-emerald-800 underline" href="/blog/author/just-shine-team">View author posts</Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-14 max-w-7xl">
            <h2 className="text-2xl font-medium text-emerald-950">Related posts</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link className="overflow-hidden rounded-xl bg-lime-50 ring-1 ring-emerald-950/10" href={`/blog/${item.slug}`} key={item.slug}>
                  <span className="relative block aspect-[4/3] bg-lime-100">
                    <Image alt={item.title} className="object-cover" fill sizes="(min-width: 768px) 33vw, 100vw" src={item.featured_image} />
                  </span>
                  <span className="block p-5">
                    <span className="text-xs text-slate-600">{item.publishedAt}</span>
                    <span className="mt-2 block font-medium text-emerald-950">{item.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </article>
  );
}
