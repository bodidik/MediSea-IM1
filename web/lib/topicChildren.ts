import fs from "fs";
import path from "path";

export function getChildLinks(appSubPath) {
  const baseDir = path.join(process.cwd(), "app", appSubPath);
  let entries = [];
  try {
    entries = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .filter(slug => fs.existsSync(path.join(baseDir, slug, "page.tsx")));
  } catch { entries = []; }

  const toTitle = s =>
    s.split("-").map(w => w && w[0].toUpperCase() + w.slice(1)).join(" ");

  return entries
    .map(slug => ({
      slug,
      title: toTitle(slug),
      href: `/${appSubPath}/${slug}`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "tr"));
}
