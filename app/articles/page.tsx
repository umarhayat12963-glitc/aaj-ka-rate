import type { Metadata } from 'next';
import { ARTICLES } from '../../lib/articles';

export const metadata: Metadata = {
  title: 'Articles — Aaj Ka Rate Pakistan',
  description: 'Aaj Ka Rate ke articles: petrol, dollar, Lahore sabzi/phal, sona aur grocery bachat, asan Roman Urdu me.',
};

export default function ArticlesPage() {
  return (
    <>
      <header>
        <h1>Articles</h1>
        <p className="small">Aasan Roman Urdu me, aam logon ke liye.</p>
        <p><a href="/">← Wapas Rate Board par</a></p>
      </header>
      <main>
        {ARTICLES.map((a) => (
          <section className="card" key={a.slug}>
            <h2><a href={`/articles/${a.slug}`}>{a.title}</a></h2>
            <p>{a.description}</p>
            <p><a href={`/articles/${a.slug}`}>Poora article parhen →</a></p>
          </section>
        ))}
      </main>
      <footer>
        <p><a href="/">Aaj Ka Rate</a> · <a href="/privacy">Privacy Policy</a> · <a href="/admin">Ads Admin Panel</a></p>
        <p>© 2026 Aaj Ka Rate · Zohaib Ali Jutt — All Rights Reserved</p>
      </footer>
    </>
  );
}
