import fs from "fs";
import path from "path";

// Turn a medication name into a file slug, e.g. "Simponi Aria" -> "simponi-aria".
export function slugifyForm(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Resolve a per-medication referral form PDF in /public/referral-forms at build
// time. Drop "<slugified-name>.pdf" into that folder (e.g. simponi-aria.pdf,
// tepezza.pdf) and the medication links straight to its downloadable form;
// otherwise callers fall back to the shared Drive folder.
export function resolveReferralForm(name: string): string | undefined {
  const dir = path.join(process.cwd(), "public", "referral-forms");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return undefined;
  }
  const slug = slugifyForm(name);
  const match = files.find(
    (f) =>
      /\.pdf$/i.test(f) && f.slice(0, f.lastIndexOf(".")).toLowerCase() === slug,
  );
  return match ? `/referral-forms/${match}` : undefined;
}
