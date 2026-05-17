# Phase 2 — WordPress + Elementor conversion plan

A pragmatic plan for taking the Next.js build live on WordPress so the SGSL ops team can edit content with Elementor without losing any of the design decisions or behaviors shipped in Phase 1.

---

## 1. Goal & constraints

**Goal:** ship the exact same site (visual, copy, interactions, SEO, form payload contract) on a WordPress child theme edited via Elementor, hosted on a managed WP host.

**Non-negotiables:**
- Visual parity with the Next.js build — same brand tokens, typography, spacing.
- Form payloads must match the GoHighLevel webhook contract in `lib/webhook.ts` exactly so GHL routing rules don't need rebuilding.
- All `CONTENT_RULES.md` rules carry over (no fabricated bios/awards, HIPAA notice on every form, no emojis, no CDC/NIH/FDA endorsement claims).
- WCAG AA contrast, mobile responsive at 360/768/1280, Lighthouse 90+ Performance/Accessibility.

**Out of scope for Phase 2:**
- New pages or features beyond Phase 1's 9-page IA.
- The `dada-family-site` Claude Skill itself — Phase 2 is the *manual* version that the Skill will eventually auto-generate. Patterns we land on here become the Skill's template inputs.

---

## 2. Target stack

| Layer | Choice | Why |
|---|---|---|
| WP version | 6.5+ | Block editor matures + Elementor parity |
| Parent theme | **Hello Elementor** | Minimal, fast, zero opinion — Elementor's official skeleton |
| Child theme | `kirkland-specialty-infusion` | Where our brand styles, custom widgets, ACF defs live |
| Page builder | **Elementor Pro** | Forms widget, Theme Builder, Custom Code, Motion Effects |
| Content modeling | **ACF Pro** | Custom fields, Options page, Repeater for structured content |
| Form routing | Elementor Pro Forms → GHL webhook | Matches Skill spec §7 contract |
| SEO | **Yoast SEO (free)** + hand-coded JSON-LD | MedicalBusiness/FAQPage schema |
| Caching | **WP Rocket** | Page cache, critical CSS, lazy-load |
| Image optim | **ShortPixel** or host's built-in (Kinsta APO/Imagify) | Replaces Next/Image |
| Backups | **WPVivid** | Scheduled offsite backups |
| Hosting | **Kinsta** or **WP Engine** | Managed WP, Nginx, free SSL, staging environment |

License costs roughly $250–350/year (Elementor Pro $59, ACF Pro $59, WP Rocket $59, ShortPixel $99 one-time, hosting $30–60/mo).

---

## 3. Routes → WP pages

Same 9-page IA. Each becomes a WP Page assigned an Elementor template.

| Next route | WP page slug | Elementor template | Source of truth in Phase 1 |
|---|---|---|---|
| `/` | `home` (set as front page) | "Home — landing" | `app/page.tsx` + 6 home components |
| `/about` | `about` | "Interior — narrative" | `app/about/page.tsx` |
| `/specialties` | `specialties` | "Interior — grid" | `app/specialties/page.tsx` |
| `/medications` | `medications` | "Interior — formulary" | `app/medications/page.tsx` |
| `/patients` | `patients` | "Interior — long-form" | `app/patients/page.tsx` |
| `/physicians` | `physicians` | "Conversion — referral" | `app/physicians/page.tsx` |
| `/insurance` | `insurance` | "Interior — checklist" | `app/insurance/page.tsx` |
| `/faqs` | `faqs` | "Interior — accordion" | `app/faqs/page.tsx` |
| `/contact` | `contact` | "Conversion — contact" | `app/contact/page.tsx` |

WP Theme Builder: `header` (Navbar), `footer`, `404 page` (not-found.tsx), `single` (unused — no blog yet).

---

## 4. Components → Elementor / PHP

