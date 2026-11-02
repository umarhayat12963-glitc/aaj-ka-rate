import { NextResponse } from 'next/server';
import { store } from '../../../lib/store';
import { getSeason } from '../../../lib/season';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Vercel cron calls this at 02:00 UTC (= 07:00 PKT) per vercel.json.
// If CRON_SECRET is set, Vercel sends it as Authorization: Bearer <secret>.
// This route is a safe stub: it logs the refresh and returns the
// in-season list. Wire real OGRA/PBS/Lahore sources here in production.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const season = getSeason();
  store().refreshLog.push({ at: new Date().toISOString(), note: `Daily refresh stub for ${season.monthLabel}; only in-season items requested.` });
  return NextResponse.json({ ok: true, season, note: 'Refresh logged. Connect live sources in production; sample rates remain labelled as sample until replaced.' });
}
export const POST = GET;
