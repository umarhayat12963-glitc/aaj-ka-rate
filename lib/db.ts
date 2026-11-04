// Postgres persistence interface (Supabase).
//
// Until a Supabase project exists and DATABASE_URL is set in
// Vercel, this returns null and callers use the in-memory store
// + the sourced seed in lib/real-rates.ts. No secret is ever
// hard-coded here; DATABASE_URL comes only from the environment
// (Vercel env vars, never GitHub).
//
// When DATABASE_URL is set, this tries a dynamic `pg` import.
// `pg` is an optional runtime dependency: if it is not installed,
// save/load fall back to null instead of crashing the build.
// To enable real persistence, add `pg` to dependencies and set
// DATABASE_URL in Vercel, then run supabase/schema.sql in the
// Supabase SQL Editor.

type RateRow = { id: string; name: string; category: string; unit: string; price: number | null; source: string; is_sample: boolean };

export async function saveRates(rows: RateRow[]): Promise<boolean> {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  try {
    const spec = 'p' + 'g';
    const mod = await import(spec).catch(() => null) as unknown as { Client?: new (cfg: { connectionString: string; ssl?: { rejectUnauthorized: boolean } }) => { connect(): Promise<void>; query(sql: string, params: unknown[]): Promise<unknown>; end(): Promise<void> } } | null;
    if (!mod?.Client) return false;
    const client = new mod.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
    await client.connect();
    for (const r of rows) {
      await client.query(
        `insert into rates (id, name, category, unit, price, source, is_sample, updated_at)
         values ($1,$2,$3,$4,$5,$6,$7,now())
         on conflict (id) do update set price=excluded.price, source=excluded.source, is_sample=excluded.is_sample, updated_at=now()`,
        [r.id, r.name, r.category, r.unit, r.price, r.source, r.is_sample],
      );
    }
    await client.end();
    return true;
  } catch {
    return false;
  }
}

export async function loadRates(): Promise<RateRow[] | null> {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const spec = 'p' + 'g';
    const mod = await import(spec).catch(() => null) as unknown as { Client?: new (cfg: { connectionString: string; ssl?: { rejectUnauthorized: boolean } }) => { connect(): Promise<void>; query(sql: string): Promise<{ rows: RateRow[] }>; end(): Promise<void> } } | null;
    if (!mod?.Client) return null;
    const client = new mod.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
    await client.connect();
    const res = await client.query('select id, name, category, unit, price, source, is_sample from rates order by category, id');
    await client.end();
    return res.rows;
  } catch {
    return null;
  }
}
