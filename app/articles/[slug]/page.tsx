import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, findArticle } from '../../../lib/articles';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = findArticle(params.slug);
  if (!article) return { title: 'Article nahi mila — Aaj Ka Rate' };
  return { title: `${article.title} — Aaj Ka Rate`, description: article.description };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = findArticle(params.slug);
  if (!article) notFound();
  return (
    <>
      <header>
        <h1>{article.title}</h1>
        <p><a href="/articles">← Sab Articles</a> · <a href="/">Rate Board</a></p>
      </header>
      <main>
        <section className="guide">
          {article.blocks.map((b, i) => {
            if (b.kind === 'p') return <p key={i}>{b.text}</p>;
            if (b.ordered) return <ol key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ol>;
            return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
          })}
        </section>
        <section className="card">
          <p className="small">Aaj ke rate dekhne ke liye <a href="/">Rate Board</a> par jayen. Rate par tap kar ke uski tareekh aur source bhi dekhi ja sakti hai.</p>
        </section>
      </main>
      <footer>
        <p><a href="/">Aaj Ka Rate</a> · <a href="/articles">Articles</a> · <a href="/privacy">Privacy Policy</a></p>
        <p>© 2026 Aaj Ka Rate · Zohaib Ali Jutt — All Rights Reserved</p>
      </footer>
    </>
  );
}
