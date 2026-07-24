import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog-index";
import { JsonLd } from "@/components/seo";
import { getBlogPosts } from "@/lib/data";
import { authors, site } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

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
  const authorUrl = `${site.url}/blog/author/${author.id}`;

  return (
    <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": authorUrl,
          name: author.name,
          description: author.bio,
          url: authorUrl,
          image: `${site.url}${author.image}`,
          sameAs: author.sameAs,
          parentOrganization: { "@id": `${site.url}/#business`, name: site.name },
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-2xl bg-white/70 p-5 ring-1 ring-emerald-950/10 md:grid-cols-[13rem_1fr] md:items-center md:p-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-lime-100 ring-1 ring-emerald-950/10 md:aspect-square">
            <Image alt={author.name} className="object-cover" fill priority sizes="(min-width: 768px) 13rem, 100vw" src={author.image} />
          </div>
          <div>
            <p className="eyebrow-lime">Author</p>
            <h1 className="mt-4 text-3xl font-semibold text-emerald-950 sm:text-4xl">{author.name}</h1>
            <p className="mt-2 text-sm font-medium text-emerald-800">{author.role}</p>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">{author.bio}</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700">
              {author.credentials.map((item) => (
                <li key={item} className="rounded-lg bg-white/80 px-3 py-2 ring-1 ring-emerald-950/10">{item}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a className="rounded-lg bg-lime-300 px-4 py-2 font-medium text-emerald-950" href={`mailto:${site.email}`}>Business email</a>
              <Link className="rounded-lg bg-white px-4 py-2 font-medium text-emerald-900 ring-1 ring-emerald-950/10" href="/about">About Just Shine</Link>
              <Link className="rounded-lg bg-white px-4 py-2 font-medium text-emerald-900 ring-1 ring-emerald-950/10" href="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <BlogIndex posts={posts} />
      </div>
    </section>
  );
}
