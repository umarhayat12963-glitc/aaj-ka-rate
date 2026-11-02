export type RateItem = {
  id: string;
  name: string;
  unit: string;
  price: number | null;
  source: string;
  isSample: boolean;
  history: number[];
  category: string;
};

export type Category = { id: string; name: string; items: RateItem[] };

// NOTE: Prices below are CLEARLY-LABELLED SAMPLE data only, so the page
// renders before a live refresh. They are NOT presented as verified
// current market rates. The /api/refresh route replaces them with
// sourced data once Supabase / live sources are connected.
// Petrol/diesel sample values come from the prior spec (Rs 377.91 / 402.96).
function item(id: string, name: string, unit: string, price: number | null, source: string, history: number[], category: string, isSample = true): RateItem {
  return { id, name, unit, price, source, history, category, isSample };
}

export const CATEGORIES: Category[] = [
  { id: 'petrol', name: 'Petrol & Diesel', items: [
    item('petrol', 'Petrol', 'Rs / litre', 377.91, 'OGRA notification (sample)', [376.06, 377.91], 'Petrol & Diesel'),
    item('diesel', 'Diesel', 'Rs / litre', 402.96, 'OGRA notification (sample)', [401.11, 402.96], 'Petrol & Diesel'),
  ]},
  { id: 'sona', name: 'Sona & Chandi', items: [
    item('sona24', 'Sona 24K', 'Rs / tola', null, 'Karachi Sarafa (sample — rate aa raha hai)', [], 'Sona & Chandi'),
    item('sona22', 'Sona 22K', 'Rs / tola', null, 'Karachi Sarafa (sample — rate aa raha hai)', [], 'Sona & Chandi'),
    item('chandi', 'Chandi', 'Rs / tola', null, 'Sarafa market (sample — rate aa raha hai)', [], 'Sona & Chandi'),
  ]},
  { id: 'currency', name: 'Dollar & Currency', items: [
    item('usd', 'Dollar — Interbank', 'Rs', null, 'State Bank / open market (sample — rate aa raha hai)', [], 'Dollar & Currency'),
    item('aed', 'UAE Dirham', 'Rs', null, 'Open market (sample — rate aa raha hai)', [], 'Dollar & Currency'),
    item('sar', 'Saudi Riyal', 'Rs', null, 'Open market (sample — rate aa raha hai)', [], 'Dollar & Currency'),
    item('gbp', 'British Pound', 'Rs', null, 'Open market (sample — rate aa raha hai)', [], 'Dollar & Currency'),
    item('eur', 'Euro', 'Rs', null, 'Open market (sample — rate aa raha hai)', [], 'Dollar & Currency'),
  ]},
  { id: 'karyana', name: 'Karyana', items: [
    item('atta', 'Atta', 'Rs / kg', null, 'PBS SPI (sample — rate aa raha hai)', [], 'Karyana'),
    item('cheeni', 'Cheeni', 'Rs / kg', null, 'PBS SPI (sample — rate aa raha hai)', [], 'Karyana'),
    item('ghee', 'Ghee', 'Rs / kg', null, 'Market (sample — rate aa raha hai)', [], 'Karyana'),
    item('doodh', 'Doodh', 'Rs / litre', null, 'Market (sample — rate aa raha hai)', [], 'Karyana'),
    item('anday', 'Anday', 'Rs / dozen', null, 'Market (sample — rate aa raha hai)', [], 'Karyana'),
    item('chicken', 'Chicken', 'Rs / kg', null, 'Market (sample — rate aa raha hai)', [], 'Karyana'),
    item('daal-masoor', 'Daal Masoor', 'Rs / kg', null, 'Market (sample — rate aa raha hai)', [], 'Karyana'),
    item('daal-moong', 'Daal Moong', 'Rs / kg', null, 'Market (sample — rate aa raha hai)', [], 'Karyana'),
    item('chawal', 'Chawal', 'Rs / kg', null, 'Market (sample — rate aa raha hai)', [], 'Karyana'),
  ]},
  { id: 'sabzi', name: 'Sabzi — Lahore Sarkari List', items: [
    item('aloo', 'Aloo', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Sabzi'),
    item('pyaz', 'Pyaz', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Sabzi'),
    item('tamatar', 'Tamatar', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Sabzi'),
    item('palak', 'Palak', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Sabzi'),
    item('matar', 'Matar', 'Rs / kg', 330, 'Lahore Market Committee sheet (sample)', [300, 330], 'Sabzi'),
    item('gajar', 'Gajar', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Sabzi'),
    item('shalgam', 'Shalgam', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Sabzi'),
  ]},
  { id: 'phal', name: 'Phal — Lahore Sarkari List', items: [
    item('seb', 'Seb', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Phal'),
    item('kela', 'Kela', 'Rs / dozen', null, 'Lahore Market Committee (sample)', [], 'Phal'),
    item('amrood', 'Amrood', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Phal'),
    item('kinnow', 'Kinnow', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Phal'),
    item('malta', 'Malta', 'Rs / kg', null, 'Lahore Market Committee (sample)', [], 'Phal'),
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