| Phase 1 component | Conversion approach | Effort |
|---|---|---|
| **Navbar** (`components/layout/Navbar.tsx`) | Elementor header template, Nav Menu widget + Mega Menu add-on for the two parent dropdowns (Services, For Patients) | Medium |
| **MobileMenu portal** (`components/layout/MobileMenu.tsx`) | Elementor's built-in mobile menu (portal pattern unnecessary — Elementor handles stacking) | Built-in |
| **Footer** (`components/layout/Footer.tsx`) | Elementor footer template, 3-column with custom CSS | Low |
| **Logo** (`components/layout/Logo.tsx`) | Elementor Site Logo widget, image from media library | Built-in |
| **PageLoader** (`components/shared/PageLoader.tsx`) | Custom JS module + CSS in `theme.js`/`theme.css` — pathname-change hook is WP-specific (use `popstate` + `pageshow` events) | Low |
| **Reveal** (`components/shared/Reveal.tsx`) | Use Elementor Pro's built-in **Motion Effects → Entrance Animations** (fade-up) on each section. No custom code. | Built-in |
| **PageHero** (`components/shared/PageHero.tsx`) | Elementor Section template with brand-teal background + radial gradient via Custom CSS | Low |
| **SectionHeading** (`components/shared/SectionHeading.tsx`) | Heading widget pair (eyebrow + h2 + description) saved as Elementor Global Widget | Low |
| **MediaPlaceholder** (`components/shared/MediaPlaceholder.tsx`) | Replaced by real WP media — placeholders not needed in production. ACF Image field per slot. | n/a |
| **StickyCallBar** (`components/shared/StickyCallBar.tsx`) | Custom HTML widget with sticky CSS, shown only on mobile via Elementor's responsive controls | Low |
| **Hero slider** (`components/home/HeroBackground.tsx`) | **Custom Elementor widget** — register via `widgets_registered` hook. Controls: gallery, interval. Or use **Smart Slider 3** as drop-in replacement. | High (custom) / Low (plugin) |
| **ThreePillars** (`components/home/ThreePillars.tsx`) | Elementor 3-column with image + icon overlay + heading + text. Save as Global Section. | Low |
| **Proof** (`components/home/Proof.tsx`) | Section composition: 2-col text/stats + image, then dark slab, then awards. Stats as Counter widget. **Awards marquee = custom widget** (see below). | Medium |
| **Awards marquee** | **Custom Elementor widget** — registers a `[ksic_awards_marquee]` shortcode reading from an ACF Gallery on the Options page. CSS keyframes. Pause-on-hover. | Medium |
| **WhoWeServe** (`components/home/WhoWeServe.tsx`) | Elementor 2-col: image + stacked chip-list cards (Specialties + Therapies pulled from CPT via ACF dynamic tag) | Medium |
| **PatientStories** (`components/home/PatientStories.tsx`) | 2-col text + 2×2 image grid + testimonial cards. Testimonials from Testimonial CPT once consented. | Medium |
| **BottomCta** (`components/home/BottomCta.tsx`) | Elementor gradient section + 2 card-style CTA buttons | Low |
| **ServiceStack sticky-replace** (`components/services/ServiceStack.tsx`) | **Custom Elementor widget** — hand-coded sticky CSS, lg:sticky + lg:min-h-screen wrapper per item. Most non-trivial widget in the build. | **High** |
| **ReferralForm** + **ContactForm** | Elementor Pro Forms widget with 16/6 fields respectively, HIPAA acknowledgement checkbox, webhook action. Field labels/help match `lib/schemas.ts` zod messages. | Medium |
| **HipaaNotice** (`components/forms/HipaaNotice.tsx`) | HTML widget placed above each form's submit. Text from `components/forms/HipaaNotice.tsx` verbatim. | Low |
| **Accordion** (`components/ui/Accordion.tsx`) | Elementor's built-in Accordion widget, styled to match | Built-in |
| **Buttons / Input / Select / Textarea / Checkbox** | Elementor Form fields + Button widget, styled via Global Styles | Built-in |

**Three custom Elementor widgets to build:** Hero slider, Awards marquee, ServiceStack. Everything else is built-in widgets + CSS.

---

## 5. Content → ACF / WordPress

