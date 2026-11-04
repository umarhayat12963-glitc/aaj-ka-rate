// Sync between the in-memory store and Supabase (when DATABASE_URL
// is set). Design: the in-memory store stays the working copy so
// existing routes keep working unchanged when the database is
// unreachable. On the first request of a server instance, the
// stored state is loaded from the database into memory; every
// mutation below then writes through to the database as well.
// All database calls are best-effort: a failure never fails the
// user's request, it only means that instance keeps working
// in-memory until the next cold start / redeploy.

import { store } from './store';
import * as db from './db';

let loaded = false;
let loading: Promise<void> | null = null;

export async function ensureLoaded(): Promise<void> {
  if (loaded || !process.env.DATABASE_URL) return;
  if (loading) { await loading; return; }
  loading = (async () => {
    try {
      const [admin, security, ads, sessions] = await Promise.all([
        db.loadAdmin(), db.loadSecurity(), db.loadAds(), db.loadSessions(),
      ]);
      // If every load returned null the database is unreachable;
      // keep the in-memory state as-is.
      if (admin === null && security === null && ads === null && sessions === null) return;
      if (admin) store().admin = admin;
      if (security && security.length === 3) store().securityQuestions = security;
      if (ads) store().ads = ads.map((a) => ({ ...a, type: a.type as 'adsense' | 'banner' | 'html', placement: a.placement as 'top' | 'hero' | 'middle' | 'bottom' }));
      if (sessions) {
        store().sessions.clear();
        for (const s of sessions) store().sessions.set(s.token, { username: s.username, expires: s.expires });
      }
    } catch {
      // Best effort only; in-memory state stays usable.
    } finally {
      loaded = true;
    }
  })();
  await loading;
}

export async function saveAdminFromStore(): Promise<void> {
  const admin = store().admin;
  if (!admin || !process.env.DATABASE_URL) return;
  try { await db.saveAdmin(admin.username, admin.passwordHash); } catch {}
}

export async function saveSecurityFromStore(): Promise<void> {
  const qs = store().securityQuestions;
  if (!qs || !process.env.DATABASE_URL) return;
  try { await db.saveSecurity(qs); } catch {}
}

export async function saveAdFromStore(ad: Parameters<typeof db.saveAd>[0]): Promise<void> {
  if (!process.env.DATABASE_URL) return;
  try { await db.saveAd(ad); } catch {}
}

export async function deleteAdFromStore(id: string): Promise<void> {
  if (!process.env.DATABASE_URL) return;
  try { await db.deleteAd(id); } catch {}
}

export async function saveSessionFor(token: string): Promise<void> {
  if (!process.env.DATABASE_URL) return;
  const s = store().sessions.get(token);
  if (!s) return;
  try { await db.saveSession(token, s.username, s.expires); } catch {}
}

export async function deleteSessionFromStore(token: string): Promise<void> {
  if (!process.env.DATABASE_URL) return;
  try { await db.deleteSession(token); } catch {}
}

export async function logRefreshToDb(note: string): Promise<void> {
  if (!process.env.DATABASE_URL) return;
  try { await db.logRefresh(note); } catch {}
}
