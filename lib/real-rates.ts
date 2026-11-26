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
//   OGRA notification announced 6 Nov 2026, effective 7 Nov 2026:
//   petrol Rs 346 (down Rs 6.59 from Rs 352.59), diesel
//   Rs 378 (down Rs 4.25 from Rs 382.25) — fifth consecutive
//   daily cut (PakObserver, Bloom Pakistan, Dawn via Khabar24x12,
//   Business Recorder via EIN News, all reporting the same OGRA
//   release). Some reports say the rates run until 9 or 10 Nov
//   (public holiday 9 Nov); the window is still added as one day
//   only, per the daily framework.
//   OGRA notification announced 10 Nov 2026, effective 11 Nov 2026:
//   petrol Rs 338 (down Rs 8 from Rs 346), diesel
//   Rs 371 (down Rs 7 from Rs 378) — sixth consecutive
//   daily cut (Mettis Global, The News, Daily Imroz /
//   Petroleum Division, oilprices.pk, all reporting the
//   same OGRA release; previous window ran till 10 Nov).
//   OGRA notification announced 11 Nov 2026, effective 12 Nov 2026:
//   petrol Rs 335 (down Rs 3 from Rs 338), diesel
//   Rs 364 (down Rs 7 from Rs 371) — seventh consecutive
//   daily cut (Pakistan Today, The Global Times, Pak Observer,
//   Bloom Pakistan, Kashmir English, Pak Insider, Pakistan
//   Point, all reporting the same OGRA release).
//   OGRA notification announced 12 Nov 2026, effective 13 Nov 2026:
//   petrol Rs 332 (down Rs 3 from Rs 335), diesel
//   Rs 360 (down Rs 4 from Rs 364) — eighth consecutive
//   daily cut (Islamabad Post, The News, Pakistan Today,
//   IPP News, ARY News, all reporting the same OGRA release).
//   OGRA notification announced 13 Nov 2026, effective 14 Nov 2026:
//   petrol Rs 330 (down Rs 2 from Rs 332), diesel
//   Rs 360 (unchanged) — ninth consecutive
//   daily cut (The News, Business Recorder, IPP News,
//   Pakistan Point, all reporting the same OGRA release).
//   OGRA says the rates remain in effect 14–16 Nov, but the
//   window is still added as one day only, per the daily
//   framework.
//   OGRA notification announced 16 Nov 2026, effective 17 Nov 2026:
//   petrol Rs 328 (down Rs 2 from Rs 330), diesel
//   Rs 358 (down Rs 2 from Rs 360) — tenth consecutive
//   daily cut (The News, The Global Times, PakWheels,
//   HamariWeb, all reporting the same OGRA release).
//   OGRA notification announced 17 Nov 2026, effective 18 Nov 2026:
//   petrol Rs 325 (down Rs 3 from Rs 328), diesel
//   Rs 358 (unchanged) — eleventh consecutive
//   daily cut (The News, The Global Times, Pakistan Point,
//   Kashmir English, NewsNexus24, all reporting the same
//   OGRA release).
//   OGRA notification announced 18 Nov 2026, effective 19 Nov 2026:
//   petrol Rs 322 (down Rs 3 from Rs 325), diesel
//   Rs 355 (down Rs 3 from Rs 358) — twelfth consecutive
//   daily cut (The News, Dawn, PakObserver, PakWheels,
//   ARY News, IPP News, all reporting the same
//   OGRA release).
//   OGRA notification announced 19 Nov 2026, effective 20 Nov 2026:
//   petrol Rs 323 (up Rs 1 from Rs 322), diesel
//   Rs 355 (unchanged) — first increase after twelve
//   consecutive daily cuts (PakObserver, Kashmir English,
//   Pakistan Point, Daily Times, Business Recorder, all
//   reporting the same OGRA release).
//   OGRA notification announced 20 Nov 2026, effective 21 Nov 2026:
//   petrol Rs 322 (down Re 1 from Rs 323), diesel
//   Rs 357 (up Rs 2 from Rs 355) (The News, Aaj News,
//   Pakistan Point, carmandi, newsora24, petroprices.pk, all
//   reporting the same OGRA release; The News says the rates
//   remain in effect until 23 Nov, but the window is still
//   added as one day only, per the daily framework).
//   OGRA notification announced 23 Nov 2026, effective 24 Nov 2026:
//   petrol Rs 319 (down Rs 3 from Rs 322), diesel
//   Rs 357 (unchanged) (The News, PakWheels,
//   Kashmir English, Pakistan Point, IPP News,
//   all reporting the same OGRA release).
//   OGRA notification announced 24 Nov 2026, effective 25 Nov 2026:
//   petrol Rs 318 (down Re 1 from Rs 319), diesel
//   Rs 353 (down Rs 4 from Rs 357) (mix.com.pk, Feature
//   Pakistan citing Dawn and Express Tribune, APP wire,
//   DNA News Agency, The Global Times, 365news, Bol News,
//   all reporting the same OGRA release).
//   OGRA notification announced 25 Nov 2026, effective 26 Nov 2026:
//   petrol Rs 314 (down Rs 4 from Rs 318), diesel
//   Rs 348 (down Rs 5 from Rs 353) — fourteenth consecutive
//   daily cut (PakWheels, Pakistan Today, Pakistan Point,
//   IPP News, Investify, Carmandi, petrolrates.pk,
//   petroprices.pk, all reporting the same OGRA release).
//   Under the daily framework each window is one day only, so
//   after its day the fallback shows the last verified rate,
//   dated, instead of a stale rate presented as today's.
// - Dollar/currency: SBP interbank closing 25 Nov 2026 (Searchable
//   / Investify / Daily Imroz, all Rs 276.46 for USD).
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
// - Karyana: PBS Sensitive Price Indicator (SPI), week ended
//   29 Oct 2026 (national average across 17 urban centres).
//   Sugar 141.12/kg, Milk Fresh 219.98/litre, Ghee 1kg pouch
//   618.19, Eggs 254.51/dozen, Masoor 267.31/kg, Moong 355.10/kg,
//   Rice Basmati Broken 215.20/kg. Atta is derived per kg from
//   the SPI Wheat Flour Bag 20 Kg (2951.46/20 = 147.57) and is
//   labelled derived.
// - Owner's rule (2026-11-06, for ALL items): a rate we already
//   have must always stay visible with its date, even when no
//   new rate has arrived yet. Only an item with no verified rate
//   ever found (Kinnow, Amrood) stays "Rate aa raha hai…".
//   Variant names in the sheet are normalised by
//   normalizeLahoreName() — e.g. Shaljam -> Shalgam,
//   Palak Farmi -> Palak, Gajar Chaina -> Gajar (variant note).

