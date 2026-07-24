import Image from "next/image";
import Link from "next/link";
import { BlogIndex } from "@/components/blog-index";
import { getBlogPosts } from "@/lib/data";

export const metadata = {
  title: "Cleaning Blog Abu Dhabi",
  description: "Cleaning tips, checklists, and maintenance advice from Just Shine Cleaning Services in Abu Dhabi.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.slice(0, 3);
  return (
    <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow-lime">Blog</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">Cleaning advice for Abu Dhabi homes and offices</h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">Helpful guides, service explainers, and local cleaning advice built for Abu Dhabi homes, villas, and offices.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link className="group overflow-hidden rounded-2xl bg-white ring-1 ring-emerald-950/10" href={`/blog/${post.slug}`} key={post.slug}>
                <div className="relative aspect-[4/3] bg-lime-100">
                  <Image alt={post.title} className="object-cover transition duration-500 group-hover:scale-[1.03]" fill sizes="(min-width: 1024px) 14rem, 33vw" src={post.featured_image} />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-medium leading-5 text-emerald-950">{post.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <BlogIndex posts={posts} />
      </div>
    </section>
  );
}
