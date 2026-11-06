import { petrolForDate, pktDateString, FX_SEED, GOLD_SEED, LAHORE_SEED, KARYANA_SEED } from './real-rates';

export type RateItem = {
  id: string;
  name: string;
  unit: string;
  price: number | null;
  source: string;
  isSample: boolean;
  history: number[];
  category: string;
  displayPrice?: string;
  // Short readable date shown right next to the rate, e.g. "6 Nov 2026".
  date?: string;
};

export type Category = { id: string; name: string; items: RateItem[] };

// v2: sourced, dated rates — NOT sample data. See lib/real-rates.ts
// for the verification notes. A null price means no verified rate
// is available for that item; the page shows "Rate aa raha hai…"
// instead of inventing a number. isSample is false throughout:
// nothing in this file is presented as sample data any more.
function item(id: string, name: string, unit: string, price: number | null, source: string, history: number[], category: string, displayPrice?: string, date?: string): RateItem {
  return { id, name, unit, price, source, history, category, isSample: false, displayPrice, date };
}

const today = pktDateString();
const petrol = petrolForDate(today);

export const CATEGORIES: Category[] = [
  { id: 'petrol', name: 'Petrol & Diesel', items: [
    item('petrol', 'Petrol', 'Rs / litre', petrol.petrol.price, petrol.petrol.source, [376.06, 377.91], 'Petrol & Diesel', undefined, petrol.petrol.date),
    item('diesel', 'Diesel', 'Rs / litre', petrol.diesel.price, petrol.diesel.source, [400.67, 402.96], 'Petrol & Diesel', undefined, petrol.diesel.date),
  ]},
  { id: 'sona', name: 'Sona & Chandi', items: [
    item('sona24', 'Sona 24K', 'Rs / tola', GOLD_SEED.sona24.price, GOLD_SEED.sona24.source, [409736, 412136], 'Sona & Chandi', undefined, '2 Nov 2026'),
    item('sona22', 'Sona 22K', 'Rs / tola', GOLD_SEED.sona22.price, GOLD_SEED.sona22.source, [], 'Sona & Chandi', undefined, '2 Nov 2026'),
    item('chandi', 'Chandi', 'Rs / tola', GOLD_SEED.chandi.price, GOLD_SEED.chandi.source, [5388, 5488], 'Sona & Chandi', undefined, '2 Nov 2026'),
  ]},
  { id: 'currency', name: 'Dollar & Currency', items: [
    item('usd', 'Dollar — Interbank', 'Rs', FX_SEED.usd.price, FX_SEED.usd.source, [276.75, 276.72], 'Dollar & Currency', undefined, '2 Nov 2026'),
    item('aed', 'UAE Dirham', 'Rs', FX_SEED.aed.price, FX_SEED.aed.source, [], 'Dollar & Currency', undefined, '2 Nov 2026'),
    item('sar', 'Saudi Riyal', 'Rs', FX_SEED.sar.price, FX_SEED.sar.source, [], 'Dollar & Currency', undefined, '2 Nov 2026'),
    item('gbp', 'British Pound', 'Rs', FX_SEED.gbp.price, FX_SEED.gbp.source, [371.19, 371.51], 'Dollar & Currency', undefined, '2 Nov 2026'),
    item('eur', 'Euro', 'Rs', FX_SEED.eur.price, FX_SEED.eur.source, [309.79, 310.17], 'Dollar & Currency', undefined, '2 Nov 2026'),
  ]},
  { id: 'karyana', name: 'Karyana', items: [
    item('atta', 'Atta', 'Rs / kg', KARYANA_SEED.atta.price, KARYANA_SEED.atta.source, [], 'Karyana', undefined, '29 Oct 2026'),
    item('cheeni', 'Cheeni', 'Rs / kg', KARYANA_SEED.cheeni.price, KARYANA_SEED.cheeni.source, [], 'Karyana', undefined, '29 Oct 2026'),
    item('ghee', 'Ghee', 'Rs / kg', KARYANA_SEED.ghee.price, KARYANA_SEED.ghee.source, [], 'Karyana', undefined, '29 Oct 2026'),
    item('doodh', 'Doodh', 'Rs / litre', KARYANA_SEED.doodh.price, KARYANA_SEED.doodh.source, [], 'Karyana', undefined, '29 Oct 2026'),
    item('anday', 'Anday', 'Rs / dozen', KARYANA_SEED.anday.price, KARYANA_SEED.anday.source, [], 'Karyana', undefined, '29 Oct 2026'),
    item('chicken', 'Chicken', 'Rs / kg', LAHORE_SEED.chicken.price, LAHORE_SEED.chicken.source, [], 'Karyana', undefined, '2 Nov 2026'),
    item('daal-masoor', 'Daal Masoor', 'Rs / kg', KARYANA_SEED.daalMasoor.price, KARYANA_SEED.daalMasoor.source, [], 'Karyana', undefined, '29 Oct 2026'),
    item('daal-moong', 'Daal Moong', 'Rs / kg', KARYANA_SEED.daalMoong.price, KARYANA_SEED.daalMoong.source, [], 'Karyana', undefined, '29 Oct 2026'),
    item('chawal', 'Chawal', 'Rs / kg', KARYANA_SEED.chawal.price, KARYANA_SEED.chawal.source, [], 'Karyana', undefined, '29 Oct 2026'),
  ]},
  { id: 'sabzi', name: 'Sabzi — Lahore Sarkari List', items: [
    item('aloo', 'Aloo', 'Rs / kg', LAHORE_SEED.aloo.price, LAHORE_SEED.aloo.source, [], 'Sabzi', undefined, '31 Oct 2026'),
    item('pyaz', 'Pyaz', 'Rs / kg', LAHORE_SEED.pyaz.price, LAHORE_SEED.pyaz.source, [], 'Sabzi', undefined, '31 Oct 2026'),
    item('tamatar', 'Tamatar', 'Rs / kg', LAHORE_SEED.tamatar.price, LAHORE_SEED.tamatar.source, [], 'Sabzi', undefined, '31 Oct 2026'),
    item('palak', 'Palak', 'Rs / kg', LAHORE_SEED.palak.price, LAHORE_SEED.palak.source, [], 'Sabzi', undefined, '31 Oct 2026'),
    item('matar', 'Matar', 'Rs / kg', LAHORE_SEED.matar.price, LAHORE_SEED.matar.source, [300, 330], 'Sabzi', undefined, '31 Oct 2026'),
    item('gajar', 'Gajar', 'Rs / kg', LAHORE_SEED.gajar.price, LAHORE_SEED.gajar.source, [], 'Sabzi', undefined, '31 Oct 2026'),
    item('shalgam', 'Shalgam', 'Rs / kg', LAHORE_SEED.shalgam.price, LAHORE_SEED.shalgam.source, [], 'Sabzi', undefined, '31 Oct 2026'),
  ]},
  { id: 'phal', name: 'Phal — Lahore Sarkari List', items: [
    item('seb', 'Seb', 'Rs / kg', LAHORE_SEED.seb.price, LAHORE_SEED.seb.source, [], 'Phal', 'Rs 210–405 / kg', '31 Oct 2026'),
    item('kela', 'Kela', 'Rs / dozen', LAHORE_SEED.kela.price, LAHORE_SEED.kela.source, [], 'Phal', undefined, '31 Oct 2026'),
    item('amrood', 'Amrood', 'Rs / kg', LAHORE_SEED.amrood.price, LAHORE_SEED.amrood.source, [], 'Phal'),
    item('kinnow', 'Kinnow', 'Rs / kg', LAHORE_SEED.kinnow.price, LAHORE_SEED.kinnow.source, [], 'Phal'),
    item('malta', 'Malta', LAHORE_SEED.malta.unit ?? 'Rs / dozen', LAHORE_SEED.malta.price, LAHORE_SEED.malta.source, [], 'Phal', undefined, '31 Oct 2026'),
    // Ended / coming-soon items are kept in data so the seasonal
    // section can list them, but the main Phal list filters them out.
    item('aam', 'Aam', 'Rs / kg', null, 'Seasonal (ended)', [], 'Phal'),
    item('angoor', 'Angoor', 'Rs / kg', null, 'Seasonal (ended)', [], 'Phal'),
    item('strawberry', 'Strawberry', 'Rs / kg', null, 'Seasonal (coming soon)', [], 'Phal'),
    item('tarbooz', 'Tarbooz', 'Rs / kg', null, 'Seasonal (ended)', [], 'Phal'),
    item('kharbooza', 'Kharbooza', 'Rs / kg', null, 'Seasonal (ended)', [], 'Phal'),
  ]},
];

export const ALL_ITEMS: RateItem[] = CATEGORIES.flatMap((c) => c.items);
export function findItem(id: string): RateItem | undefined {
  return ALL_ITEMS.find((i) => i.id === id);
}
