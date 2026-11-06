// Real-rates layer for Aaj Ka Rate (v2, 2 Nov 2026).
//
// Rule: never invent a rate. A rate is shown only with a dated source.
// If a source is missing, expired, or a live fetch fails, the price
// stays null and the page shows "Rate aa raha hai…" — no stale or
// guessed number is presented as today's rate.
//
// Sources verified 2 Nov 2026 (see source strings below):
// - Petrol/diesel: OGRA notifications. 31 Oct–2 Nov 2026: petrol
//   Rs 377.91, diesel Rs 402.96. OGRA notification dated 2 Nov 2026,
//   effective 3 Nov 2026: petrol Rs 374.51, diesel Rs 395.20
//   (Samaa, Geo, PakObserver, all reporting the same OGRA release).
//   OGRA notification announced 3 Nov 2026, effective 4 Nov 2026:
//   petrol Rs 369.06 (down Rs 5.45), diesel Rs 391.52 (down Rs 3.68)
//   (The Global Times / Reflecto News, reporting the OGRA press
//   release; BasiraSoft pump-price page lists the same pair).
//   OGRA notification announced 5 Nov 2026, effective 6 Nov 2026:
//   petrol Rs 352.59 (down Rs 9.41 from Rs 362.00), diesel
//   Rs 382.25 (down Rs 5.56 from Rs 387.81) — fourth consecutive
//   daily cut (Dawn, Arab News, Geo, Business Recorder, all
//   reporting the same OGRA release). The 5 Nov window
//   (362.00 / 387.81) was missed and is deliberately NOT
//   backfilled as a live rate.
//   Under the daily framework each window is one day only, so
//   after 6 Nov petrol deliberately becomes null again instead
//   of showing a stale rate.
// - Dollar/currency: SBP interbank closing 2 Nov 2026 (Business
//   Recorder / UrduPoint / ProPakistani, all Rs 276.72 for USD).
//   Live FX after that comes from the keyless open.er-api.com
//   endpoint (updates once a day, poll at most once an hour —
//   this module caches for 1 hour). Attribution required by that
//   API is kept in every FX source string: "Rates By Exchange
//   Rate API". Live FX is mid-market, not SBP closing, and is
//   labelled as such. If the fetch fails, the dated SBP seed
//   below is used as fallback, with its date in the source.
// - Gold/silver: All Pakistan Sarafa Gems and Jewellers
//   Association (APSGJA) 2 Nov 2026: 24K Rs 412,136/tola,
//   silver Rs 5,488/tola (MM News, ProPakistani, Business
//   Recorder, UrduPoint). 22K is derived as 22/24 of 24K
//   (Rs 377,791) and is labelled "derived", not a separate
//   APSGJA announcement.
// - Lahore sabzi/phal: Market Committee Lahore / PAMRA retail
//   rate sheet 31 Oct 2026 (the latest sheet available at
//   research time). Grade A (first) rates are used; where the
//   sheet gives a range, the source string gives the range and
//   the shown price is the Grade A upper value. Kinnow has no
//   entry in the 30 Oct fruit sheet, so it stays null.
//   Variant names in the sheet are normalised by
//   normalizeLahoreName() — e.g. Shaljam -> Shalgam,
//   Palak Farmi -> Palak, Gajar Chaina -> Gajar (variant note).

export type SourcedPrice = {
  price: number | null;
  source: string;
  isSample: false;
};

export function pktDateString(d = new Date()): string {
  // YYYY-MM-DD in Asia/Karachi.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(d);
}

// ---- Petrol: dated OGRA windows ----
const PETROL_WINDOWS: {
  from: string; to: string; petrol: number; diesel: number; source: string;
}[] = [
  {
    from: '2026-10-31', to: '2026-11-02', petrol: 377.91, diesel: 402.96,
    source: 'OGRA notification 30 Oct 2026 (31 Oct–2 Nov 2026)',
  },
  {
    from: '2026-11-03', to: '2026-11-03', petrol: 374.51, diesel: 395.20,
    source: 'OGRA notification 2 Nov 2026, effective 3 Nov 2026',
  },
  {
    from: '2026-11-04', to: '2026-11-04', petrol: 369.06, diesel: 391.52,
    source: 'OGRA notification announced 3 Nov 2026, effective 4 Nov 2026',
  },
  {
    from: '2026-11-06', to: '2026-11-06', petrol: 352.59, diesel: 382.25,
    source: 'OGRA notification announced 5 Nov 2026, effective 6 Nov 2026',
  },
];

export function petrolForDate(dateStr: string): { petrol: SourcedPrice; diesel: SourcedPrice } {
  const w = PETROL_WINDOWS.find((x) => dateStr >= x.from && dateStr <= x.to);
  if (!w) {
    return {
      petrol: { price: null, source: 'OGRA daily notification pending — stale rate not shown', isSample: false },
      diesel: { price: null, source: 'OGRA daily notification pending — stale rate not shown', isSample: false },
    };
  }
  return {
    petrol: { price: w.petrol, source: w.source, isSample: false },
    diesel: { price: w.diesel, source: w.source, isSample: false },
  };
}

