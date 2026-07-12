import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog-index";
import { getBlogPosts } from "@/lib/data";
import { site } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

const authors = {
  "just-shine-team": {
    name: "Just Shine Cleaning Services Team",
    bio: "Expert cleaning tips from professionals serving homes, villas, and offices across Abu Dhabi.",
    image: "/images/Affordable Cleaning Services in Abu Dhabi - Just Shine Cleaning Services.webp",
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
        <div className="grid gap-8 rounded-2xl bg-white/70 p-5 ring-1 ring-emerald-950/10 md:grid-cols-[13rem_1fr] md:items-center md:p-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-lime-100 ring-1 ring-emerald-950/10 md:aspect-square">
            <Image alt={author.name} className="object-cover" fill priority sizes="(min-width: 768px) 13rem, 100vw" src={author.image} />
          </div>
          <div>
            <p className="eyebrow w-fit bg-lime-100 text-emerald-900 ring-1 ring-emerald-950/10">Author</p>
            <h1 className="mt-4 text-3xl font-semibold text-emerald-950 sm:text-4xl">{author.name}</h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">{author.bio}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a className="rounded-lg bg-lime-300 px-4 py-2 font-medium text-emerald-950" href={`mailto:${site.email}`}>Business email</a>
              <Link className="rounded-lg bg-white px-4 py-2 font-medium text-emerald-900 ring-1 ring-emerald-950/10" href="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <BlogIndex posts={posts} />
      </div>
    </section>
  );
}
