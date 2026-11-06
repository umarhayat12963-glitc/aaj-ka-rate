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
};

export type Category = { id: string; name: string; items: RateItem[] };

// v2: sourced, dated rates — NOT sample data. See lib/real-rates.ts
// for the verification notes. A null price means no verified rate
// is available for that item; the page shows "Rate aa raha hai…"
// instead of inventing a number. isSample is false throughout:
// nothing in this file is presented as sample data any more.
function item(id: string, name: string, unit: string, price: number | null, source: string, history: number[], category: string, displayPrice?: string): RateItem {
  return { id, name, unit, price, source, history, category, isSample: false, displayPrice };
}

const today = pktDateString();
const petrol = petrolForDate(today);

export const CATEGORIES: Category[] = [
  { id: 'petrol', name: 'Petrol & Diesel', items: [
    item('petrol', 'Petrol', 'Rs / litre', petrol.petrol.price, petrol.petrol.source, [376.06, 377.91], 'Petrol & Diesel'),
    item('diesel', 'Diesel', 'Rs / litre', petrol.diesel.price, petrol.diesel.source, [400.67, 402.96], 'Petrol & Diesel'),
  ]},
  { id: 'sona', name: 'Sona & Chandi', items: [
    item('sona24', 'Sona 24K', 'Rs / tola', GOLD_SEED.sona24.price, GOLD_SEED.sona24.source, [409736, 412136], 'Sona & Chandi'),
    item('sona22', 'Sona 22K', 'Rs / tola', GOLD_SEED.sona22.price, GOLD_SEED.sona22.source, [], 'Sona & Chandi'),
    item('chandi', 'Chandi', 'Rs / tola', GOLD_SEED.chandi.price, GOLD_SEED.chandi.source, [5388, 5488], 'Sona & Chandi'),
  ]},
  { id: 'currency', name: 'Dollar & Currency', items: [
    item('usd', 'Dollar — Interbank', 'Rs', FX_SEED.usd.price, FX_SEED.usd.source, [276.75, 276.72], 'Dollar & Currency'),
    item('aed', 'UAE Dirham', 'Rs', FX_SEED.aed.price, FX_SEED.aed.source, [], 'Dollar & Currency'),
    item('sar', 'Saudi Riyal', 'Rs', FX_SEED.sar.price, FX_SEED.sar.source, [], 'Dollar & Currency'),
    item('gbp', 'British Pound', 'Rs', FX_SEED.gbp.price, FX_SEED.gbp.source, [371.19, 371.51], 'Dollar & Currency'),
    item('eur', 'Euro', 'Rs', FX_SEED.eur.price, FX_SEED.eur.source, [309.79, 310.17], 'Dollar & Currency'),
  ]},
  { id: 'karyana', name: 'Karyana', items: [
    item('atta', 'Atta', 'Rs / kg', KARYANA_SEED.atta.price, KARYANA_SEED.atta.source, [], 'Karyana'),
    item('cheeni', 'Cheeni', 'Rs / kg', KARYANA_SEED.cheeni.price, KARYANA_SEED.cheeni.source, [], 'Karyana'),
    item('ghee', 'Ghee', 'Rs / kg', KARYANA_SEED.ghee.price, KARYANA_SEED.ghee.source, [], 'Karyana'),
    item('doodh', 'Doodh', 'Rs / litre', KARYANA_SEED.doodh.price, KARYANA_SEED.doodh.source, [], 'Karyana'),
    item('anday', 'Anday', 'Rs / dozen', KARYANA_SEED.anday.price, KARYANA_SEED.anday.source, [], 'Karyana'),
    item('chicken', 'Chicken', 'Rs / kg', LAHORE_SEED.chicken.price, LAHORE_SEED.chicken.source, [], 'Karyana'),
    item('daal-masoor', 'Daal Masoor', 'Rs / kg', KARYANA_SEED.daalMasoor.price, KARYANA_SEED.daalMasoor.source, [], 'Karyana'),
    item('daal-moong', 'Daal Moong', 'Rs / kg', KARYANA_SEED.daalMoong.price, KARYANA_SEED.daalMoong.source, [], 'Karyana'),
    item('chawal', 'Chawal', 'Rs / kg', KARYANA_SEED.chawal.price, KARYANA_SEED.chawal.source, [], 'Karyana'),
  ]},
  { id: 'sabzi', name: 'Sabzi — Lahore Sarkari List', items: [
    item('aloo', 'Aloo', 'Rs / kg', LAHORE_SEED.aloo.price, LAHORE_SEED.aloo.source, [], 'Sabzi'),
    item('pyaz', 'Pyaz', 'Rs / kg', LAHORE_SEED.pyaz.price, LAHORE_SEED.pyaz.source, [], 'Sabzi'),
    item('tamatar', 'Tamatar', 'Rs / kg', LAHORE_SEED.tamatar.price, LAHORE_SEED.tamatar.source, [], 'Sabzi'),
    item('palak', 'Palak', 'Rs / kg', LAHORE_SEED.palak.price, LAHORE_SEED.palak.source, [], 'Sabzi'),
    item('matar', 'Matar', 'Rs / kg', LAHORE_SEED.matar.price, LAHORE_SEED.matar.source, [300, 330], 'Sabzi'),
    item('gajar', 'Gajar', 'Rs / kg', LAHORE_SEED.gajar.price, LAHORE_SEED.gajar.source, [], 'Sabzi'),
    item('shalgam', 'Shalgam', 'Rs / kg', LAHORE_SEED.shalgam.price, LAHORE_SEED.shalgam.source, [], 'Sabzi'),
  ]},
  { id: 'phal', name: 'Phal — Lahore Sarkari List', items: [
    item('seb', 'Seb', 'Rs / kg', LAHORE_SEED.seb.price, LAHORE_SEED.seb.source, [], 'Phal', 'Rs 210–405 / kg'),
    item('kela', 'Kela', 'Rs / dozen', LAHORE_SEED.kela.price, LAHORE_SEED.kela.source, [], 'Phal'),
    item('amrood', 'Amrood', 'Rs / kg', LAHORE_SEED.amrood.price, LAHORE_SEED.amrood.source, [], 'Phal'),
    item('kinnow', 'Kinnow', 'Rs / kg', LAHORE_SEED.kinnow.price, LAHORE_SEED.kinnow.source, [], 'Phal'),
    item('malta', 'Malta', LAHORE_SEED.malta.unit ?? 'Rs / dozen', LAHORE_SEED.malta.price, LAHORE_SEED.malta.source, [], 'Phal'),
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
