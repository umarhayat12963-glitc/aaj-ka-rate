import { NextResponse } from 'next/server';
import { CATEGORIES } from '../../../lib/data';
import { fetchLiveFx, formatPktDate } from '../../../lib/real-rates';
import { getSeason } from '../../../lib/season';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  const fx = await fetchLiveFx();
  let categories = CATEGORIES;
  let fxNote = 'Currency seed: SBP closing 2 Nov 2026.';
  if (fx) {
    fxNote = fx.source;
    // Live FX price is today's fetch, so its visible date is the
    // fetch date — not the 2 Nov seed date.
    const fxDate = formatPktDate(fx.fetchedDate);
    categories = CATEGORIES.map((cat) => cat.id === 'currency'
      ? { ...cat, items: cat.items.map((it) => fx.rates[it.id] !== undefined
        ? { ...it, price: fx.rates[it.id], source: fx.source, date: fxDate }
        : it) }
      : cat);
  }
  return NextResponse.json({
    categories, season: getSeason(), lastRefresh: new Date().toISOString(),
    fxNote,
    note: 'Sourced, dated rates. A null price means no verified rate is available — it is shown as "Rate aa raha hai…" instead of an invented number. Rates By Exchange Rate API when live FX is used.',
  });
}
