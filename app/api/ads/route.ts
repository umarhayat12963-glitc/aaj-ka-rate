import { NextResponse } from 'next/server';
import { store, sessionFromCookie } from '../../../lib/store';
import { ensureLoaded, saveAdFromStore, deleteAdFromStore } from '../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  await ensureLoaded();
  const user = sessionFromCookie(req.headers.get('cookie'));
  // Admin (logged in) sees all ads, including disabled ones, so they
  // can be edited/deleted. Visitors see only enabled ads.
  const ads = user ? store().ads : store().ads.filter((a) => a.enabled);
  return NextResponse.json({ ads, placements: ['top', 'hero', 'middle', 'bottom'] });
}
export async function POST(req: Request) {
  await ensureLoaded();
  const user = sessionFromCookie(req.headers.get('cookie'));
  if (!user) return NextResponse.json({ ok: false, error: 'Pehle login karen.' }, { status: 401 });
  const body = await req.json();
  const ad = { id: `${Date.now()}`, clicks: 0, enabled: body.enabled !== false, ...body };
  store().ads.push(ad);
  await saveAdFromStore(ad);
  return NextResponse.json({ ok: true, ad });
}
export async function DELETE(req: Request) {
  await ensureLoaded();
  const user = sessionFromCookie(req.headers.get('cookie'));
  if (!user) return NextResponse.json({ ok: false, error: 'Pehle login karen.' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  store().ads = store().ads.filter((a) => a.id !== id);
  if (id) await deleteAdFromStore(id);
  return NextResponse.json({ ok: true });
}
