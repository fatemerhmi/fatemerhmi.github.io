"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/posts";

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      {activeTag && (
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm text-slate-500">
            Filtered by tag:
          </span>
          <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2.5 py-0.5 rounded-full">
            {activeTag}
          </span>
          <Link
            href="/blog"
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            clear
          </Link>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-slate-400">No posts found.</p>
      ) : (
        <ul className="space-y-10">
          {filtered.map((post) => (
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
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`text-xs px-2 py-0.5 rounded transition-colors ${
                          tag === activeTag
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
