// FILE: server/scripts/seedTopicsFromCSV.mjs
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Topic from "../models/topic.js";

dotenv.config();
const MONGO = process.env.MONGODB_URI || "mongodb://localhost:27017/medknowledge";

/** CSV beklenen kolonlar (başlık satırı şart):
title,slug,section,content,subtopics,relatedTopics,relatedCases,references
- subtopics: JSON array string (örn: [{"title":"Membranöz","slug":"membranoz","content":"..."}])
- relatedTopics/relatedCases/references: virgüllü liste veya JSON array
*/
function parseListOrJSON(s) {
  if (!s) return [];
  const t = String(s).trim();
  if (!t) return [];
  try {
    const parsed = JSON.parse(t);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // "a, b, c"
    return t.split(",").map(x => x.trim()).filter(Boolean);
  }
}

function csvParse(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map(c => c.trim());
    const obj = {};
    header.forEach((h, idx) => obj[h] = cols[idx] ?? "");
    rows.push(obj);
  }
  return rows;
}

function slugify(str = "") {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g,"i").replace(/İ/g,"I").replace(/ş/g,"s").replace(/Ş/g,"S")
    .replace(/ğ/g,"g").replace(/Ğ/g,"G").replace(/ü/g,"u").replace(/Ü/g,"U")
    .replace(/ö/g,"o").replace(/Ö/g,"O").replace(/ç/g,"c").replace(/Ç/g,"C")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-+|-+$/g,"");
}

async function run() {
  const file = process.argv[2];
  if (!file) {
    console.error("Kullanım: node scripts/seedTopicsFromCSV.mjs <csv_yolu>");
    process.exit(1);
  }
  const abs = path.resolve(process.cwd(), file);
  const text = fs.readFileSync(abs, "utf8");
  const rows = csvParse(text);
  console.log(`[CSV] ${rows.length} satır bulundu`);

  await mongoose.connect(MONGO);
  console.log("[CSV] Mongo connected");

  for (const r of rows) {
    const title   = (r.title || "").trim();
    const slug    = (r.slug || slugify(title));
    const section = (r.section || "").toLowerCase().trim();
    const content = String(r.content || "");

    if (!title || !section) {
      console.log(`SKIP (title/section eksik): ${title} / ${section}`);
      continue;
    }

    const subtopics     = parseListOrJSON(r.subtopics || "[]");
    const relatedTopics = parseListOrJSON(r.relatedTopics || "");
    const relatedCases  = parseListOrJSON(r.relatedCases || "");
    const references    = parseListOrJSON(r.references || "");

    const data = { title, slug, section, content, subtopics, relatedTopics, relatedCases, references };

    const existing = await Topic.findOne({ slug });
    if (existing) {
      await Topic.updateOne({ slug }, { $set: data });
      console.log(`Updated: ${slug}`);
    } else {
      await Topic.create(data);
      console.log(`Inserted: ${slug}`);
    }
  }

  await mongoose.disconnect();
  console.log("[CSV] Done.");
  process.exit(0);
}

run();