export type SourcedPrice = {
  price: number | null;
  source: string;
  isSample: false;
  // Short readable date shown right next to the rate, e.g. "6 Nov 2026".
  date?: string;
};

export function formatPktDate(iso: string): string {
  // '2026-11-06' -> '6 Nov 2026'.
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (!y || !m || !d || !months[m - 1]) return iso;
  return `${d} ${months[m - 1]} ${y}`;
}

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
  {
    from: '2026-11-07', to: '2026-11-07', petrol: 346, diesel: 378,
    source: 'OGRA notification announced 6 Nov 2026, effective 7 Nov 2026',
  },
  {
    from: '2026-11-11', to: '2026-11-11', petrol: 338, diesel: 371,
    source: 'OGRA notification announced 10 Nov 2026, effective 11 Nov 2026',
  },
  {
    from: '2026-11-12', to: '2026-11-12', petrol: 335, diesel: 364,
    source: 'OGRA notification announced 11 Nov 2026, effective 12 Nov 2026',
  },
  {
    from: '2026-11-13', to: '2026-11-13', petrol: 332, diesel: 360,
    source: 'OGRA notification announced 12 Nov 2026, effective 13 Nov 2026',
  },
  {
    from: '2026-11-14', to: '2026-11-14', petrol: 330, diesel: 360,
    source: 'OGRA notification announced 13 Nov 2026, effective 14 Nov 2026',
  },
  {
    from: '2026-11-17', to: '2026-11-17', petrol: 328, diesel: 358,
    source: 'OGRA notification announced 16 Nov 2026, effective 17 Nov 2026',
  },
  {
    from: '2026-11-18', to: '2026-11-18', petrol: 325, diesel: 358,
    source: 'OGRA notification announced 17 Nov 2026, effective 18 Nov 2026',
  },
  {
    from: '2026-11-19', to: '2026-11-19', petrol: 322, diesel: 355,
    source: 'OGRA notification announced 18 Nov 2026, effective 19 Nov 2026',
  },
  {
    from: '2026-11-20', to: '2026-11-20', petrol: 323, diesel: 355,
    source: 'OGRA notification announced 19 Nov 2026, effective 20 Nov 2026',
  },
  {
    from: '2026-11-21', to: '2026-11-21', petrol: 322, diesel: 357,
    source: 'OGRA notification announced 20 Nov 2026, effective 21 Nov 2026',
  },
  {
    from: '2026-11-24', to: '2026-11-24', petrol: 319, diesel: 357,
    source: 'OGRA notification announced 23 Nov 2026, effective 24 Nov 2026',
  },
  {
    from: '2026-11-25', to: '2026-11-25', petrol: 318, diesel: 353,
    source: 'OGRA notification announced 24 Nov 2026, effective 25 Nov 2026',
  },
  {
    from: '2026-11-26', to: '2026-11-26', petrol: 314, diesel: 348,
    source: 'OGRA notification announced 25 Nov 2026, effective 26 Nov 2026',
  },
];

