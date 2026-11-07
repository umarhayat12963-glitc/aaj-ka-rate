import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Aaj Ka Rate Pakistan',
  description: 'Aaj Ka Rate se rabta karen: rate ki ghalti, mashwara, ya koi sawal ho to owner ko email karen.',
};

export default function ContactPage() {
  return (
    <>
      <header>
        <h1>Contact Us — Rabta Karo</h1>
        <p className="small">Aaj Ka Rate · Zohaib Ali Jutt</p>
        <p><a href="/">← Wapas Rate Board par</a></p>
      </header>
      <main>
        <section className="guide">
          <h2>Ham se rabta kaise karen?</h2>
          <p>Ham se rabta email ke zariye karen:</p>
          <p>Owner: Zohaib Ali Jutt<br />Email: <a href="mailto:umarhayat12963@gmail.com">umarhayat12963@gmail.com</a></p>
          <h2>Kis baare me likh sakte hain?</h2>
          <p>— Kisi rate me ghalti nazar aaye to batayen<br />— Site ke baare me koi mashwara ya naya idea ho<br />— Site khulne ya dikhne me koi masla ho<br />— Advertisement ya business ke baare me baat karni ho</p>
          <h2>Jawab kab milega?</h2>
          <p>Har email ka jawab dene ki koshish ki jati hai, lekin jawab aane me aik do din lag sakte hain. Apne email me apna naam aur apne sawal ki tafseel zaroor likhen, taake sahi jawab diya ja sake.</p>
          <h2>Zaroori baat</h2>
          <p>Site par visitors ke liye koi account ya login nahi hai, aur ham visitors se phone number ya koi aur personal maloomat nahi mangte. Rabta sirf email ke zariye hai.</p>
        </section>
      </main>
      <footer>
        <p><a href="/">Aaj Ka Rate</a> · <a href="/articles">Articles</a> · <a href="/about">About Us</a> · <a href="/privacy">Privacy Policy</a> · <a href="/admin">Ads Admin Panel</a></p>
        <p>© 2026 Aaj Ka Rate · Zohaib Ali Jutt — All Rights Reserved</p>
      </footer>
    </>
  );
}