// ---- Currency / gold / Lahore: dated seeds (fallback, date in source) ----
export const FX_SEED: Record<string, { price: number; source: string }> = {
  usd: { price: 276.72, source: 'SBP interbank closing, 2 Nov 2026 (Business Recorder / UrduPoint)' },
  gbp: { price: 371.51, source: 'SBP closing, 2 Nov 2026 (UrduPoint / Forex Association)' },
  eur: { price: 310.17, source: 'SBP closing, 2 Nov 2026 (UrduPoint)' },
  sar: { price: 73.88, source: 'Interbank, 2 Nov 2026 (HamariWeb, SBP rates)' },
  aed: { price: 75.35, source: 'Mid-market, 2 Nov 2026 (goldratesdaily)' },
};

export const GOLD_SEED: Record<string, { price: number; source: string }> = {
  sona24: { price: 412136, source: 'APSGJA, 2 Nov 2026 (MM News / ProPakistani / Business Recorder)' },
  sona22: { price: 377791, source: 'Derived 22/24 of APSGJA 24K, 2 Nov 2026 — not a separate APSGJA announcement' },
  chandi: { price: 5488, source: 'APSGJA, 2 Nov 2026 (UrduPoint / Mettis Global)' },
};

export const LAHORE_SEED: Record<string, { price: number | null; source: string; unit?: string }> = {
  aloo: { price: 50, source: 'Market Committee Lahore / PAMRA, 31 Oct 2026 sheet, Grade A' },
  pyaz: { price: 195, source: 'Market Committee Lahore / PAMRA, 31 Oct 2026 sheet, Grade A (185–195)' },
  tamatar: { price: 170, source: 'Market Committee Lahore / PAMRA, 31 Oct 2026 sheet, Grade A (160–170, upper shown)' },
  palak: { price: 40, source: 'Market Committee Lahore / PAMRA, 31 Oct 2026 sheet (40–46, also 30 Oct fix)' },
  matar: { price: 330, source: 'Market Committee Lahore sheet, 31 Oct 2026 (also 30 Oct fix)' },
  gajar: { price: 90, source: 'Market Committee Lahore, 31 Oct 2026 sheet (Chaina variety 150 also listed)' },
  shalgam: { price: 110, source: 'Market Committee Lahore, 31 Oct 2026 sheet (105–110)' },
  seb: { price: null, source: 'Lahore sheet 31 Oct 2026 — apple varieties 210–405, no single rate shown' },
  kela: { price: 155, source: 'Market Committee Lahore / PAMRA, 31 Oct 2026 sheet, Grade A (140–155, upper shown)', unit: 'Rs / dozen' },
  amrood: { price: null, source: 'Lahore sheet 31 Oct 2026 — no single verified rate in this file' },
  kinnow: { price: null, source: 'No Kinnow entry in Lahore fruit sheet (30 Oct 2026) — no number invented' },
  malta: { price: 130, source: 'Market Committee Lahore, 31 Oct 2026 sheet (30 Oct fix)', unit: 'Rs / dozen' },
  // Karyana: one verified official item only. The rest stay null
  // rather than inventing PBS/market figures.
  chicken: { price: 541, source: 'Lahore official chicken meat rate, 2 Nov 2026 market survey (Profit) — retail often higher' },
};

// ---- Lahore variant-name normalisation ----
const LAHORE_VARIANTS: Record<string, string> = {
  shaljam: 'shalgam', shalgham: 'shalgam', shalgum: 'shalgam', turnip: 'shalgam',
  'palak farmi': 'palak', 'palak farm': 'palak', 'palak farmi ': 'palak',
  'gajar chaina': 'gajar', 'gajar china': 'gajar', 'gajar desi': 'gajar',
  kino: 'kinnow', kinnu: 'kinnow',
  piyaz: 'pyaz', piaz: 'pyaz', onion: 'pyaz',
  aloo: 'aloo', potato: 'aloo',
  tamatar: 'tamatar', tomato: 'tamatar',
  matar: 'matar', peas: 'matar',
  kela: 'kela', banana: 'kela',
  malta: 'malta', orange: 'malta',
  seb: 'seb', apple: 'seb',
  amrood: 'amrood', guava: 'amrood',
};

export function normalizeLahoreName(raw: string): string {
  const key = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  return LAHORE_VARIANTS[key] ?? key;
}

// ---- Live FX (keyless, cached 1 hour, never throws) ----
type FxCache = { at: number; rates: Record<string, number>; fetchedDate: string };
const g = globalThis as unknown as { __aajFxCache?: FxCache };

export async function fetchLiveFx(): Promise<{ rates: Record<string, number>; source: string } | null> {
  const now = Date.now();
  if (g.__aajFxCache && now - g.__aajFxCache.at < 3600_000) {
    return { rates: g.__aajFxCache.rates, source: `Exchange Rate API (open.er-api.com), mid-market, fetched ${g.__aajFxCache.fetchedDate} — Rates By Exchange Rate API` };
  }
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: string; rates?: Record<string, number>; time_last_update_utc?: string };
    const r = json.rates;
    if (!r || !r.PKR || !r.GBP || !r.EUR || !r.AED || !r.SAR) return null;
    const round2 = (n: number) => Math.round(n * 100) / 100;
    const rates: Record<string, number> = {
      usd: round2(r.PKR),
      gbp: round2(r.PKR / r.GBP),
      eur: round2(r.PKR / r.EUR),
      aed: round2(r.PKR / r.AED),
      sar: round2(r.PKR / r.SAR),
    };
    const fetchedDate = pktDateString();
    g.__aajFxCache = { at: now, rates, fetchedDate };
    return { rates, source: `Exchange Rate API (open.er-api.com), mid-market, fetched ${fetchedDate} — Rates By Exchange Rate API` };
  } catch {
    return null;
  }
}
