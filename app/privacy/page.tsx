import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Aaj Ka Rate Pakistan',
  description: 'Aaj Ka Rate ki Privacy Policy: hum kya data lete hain, cookies kaise kaam karti hain, aur AdSense ke baare me.',
};

export default function PrivacyPage() {
  return (
    <>
      <header>
        <h1>Privacy Policy</h1>
        <p className="small">Aakhri update: November 2026 · Aaj Ka Rate</p>
        <p><a href="/">← Wapas Rate Board par</a></p>
      </header>
      <main>
        <section className="guide">
          <h2>1. Hum kya data lete hain?</h2>
          <p>Visitors se hum koi personal data nahi mangte. Site par visitors ke liye koi account, sign-up ya login nahi hai, aur hum visitors ka naam, email, phone number ya address save nahi karte.</p>
          <p>Sirf site ke owner ke liye ek admin login hai. Admin ka username aur password hashed form me save hota hai, matlab asal password kabhi saaf lafzon me save nahi hota. Admin ke security sawalon ke jawab bhi hashed form me save hote hain.</p>
          <h2>2. Cookies kya hain aur yahan kaise kaam karti hain?</h2>
          <p>Site khud visitors ko track karne ke liye koi tracking cookie nahi lagati. Sirf admin login ke liye ek session cookie lagti hai, jo sirf owner ke login ko yaad rakhti hai aur httpOnly hoti hai.</p>
          <p>Agar site par Google AdSense ya kisi aur ad network ke ads lagenge, to wo ad networks apni policy ke mutabiq cookies use kar sakte hain, taake ads dikhaye ja saken. Third-party vendors, jin me Google bhi shamil hai, cookies ka istemal kar ke users ke is site ya doosri sites par pehle ke visits ki bunyad par ads dikhate hain.</p>
          <p>Google ke advertising cookies ke baare me mazeed maloomat Google ki Privacy Policy me hai, aur users Google Ads Settings se personalized ads ko band kar sakte hain. Users aboutads.info par ja kar bhi third-party vendors ke cookies se opt-out kar sakte hain.</p>
          <p>Google ki Privacy Policy: <a href="https://policies.google.com/privacy">policies.google.com/privacy</a><br />Google Ads Settings: <a href="https://adssettings.google.com">adssettings.google.com</a></p>
          <h2>3. Rates aur maloomat</h2>
          <p>Site par dikhaye gaye rates sirf maloomat ke liye hain. Har rate ke sath uski tareekh aur source dikhaya jata hai. Jis rate ka taza verified source na mile, us par koi number invent nahi kiya jata, wo “Rate aa raha hai…” dikhata hai. Khareedne se pehle market me tasdeeq kar len.</p>
          <h2>4. Doosri sites ke links</h2>
          <p>Site par kabhi kabhi doosri sites ke links ho sakte hain, jaise Google ki policy pages. Un sites ki apni privacy policy hoti hai, hum un ke data ke zimmedar nahi hain.</p>
          <h2>5. Is policy me tabdeeli</h2>
          <p>Agar is Privacy Policy me koi tabdeeli hogi, to ye page update kar diya jayega. Nayi policy isi page par nazar aayegi.</p>
          <h2>6. Rabta</h2>
          <p>Privacy ke baare me koi sawal ho to owner se rabta karen:<br />Owner: Zohaib Ali Jutt<br />Email: <a href="mailto:umarhayat12963@gmail.com">umarhayat12963@gmail.com</a></p>
        </section>
      </main>
      <footer>
        <p><a href="/">Aaj Ka Rate</a> · <a href="/articles">Articles</a> · <a href="/admin">Ads Admin Panel</a></p>
        <p>© 2026 Aaj Ka Rate · Zohaib Ali Jutt — All Rights Reserved</p>
      </footer>
    </>
  );
}
