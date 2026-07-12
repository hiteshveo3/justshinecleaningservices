import type { MetadataRoute } from "next";
import { posts, services, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/blog",
    "/contact",
    "/faq",
    "/testimonials",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/sla",
    "/accessibility",
    "/sustainability",
    "/anti-discrimination",
    "/disclaimer",
    "/cookie-policy",
  ];
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  return [
    ...staticPages.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date() })),
    ...services.map((service) => ({ url: `${site.url}/services/${service.slug}`, lastModified: new Date() })),
    ...posts.map((post) => ({ url: `${site.url}/blog/${post.slug}`, lastModified: new Date(post.publishedAt) })),
    ...tags.map((tag) => ({ url: `${site.url}/blog/tag/${encodeURIComponent(tag)}`, lastModified: new Date() })),
    { url: `${site.url}/blog/author/just-shine-team`, lastModified: new Date() },
  ];
}
