import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Writing — Fatemeh Rahimi",
  description: "Thoughts on NLP, AI systems, and engineering.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Writing</h1>
      <p className="text-slate-500 mb-12">
        Thoughts on NLP, AI systems, and engineering.
      </p>

      {posts.length === 0 ? (
        <p className="text-slate-400">No posts yet.</p>
      ) : (
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="text-xs text-slate-400 mb-1">{post.date}</p>
                <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-slate-500 text-sm">{post.excerpt}</p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
