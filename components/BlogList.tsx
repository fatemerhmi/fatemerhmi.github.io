"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { PostMeta, PostType } from "@/lib/posts";

const postTypes: Array<PostType> = ["Tools", "Papers"];

const typeStyles: Record<PostType, { active: string; inactive: string; pill: string }> = {
  Tools: {
    active: "bg-teal-600 text-white border-teal-600",
    inactive:
      "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 hover:border-teal-300",
    pill: "bg-teal-50 text-teal-700 border border-teal-200",
  },
  Papers: {
    active: "bg-purple-600 text-white border-purple-600",
    inactive:
      "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300",
    pill: "bg-purple-50 text-purple-700 border border-purple-200",
  },
};

function isPostType(value: string | null): value is PostType {
  return value === "Tools" || value === "Papers";
}

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const activeType = isPostType(searchParams.get("type"))
    ? searchParams.get("type")
    : null;

  const filtered = activeType ? posts.filter((post) => post.type === activeType) : posts;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <span className="text-sm text-slate-500 mr-1">Filter by topic:</span>
        <Link
          href="/blog"
          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
            activeType === null
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
          }`}
        >
          All
        </Link>

        {postTypes.map((type) => (
          <Link
            key={type}
            href={`/blog?type=${type}`}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
              activeType === type ? typeStyles[type].active : typeStyles[type].inactive
            }`}
          >
            {type}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-400">No posts found in this category yet.</p>
      ) : (
        <ul className="space-y-10">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <p className="text-xs text-slate-400">{post.date}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyles[post.type].pill}`}
                  >
                    {post.type}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h2>
                {post.excerpt && <p className="text-slate-500 text-sm">{post.excerpt}</p>}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500"
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
    </>
  );
}
