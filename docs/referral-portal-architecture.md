# Central Referring-Physician Portal — Architecture

A shared, multi-tenant portal that serves **every OAOC-family site** (Kirkland Specialty Infusion, Evergreen Rheumatology, Bellevue, and any future location), collects referrals and related intakes, **forwards them to GoHighLevel (GHL)**, and **tracks every referral through its lifecycle** with two interfaces: one for the **OAOC team** and one for **referring physicians**.

> **Source of truth:** SGSL-REQ-2026-016. This document specifies **R-6.1–R-6.8** (central portal), **R-5.6–R-5.9** (status/closing-the-loop), **R-7.1–R-7.6** (self-referral / transfer-of-care), and **R-8.1–R-8.6** (forms, GHL, attribution). Where this disagrees with the register, the register wins.

---

## 1. Goals & principles

- **Build once, shared centrally (R-6.1, R-6.8).** One portal, one physician account, **destination-site selected per referral** — not one portal per site. Architecture must onboard a new site by **configuration**, not a rebuild.
- **Secure & HIPAA-aligned (R-6.2, R-8.6).** Authenticated, encrypted in transit and at rest, audit-logged, minimum-necessary fields, BAAs with every vendor that touches PHI. Submissions post to the portal — **not email**.
- **GHL is the pipeline system of record (R-8.1).** Every submission flows into GHL, tagged and routed to a **named reviewer per location** (R-8.2, R-8.3). The portal owns **identity, documents, structured referral data, and status**; GHL owns **pipeline/automation/comms**. They stay in sync via webhook + callbacks.
- **Close the loop (R-5.6–R-5.9).** The referring physician is acknowledged on receipt, kept informed at every stage, told immediately if there is a hiccup, and notified when the referral is "successfully closed" (= patient's first infusion completed).
- **Marketing sites stay static.** Kirkland/Evergreen remain Next.js/Vercel marketing sites; their **"Refer a Patient" CTA deep-links into the portal** carrying the destination site. No PHI is collected on the marketing sites.

---

## 2. High-level architecture

```
  Kirkland site ─┐
  Evergreen site ─┼──"Refer a Patient" (deep link w/ ?site=)──▶  CENTRAL PORTAL
  Bellevue site  ─┘                                              (app.oaoc-referrals.com)
  (future sites) ─┘                                                   │
                                                                      │  authenticated UI
                          ┌───────────────────────────────────────────┤
                          ▼                                            ▼
                 Referring Physician                            OAOC Team
                 Portal (submit, upload,                        Dashboard (triage,
                 track status)                                  update status, by site)
                          │                                            │
                          ▼                                            │
                   Portal API + DB (PHI, documents, status, audit)     │
                          │                                            │
            ┌─────────────┼───────────────────────────┐               │
            ▼             ▼                             ▼               │
     Object storage   Webhook → GHL              Notifications ◀────────┘
     (encrypted docs) (tagged, routed to         (email/SMS to physician
                       reviewer per site)         + team; hiccup alerts)
```

---

## 3. Multi-tenant model

A **`Site` (tenant) registry** is the core of "build once." Each site is a config record:

```jsonc
{
  "id": "kirkland",
  "name": "Kirkland Specialty Infusion Center",
  "type": "infusion",                // infusion | rheumatology | ...
  "ghl_location_id": "...",          // GHL sub-account / pipeline
  "reviewers": [{ "name": "...", "email": "...", "role": "intake" }], // R-8.3 named, per location
  "intake_types": ["physician-referral", "transfer-of-care", "general-inquiry"],
  "active": true
}
```

- Onboarding a new site = add a `Site` record + GHL routing config + a "Refer a Patient" link on that site. **No code changes.**
- Every referral carries `destination_site_id` (R-6.5) so the team sees "new referral for Kirkland" vs "for Bellevue" at a glance.
- Note: Evergreen is a rheumatology clinic; it can both **send** referrals (to infusion sites) and **receive** patient inquiries. The tenant `type` drives which intake types and routing apply.

---

## 4. Actors & interfaces

### A. Referring Physician Portal (R-6.3, R-6.4, R-6.7)
- **Auth:** one account per physician/office, reusable across all sites (the white-glove promise — no per-site accounts).
- **Submit a structured referral letter** (not just a file upload): patient X, condition Y, biologic-candidate status, medications previously tried, destination site, urgency.
- **Upload clinical documents** alongside the letter: consultation letters, records, labs, imaging.
- **Track status** of submitted referrals: at minimum a submission confirmation; ideally a list with current status per referral (statuses from §5).

### B. OAOC Team Dashboard (R-8.3, R-6.6)
- Inbox of incoming referrals **filterable by destination site**, intake type, and status.
- Triage/assign to the designated reviewer; open the structured referral + documents.
- **Advance status** (drives physician notifications and GHL pipeline stage).
- Flag a **hiccup** (insurance issue, scheduling delay, clinical concern) → immediate physician notification (R-5.9).
- Mark **closed** when the patient completes their first infusion (R-5.8).
- Audit view (who saw/changed what — HIPAA).

### C. Admin
- Manage `Site` tenants, reviewers, GHL routing, user accounts, audit export.

---

## 5. Referral lifecycle (state machine)

Maps directly to R-5.6–R-5.9. Each transition timestamps an event, notifies the physician, and syncs a GHL pipeline stage.

| Status | Trigger | Physician sees | R |
|---|---|---|---|
| `submitted` | Physician submits | "Referral received" confirmation | R-6.7 |
| `acknowledged` | Team confirms receipt | Receipt confirmed | R-5.6 |
| `records-reviewed` | Records reviewed | Records reviewed | R-5.6 |
| `benefits-investigation` | Benefits check started | In progress | R-4.2 |
| `prior-auth-in-progress` | PA started | In progress | R-4.2 |
| `prior-auth-confirmed` | Coverage confirmed | Coverage confirmed | R-4.3 |
| `intake-scheduled` | Intake/NP visit booked | Appointment being made | R-5.6 |
| `first-infusion-scheduled` | First infusion booked | Scheduled | — |
| `closed` | First infusion completed | **Successfully closed** | R-5.8 |
| `on-hold` / `issue` | Any hiccup | **Issue flagged + reason** (immediate) | R-5.9 |

`issue` is an overlay state from which the referral returns to its prior track once resolved.

---

## 6. Data model (core entities)

- **Site** — tenant config (see §3).
- **PhysicianAccount** — `id, name, npi?, practice, email, phone, fax, verified, created_at`.
- **Referral** — `id, physician_id, destination_site_id, patient (name, dob, contact), condition, biologic_candidate, meds_tried, medication_requested, urgency, intake_type (physician-referral | transfer-of-care | general-inquiry), how_heard, status, assigned_reviewer_id, ghl_contact_id, created_at`.
- **Document** — `id, referral_id, type (consult-letter | records | labs | imaging), storage_key, uploaded_by, scanned_ok, created_at` (encrypted object storage; never in DB).
- **StatusEvent** — `id, referral_id, from_status, to_status, actor_id, note, created_at` (drives timeline + physician notifications).
- **AuditLog** — `id, actor_id, action, entity, entity_id, ip, created_at` (HIPAA; immutable).
- **TransferOfCare** — a `Referral` with `intake_type = "transfer-of-care"` capturing current condition, current medication & dose, treatment-cycle position, next-infusion-due date, contact (R-7.3); tagged time-sensitive (R-7.4).

---

## 7. Intake channels (all into the portal + GHL)

1. **Physician referral** (R-6.3/6.4) — structured letter + uploads, authenticated.
2. **Transfer-of-care / self-referral** (R-7) — patient-facing, **visible parallel CTA** ("Transfer My Treatment") on the marketing sites, captured with a distinct tag so the receiving employee knows it is mid-treatment and time-sensitive (R-7.2–R-7.5).
3. **General inquiry / Contact** — restructured Contact Us with an intent dropdown (R-7.6).

All three: HTTPS, HIPAA notice + not-for-emergencies advisory, minimum-necessary fields (R-8.6), and a **"How did you hear about us?"** field for attribution captured at the website level (R-8.4, R-8.5).

---

## 8. GHL integration

Extends the contract already used by the Kirkland marketing forms (`lib/webhook.ts`): `{ source_site, form_id, submitted_at, fields, tags, pipeline_stage }`. The portal adds identity + routing:

```jsonc
{
  "source_site": "kirkland",
  "destination_site": "kirkland",        // R-6.5
  "form_id": "physician-referral",        // | transfer-of-care | general-inquiry
  "referral_id": "ref_01H...",            // portal id for two-way sync
  "submitted_at": "2026-06-20T17:00:00Z",
  "how_heard": "...",                     // R-8.4/8.5 attribution
  "fields": { /* structured referral data, minimum-necessary */ },
  "documents": [{ "type": "labs", "url": "<signed, expiring>" }],
  "tags": ["site:kirkland", "form:physician-referral", "intent:referral", "priority:standard"], // R-8.2
  "pipeline_stage": "referral-received",  // mirrors §5 status
  "assigned_to": "reviewer@oaoc..."       // named reviewer per location (R-8.3)
}
```

- **Routing (R-8.3):** map `destination_site` → GHL location/pipeline → designated reviewer (not a generic inbox).
- **Two-way status sync:** portal → GHL on each status change; optional GHL → portal callback so team actions in GHL reflect in the physician's tracker.
- **PHI in GHL:** confirm GHL BAA coverage; pass minimum-necessary fields and **signed, expiring** document links rather than raw PHI where possible.

---

## 9. Security & HIPAA

- **Auth:** physician accounts (email + MFA) and team SSO; least-privilege roles (physician / reviewer / admin). Consider Auth0/Clerk/Cognito with a signed BAA.
- **Encryption:** TLS everywhere; encrypted DB + object storage at rest.
- **Documents:** virus/malware scan on upload; private bucket; access only via short-lived signed URLs; no public paths.
- **Audit logging:** every read/write of PHI (immutable `AuditLog`), exportable.
- **No PHI in client logs or analytics**; scrub on webhook failure (the marketing-site pattern already does this).
- **BAAs required** with: hosting, database, object storage, auth provider, email/SMS provider, and **GHL**.
- **Data retention & access-revocation** policy; breach-notification process.

---

## 10. Notifications

- **Physician:** receipt confirmation + an update at each status change (email; SMS optional), and an **immediate** alert on `issue` (R-5.9), and on `closed` (R-5.8).
- **Team:** new-referral alert to the destination site's reviewer; SLA reminders for stale referrals.
- All notification copy follows CONTENT_RULES (no em dashes, no emojis, no endorsement claims).

---

## 11. Integration with the marketing sites

- Each site's **"Refer a Patient"** button deep-links to `https://<portal>/refer?site=<id>` so the destination is pre-selected (R-6.5). The portal can still let the physician change destination per referral.
- The patient-facing **"Transfer My Treatment"** CTA links to `https://<portal>/transfer?site=<id>` (R-7.2).
- Marketing sites collect **no PHI**; they only hand off to the portal.
- Keep the sites' existing GHL contact form (general inquiries) as-is; the portal handles referral/transfer intakes.

---

## 12. Recommended tech stack

- **App:** Next.js (App Router) with server actions/route handlers — same ecosystem as the marketing sites; or a dedicated service if the team prefers separation.
- **DB:** Postgres (managed, encrypted) — e.g., Neon/Supabase/RDS with BAA.
- **Object storage:** S3-compatible with encryption + signed URLs (BAA).
- **Auth:** Clerk/Auth0/Cognito (BAA, MFA).
- **Hosting:** a HIPAA-eligible host with a BAA (e.g., Vercel Enterprise + BAA, or AWS). Confirm BAA availability before committing.
- **Integrations:** GHL (webhooks + API), email/SMS (BAA-covered).

---

## 13. Build phases

1. **Foundations** — `Site` registry, auth, data model, audit logging, one tenant (Kirkland).
2. **Physician referral flow** — structured letter + uploads + GHL webhook + receipt confirmation.
3. **Status lifecycle + physician tracker + team dashboard** (R-5.6–R-5.9).
4. **Transfer-of-care + general inquiry intakes** (R-7) and attribution (R-8.4/8.5).
5. **Multi-tenant rollout** — onboard Evergreen/Bellevue by config; per-site routing to named reviewers.
6. **Hardening** — security review, pen test, BAA sign-off, retention policy, go-live.

---

## 14. Open questions / decisions (track via project lead)

- **O-4:** named designated reviewers per site (routing targets).
- **O-5:** GHL access, per-site location IDs, and confirmed routing rules per submission type.
- **GHL PHI posture:** is a GHL BAA in place, and what is allowed to flow into it vs. stay in the portal?
- **Auth provider & HIPAA hosting** selection (BAA availability is the gating factor).
- **Status granularity** the physician actually sees (full §5 ladder vs. a simplified subset).
- **GHL → portal callbacks:** does the team work primarily in GHL or in the portal dashboard? Determines sync direction.
- Relationship to the **[MAJOR] secure document-upload portal** flagged on the Kirkland referral form — this portal is that build; the marketing-site referral form should ultimately hand off here rather than collecting typed clinical notes.

---

## Appendix — status enum

```ts
type ReferralStatus =
  | "submitted"
  | "acknowledged"
  | "records-reviewed"
  | "benefits-investigation"
  | "prior-auth-in-progress"
  | "prior-auth-confirmed"
  | "intake-scheduled"
  | "first-infusion-scheduled"
  | "closed"
  | "on-hold"
  | "issue";
```
