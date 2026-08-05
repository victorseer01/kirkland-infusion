import fs from "fs";
import path from "path";

// Resolve specialty photos present in /public/specialties at build time.
// Drop <slug>.(jpg|jpeg|png|webp) into that folder and it appears automatically;
// any specialty without a photo cleanly falls back to the gradient placeholder.
export function resolveSpecialtyImage(slug: string): string | undefined {
  const dir = path.join(process.cwd(), "public", "specialties");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return undefined;
  }
  const match = files.find(
    (f) =>
      /\.(jpe?g|png|webp)$/i.test(f) &&
      f.slice(0, f.lastIndexOf(".")).toLowerCase() === slug,
  );
  return match ? `/specialties/${match}` : undefined;
}
