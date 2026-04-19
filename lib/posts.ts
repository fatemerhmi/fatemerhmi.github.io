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

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[“”"'`]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export type PostType = "Tools" | "Papers";

function normalizePostType(value: unknown): PostType {
  const normalized = String(value ?? "").trim().toLowerCase();

  if (normalized === "papers" || normalized === "paper") {
    return "Papers";
  }

  return "Tools";
}

export interface PostHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  lastEdited?: string;
  tags: string[];
  type: PostType;
  draft: boolean;
  excerpt?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  headings: PostHeading[];
}

function extractHeadings(markdown: string): PostHeading[] {
  const counts = new Map<string, number>();

  return markdown
    .split("\n")
    .map((line) => line.match(/^(##|###)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const level = match[1].length as 2 | 3;
      const text = match[2].trim();
      const baseId = slugifyHeading(text);
      const seen = counts.get(baseId) ?? 0;
      counts.set(baseId, seen + 1);
      const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

      return { level, text, id };
    });
}

function addHeadingIds(html: string, headings: PostHeading[]): string {
  let h2Index = 0;
  let h3Index = 0;
  const h2Headings = headings.filter((heading) => heading.level === 2);
  const h3Headings = headings.filter((heading) => heading.level === 3);

  return html
    .replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
      const heading = h2Headings[h2Index++];
      return heading ? `<h2 id="${heading.id}">${text}</h2>` : `<h2>${text}</h2>`;
    })
    .replace(/<h3>(.*?)<\/h3>/g, (_, text) => {
      const heading = h3Headings[h3Index++];
      return heading ? `<h3 id="${heading.id}">${text}</h3>` : `<h3>${text}</h3>`;
    });
}

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//i.test(href);
}

function addExternalLinkTargets(html: string): string {
  return html.replace(/<a\s+([^>]*?)href="([^"]+)"([^>]*)>/gi, (match, before, href, after) => {
    if (!isExternalHref(href)) return match;
    if (/\btarget=/.test(match)) return match;

    return `<a ${before}href="${href}"${after} target="_blank" rel="noopener noreferrer">`;
  });
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
        lastEdited: data.lastEdited ? formatDate(data.lastEdited) : undefined,
        tags: data.tags ?? [],
        type: normalizePostType(data.type),
        draft: data.draft ?? false,
        excerpt: data.excerpt ?? "",
        _rawDate: data.date instanceof Date ? data.date : new Date(String(data.date ?? "")),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b._rawDate.getTime() - a._rawDate.getTime())
    .map(({ _rawDate, ...rest }) => rest);
}

export async function getPost(slug: string): Promise<Post> {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const headings = extractHeadings(content);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const contentHtml = addExternalLinkTargets(addHeadingIds(processed.toString(), headings));

  return {
    slug,
    title: data.title ?? slug,
    date: formatDate(data.date),
    lastEdited: data.lastEdited ? formatDate(data.lastEdited) : undefined,
    tags: data.tags ?? [],
    type: normalizePostType(data.type),
    draft: data.draft ?? false,
    excerpt: data.excerpt ?? "",
    contentHtml,
    headings,
  };
}
