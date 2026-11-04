import { NextResponse } from 'next/server';
import { store } from '../../../lib/store';
import { getSeason } from '../../../lib/season';
import { CATEGORIES } from '../../../lib/data';
import { fetchLiveFx, pktDateString, petrolForDate } from '../../../lib/real-rates';
import { logRefreshToDb } from '../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Vercel cron calls this at 02:00 UTC (= 07:00 PKT) per vercel.json.
// If CRON_SECRET is set, Vercel sends it as Authorization: Bearer <secret>.
// v2: this is no longer a stub. It applies the dated OGRA petrol
// window for today (PKT), tries the keyless live FX feed (cached
// 1 hour, at most once an hour in practice from the daily cron),
// and logs the result. It never invents a rate: items without a
// verified source stay null ("Rate aa raha hai…").
// Postgres persistence: when DATABASE_URL is set and the Supabase
// project + schema exist, the refresh note is written to the
// refresh_log table (see lib/db.ts); until then the in-memory log
// below is the record and the sourced seed in lib/data.ts +
// lib/real-rates.ts is the source of truth on redeploy.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const today = pktDateString();
  const season = getSeason();
  const petrol = petrolForDate(today);
  const fx = await fetchLiveFx();
  const sourced = CATEGORIES.flatMap((c) => c.items).filter((i) => i.price !== null).length;
  const pending = CATEGORIES.flatMap((c) => c.items).filter((i) => i.price === null).length;
  const note = `Daily refresh ${today} (${season.monthLabel}): petrol ${petrol.petrol.price ?? 'pending'} / diesel ${petrol.diesel.price ?? 'pending'}; FX ${fx ? 'live (open.er-api.com)' : 'seed fallback'}; sourced ${sourced}, pending ${pending}. Supabase persistence: ${process.env.DATABASE_URL ? 'DATABASE_URL set' : 'not set — in-memory only'}.`;
  store().refreshLog.push({ at: new Date().toISOString(), note });
  await logRefreshToDb(note);
  return NextResponse.json({ ok: true, today, season, petrol, fxLive: !!fx, fxSource: fx?.source ?? null, sourced, pending, note });
}
export const POST = GET;
