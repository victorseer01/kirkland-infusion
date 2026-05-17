import { NextResponse } from "next/server";
import { referralSchema } from "@/lib/schemas";
import { forwardToWebhook } from "@/lib/webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = referralSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten() }, { status: 422 });
  }

  await forwardToWebhook("referral", parsed.data);
  return NextResponse.json({ ok: true });
}
