import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export type Ad = {
  id: string; type: 'adsense' | 'banner' | 'html'; placement: 'top' | 'hero' | 'middle' | 'bottom';
  enabled: boolean; title?: string; image?: string; link?: string; cta?: string;
  publisherId?: string; slotId?: string; html?: string; clicks: number; startDate?: string; endDate?: string;
};

type Store = {
  admin: { username: string; passwordHash: string } | null;
  securityQuestions: { question: string; answerHash: string }[] | null;
  sessions: Map<string, { username: string; expires: number }>;
  ads: Ad[];
  refreshLog: { at: string; note: string }[];
};

// In-memory fallback ONLY. Production must wire Supabase (see
// supabase/schema.sql) — in-memory state resets on redeploy/restart.
// No default credentials are ever created here.
const g = globalThis as unknown as { __aajStore?: Store };
if (!g.__aajStore) {
  g.__aajStore = { admin: null, securityQuestions: null, sessions: new Map(), ads: [], refreshLog: [] };
}
export function store(): Store { return g.__aajStore!; }

export function hashSecret(value: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(value.trim().toLowerCase(), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
export function verifySecret(value: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':');
    const test = scryptSync(value.trim().toLowerCase(), salt, 64);
    const expected = Buffer.from(hash, 'hex');
    return test.length === expected.length && timingSafeEqual(test, expected);
  } catch { return false; }
}
// Passwords are case-sensitive: use a separate exact verifier.
export function hashPassword(value: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(value, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
export function verifyPassword(value: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':');
    const test = scryptSync(value, salt, 64);
    const expected = Buffer.from(hash, 'hex');
    return test.length === expected.length && timingSafeEqual(test, expected);
  } catch { return false; }
}
export function createSession(username: string): string {
  const token = randomBytes(32).toString('hex');
  store().sessions.set(token, { username, expires: Date.now() + 7 * 24 * 3600 * 1000 });
  return token;
}
export function verifySession(token: string | undefined | null): string | null {
  if (!token) return null;
  const s = store().sessions.get(token);
  if (!s || s.expires < Date.now()) { if (token) store().sessions.delete(token); return null; }
  return s.username;
}
export function sessionFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(/(?:^|;\s*)aaj_admin_session=([^;]+)/);
  return verifySession(m ? decodeURIComponent(m[1]) : null);
}
export const SESSION_COOKIE = 'aaj_admin_session';
