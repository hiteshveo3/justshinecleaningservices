import type { BlogPost } from "./content";

export const defaultBlogImage = "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp";

export function readingTime(content: string) {
  const plainText = content.replace(/<[^>]+>/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function extractHeadings(content: string) {
  return Array.from(content.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)).map((match, index) => ({
    id: `section-${index + 1}`,
    text: match[1].replace(/<[^>]+>/g, ""),
  }));
}

export function withHeadingIds(content: string) {
  let index = 0;
  return content.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, text) => {
    index += 1;
    return `<h2 id="section-${index}"${attrs}>${text}</h2>`;
  });
}

export function relatedPosts(current: BlogPost, posts: BlogPost[]) {
  return posts
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, 3)
    .map(({ post }) => post);
}
