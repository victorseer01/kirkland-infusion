# Content Rules — Kirkland Specialty Infusion Center

Mirrored from `dada-family-site` Skill Specification §9. These rules apply to Phase 1 (this Next.js build) and carry forward verbatim into Phase 2 (WordPress + Elementor).

## Hard rules

1. **No fabricated provider bios.** The About page team section ships with role placeholders only. Real bios and photographs are supplied by Dr. Dada.
2. **No fabricated testimonials.** The home page testimonial section displays the elicitation prompts from the copy doc until consented patient stories are available.
3. **No fabricated awards.** The awards strip uses approved logos from the existing Lakeside Research / Overlake Arthritis recognition set. Until those assets arrive, only label text is shown.
4. **Do not propagate the Deepa Gali bio currently on Lakeside.** Dr. Gali's profile on Lakeside currently shows Dr. Justin Putz's bio in error. Do not copy or reference it.
5. **No emojis** anywhere — site copy, code comments, commit messages.
6. **No claimed CDC, NIH, or FDA endorsement.** Referencing studies is fine; implying endorsement is not.
7. **No LafiaLink capabilities** (HMO claims, HL7, FHIR, DICOM, X12) — these do not apply to this site and must not appear.

## Soft rules (review at author discretion)

- Prefer "patients" over "consumers".
- Prefer specific named conditions over umbrella terms when accuracy improves.
- Prefer active voice for patient-facing copy.
- Prefer "physician" / "provider" over "doctor" in formal contexts.
- Avoid hedging language ("may help", "could potentially") in marketing copy unless clinically necessary.

## Form handling

- Both forms (referral, contact) display the standard SGSL HIPAA notice (see `components/forms/HipaaNotice.tsx`) and require patient acknowledgement before submit.
- No PHI is persisted by this site — submissions post to a server route that forwards to `FORM_WEBHOOK_URL` (set in Vercel env). Payload shape matches the Skill spec §7 webhook contract.
- File uploads on the referral form are not supported in Phase 1. The form copy directs referring offices to send attachments by fax or secure email.
- On webhook failure, the patient sees a generic success message. The redacted submission metadata is logged server-side.

## Phase 2 carry-over

- Brand tokens (Tailwind config) need a CSS-custom-property mirror so Elementor can read them.
- The `ServiceStack` sticky-replace pattern needs a custom Elementor widget or hand-rolled sticky CSS.
- Form payload shape does not change — only the transport (Elementor Pro → GHL webhook).
- This file moves verbatim into the WordPress repo.
