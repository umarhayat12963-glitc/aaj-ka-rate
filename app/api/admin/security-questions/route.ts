import { NextResponse } from 'next/server';
import { store, sessionFromCookie, hashSecret } from '../../../../lib/store';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const user = sessionFromCookie(req.headers.get('cookie'));
  if (!user) return NextResponse.json({ ok: false, error: 'Pehle login karen.' }, { status: 401 });
  return NextResponse.json({ questions: (store().securityQuestions || []).map((q) => ({ question: q.question })) });
}
export async function POST(req: Request) {
  const user = sessionFromCookie(req.headers.get('cookie'));
  if (!user) return NextResponse.json({ ok: false, error: 'Pehle login karen.' }, { status: 401 });
  const { questions } = await req.json();
  if (!Array.isArray(questions) || questions.length !== 3 || questions.some((q: { question?: string; answer?: string }) => !q.question || !q.answer)) {
    return NextResponse.json({ ok: false, error: 'Teeno sawal aur jawab likhen.' }, { status: 400 });
  }
  store().securityQuestions = questions.map((q: { question: string; answer: string }) => ({ question: q.question, answerHash: hashSecret(q.answer) }));
  return NextResponse.json({ ok: true });
}
