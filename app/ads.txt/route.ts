// Serves /ads.txt for AdSense authorization.
// The publisher ID comes only from NEXT_PUBLIC_ADSENSE_CLIENT_ID
// (set in Vercel env vars) and is never hard-coded in the repo.
// AdSense ads.txt format uses "pub-..." (without the "ca-" prefix
// used in the adsbygoogle script tag), so the prefix is stripped.
export const dynamic = 'force-dynamic';

export async function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
  const pubId = client.replace(/^ca-/, '');
  const body = pubId
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : '# ads.txt not configured\n';
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
