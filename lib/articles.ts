// AdSense ke liye original articles — Roman Urdu, asan lafz, text only.
// Ye articles pehle draft file me thay; ab site par live hain. Koi rate
// baghair tareekh aur source ke nahi likha gaya. Article 1 ki misaal
// site ke verified OGRA window se li gayi hai (31 Oct–2 Nov 2026).

export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  blocks: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: 'petrol-rate-kyun-badhta-ghatta-hai',
    title: 'Petrol ka rate kyun badhta ya ghatta hai?',
    description: 'Petrol aur diesel ka rate sirf ek wajah se nahi badalta. Crude oil, dollar, tax aur OGRA ka daily system samjhen.',
    blocks: [
      { kind: 'p', text: 'Petrol ka rate sirf ek wajah se nahi badalta. Is par kai cheezein asar dalti hain:' },
      { kind: 'list', ordered: false, items: [
        'International crude oil ki qeemat: Duniya me tail mehnga ho to Pakistan me bhi uska asar aata hai.',
        'Dollar aur rupee: Tail dollar me khareeda jata hai. Rupee kamzor ho to wohi tail rupee me mehnga par jata hai.',
        'Tax aur levy: Hukoomat ki taraf se lagaye gaye tax aur levy bhi final rate ka hissa hote hain.',
        'OGRA ka naya daily system: Ab OGRA rozana qeemtein nikalta hai, international market ki 7 din ki average ki bunyad par. Is liye weekend par Friday wali qeemtein chalti hain aur agle working day par nayi qeemat aa sakti hai.',
      ] },
      { kind: 'p', text: 'Aam aadmi ke liye matlab ye hai: rate roz badal sakta hai, is liye petrol dalwane se pehle aaj ka rate aur uski tareekh zaroor dekh len. Sirf kal ka rate yaad rakh kar tank full karwana ghalat andaza ho sakta hai.' },
      { kind: 'p', text: 'Misaal (tareekh ke sath, live rate nahi): 31 October se 2 November 2026 tak petrol Rs 377.91 per litre aur diesel Rs 402.96 per litre raha. Source: OGRA notification, 30 October 2026. Aaj ka rate dekhne ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
  {
    slug: 'dollar-mehnga-hone-ka-asar',
    title: 'Dollar mehnga ho to aam aadmi par kya asar parta hai?',
    description: 'Dollar ka rate sirf business walon ka masla nahi. Petrol, imported cheezein, sabzi aur ghar ke budget par uska asar samjhen.',
    blocks: [
      { kind: 'p', text: 'Dollar ka rate sirf un logon ko nahi chhoota jo bahar se cheezein mangwate hain. Uska asar rozmarra ki zindagi me is tarah aata hai:' },
      { kind: 'list', ordered: false, items: [
        'Petrol aur diesel: Tail ki qeemat dollar se judi hai, is liye dollar mehnga hone se transport mehnga ho sakta hai.',
        'Imported cheezein: Bahar se aane wali dawai, machine ya khane ki cheezein mehngi ho jati hain.',
        'Sabzi aur grocery: Transport mehnga ho to mandi se dukaan tak pohanchne wali cheez bhi mehngi ho sakti hai.',
        'Ghar ka budget: Mahine ka kharcha pehle se tay karna mushkil ho jata hai, is liye roz ka rate dekhna aadat bana len.',
      ] },
      { kind: 'p', text: 'Is liye dollar ka rate dekhna sirf business walon ka kaam nahi — har ghar ke budget se jura hua hai. Aaj Ka Rate par dollar ka rate bhi tareekh ke sath dikhaya jata hai, taake aap purane rate ko aaj ka rate na samjhen.' },
    ],
  },
  {
    slug: 'lahore-sabzi-phal-rate-guide',
    title: 'Lahore me sabzi aur phal ka rate samajhne ki guide',
    description: 'Sabzi aur phal ka rate har roz ek jaisa nahi rehta. Season, supply, mandi se dukaan tak ka safar aur tareekh samjhen.',
    blocks: [
      { kind: 'p', text: 'Sabzi aur phal ka rate har roz ek jaisa nahi rehta. Rate samajhne ke liye ye 4 baatein yaad rakhen:' },
      { kind: 'list', ordered: true, items: [
        'Season: Jis sabzi ka season ho, wo aam tor par sasti milti hai. November me sardi ki sabziyan aati hain, jabke garmi wale phal season khatam hone par list se hat jate hain.',
        'Supply: Barish, garmi ya transport ki rukawat se supply kam ho to rate barh jata hai.',
        'Mandi se dukaan tak ka safar: Mandi ka rate aur mohalle ki dukaan ka rate ek nahi hota — transport aur dukaan ka kharcha bhi judta hai.',
        'Tareekh: Kal ka rate aaj ka rate nahi hota. Hamesha aaj ki tareekh wala rate dekhen. Agar kisi cheez par “Rate aa raha hai…” likha ho to uska matlab hai uska taza sarkari rate abhi nahi mila, andaza nahi lagaya gaya.',
      ] },
      { kind: 'p', text: 'Aaj Ka Rate par Lahore ki sabzi aur phal ke rate roz update hote hain, tareekh ke sath, taake aap andaze se nahi, aaj ke rate se khareedari kar saken.' },
    ],
  },
  {
    slug: 'sona-khareedne-se-pehle',
    title: 'Sona khareedne se pehle kya dekhna chahiye?',
    description: 'Sona khareedna sirf rate dekh kar faisla karne ka kaam nahi hai. Purity, banwai, raseed aur source check karen.',
    blocks: [
      { kind: 'p', text: 'Sona khareedna sirf rate dekh kar faisla karne ka kaam nahi hai. Ye baatein pehle check kar len:' },
      { kind: 'list', ordered: false, items: [
        'Aaj ki tareekh aur source: Sone ka rate roz badalta hai, aur mukhtalif sources me thora farq bhi ho sakta hai. Hamesha aaj ki tareekh wala rate aur uska source dekhen, purani khabar par faisla na karen.',
        'Purity (khara sona ya milawat): 24K, 22K aur 18K me farq hota hai. Rate usi purity ke hisab se hota hai, is liye sirf “sona” likha dekh kar andaza na lagayen.',
        'Banwai aur dukaan ka kharcha: Zevar ka final rate sirf sone ke rate se nahi banta — banwai aur dukaan ka margin bhi judta hai. Pehle poori qeemat pooch len.',
        'Raseed aur wazan: Wazan, purity aur qeemat raseed par likhwa len, taake baad me koi ghalat fehmi na ho.',
      ] },
      { kind: 'p', text: 'Ye article sone ka live rate nahi deta — sirf ye batata hai ke rate dekhte waqt kya check karna chahiye. Live rate ke liye Aaj Ka Rate ka aaj wala board dekhen.' },
    ],
  },
  {
    slug: 'grocery-bachat-tareeqa',
    title: 'Grocery par bachat ka aasan tareeqa',
    description: 'Grocery ka bill kam karne ke liye bara plan nahi chahiye. List, season wali sabzi, rate compare aur zaroorat ke mutabiq khareedari.',
    blocks: [
      { kind: 'p', text: 'Grocery ka bill kam karne ke liye bara plan nahi chahiye, bas 4 aadatain kaafi hain:' },
      { kind: 'list', ordered: true, items: [
        'List bana kar jayen: List ke baghair dukaan par extra cheezein aa jati hain.',
        'Season wali sabzi len: Season ki sabzi aam tor par sasti aur taza hoti hai.',
        'Rate compare karen: Aaj Ka Rate par aaj ke rate dekh kar faisla karen, kal ke rate par nahi.',
        'Zaroorat se zyada na len: Kharaab hone wali cheezein zyada lene se bachat nahi hoti, nuqsan hota hai.',
      ] },
      { kind: 'p', text: 'Ye choti aadatain mahine ke akhir me farq dikhati hain, aur in ke liye koi app ya mehnga tareeqa nahi chahiye.' },
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
