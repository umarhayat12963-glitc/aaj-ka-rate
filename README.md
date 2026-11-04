# Aaj Ka Rate — Deployable Full Version

Easy Roman Urdu guide. Ye project Muse artifact ka copy NAHI hai — ye spec se dobara banaya gaya standalone Next.js project hai, taake isay GitHub + Vercel + Supabase par free live kiya ja sake.

## Kya hai is me?
- Rate board: Petrol, Sona 24K, Dollar hero cards; Petrol/Diesel, Sona/Chandi, Dollar/Currency, Karyana, Lahore sarkari Sabzi/Phal. Missing rate par "Rate aa raha hai…" (category gayab nahi hoti). Search + rate par tap kar ke history/source.
- Mosam ke Hisaab se Bazaar: PKT month se calendar-driven. November (Sardi ka Mosam): NAYA = Kinnow, Matar, Malta, Gajar, Shalgam; in-season = Palak; coming soon = Strawberry (Dec); ended = Aam, Angoor (main Phal list se bahar, koi stale price nahi).
- Guide + 7 FAQs (Roman Urdu): rate parhna, petrol pricing, dollar aur mehgai, sona khareedne se pehle, sarkari sabzi list ka faida, karyana bachat.
- Footer: description, categories, sources + disclaimer, privacy note, Ads Admin Panel link, © 2026 Aaj Ka Rate · Zohaib Ali Jutt — All Rights Reserved, Owner: Zohaib Ali Jutt, Email: umarhayat12963@gmail.com (mailto).
- Ads (owner-only): AdSense (Publisher ID + Slot IDs), custom banner (click counting), third-party HTML sandboxed iframe (no same-origin). Placements: top, hero ke neeche, middle, bottom. On/off, edit/delete.
- Admin panel (/admin, public NAHI): pehli dafa setup hi hai — KOI default username/password code ya docs me NAHI hai. Admin apna username/password khud banata hai, sirf hash save hota hai. Login me password show/hide toggle, panel ke andar change username/password (current password zaroori), logout, 7 din session. Forgot Password: login ke neeche link, sirf panel me set kiye hue 3 security sawal se kaam karta hai, jawab hash hote hain, ghalat jawab par saaf Roman Urdu error, koi 500 crash nahi. Purana direct owner-reset bypass HATA diya gaya hai.
- Visual: light mesh golden-green background, thin golden line top, golden cursor (normal chhota golden arrow, clickable par sirf shahadat ungli wali golden hand, baqi mutthi), chhota Eye Buddy badge (44px mobile / 56px desktop, no bubble, pupils mouse ko follow karte hain, pointer-events none).

## Real rates v2 — sourced, dated, no invented numbers (2 Nov 2026)
Sample label hata diya gaya hai. `lib/real-rates.ts` me har rate ki
dated source hai: OGRA petrol/diesel windows (31 Oct–2 Nov:
377.91/402.96; 3 Nov: 374.51/395.20 — 3 Nov ke baad petrol
deliberately null, stale rate nahi dikhaya jata), SBP interbank
closing 2 Nov (USD 276.72) + live FX via keyless open.er-api.com
(mid-market, "Rates By Exchange Rate API", 1 hour cache),
APSGJA sona 24K 412,136 / chandi 5,488 (2 Nov 2026),
Lahore Market Committee / PAMRA 31 Oct 2026 sheet (Grade A:
Aloo 50, Pyaz 195, Tamatar 170, Palak 40, Matar 330, Gajar 90,
Shalgam 110, Kela 155/dozen, Malta 130/dozen; Kinnow ka sheet
me entry nahi, is liye null). Karyana (PBS SPI) aur baqi phal
abhi null hain — koi number invent nahi kiya gaya.
`/api/refresh` ab stub nahi hai: OGRA window + live FX try karta
hai, aur Supabase na hone par in-memory log rakhta hai.
Persistence ke liye `lib/db.ts` + `DATABASE_URL` + `pg` chahiye,
jo abhi Supabase project banne par hi kaam kare ga.

## Free deploy — step by step
1. **GitHub:** Naya repo banayen, is folder ka code push karen. Kabhi `.env.local` ya real secrets push mat karen.
2. **Supabase (free):** Naya project banayen, SQL Editor me `supabase/schema.sql` chalyen. Project ka Postgres connection string copy karen.
3. **Vercel (free):** GitHub repo import karen, framework Next.js chunen. Env Vars me dalen:
   - `DATABASE_URL` = Supabase connection string
   - `SESSION_SECRET` = lamba random string
   - `CRON_SECRET` = lamba random string (Vercel cron isay Authorization header me bhejta hai)
   - `NEXT_PUBLIC_SITE_URL` = aap ki live URL (jaise https://aaj-ka-rate.vercel.app)
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = ca-pub-… (sirf AdSense approval ke baad)
4. **Deploy** dabayen. Pehli deploy 5–15 minute le sakti hai.
5. **Cron:** `vercel.json` me daily cron hai: `0 2 * * *` UTC = 07:00 PKT, jo `/api/refresh` ko call karta hai. Vercel free plan par cron limits check karen; agar limit ho to GitHub Actions ya cron-job.org se roz 07:00 PKT par refresh URL call karen.
6. **Pehli admin setup:** Live site par `/admin` kholen. Koi default login NAHI hai — apna username/password khud banayen, phir panel ke andar 3 security sawal aur jawab save karen. Ye step kiye baghair Forgot Password kaam nahi kare ga.
7. **Ads:** Admin panel se AdSense Publisher ID + Slot IDs, ya banner, ya third-party code lagayen. AdSense ke liye apna account aur Google approval chahiye — approval ki guarantee nahi hai.

## Google Search Console — add / verify / sitemap / indexing
1. Live URL milne ke baad https://search.google.com/search-console kholen, apne Google account se sign in karen. **Apna password kisi ko mat den, aur Muse ko mat den.**
2. Property add karen (URL prefix, live URL), verification ke liye DNS record ya HTML file/meta tag wala tareeqa chunen aur verify karen.
3. Sitemap submit karen: `https://aapki-site/sitemap.xml` (is project me `app/sitemap.ts` se banta hai). `robots.txt` me allow hai (`app/robots.ts`).
4. URL Inspection me homepage aur main pages ka link dal kar **Request Indexing** dabayen (roz ki limit hoti hai, sirf main pages).
5. Google ko site milna aam tor par kuch ghante se kuch din me hota hai, nayi site ko kabhi 1–2 hafte bhi lag sakte hain. Top ranking ki koi instant guarantee nahi hai.
6. Pata kaise chalega? Gmail par Google ki email, Search Console me "Indexed" / "URL is on Google" status, ya assistant se check karwana.

## Local run
```bash
npm install
npm run dev
# phir http://localhost:3000 kholen, admin: http://localhost:3000/admin
```

## Limitations (honest)
- Shipped API routes production Postgres se wire hone se pehle in-memory fallback use karte hain — redeploy par in-memory admin/ads/reset ho sakte hain. Production me DATABASE_URL set kar ke routes ko `supabase/schema.sql` tables se connect karen.
- `/api/refresh` abhi safe stub hai — real OGRA/PBS/Lahore sources ko production me wire karen, taake sample rates sourced rates se replace hon.
- Vercel cron free plan par limited ho sakta hai — upar wala alternative use karen.
