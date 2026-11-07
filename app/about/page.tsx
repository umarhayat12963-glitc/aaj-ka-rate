import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Aaj Ka Rate Pakistan',
  description: 'Aaj Ka Rate kya hai, kaun chalata hai, aur is ka maqsad kya hai: aam logon tak rozana rates asan Roman Urdu me.',
};

export default function AboutPage() {
  return (
    <>
      <header>
        <h1>About Us — Aaj Ka Rate</h1>
        <p className="small">Aakhri update: November 2026 · Aaj Ka Rate</p>
        <p><a href="/">← Wapas Rate Board par</a></p>
      </header>
      <main>
        <section className="guide">
          <h2>1. Aaj Ka Rate kya hai?</h2>
          <p>Aaj Ka Rate aam logon ke liye banayi gayi ek simple website hai. Yahan Pakistan ke rozana rates ek jagah milte hain: petrol aur diesel, sona aur chandi, dollar aur currency, karyana, aur Lahore ki sarkari sabzi aur phal ke rates. Sab kuch asan Roman Urdu me, bare saaf haroof me likha hota hai, taake slow internet par bhi site jaldi khul jaye.</p>
          <h2>2. Is site ko kaun chalata hai?</h2>
          <p>Is site ke owner Zohaib Ali Jutt hain. Site unhi ke zariye chalayi aur update ki jati hai.</p>
          <h2>3. Hamara maqsad</h2>
          <p>Hamara maqsad ye hai ke aam aadmi ko rozana rates ke liye idhar udhar bhatakna na pare. Har rate ke samne us ki date likhi hoti hai, taake pata rahe ke rate kis din ka hai. Jis rate ka taza verified source na mile, us par koi number invent nahi kiya jata, wo “Rate aa raha hai…” dikhata hai.</p>
          <h2>4. Rates kahan se aate hain?</h2>
          <p>Petrol aur diesel ke rates OGRA ki notification se, sona aur chandi ke rates Sarafa Association (APSGJA) se, dollar ke rates State Bank aur live exchange rate se, karyana ke rates Pakistan Bureau of Statistics (PBS) se, aur Lahore ki sabzi aur phal ke rates Market Committee ki sarkari list se liye jate hain. Har rate ke sath us ka source bhi dikhaya jata hai.</p>
          <h2>5. Rates kitni dafa update hote hain?</h2>
          <p>Rates rozana update kiye jate hain. Petrol aur diesel ka rate OGRA ki notification aate hi update hota hai, baqi rates un ke source ki nayi list aate hi update hote hain.</p>
          <h2>6. Zaroori baat</h2>
          <p>Site par dikhaye gaye rates sirf maloomat ke liye hain. Khareedne se pehle market me tasdeeq kar len.</p>
          <h2>7. Rabta</h2>
          <p>Koi sawal, rate ki ghalti, ya mashwara ho to ham se rabta karen:<br />Owner: Zohaib Ali Jutt<br />Email: <a href="mailto:umarhayat12963@gmail.com">umarhayat12963@gmail.com</a><br /><a href="/contact">Contact Us page</a></p>
        </section>
      </main>
      <footer>
        <p><a href="/">Aaj Ka Rate</a> · <a href="/articles">Articles</a> · <a href="/contact">Contact Us</a> · <a href="/privacy">Privacy Policy</a> · <a href="/admin">Ads Admin Panel</a></p>
        <p>© 2026 Aaj Ka Rate · Zohaib Ali Jutt — All Rights Reserved</p>
      </footer>
    </>
  );
}
