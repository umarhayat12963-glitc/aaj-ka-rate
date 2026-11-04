import { NextResponse } from 'next/server';
import { store, sessionFromCookie, verifyPassword, hashPassword } from '../../../../lib/store';
import { ensureLoaded, saveAdminFromStore } from '../../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  await ensureLoaded();
  const user = sessionFromCookie(req.headers.get('cookie'));
  if (!user || !store().admin) return NextResponse.json({ ok: false, error: 'Pehle login karen.' }, { status: 401 });
  const { newUsername, currentPassword, newPassword } = await req.json();
  const admin = store().admin!;
  if (!verifyPassword(String(currentPassword), admin.passwordHash)) return NextResponse.json({ ok: false, error: 'Current password ghalat hai.' }, { status: 400 });
  if (!newPassword || String(newPassword).length < 6) return NextResponse.json({ ok: false, error: 'Naya password kam az kam 6 haroof ka ho.' }, { status: 400 });
  store().admin = { username: newUsername ? String(newUsername).trim() : admin.username, passwordHash: hashPassword(String(newPassword)) };
  await saveAdminFromStore();
  return NextResponse.json({ ok: true });
}
