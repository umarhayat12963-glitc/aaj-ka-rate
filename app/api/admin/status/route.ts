import { NextResponse } from 'next/server';
import { store, sessionFromCookie } from '../../../../lib/store';
import { ensureLoaded } from '../../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  await ensureLoaded();
  const user = sessionFromCookie(req.headers.get('cookie'));
  return NextResponse.json({ hasAccount: !!store().admin, authenticated: !!user, username: user || store().admin?.username || null });
}
