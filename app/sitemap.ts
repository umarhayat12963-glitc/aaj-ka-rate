import type { MetadataRoute } from 'next';
import { ARTICLES } from '../lib/articles';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://aaj-ka-rate.vercel.app';
  // Public pages only. /admin is the owner-only panel and must not
  // be indexed, and /api/ is disallowed in robots.
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/articles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...ARTICLES.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
