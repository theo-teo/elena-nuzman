import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, tier, details, website } = body || {};

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: true, id: "DISCREET-000" });
    }

    if (!name || !email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Invalid inquiry parameters" },
        { status: 400 }
      );
    }

    const referenceId = `EN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    console.log(`[Elena Nuzman Concierge] New VIP Inquiry ${referenceId}:`, {
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 120),
      tier: String(tier || "Philharmonic Hall").slice(0, 80),
      detailsLength: String(details || "").length,
    });

    return NextResponse.json({
      ok: true,
      referenceId,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