| Phase 1 source | WP equivalent |
|---|---|
| `SITE` in `lib/constants.ts` (NAP, hours, phone, fax, tagline) | **ACF Options Page** "Site Settings" — reusable across header, footer, contact, JSON-LD |
| `NAV_LINKS` | **Appearance → Menus** "Primary" with WP's two-level menu (parent + children renders as dropdown via Mega Menu) |
| `SPECIALTIES` (8 items) | **CPT `specialty`** — fields: slug, name, body, therapies (repeater of medication relationships) |
| `MEDICATIONS` (19 items) | **CPT `medication`** — fields: name, generic, indication |
| `FAQS` (15 items) | **CPT `faq`** — fields: question, answer. Order by `menu_order`. |
| `THREE_PILLARS`, `SIX_STEP_PROCESS`, `WHY_REFER` | **ACF Repeater fields** on the relevant Page (Home / Physicians) |
| `CASH_PAY_SERVICES` | ACF Repeater on Medications page |
| `CONTACT_REASONS` | Hardcoded in the Contact form's select options (rarely changes) |
| Hero slider images (currently `/public/hero/`) | **ACF Gallery** on Home page, or media folder convention via Smart Slider |
| Section photos (currently `/public/home/`) | **ACF Image fields** per section on each page |
| Awards (currently `/public/awards/`) | **ACF Gallery** on Site Settings Options |
| OG image | Yoast SEO → Social → Default OG Image |
| Logo, favicon | WP Site Identity (admin > customize) |

**Migration script:** a one-off PHP/WP-CLI script reads `lib/constants.ts` (or, more practically, hand-imports the data via WP admin since it's a one-time job for 8 + 19 + 15 = 42 items).

---

## 6. Brand tokens

Three options for the styling pipeline:

**Option A — Compile Tailwind, enqueue (recommended):**
- Keep the existing `tailwind.config.ts` palette + `globals.css`.
- Set up a small build step in the child theme: `npm run build` outputs `assets/css/brand.css`.
- Theme `functions.php` enqueues `brand.css`.
- HTML emitted by Elementor + custom widgets uses Tailwind utility classes.
- Pro: identical to Phase 1, zero design drift.
- Con: editorial team can't add classes they don't know exist — but they'll use Elementor's visual editor, not class strings, so this is fine.

**Option B — CSS custom properties + hand-rolled classes:**
- Lift the palette out of Tailwind into `:root` CSS variables.
- Hand-author `theme.css` with semantic classes (`.btn-coral`, `.eyebrow`, `.section-y`, etc.).
- Smaller CSS bundle, but every existing component needs CSS rewritten.

**Option C — Elementor Global Styles:**
- Set brand palette in Elementor → Site Settings → Global Colors.
- Set typography in Global Fonts.
- Every widget pulls from these.
- Pro: native Elementor workflow, editorial team can tweak.
- Con: custom widgets still need their own CSS for non-trivial layouts (ServiceStack, marquee).

**Recommendation: A + C** — compile Tailwind for layout/custom widgets, also register the brand palette in Elementor Global Styles so editors get the right swatches when editing built-in widgets.

Required CSS custom properties already in `app/globals.css`:
```
--color-primary: #1A6F73
--color-primary-light: #4A9B8C
--color-primary-dark: #0F3D47
--color-accent: #4A9B8C
--color-coral: #E07A3D
--color-navy: #0F3D47
--color-ice: #E6F0EF
```

---

## 7. Forms — preserve the webhook contract

Both forms in Phase 1 post to `/api/forms/{referral|contact}` which validates with zod and forwards to `FORM_WEBHOOK_URL`. The forwarded payload shape (from `lib/webhook.ts`):

```jsonc
{
  "source_site": "kirkland-specialty-infusion-center",
  "form_id": "referral" | "contact",
  "submitted_at": "ISO-8601",
  "fields": { /* per-form fields */ },
  "tags": ["form:...", "intent:...", "kirkland"],
  "pipeline_stage": "referral-received" | "new-inquiry"
}
```

**Phase 2 wiring:** Elementor Pro Forms → **Webhook action** posting to the same GHL URL with the same payload shape. Field names in the WP form **must match** the Phase 1 zod schema field names (`lib/schemas.ts`) so GHL automations don't break.

**HIPAA pieces preserved:**
- HIPAA notice block above submit (text verbatim from `HipaaNotice.tsx`).
- "I acknowledge" checkbox required before submit.
- TLS-only (managed host handles this).
- Server logs scrub PHI on webhook failure — Elementor Pro's webhook retries 3× and logs to admin notifications.
- No localStorage of form content — Elementor defaults are clean here.

**File upload (referral form):** Phase 1 deferred this. Phase 2 can wire Elementor's File Upload field → GHL contact attachment.

---

## 8. Animations / interactions

| Phase 1 behavior | Phase 2 implementation |
|---|---|
| `Reveal` fade-up on scroll | Elementor Section "Motion Effects → Entrance Animation: fadeInUp" |
| Hero slider crossfade + ken-burns | Custom widget with CSS `@keyframes` (port `HeroBackground.tsx` logic to vanilla JS) |
| ServiceStack sticky-replace | Custom widget — see §4. Each repeater item wraps in `lg:min-h-screen lg:sticky lg:top-24` |
| Awards marquee | Custom widget — `@keyframes scroll-x`, pause on hover via `:hover { animation-play-state: paused }` |
| NavDropdown hover/focus | Elementor Mega Menu native dropdowns |
| Mobile drawer | Elementor's mobile menu (no portal needed — they handle stacking) |
| PageLoader on route change | Custom JS — listen for `click` on anchor tags, show/hide loader on `pageshow` event |
| ServiceStack scroll-stack | Same CSS pattern as Phase 1: `lg:sticky lg:top-24` + parent `lg:min-h-screen lg:pb-16` |

Hand-port the small JS modules (loader, mobile menu, marquee pause) into `assets/js/theme.js`, enqueued in `functions.php`.

---

## 9. SEO carry-over

- **Per-page meta titles + descriptions** → Yoast SEO fields on each WP Page.
- **MedicalBusiness JSON-LD** → hand-coded in child theme's `header.php`/`functions.php` (Yoast's schema covers LocalBusiness but not the full `medicalSpecialty` array we set). Port from `app/layout.tsx`.
- **FAQPage JSON-LD** → Yoast can auto-generate from an FAQ Block, OR hand-coded reading the `faq` CPT.
- **Sitemap** → Yoast generates `/sitemap_index.xml` automatically from pages + CPT.
- **robots.txt** → Yoast default plus disallow `/wp-admin/`, `/wp-json/`.
- **Canonical URLs** → Yoast handles. Override on Pages where needed.
- **Open Graph image** → Yoast → Social → Default OG image. Upload `public/og-image.png` as the site-wide default.
- **Favicon** → WP Customize → Site Identity, upload `app/icon.png`.

