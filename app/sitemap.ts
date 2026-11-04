import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://aaj-ka-rate.vercel.app';
  // Only the public home page is submitted for indexing.
  // /admin is the owner-only panel and must not be indexed.
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
  ];
}
