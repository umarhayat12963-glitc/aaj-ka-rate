import { NextResponse } from 'next/server';
import { store, verifySecret, hashPassword } from '../../../../lib/store';
import { ensureLoaded, saveAdminFromStore } from '../../../../lib/persist';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// NO direct owner-reset bypass here. Forgot password works ONLY
// through the 3 security questions set inside the panel.
export async function GET() {
  await ensureLoaded();
  const qs = store().securityQuestions;
  if (!qs || qs.length !== 3) return NextResponse.json({ ok: false, error: 'Security sawal set nahi hain. Pehle login kar ke panel me set karen.' }, { status: 400 });
  return NextResponse.json({ questions: qs.map((q) => q.question) });
}
export async function POST(req: Request) {
  await ensureLoaded();
  const qs = store().securityQuestions;
  if (!qs || qs.length !== 3 || !store().admin) return NextResponse.json({ ok: false, error: 'Security sawal set nahi hain.' }, { status: 400 });
  const { answers, newPassword } = await req.json();
  if (!Array.isArray(answers) || answers.length !== 3 || !answers.every((a: string, i: number) => verifySecret(String(a), qs[i].answerHash))) {
    return NextResponse.json({ ok: false, error: 'Koi jawab ghalat hai. Dobara koshish karen.' }, { status: 400 });
  }
  if (!newPassword || String(newPassword).length < 6) return NextResponse.json({ ok: false, error: 'Naya password kam az kam 6 haroof ka ho.' }, { status: 400 });
  store().admin!.passwordHash = hashPassword(String(newPassword));
  await saveAdminFromStore();
  return NextResponse.json({ ok: true });
}
