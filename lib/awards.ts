import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "awards");

export type Award = {
  src: string;
  alt: string;
};

// Derive a readable alt from a filename like "Dada-Castle-Connolly-2017.jpg"
// → "Castle Connolly Top Doctors — 2017"
function altFromFilename(filename: string): string {
  const base = path
    .basename(filename, path.extname(filename))
    .replace(/^Dada-/i, "")
    .replace(/-O\d+$/i, "");
  const yearMatch = base.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : null;
  const body = base
    .replace(/(\d{4}.*)$/, "")
    .replace(/-+$/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return year ? `${body} — ${year}` : body;
}

export function getAwards(): Award[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.(jpe?g|png|webp|avif|svg)$/i.test(f))
    .sort()
    .map((f) => ({
      src: `/awards/${f}`,
      alt: altFromFilename(f),
    }));
}
