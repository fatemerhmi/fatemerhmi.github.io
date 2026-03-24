import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDir = path.join(process.cwd(), "content/blog");

function formatDate(raw: unknown): string {
  if (!raw) return "";
  const d = raw instanceof Date ? raw : new Date(String(raw));
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  draft: boolean;
  excerpt?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: formatDate(data.date),
        tags: data.tags ?? [],
        draft: data.draft ?? false,
        excerpt: data.excerpt ?? "",
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    slug,
    title: data.title ?? slug,
    date: formatDate(data.date),
    tags: data.tags ?? [],
    draft: data.draft ?? false,
    excerpt: data.excerpt ?? "",
    contentHtml: processed.toString(),
  };
}