export function petrolForDate(dateStr: string): { petrol: SourcedPrice; diesel: SourcedPrice } {
  const w = PETROL_WINDOWS.find((x) => dateStr >= x.from && dateStr <= x.to);
  if (w) {
    return {
      petrol: { price: w.petrol, source: w.source, isSample: false, date: formatPktDate(w.to) },
      diesel: { price: w.diesel, source: w.source, isSample: false, date: formatPktDate(w.to) },
    };
  }
  // Owner's rule (2026-11-06): a rate we already have must always
  // stay visible, even when today's new OGRA notification has not
  // arrived yet. Show the most recent past window's rate, clearly
  // labelled with its date, so visitors can see it is the last
  // verified rate and not today's new rate. Only when no past
  // window exists at all does the price stay null.
  const past = PETROL_WINDOWS.filter((x) => x.to < dateStr).sort((a, b) => (a.to < b.to ? 1 : -1))[0];
  if (!past) {
    return {
      petrol: { price: null, source: 'OGRA daily notification pending — stale rate not shown', isSample: false },
      diesel: { price: null, source: 'OGRA daily notification pending — stale rate not shown', isSample: false },
    };
  }
  const lastSource = `${past.source} — aaj ka naya OGRA rate abhi nahi aaya; ye aakhri verified rate hai (effective ${past.to})`;
  return {
    petrol: { price: past.petrol, source: lastSource, isSample: false, date: formatPktDate(past.to) },
    diesel: { price: past.diesel, source: lastSource, isSample: false, date: formatPktDate(past.to) },
  };
}

// ---- Currency / gold / Lahore: dated seeds (fallback, date in source) ----
export const FX_SEED: Record<string, { price: number; source: string }> = {
  usd: { price: 276.46, source: 'SBP interbank closing, 25 Nov 2026 (Searchable / Investify / Daily Imroz)' },
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

// ---- Karyana: PBS SPI week ended 29 Oct 2026 ----
// National average across 17 urban centres. Atta is derived per kg
// from the SPI 20 Kg bag price (2951.46/20 = 147.57) and labelled so.
export const KARYANA_SEED: Record<string, { price: number; source: string }> = {
  atta: { price: 147.57, source: 'PBS SPI week ended 29 Oct 2026 — Wheat Flour Bag 20 Kg Rs 2951.46, per kg derived (2951.46/20)' },
  cheeni: { price: 141.12, source: 'PBS SPI week ended 29 Oct 2026 — Sugar Refined 1 Kg (national average, 17 urban centres)' },
  ghee: { price: 618.19, source: 'PBS SPI week ended 29 Oct 2026 — Vegetable Ghee 1 kg Pouch (national average, 17 urban centres)' },
  doodh: { price: 219.98, source: 'PBS SPI week ended 29 Oct 2026 — Milk Fresh 1 Ltr (national average, 17 urban centres)' },
  anday: { price: 254.51, source: 'PBS SPI week ended 29 Oct 2026 — Eggs Hen Farm 1 Dozen (national average, 17 urban centres)' },
  daalMasoor: { price: 267.31, source: 'PBS SPI week ended 29 Oct 2026 — Pulse Masoor (Washed) 1 Kg (national average, 17 urban centres)' },
  daalMoong: { price: 355.10, source: 'PBS SPI week ended 29 Oct 2026 — Pulse Moong (Washed) 1 Kg (national average, 17 urban centres)' },
  chawal: { price: 215.20, source: 'PBS SPI week ended 29 Oct 2026 — Rice Basmati Broken (Average Quality) 1 Kg (national average, 17 urban centres)' },
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

export async function fetchLiveFx(): Promise<{ rates: Record<string, number>; source: string; fetchedDate: string } | null> {
  const now = Date.now();
  if (g.__aajFxCache && now - g.__aajFxCache.at < 3600_000) {
    return { rates: g.__aajFxCache.rates, source: `Exchange Rate API (open.er-api.com), mid-market, fetched ${g.__aajFxCache.fetchedDate} — Rates By Exchange Rate API`, fetchedDate: g.__aajFxCache.fetchedDate };
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
    return { rates, source: `Exchange Rate API (open.er-api.com), mid-market, fetched ${fetchedDate} — Rates By Exchange Rate API`, fetchedDate };
  } catch {
    return null;
  }
}
