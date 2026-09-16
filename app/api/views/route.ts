import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const KEY = "portfolio:views";

// Always run fresh — never cache the count.
export const dynamic = "force-dynamic";

function json(views: number | null) {
  return NextResponse.json(
    { views },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

// Read the current count (used on repeat visits within a session).
export async function GET() {
  try {
    const views = (await kv.get<number>(KEY)) ?? 0;
    return json(views);
  } catch {
    // KV not configured (e.g. local dev without env vars) — fail soft.
    return json(null);
  }
}

// Increment once per new session, then return the new total.
export async function POST() {
  try {
    const views = await kv.incr(KEY);
    return json(views);
  } catch {
    return json(null);
  }
}
