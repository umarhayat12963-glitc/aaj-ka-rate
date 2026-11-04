import { NextResponse } from 'next/server';
import { dbPing, dbTables, pgAvailable, countRows, loadAdmin } from '../../../lib/db';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Public health check for the database connection. It reports only
// booleans and counts — never connection strings, passwords, hashes
// or any stored user data.
export async function GET() {
  const databaseUrlSet = !!process.env.DATABASE_URL;
  if (!databaseUrlSet) {
    return NextResponse.json({ databaseUrlSet: false, pgAvailable: await pgAvailable(), reachable: false, tables: [], hasAdmin: false, adCount: null, refreshLogCount: null, mode: 'in-memory' });
  }
  const [reachable, tables, admin] = await Promise.all([dbPing(), dbTables(), loadAdmin()]);
  const [adCount, refreshLogCount] = reachable
    ? await Promise.all([countRows('ads'), countRows('refresh_log')])
    : [null, null];
  return NextResponse.json({
    databaseUrlSet: true,
    pgAvailable: await pgAvailable(),
    reachable,
    tables,
    hasAdmin: !!admin,
    adCount,
    refreshLogCount,
    mode: reachable ? 'supabase' : 'in-memory (database unreachable)',
  });
}
