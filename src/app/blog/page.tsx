import { BlogIndex } from "@/components/blog-index";
import { getBlogPosts } from "@/lib/data";

export const metadata = {
  title: "Cleaning Blog Abu Dhabi",
  description: "Cleaning tips, checklists, and maintenance advice from Just Shine Cleaning Services in Abu Dhabi.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <section className="bg-[linear-gradient(135deg,#f8fff3_0%,#e8ff87_45%,#c6f7d4_100%)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">Cleaning advice for Abu Dhabi homes and offices</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">Helpful guides, service explainers, and local cleaning advice built for Abu Dhabi homes, villas, and offices.</p>
        <BlogIndex posts={posts} />
      </div>
    </section>
  );
}
