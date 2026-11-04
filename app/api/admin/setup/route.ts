import { NextResponse } from 'next/server';
import { store, hashPassword, createSession, SESSION_COOKIE } from '../../../../lib/store';
import { ensureLoaded, saveAdminFromStore, saveSessionFor } from '../../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  await ensureLoaded();
  if (store().admin) return NextResponse.json({ ok: false, error: 'Account pehle se bana hua hai. Login karen.' }, { status: 400 });
  const { username, password } = await req.json();
  if (!username || !password || password.length < 6) return NextResponse.json({ ok: false, error: 'Username aur kam az kam 6 haroof ka password likhen.' }, { status: 400 });
  const newUsername = String(username).trim();
  store().admin = { username: newUsername, passwordHash: hashPassword(String(password)) };
  const token = createSession(newUsername);
  await saveAdminFromStore();
  await saveSessionFor(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 7 * 24 * 3600 });
  return res;
}
