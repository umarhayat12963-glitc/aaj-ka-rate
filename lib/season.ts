export type Season = {
  seasonName: string;
  monthLabel: string;
  newItems: string[];
  inSeasonItems: string[];
  comingSoonItems: string[];
  endedItems: string[];
};

// Calendar-driven by PKT month. November is specified exactly in the
// spec (Sardi ka Mosam). Other months use a simple Pakistan seasonal
// guide — this is a seasonal guide, not a market price.
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function getSeason(date = new Date()): Season {
  // PKT month: use Asia/Karachi timezone conversion.
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', month: 'numeric', year: 'numeric' }).formatToParts(date);
  const month = Number(parts.find((p) => p.type === 'month')?.value || 11);
  const year = parts.find((p) => p.type === 'year')?.value || '2026';
  const monthLabel = `${MONTHS[month - 1]} ${year}`;
  if (month === 11) {
    return {
      seasonName: 'Sardi ka Mosam',
      monthLabel,
      newItems: ['kinnow', 'matar', 'malta', 'gajar', 'shalgam'],
      inSeasonItems: ['palak'],
      comingSoonItems: ['strawberry'],
      endedItems: ['aam', 'angoor'],
    };
  }
  if (month === 12 || month === 1 || month === 2) {
    return { seasonName: 'Sardi ka Mosam', monthLabel, newItems: ['strawberry'], inSeasonItems: ['kinnow', 'malta', 'gajar', 'shalgam', 'palak'], comingSoonItems: [], endedItems: ['aam', 'angoor'] };
  }
  if (month >= 3 && month <= 5) {
    return { seasonName: 'Bahar ka Mosam', monthLabel, newItems: ['tarbooz', 'kharbooza'], inSeasonItems: ['aloo', 'pyaz', 'tamatar'], comingSoonItems: ['aam'], endedItems: ['kinnow', 'matar'] };
  }
  if (month >= 6 && month <= 9) {
    return { seasonName: 'Garmi ka Mosam', monthLabel, newItems: ['aam', 'angoor', 'tarbooz', 'kharbooza'], inSeasonItems: ['aloo', 'pyaz', 'tamatar'], comingSoonItems: ['kinnow'], endedItems: ['matar', 'gajar', 'shalgam'] };
  }
  return { seasonName: 'Khizaan ka Mosam', monthLabel, newItems: ['seb', 'amrood'], inSeasonItems: ['aloo', 'pyaz', 'tamatar', 'palak'], comingSoonItems: ['kinnow', 'matar', 'malta'], endedItems: ['aam'] };
}

export function seasonStatus(id: string, season: Season): 'new' | 'in-season' | 'coming-soon' | 'ended' | null {
  if (season.newItems.includes(id)) return 'new';
  if (season.inSeasonItems.includes(id)) return 'in-season';
  if (season.comingSoonItems.includes(id)) return 'coming-soon';
  if (season.endedItems.includes(id)) return 'ended';
  return null;
}