---

## 10. Hosting & deployment

**Recommended: Kinsta** ($35/mo Starter or $70/mo Pro) or **WP Engine** ($30/mo Startup).
- Nginx + PHP 8.2+, Redis object cache, free SSL, daily backups, staging environment.
- Their image CDN + Cloudflare APO replaces Next.js's image optimizer.

**Deploy flow:**
1. Develop child theme + content on a **staging** WP install (Kinsta provides one).
2. Use **WP Migrate DB Pro** or **WPVivid** to push staging → production.
3. DNS cutover from Vercel to managed WP host — change A/CNAME records at registrar.
4. Keep Vercel preview deployments alive for 30 days post-cutover as fallback.

**Cost summary** (year 1):
- Hosting: $360–840
- Plugins: $250–350
- One-time engineering: 3–4 engineer-weeks per Skill spec timeline

---

## 11. Build sequence (mirrors the Skill spec §10 cadence)

**Week 1 — scaffold + first page**
- Day 1: Child theme scaffold, `style.css`, `functions.php`, enqueue brand CSS, register ACF Options page, register 3 CPTs.
- Day 2: Build Elementor header + footer + 404 templates. Wire menus + Site Settings ACF.
- Day 3: Import all 42 CPT records (specialties, medications, FAQs). Configure Yoast.
- Day 4: Build Home page in Elementor — Hero (placeholder slider plugin first), Proof, ThreePillars, WhoWeServe, PatientStories, BottomCta. All sections complete.
- Day 5: End-to-end review — pixel-compare against Phase 1 home. Identify gaps.

