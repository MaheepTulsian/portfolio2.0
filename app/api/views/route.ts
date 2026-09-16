import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const KEY = "portfolio:views";

// Always run fresh — never cache the count.
export const dynamic = "force-dynamic";

// Build the client lazily so a missing/unconfigured store fails soft instead
// of throwing at import time. Supports both the Vercel-standard KV_* names and
// Upstash's own UPSTASH_* names.
function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function json(views: number | null) {
  return NextResponse.json(
    { views },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

// Read the current count (used on repeat visits within a session).
export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return json(null);
    const views = (await redis.get<number>(KEY)) ?? 0;
    return json(views);
  } catch {
    return json(null);
  }
}

// Increment once per new session, then return the new total.
export async function POST() {
  try {
    const redis = getRedis();
    if (!redis) return json(null);
    const views = await redis.incr(KEY);
    return json(views);
  } catch {
    return json(null);
  }
}
