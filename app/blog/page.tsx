import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/BlogList";

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
      <Suspense>
        <BlogList posts={posts} />
      </Suspense>
    </main>
  );
}
