import { NextResponse } from 'next/server';
import { store, verifyPassword, createSession, SESSION_COOKIE } from '../../../../lib/store';
import { ensureLoaded, saveSessionFor } from '../../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  await ensureLoaded();
  const { username, password } = await req.json();
  const admin = store().admin;
  if (!admin || admin.username !== String(username).trim() || !verifyPassword(String(password), admin.passwordHash)) {
    return NextResponse.json({ ok: false, error: 'Username ya password ghalat hai.' }, { status: 401 });
  }
  const token = createSession(admin.username);
  await saveSessionFor(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 7 * 24 * 3600 });
  return res;
}
