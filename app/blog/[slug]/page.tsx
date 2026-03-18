import { getAllPosts, getPost } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: `${post.title} — Fatemeh Rahimi` };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="text-sm text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Writing
      </Link>

      <p className="text-xs text-slate-400 mb-2">{post.date}</p>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{post.title}</h1>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <article
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