**Week 2 — interior pages + forms**
- Day 6: About + Specialties + Medications pages.
- Day 7: Patients + Insurance + FAQs pages.
- Day 8: Physicians page including the **sticky aside** referral checklist + Elementor Pro Forms referral form wired to GHL.
- Day 9: Contact page + contact form wired to GHL. Map embed.
- Day 10: Verify all 9 pages return 200, all forms post to GHL with payload matching Skill spec §7.

**Week 3 — custom widgets + polish**
- Day 11–12: Build **HeroSlider** custom Elementor widget (or wire Smart Slider 3 + design pass).
- Day 13: Build **AwardsMarquee** custom widget reading from Site Settings ACF Gallery.
- Day 14: Build **ServiceStack** custom widget (the hardest piece — sticky-replace pattern). Apply to /physicians Six-Step and Home Three Pillars.
- Day 15: PageLoader + animations pass. Motion Effects on every section.

**Week 4 — hardening**
- Day 16: Lighthouse pass. WP Rocket + ShortPixel tuning. Target 90+ Perf/Acc.
- Day 17: Mobile audit at 360/768/1280. Fix any responsive regressions.
- Day 18: WCAG AA contrast check. Keyboard nav through forms + menus.
- Day 19: Migrate staging → production on managed host. DNS cutover prep.
- Day 20: Final review with Dr. Dada. Cutover.

---

## 12. Acceptance criteria

- [ ] All 9 pages render with Phase 1 parity (visual + copy).
- [ ] All cross-site links and internal links resolve.
- [ ] Both forms post the Skill spec §7 payload shape to GHL; HIPAA notice + ack present.
- [ ] Brand palette consistent (no off-palette hex codes detected in compiled CSS).
- [ ] Mobile responsive at 360/768/1280; no horizontal scroll.
- [ ] WCAG AA contrast on every text/bg combination.
- [ ] All images have alt text.
- [ ] Lighthouse 90+ on Performance + Accessibility (Home, Physicians).
- [ ] JSON-LD MedicalBusiness on every page; FAQPage on `/faqs`.
- [ ] Yoast sitemap + robots.txt + canonical URLs verified.
- [ ] `/sitemap_index.xml` lists all 9 pages.
- [ ] All Phase 1 content rules (`CONTENT_RULES.md`) re-enforced — no fabricated bios/awards/testimonials, no emojis, no CDC/NIH/FDA claims.

---

## 13. Open questions

1. **License ownership** — does SGSL or Dr. Dada hold the Elementor Pro / ACF Pro / WP Rocket licenses?
2. **Hero slider:** custom Elementor widget (~1 day) or Smart Slider 3 plugin (~2 hours + license)? Smart Slider is the pragmatic choice for one site; custom widget is right if this becomes the dada-family-site Skill template.
3. **Form file uploads** — wire Elementor's File Upload field through GHL in this phase, or defer?
4. **Blog** — Phase 1 deferred. Phase 2 enables WP's native Post type with one click; do you want it stood up now even without content?
5. **DNS cutover timing** — kirklandspecialtyinfusions.com is currently pointed at Vercel preview; coordinate the cutover window.
6. **dada-family-site Skill alignment** — will the SGSL engineering team build the Skill **from** this manual conversion, or run the Skill (whenever it exists) to regenerate the same theme later? Affects whether we document patterns as we go.

---

## 14. Alignment with the dada-family-site Skill spec

This manual conversion **is** the first real invocation of the pattern the Skill will eventually codify. Per the Skill spec §2 ("the compounding effect"):

> *"The first dada-family-site invocation may take a day end-to-end... The fifth invocation should take under two hours."*

Phase 2 IS the first invocation, done manually. Every pattern, widget, and ACF schema we land on should be documented as we go so Toyeeb and Fidelis can encode it into the Skill's `templates/` folder. Practical step: at the end of Phase 2, the child theme repository becomes `examples/ksic/output-theme/` in the Skill's monorepo (per Skill spec §4).
