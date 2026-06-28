# Building the Evergreen Rheumatology Website with Claude Code

A step-by-step guide to building **evergreen-rheumatology** as a sibling of the Kirkland Specialty Infusion site, reusing the same stack, components, conventions, and Claude Code workflow. Evergreen content will be supplied in its own repo; this guide tells Claude Code how to turn that content into a finished site that matches the family look-and-feel.

> **Source of truth:** SGSL-REQ-2026-016 (Consolidated Requirements Register). Evergreen-specific items live in **R-11.1–R-11.4**. This guide operationalizes them; if it ever disagrees with the register, the register wins.

---

## 0. The idea: clone the system, swap the content

The Kirkland repo is effectively a **template**. ~90% of the value (architecture, components, SEO scaffolding, form pipeline, asset conventions, content rules) is content-agnostic and should be reused verbatim. Evergreen differs mainly in **content, information architecture (a rheumatology clinic, not an infusion suite), and a pre-opening state**.

**Do not rebuild from scratch.** Start from the Kirkland repo as a baseline, then delete/replace content.

---

## 1. Stack & conventions (must match Kirkland)

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), SSG |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + brand tokens in `tailwind.config.ts` / `app/globals.css` |
| UI primitives | Radix + `class-variance-authority` in `components/ui/` (Button, Input, Select, Checkbox, Textarea, Label, Accordion) |
| Icons | `lucide-react` |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Content | Typed constants in `lib/constants.ts` (+ `next-mdx-remote`/`gray-matter` only if long-form pages are needed) |
| Animation | Hand-rolled CSS + IntersectionObserver (`Reveal`), no framer-motion |
| Hosting | Vercel |

**Conventions worth preserving (these are the "house style"):**
- **`lib/constants.ts` is the content layer.** Pages map over typed arrays (`SITE`, `NAV_LINKS`, `SPECIALTIES`, `FAQ_CATEGORIES`, `TEAM`, etc.). Editors change data, not JSX.
- **`components/ui/` = primitives; `components/shared/` = composed sections** (`PageHero`, `SectionHeading`, `AwardsMarquee`, `AlternatingFeatures`, `MediaPlaceholder`, `JsonLd`, `PageLoader`, `StickyCallBar`, `Reveal`). Reuse these directly.
- **Build-time `fs` asset scans.** Awards (`lib/awards.ts`), insurance logos, and staff photos are auto-discovered from `public/` folders by filename slug, with graceful fallbacks. Copy these patterns so editors can "drop a file in a folder" without touching code.
- **SEO scaffolding:** `lib/metadata.ts` (`buildMetadata`), `components/shared/JsonLd.tsx`, `app/sitemap.ts` (driven by `ALL_ROUTES`), `app/robots.ts`. Reuse all four.
- **Brand assets** live in `public/brand/` as white-on-transparent + dark-on-transparent logo variants (see §4).

---

## 2. Claude Code setup for the Evergreen repo

1. **Scaffold from Kirkland.** Copy the Kirkland repo into the new `evergreen-rheumatology` repo, then:
   - Keep: `app/` scaffolding, all of `components/`, `lib/` (utilities, metadata, schemas, webhook, awards), `tailwind.config.ts`, `app/globals.css`, config files, `CONTENT_RULES.md`, `PLAYBOOK.md`.
   - Empty/replace the content in `lib/constants.ts` and the page bodies.
   - Clear `public/awards`, `public/staff`, `public/insurance`, `public/home`, `public/hero`, `public/brand` and replace with Evergreen assets.
2. **Write a `CLAUDE.md`** at the repo root (use the `/init` skill, then edit). It should state: the stack, the "constants-first" content model, the `components/ui` vs `components/shared` split, the asset-folder conventions, the CONTENT_RULES, and "this is the Evergreen rheumatology clinic site, part of the OAOC family." This is what makes Claude Code's later edits match the house style.
3. **Carry over `CONTENT_RULES.md`** verbatim (no fabricated bios/awards/testimonials, no emojis, no CDC/NIH/FDA endorsement claims, **no em dashes**, HIPAA notice + acknowledgement on every form). Add it to `CLAUDE.md` by reference.
4. **Environment:** set `FORM_WEBHOOK_URL` in Vercel (GHL). For the referral entry point, see the portal doc (§ "Integration with marketing sites").

