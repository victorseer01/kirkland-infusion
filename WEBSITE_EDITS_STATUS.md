# Kirkland Specialty Infusion — Website Edits Implementation Status

**Last updated:** 2026-06-20
**Repo:** kirkland-infusion (Next.js 14 / Vercel) — Kirkland site only
**Sources synthesized:** SGSL-REQ-2026-016 (Consolidated Requirements Register), Dr. Dada's Website Edit Guide, Kirkland Infusion Website Edit Checklist (Jona & Ewaen review)

**Legend:** ✅ Done · 🟡 Partial · ⛔ Blocked on assets · 💬 Needs discussion · 🏗️ Major build (separate)

---

## 1. Summary

| Status | Count |
|---|---|
| ✅ Implemented & verified | 31 |
| ⛔ Blocked on client assets (images) | 5 |
| 💬 Needs discussion / decision | 2 |
| 🏗️ Major build (out of current scope) | 2 |

All implemented items pass `tsc` typecheck and `next build` (17 static routes). No fabricated bios, awards, testimonials, or endorsements (per CONTENT_RULES.md).

---

## 2. Done ✅

### General / site-wide
- ✅ **Em dashes / long dashes removed site-wide** (86 em + 12 en → 0). Numeric ranges → hyphens (`30-45`), time/day ranges → "to" (`Monday to Friday`), prose em dashes → commas. Re-formatted with Prettier.

### Home page
- ✅ **"Refer a Patient" CTA made prominent** — hero shows it as a visible button; navbar button enlarged with ring/shadow, visible on all screen sizes (shortens to "Refer" on phones), confirmed active link to `/physicians#refer`.
- ✅ **Header / hero images updated** (client-supplied).
- ✅ **Financial Advocacy section image replaced** with the "No Surprise Billing" graphic (`/home/pillar-2-financial.jpg`).
- ✅ **"Physician-Supervised" → "Physician Supervised"** (hyphen removed in pillar heading).
- ✅ **Awards/recognition row** shows the two most recent accolades — **2026 Castle Connolly Top Doctors** and **Patients' Choice 2008** added (marquee auto-loads `public/awards/`).
- ✅ **"Specialties" stat corrected 8 → 7** (after Oncology/Hematology removed).
- ✅ **Patient-first rebalance (R-2.1, 60/40)** — hero leads with patient messaging; WhoWeServe and BottomCta reordered patient-first.

### About Us
- ✅ **Dr. Dada's portrait added to "Our Story"** — captioned, height-balanced (4:3 on desktop), left column is sticky on scroll; collapses to a compact card on mobile.
- ✅ **"Five standards we will not compromise on" redesigned** — alternating left/right title + content rows (number above the title), replacing the plain gray block. New shared component `components/shared/AlternatingFeatures.tsx`.
- ✅ **Awards & recognition row added** (same shared marquee as the homepage — `components/shared/AwardsMarquee.tsx`).
- ✅ **OAOC clinical-care-partner button** (also in footer) → `https://www.overlakearthritis.com` (new tab).
- ✅ **Two incoming physicians on the team** (Dr. Usmani, Dr. Schluentz).
- ✅ **Bios verified distinct** — no duplicated bio (the old Lakeside Gali/Putz duplication does not exist here).
- ✅ **Logo enlarged** — approved.

### Team page (`/team`)
- ✅ **Dedicated team page** with photo grid → click-to-open profile overlay (image left, bio right), prev/next arrows outside the box, keyboard nav, click-outside/Esc, loader so image + text appear together.
- ✅ **All 13 staff** in order (8 providers + 5 infusion nurses), real photos wired in (`/staff/<slug>.jpg`).
- ✅ Profile category shown **singular** ("Provider" / "Infusion Nurse"); "Incoming" tag removed per direction.

### Services — Medications & Therapies
- ✅ **Oncology and Hematology removed** (specialty + conditions, both Specialties and Medications views).
- ✅ **Rheumatology additions:** Ilumya, Saphnelo, Octagam (IVIG).
- ✅ **"severe osteoporosis" → "gout"** (specialties intro example).
- ✅ **All medications hyperlinked** to manufacturer sites (formulary cards + specialty chips, new tab).
- ✅ **Missing drugs added:** Entyvio, Saphnelo (full linked list: Actemra, Benlysta, Cimzia, Cosentyx, Entyvio, Evenity, Ilaris, Ilumya, Krystexxa, Octagam (IVIG), Ocrevus, Orencia, Pemgarda, Remicade, Rituxan, Saphnelo, Simponi Aria, Stelara, Tepezza, Uplizna, Vyvgart).
- ✅ **Conditions named individually** (R-3.1), **therapies grouped by specialty** (R-3.3), "multi-specialty" language (R-3.7).

