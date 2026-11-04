import { NextResponse } from 'next/server';
import { store, SESSION_COOKIE } from '../../../../lib/store';
import { ensureLoaded, deleteSessionFromStore } from '../../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  await ensureLoaded();
  const m = req.headers.get('cookie')?.match(/(?:^|;\s*)aaj_admin_session=([^;]+)/);
  if (m) { store().sessions.delete(decodeURIComponent(m[1])); await deleteSessionFromStore(decodeURIComponent(m[1])); }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
