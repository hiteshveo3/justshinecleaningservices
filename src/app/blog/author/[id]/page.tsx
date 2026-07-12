import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog-index";
import { getBlogPosts } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

const authors = {
  "just-shine-team": {
    name: "Just Shine Cleaning Services Team",
    bio: "Expert cleaning tips from professionals serving homes, villas, and offices across Abu Dhabi.",
  },
};

export function generateStaticParams() {
  return Object.keys(authors).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = authors[id as keyof typeof authors];
  if (!author) return {};
  return {
    title: `${author.name} Articles | Just Shine Cleaning Services`,
    description: author.bio,
    alternates: { canonical: `/blog/author/${id}` },
  };
}

export default async function BlogAuthorPage({ params }: Props) {
  const { id } = await params;
  const author = authors[id as keyof typeof authors];
  if (!author) notFound();
  const posts = (await getBlogPosts()).filter((post) => post.author === author.name);

  return (
    <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Author</p>
        <h1 className="mt-4 text-3xl font-semibold text-emerald-950 sm:text-4xl">{author.name}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">{author.bio}</p>
        <BlogIndex posts={posts} />
      </div>
    </section>
  );
}