### For Patients — What to Expect
- ✅ **Three-stage journey** (Pre-Infusion → Infusion Day → Post-Infusion Follow-Up) with correct sequencing.
- ✅ **Pre-Infusion rewritten** to the latest expanded copy ("Before you arrive, we are already working…"), multi-paragraph, APP terminology; the "remove this one" card removed.

### For Patients — Insurance & Financial Aid
- ✅ **Tricare removed**, **First Choice Health added** (carrier list + FAQ answer).
- ✅ **Insurance company logos added** — all 9 carriers render as logo tiles (hover reveals the name); auto-detected from `public/insurance/` (case-insensitive), name-only fallback if a file is missing.

### For Patients — FAQs
- ✅ **Categorized FAQ set** from approved copy (General, Billing & Insurance, Getting Scheduled, Before/During/After Your Infusion) with bullets/notes + FAQPage JSON-LD. No further changes requested.

### For Physicians
- ✅ **Two sections consolidated into one** "white-glove promise" using the new copy (7 items incl. "Referral & Patient Coordination" and "Infusion Day"); separate six-step section removed.
- ✅ **"A Physician is Always On Site"** wording updated (Physician or experienced APP).

### Referral form
- ✅ **NPI field removed.**
- ✅ **Full Name → First Name + Last Name.**
- ✅ **Practice Name optional.**
- ✅ **Phone + Fax kept.**
- ✅ **Email optional.**

### Brand / favicon
- ✅ **New HD logo** in navbar, footer, page loader (white-on-transparent); **favicon + apple-icon** regenerated from the new mark on brand teal. Horizontal logo variants available in `public/brand/`.

---

## 3. Blocked on client assets ⛔

Need real photography (Google Drive / Jona). Heading text and layout are already done; only the image swap remains.

- ⛔ **Home surgical-team image** — replace with a non-surgical clinical team (no masks/caps).
- ⛔ **Home "Physician Supervised" image** — friendlier image reading as a physician (heading text already fixed).
- ⛔ **Home infusion-pump image** — secure/professional infusion setup.
- ⛔ **For Physicians** — image(s) to break up the text.
- ⛔ **Site-wide** — replace any remaining AI-generated imagery with real stock (e.g., iStock).

*Notes: "Seamless Communication" image — keep as is (approved). Home header/hero images and the Financial Advocacy image are now done.*

---

## 4. Needs discussion 💬

- 💬 **"Medical Billing" → "No Surprise Billing"** (Home) — confirm preferred wording + welcoming image with Dr. Dada. (No section literally named "Medical Billing" exists in the current build; may map to the "Financial Advocacy" pillar or only the older live deploy — needs a pointer.)
- 💬 **Referral form → secure File Upload** — replace manual patient-info entry with file upload + a checklist of file types (labs/records). Reference: existing Overlake referral form.

---

## 5. Major build — out of current scope 🏗️

- 🏗️ **HIPAA-compliant document-upload portal** — physicians should not type clinical notes on the site; route document submission to a secure landing page (GHL HIPAA pipeline). Pending design discussion (Dr. Okao / Dr. Dada / Victor). Aligns with the central referring-physician portal (register R-6).
- 🏗️ **Central referring-physician portal & multi-site (Bellevue/Evergreen)** — register R-6 / R-11; separate from this Kirkland repo.

---

## 6. Asset drop reference (filenames)

- **Staff photos** (done) — `public/staff/<slug>.jpg`.
- **Insurance logos** (done) — `public/insurance/<slug>.(svg|png|jpg|webp)` (`premera-blue-cross`, `regence-blueshield`, `aetna`, `cigna`, `unitedhealthcare`, `kaiser-permanente`, `first-choice-health`, `medicare`, `medicare-advantage`). Matcher is case-insensitive.
- **Awards** (auto-loaded) — drop any badge into `public/awards/`; alt text derives from the filename (`Dada-<Award-Name>-<Year>.ext`).
- **Remaining home / physicians images** — to be provided from the Drive; filenames TBD per section once assets arrive.