**Claude Code skills/tools to lean on (all used building Kirkland):**
- `/init` — generate the initial `CLAUDE.md`.
- **TodoWrite** — track multi-step page builds.
- **Bash + ImageMagick (`magick`)** — logo transparency extraction, photo → optimized JPG, favicon generation (recipes in §4).
- **Prettier** (`npx prettier --write`) — formatting after bulk content edits.
- **Dev server + `curl` smoke checks** — verify each route returns 200 and key copy renders before moving on.
- `/code-review` and `/security-review` — run before launch (the security review matters once the referral form is wired).
- `verify` / `run` skills — drive the app to confirm a change works in the real browser.
- `tsc --noEmit` (`npm run typecheck`) + `next build` — gate every batch. **Do not run `next build` while `next dev` is running** (they share `.next` and clash).

---

## 3. Content model mapping (Evergreen content → code)

Evergreen content arrives from SGSL (already developed from Dr. Dada's brochure — **R-11.1: use it as the page-by-page source of truth, do not rewrite**). Map it to the same typed shapes:

| Evergreen content | Where it goes |
|---|---|
| NAP, hours, phone/fax, tagline, OAOC affiliation | `SITE` in `lib/constants.ts` (note: **distinct address** — Evergreen is 2911 120th Ave N.E., Suite A-50; do **not** conflate with Kirkland's 12911 … Suite C-80, per **R-11.8**) |
| Primary navigation | `NAV_LINKS` (rheumatology IA — see §5) |
| Conditions treated | A `CONDITIONS` array, **named individually** (RA, ankylosing spondylitis, psoriatic arthritis, gout, lupus, vasculitis, PMR, giant cell arteritis, osteoporosis…) — **R-11.4 / R-3.1**, no "inflammatory arthritis" umbrella |
| Services / treatments | `SERVICES` array |
| Providers (8) | `TEAM` array + `/team` page reusing `TeamGallery` (see §5 for the "Joining Aug 2026" flag) |
| FAQs | `FAQ_CATEGORIES` (same shape, FAQPage JSON-LD) |
| Awards | drop into `public/awards/` (auto-loaded by `AwardsMarquee`) |
| Forms (contact / appointment / referral) | `lib/schemas.ts` (zod) + `app/api/forms/*` + `lib/webhook.ts` |

Keep every page a thin renderer over these arrays.

---

## 4. Asset pipeline (reuse the Kirkland recipes)

**Logos** → produce transparent variants so they composite on dark/light:
```bash
# white-on-transparent (for dark headers/footers)
magick LOGO.png -alpha off -colorspace Gray -level 30%,70% /tmp/mask.png
magick LOGO.png -alpha off -fill white -colorize 100 /tmp/white.png
magick /tmp/white.png /tmp/mask.png -alpha off -compose CopyOpacity -composite -trim +repage PNG32:public/brand/logo-stacked-white.png
```
(Use a negated mask + original colors for the dark-on-transparent variant.) Wire into `components/layout/Logo.tsx`.

**Favicon** → crop the icon mark, set on brand background, export `app/icon.png` (512) + `app/apple-icon.png` (180).

**Staff photos** → `magick "Source.png" -resize '1000x1000>' -strip -quality 86 public/staff/<slug>.jpg`. Filenames are slugs matching `TEAM[].slug`. Gallery falls back to initials if missing.

**Insurance logos** (if Evergreen lists carriers) → `public/insurance/<slug>.(svg|png|jpg|webp)`; matcher is case-insensitive.

**Awards** → drop into `public/awards/` named `Dada-<Award-Name>-<Year>.ext`; alt text derives from the filename automatically.

---

## 5. Evergreen-specific requirements (the real differences)

1. **Pre-opening state (R-11.2).** Evergreen launches in an "**Opening August 2026**" state, including the **October 2026 Physician Open House** content, with a **single configuration toggle** to flip to open-state at launch. Implement as a `SITE.preOpening: boolean` (or `SITE.status: "pre-opening" | "open"`) flag in `lib/constants.ts` that:
   - swaps hero copy/CTAs ("Opening August 2026" + open-house info vs. normal booking),
   - shows/hides the open-house section,
   - adjusts JSON-LD (`openingHoursSpecification`, announcement),
   - is the **one place** you change at go-live. Document it in `CLAUDE.md`.
2. **All eight providers (R-11.3),** with the two August 2026 joiners (**Dr. Usmani, Dr. Schluentz**) flagged **"Joining Aug 2026."** Reuse the `TeamGallery` `badge` field (it already supports a pill like the retired "Incoming") — set `badge: "Joining Aug 2026"` on those two.
3. **Rheumatology clinic IA, not infusion.** Evergreen is the referring/clinic practice. Likely nav: About, Providers/Team, Conditions, Services, Patients/Resources, Insurance, Contact, plus **"Refer a Patient"** pointing at the shared portal (see portal doc). It does **not** get the infusion "What to Expect" three-stage journey.
4. **Conditions named individually (R-11.4 / R-3.1)** — applies here too.
5. **Brand & feel:** same OAOC family identity; reference the **Lakeside Research Center** look-and-feel (R-11.9) — warm, calm, "local and trusted," avoid clinical-cold imagery (R-1.1, R-9.1).
6. **Cross-link the family:** footer + About should carry the OAOC partner button (as Kirkland does) and link between sites.

---

## 6. Page-by-page build plan (Claude Code prompt sequence)

Run these as discrete Claude Code turns; typecheck + smoke-check between each.

1. **Foundations** — "Set up `SITE`, brand tokens, logo, favicon, nav, footer (with `status` pre-opening flag and OAOC partner button). Carry over CONTENT_RULES."
2. **Home (pre-opening variant)** — hero with "Opening August 2026", open-house teaser, who-we-are, conditions/services preview, providers preview, awards marquee, CTA.
3. **Providers / Team** — populate `TEAM`, reuse `TeamGallery`, flag the two Aug-2026 joiners.
4. **Conditions** — individually named, grouped sensibly; reuse `SectionHeading` + card/`AlternatingFeatures`.
5. **Services / Treatments.**
6. **Patients / Resources** (forms/insurance/FAQs as applicable) — `FAQ_CATEGORIES`, insurance logos.
7. **Contact** — contact form + map + NAP (correct Evergreen address).
8. **Refer a Patient** — entry point to the shared portal (deep link / embedded CTA per portal doc).
9. **SEO pass** — `buildMetadata` per page, JSON-LD (`MedicalClinic`/`Physician` + `FAQPage`), sitemap, robots, OG image.
10. **Open-house content + go-live toggle rehearsal** — confirm flipping `status` to `"open"` cleanly switches the site.

For each: feed Claude Code the supplied Evergreen copy and say "render using existing `components/shared` patterns; data into `lib/constants.ts`; no em dashes; follow CONTENT_RULES."

---

## 7. Content rules (carry over verbatim)

From `CONTENT_RULES.md` + this project's learned rules:
- No fabricated provider bios, awards, or testimonials — only client-supplied.
- **No em dashes / long dashes anywhere** (commas or restructure). This was a major client tell-of-AI correction.
- No emojis in copy, comments, or commits.
- No claimed CDC/NIH/FDA endorsement.
- Every form: HIPAA notice + "I acknowledge" checkbox + not-for-emergencies advisory; no PHI persisted client-side.
- Replace AI-generated/stock-cold imagery with warm, real photography.

---

## 8. Definition of Done (per SGSL-DEV-2026-016 + this build)

- All pages render with family parity; typecheck + `next build` clean.
- Conditions named individually; providers complete with Aug-2026 flags.
- Pre-opening state correct; one-toggle flip to open verified.
- Forms post the GHL contract (see portal doc); HIPAA notice present.
- Mobile responsive (360/768/1280), no horizontal scroll; WCAG AA contrast; alt text on all images.
- JSON-LD on every page; FAQPage on FAQs; sitemap lists all routes.
- `/code-review` and `/security-review` run and addressed.

---

## Appendix — directory map to clone from Kirkland

```
app/                 # routes; replace page bodies, keep sitemap/robots/metadata/api
components/ui/        # primitives — reuse as-is
components/shared/    # PageHero, SectionHeading, AwardsMarquee, AlternatingFeatures,
                      # MediaPlaceholder, JsonLd, PageLoader, StickyCallBar, Reveal — reuse
components/layout/    # Navbar, NavDropdown, MobileMenu, Footer, Logo — reuse, re-skin via tokens
components/team/      # TeamGallery — reuse (supports `badge`)
components/forms/     # ReferralForm, ContactForm, HipaaNotice — reuse, adjust schema
lib/                  # constants (REPLACE content), metadata, schemas, webhook, awards, utils
public/{brand,hero,home,staff,awards,insurance}/  # replace assets (slug conventions)
CONTENT_RULES.md      # carry over verbatim
PLAYBOOK.md           # reusable marketing-site reference
```
