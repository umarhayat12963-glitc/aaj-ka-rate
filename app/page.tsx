'use client';
import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES as STATIC_CATEGORIES, findItem as staticFindItem, type Category } from '../lib/data';
import { getSeason, seasonStatus } from '../lib/season';
import AdSlot from '../components/AdSlot';

const FAQS = [
  ['Rate kab update hota hai?', 'Roz subah 7:00 PKT par daily refresh chalta hai. Agar kisi rate par "Rate aa raha hai…" likha ho to wo abhi research se aa raha hai, category gayab nahi hogi.'],
  ['Petrol ka rate kaise banta hai?', 'Petrol aur diesel ke rate OGRA ki notification se aate hain. International oil price, dollar rate, tax aur freight mil kar Pakistan me pump price banta hai.'],
  ['Dollar mehgai par kaise asar karta hai?', 'Dollar mehnga ho to import hone wali cheezein, petrol, khad aur dawai mehngi hoti hain, is liye karyana aur sabzi par bhi asar parta hai.'],
  ['Sona khareedne se pehle kya dekhen?', '24K aur 22K ka farq samjhen, making charges poochhen, aur hamesha Sarafa bazaar ka aaj ka rate check kar ke receipt len.'],
  ['Sarkari sabzi list ka faida kya hai?', 'Lahore Market Committee ki sarkari list se pata chalta hai ke dukandar ko kis rate par bechna chahiye, is se zyada daam se bacha ja sakta hai.'],
  ['Karyana me bachat kaise karen?', 'Mahine ka list banayen, sale par staple cheezein len, aur rate board par kal aur aaj ka farq dekh kar faisla karen.'],
  ['Mousam ke hisab se bazaar kya hai?', 'Har mahine kuch sabzi/phal mousam me aate hain aur kuch ka mousam khatam ho jata hai. Khatam cheez ka purana rate nahi dikhaya jata, nayi cheez par NAYA badge lagta hai.'],
];

