import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog-index";
import { getBlogPosts } from "@/lib/data";

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  return {
    title: `${tag} Cleaning Articles | Just Shine Cleaning Services`,
    description: `Read Just Shine Cleaning Services articles tagged ${tag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = (await getBlogPosts()).filter((post) => post.tags.includes(tag));
  if (posts.length === 0) notFound();

  return (
    <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow-lime">Blog tag</p>
        <h1 className="mt-4 text-3xl font-semibold text-emerald-950 sm:text-4xl">{tag}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">Articles and cleaning tips related to {tag}.</p>
        <BlogIndex posts={posts} />
      </div>
    </section>
  );
}
