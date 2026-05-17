type WebhookPayload = {
  source_site: string;
  form_id: "referral" | "contact";
  submitted_at: string;
  fields: Record<string, unknown>;
  tags: string[];
  pipeline_stage: string;
};

const FORM_META: Record<
  WebhookPayload["form_id"],
  { tags: string[]; pipeline_stage: string }
> = {
  referral: {
    tags: ["form:referral", "intent:physician-referral", "kirkland"],
    pipeline_stage: "referral-received",
  },
  contact: {
    tags: ["form:contact", "intent:general", "kirkland"],
    pipeline_stage: "new-inquiry",
  },
};

export async function forwardToWebhook(
  formId: WebhookPayload["form_id"],
  fields: Record<string, unknown>,
): Promise<{ ok: boolean }> {
  const url = process.env.FORM_WEBHOOK_URL;
  const payload: WebhookPayload = {
    source_site: "kirkland-specialty-infusion-center",
    form_id: formId,
    submitted_at: new Date().toISOString(),
    fields,
    tags: FORM_META[formId].tags,
    pipeline_stage: FORM_META[formId].pipeline_stage,
  };

  if (!url) {
    console.info(
      `[forms] FORM_WEBHOOK_URL not set — dropping ${formId} submission after validation`,
      { form_id: formId, submitted_at: payload.submitted_at },
    );
    return { ok: true };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`[forms] webhook returned ${res.status} for ${formId}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[forms] webhook delivery failed for ${formId}`, err);
    return { ok: false };
  }
}