export default function Home() {
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [liveCategories, setLiveCategories] = useState<Category[] | null>(null);
  // Live rates (incl. live FX when the daily refresh fetched it)
  // replace the static sourced seed when /api/rates answers.
  // If it fails, the static sourced seed stays — never a blank page.
  useEffect(() => {
    fetch('/api/rates').then((r) => r.json()).then((j) => {
      if (Array.isArray(j.categories) && j.categories.length) setLiveCategories(j.categories);
    }).catch(() => {});
  }, []);
  const CATEGORIES = liveCategories ?? STATIC_CATEGORIES;
  const findItem = (id: string) => CATEGORIES.flatMap((c) => c.items).find((i) => i.id === id) ?? staticFindItem(id);
  const season = useMemo(() => getSeason(), []);
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Karachi' });
  const query = q.trim().toLowerCase();
  const petrol = findItem('petrol');
  const sona = findItem('sona24');
  const dollar = findItem('usd');

  const visibleCategories = CATEGORIES.map((cat) => {
    let items = cat.items;
    if (cat.id === 'phal') {
      // Ended + coming-soon items are NOT in the main Phal list.
      items = items.filter((i) => {
        const s = seasonStatus(i.id, season);
        return s !== 'ended' && s !== 'coming-soon';
      });
    }
    if (query) items = items.filter((i) => i.name.toLowerCase().includes(query));
    return { ...cat, items };
  }).filter((c) => c.items.length > 0);

  const seasonalList = (ids: string[]) => ids.map((id) => findItem(id)).filter(Boolean) as NonNullable<ReturnType<typeof findItem>>[];
  const priceText = (price: number | null, unit: string, displayPrice?: string) => displayPrice ? displayPrice : (price === null ? 'Rate aa raha hai…' : `Rs ${price.toLocaleString()} ${unit.replace('Rs / ', '/ ').replace('Rs', '')}`);

  return (
    <>
      <header>
        <h1>Aaj Ka Rate</h1>
        <p className="small">{today} · Pakistan · {season.seasonName} · {season.monthLabel}</p>
        <p><a href="/admin">🔐 Ads Admin Panel</a></p>
        <label>Search: <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Petrol, atta, tamatar, dollar…" aria-label="Rate search" /></label>
      </header>
      <main>
        <section>
          <h2>Taaruf — Aaj Ka Rate kya hai?</h2>
          <p>Aaj Ka Rate aam logon ke liye banaya gaya hai. Yahan rozana petrol, diesel, sona, chandi, dollar, karyana aur Lahore ki sarkari sabzi aur phal ke rate ek jagah milte hain. Rate asan Roman Urdu me, bare saaf haroof me hain, taake slow network par bhi jaldi khulen.</p>
          <p className="small">Note: Har rate ke sath source aur date hai — rate par tap kar ke dekhen. Jin rates ka koi verified source nahi mila, un par koi number invent nahi kiya gaya, wo “Rate aa raha hai…” dikhate hain.</p>
        </section>

        <AdSlot placement="top" label="Top" />
        <section className="hero" aria-label="Bare rates">
          <div className="card"><h2>Petrol</h2><div className="price">{petrol?.price ? `Rs ${petrol.price}` : 'Rate aa raha hai…'}</div><div className="small">per litre · OGRA</div></div>
          <div className="card"><h2>Sona 24K</h2><div className="price">{sona?.price ? `Rs ${sona.price}` : 'Rate aa raha hai…'}</div><div className="small">per tola · APSGJA, 2 Nov 2026</div></div>
          <div className="card"><h2>Dollar</h2><div className="price">{dollar?.price ? `Rs ${dollar.price}` : 'Rate aa raha hai…'}</div><div className="small">Interbank · SBP closing, 2 Nov 2026 (live FX se update hota hai)</div></div>
        </section>
        <AdSlot placement="hero" label="Bare rates ke neeche" />

        <section>
          <h2>🌤️ Mosam ke Hisaab se Bazaar — {season.seasonName}</h2>
          <p><span className="badge">🌟 NAYA — Mosam ki Nayi Cheez</span></p>
          <h3>Nayi aayi hui cheezein</h3>
          <ul>{seasonalList(season.newItems).map((i) => <li key={i.id}>{i.name} — {i.price === null ? 'Rate aa raha hai…' : `Rs ${i.price} / ${i.unit.replace('Rs / ', '')}`} <span className="badge">NAYA</span></li>)}</ul>
          <h3>Mousam me</h3>
          <ul>{seasonalList(season.inSeasonItems).map((i) => <li key={i.id}>{i.name}</li>)}</ul>
          <h3>Jald Ane Wala</h3>
          <ul>{seasonalList(season.comingSoonItems).map((i) => <li key={i.id}>{i.name}</li>)}</ul>
          <h3>🍂 Mosam Khatam — Ab Bazaar me Nahi</h3>
          <p className="small">In cheezon ka purana rate nahi dikhaya ja raha, taake stale rate aaj ka na lage.</p>
          <ul>{seasonalList(season.endedItems).map((i) => <li key={i.id}>{i.name} <span className="badge ended">Mosam Khatam</span></li>)}</ul>
        </section>

        {visibleCategories.map((cat, idx) => (
          <section key={cat.id}>
            <h2>{cat.name}</h2>
            {cat.items.map((it) => {
              const s = seasonStatus(it.id, season);
              const ended = s === 'ended';
              return (
                <div key={it.id}>
                  <button className="rowbtn" onClick={() => setOpenId(openId === it.id ? null : it.id)}>
                    <strong>{it.name}</strong> — {ended ? 'Mosam Khatam' : priceText(it.price, it.unit, it.displayPrice)}
                    {s === 'new' && <span className="badge"> 🌟 NAYA</span>}
                    {it.isSample && <span className="small"> · Sample</span>}
                  </button>
                  {openId === it.id && (
                    <div className="card">
                      <p>Source: {it.source}</p>
                      <p>History: {it.history.length ? it.history.map((h) => `Rs ${h}`).join(' → ') : 'Pehli history refresh ke baad aaye gi.'}</p>
                      <p className="small">Kal se farq: {it.history.length >= 2 && it.price !== null ? `Rs ${(it.price - it.history[it.history.length - 2]).toFixed(2)} ${it.price >= it.history[it.history.length - 2] ? 'mehnga' : 'sasta'}` : '—'}</p>
                    </div>
                  )}
                </div>
              );
            })}
            {idx === 1 && <AdSlot placement="middle" label="Lists ke darmiyan" />}
          </section>
        ))}
        <AdSlot placement="bottom" label="Neeche" />

        <section>
          <h2>Articles — Mazeed Parhen</h2>
          <p className="small">Petrol, dollar, sabzi, sona aur grocery bachat par asan Roman Urdu articles.</p>
          <ul>
            <li><a href="/articles/petrol-rate-kyun-badhta-ghatta-hai">Petrol ka rate kyun badhta ya ghatta hai?</a></li>
            <li><a href="/articles/dollar-mehnga-hone-ka-asar">Dollar mehnga ho to aam aadmi par kya asar parta hai?</a></li>
            <li><a href="/articles/lahore-sabzi-phal-rate-guide">Lahore me sabzi aur phal ka rate samajhne ki guide</a></li>
            <li><a href="/articles/sona-khareedne-se-pehle">Sona khareedne se pehle kya dekhna chahiye?</a></li>
            <li><a href="/articles/grocery-bachat-tareeqa">Grocery par bachat ka aasan tareeqa</a></li>
          </ul>
          <p><a href="/articles">Sab articles dekhen →</a></p>
        </section>

        <section className="guide">
          <h2>Guide — Rate kaise samjhen</h2>
          <h3>Rate kaise parhen</h3><p>Har rate ke sath unit likha hai, jaise per litre ya per kg. Kal aur aaj ka farq dekh kar andaza lagayen ke cheez mehngi hui ya sasti.</p>
          <h3>Petrol ka rate kaise banta hai</h3><p>OGRA ki notification, international oil price, dollar rate aur tax mil kar pump price banate hain. Is liye dollar ya oil badhne par petrol bhi badh sakta hai.</p>
          <h3>Dollar mehgai par kaise asar karta hai</h3><p>Dollar mehnga ho to import, petrol aur khad mehngi hoti hai, aur is ka asar karyana aur sabzi tak pohanchta hai.</p>
          <h3>Sona khareedne se pehle</h3><p>24K pure sona hota hai, 22K me milawat hoti hai. Making charges aur receipt zaroor len, aur aaj ka Sarafa rate pehle check karen.</p>
          <h3>Sarkari sabzi list ka faida</h3><p>Lahore Market Committee ki list official rate batati hai. Agar dukandar is se zyada le to aap ko pata chal jata hai ke rate zyada hai.</p>
          <h3>Karyana me bachat</h3><p>List bana kar khareeden, staple cheezein sale par len, aur roz rate board dekh kar faisla karen. Chhoti bachat mahine me bari bachat ban jati hai.</p>
          <h2>FAQs — Aam Sawal</h2>
          {FAQS.map(([qq, aa]) => (<details key={qq}><summary>{qq}</summary><p>{aa}</p></details>))}
        </section>
      </main>
      <footer>
        <h2>About Aaj Ka Rate</h2>
        <p>Aaj Ka Rate ka maqsad aam logon tak rozana rates asan aur saaf tareeqe se pohanchana hai.</p>
        <h3>Rate Categories</h3><p>Petrol &amp; Diesel, Sona &amp; Chandi, Dollar &amp; Currency, Karyana, Lahore Sabzi, Lahore Phal.</p>
        <h3>Sources &amp; Disclaimer</h3><p>Sources: OGRA, State Bank / Exchange Rate API (Rates By Exchange Rate API), APSGJA Sarafa, Lahore Market Committee / PAMRA. Rates sirf maloomat ke liye hain, khareedne se pehle market me tasdeeq kar len. Har rate ki date aur source us par tap kar ke dekhi ja sakti hai; pending rates par koi number invent nahi kiya jata.</p>
        <h3>Privacy Note</h3><p>Site aap ka personal data save nahi karti, siwaye admin login ke jo sirf owner ke liye hai. Ads lagne par Google / ad networks apni policy ke mutabiq cookies use kar sakte hain. Poori tafseel ke liye <a href="/privacy">Privacy Policy</a> parhen.</p>
        <h3>Contact Us · Rabta Karo</h3>
        <p>Owner: Zohaib Ali Jutt<br />Email: <a href="mailto:umarhayat12963@gmail.com">umarhayat12963@gmail.com</a></p>
        <p><a href="/articles">Articles</a> · <a href="/privacy">Privacy Policy</a> · <a href="/admin">Ads Admin Panel</a></p>
        <p>© 2026 Aaj Ka Rate · Zohaib Ali Jutt — All Rights Reserved<br />Owner: Zohaib Ali Jutt · Email: <a href="mailto:umarhayat12963@gmail.com">umarhayat12963@gmail.com</a></p>
      </footer>
    </>
  );
}
