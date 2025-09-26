import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type TopicFM = {
  title: string;
  summary?: string;
  lang?: "TR" | "EN";
  section?: string;
  tags?: string[];
  updatedAt?: string; // ISO
  // Bölüm görünürlükleri (opsiyonel)
  sections?: Array<{ title: string; html?: string; visibility?: "V" | "M" | "P" }>;
};

export function getTopicFile(slug: string) {
  const base = path.join(process.cwd(), "content", "topics", slug, "index.mdx");
  return fs.existsSync(base) ? base : null;
}

export function readTopic(slug: string): { fm: TopicFM; mdx: string } | null {
  const file = getTopicFile(slug);
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = (data || {}) as TopicFM;
  return { fm, mdx: content };
}

export function getChildFile(slug: string, id: string) {
  const p = path.join(process.cwd(), "content", "topics", slug, "child", `${id}.mdx`);
  return fs.existsSync(p) ? p : null;
}

export function readChild(slug: string, id: string): { fm: Record<string, any>; mdx: string } | null {
  const file = getChildFile(slug, id);
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { fm: (data || {}) as any, mdx: content };
}
