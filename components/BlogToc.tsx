"use client";

import { useEffect, useState } from "react";
import type { PostHeading } from "@/lib/posts";

export default function BlogToc({ headings }: { headings: PostHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    const onScroll = () => {
      const current = elements.findLast((element) => element.getBoundingClientRect().top <= 140);
      if (current) setActiveId(current.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block xl:w-64 xl:flex-shrink-0">
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-4">
          On this page
        </p>
        <nav aria-label="Table of contents">
          <ul className="space-y-1.5">
            {headings.map((heading) => {
              const isActive = heading.id === activeId;

              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={`block rounded-lg border-l-2 py-1.5 text-sm transition-colors ${
                      heading.level === 3 ? "pl-5" : "pl-3"
                    } ${
                      isActive
                        ? "border-blue-600 text-blue-700 bg-blue-50/80 font-medium"
                        : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
