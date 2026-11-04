// Postgres persistence (Supabase).
//
// The site talks to Postgres ONLY through DATABASE_URL, which comes
// from the environment (Vercel env vars, never GitHub, never chat).
// When DATABASE_URL is unset, or the `pg` package is missing, every
// function here returns null/false and callers fall back to the
// in-memory store, so the site keeps working without a database.
//
// Supabase pooler note: the Vercel env var uses the transaction
// pooler (port 6543). node-postgres uses unnamed statements for
// parameterized queries, which the transaction pooler supports.

type RateRow = { id: string; name: string; category: string; unit: string; price: number | null; source: string; is_sample: boolean };

type PgClient = {
  connect(): Promise<void>;
  query(sql: string, params?: unknown[]): Promise<{ rows: Record<string, unknown>[] }>;
  end(): Promise<void>;
};

type PgModule = { Client: new (cfg: { connectionString: string; ssl?: { rejectUnauthorized: boolean } }) => PgClient };

async function getClient(): Promise<PgClient | null> {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const spec = 'p' + 'g';
    const mod = (await import(spec).catch(() => null)) as unknown as PgModule | null;
    if (!mod?.Client) return null;
    const client = new mod.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
    await client.connect();
    return client;
  } catch {
    return null;
  }
}

export async function pgAvailable(): Promise<boolean> {
  try {
    const spec = 'p' + 'g';
    const mod = (await import(spec).catch(() => null)) as unknown as PgModule | null;
    return !!mod?.Client;
  } catch {
    return false;
  }
}

async function queryRows(sql: string, params: unknown[] = []): Promise<Record<string, unknown>[] | null> {
  const client = await getClient();
  if (!client) return null;
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } catch {
    return null;
  } finally {
    try { await client.end(); } catch {}
  }
}

async function exec(sql: string, params: unknown[] = []): Promise<boolean> {
  const client = await getClient();
  if (!client) return false;
  try {
    await client.query(sql, params);
    return true;
  } catch {
    return false;
  } finally {
    try { await client.end(); } catch {}
  }
}

export async function dbPing(): Promise<boolean> {
  const rows = await queryRows('select 1 as ok');
  return rows !== null;
}

export async function dbTables(): Promise<string[]> {
  const rows = await queryRows(
    "select table_name from information_schema.tables where table_schema = 'public' and table_name in ('rates','ads','ad_settings','admin_credentials','admin_security_questions','admin_sessions','refresh_log') order by table_name",
  );
  if (!rows) return [];
  return rows.map((r) => String(r.table_name));
}

// ---- rates (kept for the refresh route / future use) ----

export async function saveRates(rows: RateRow[]): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;
  const client = await getClient();
  if (!client) return false;
  try {
    for (const r of rows) {
      await client.query(
        `insert into rates (id, name, category, unit, price, source, is_sample, updated_at)
         values ($1,$2,$3,$4,$5,$6,$7,now())
         on conflict (id) do update set price=excluded.price, source=excluded.source, is_sample=excluded.is_sample, updated_at=now()`,
        [r.id, r.name, r.category, r.unit, r.price, r.source, r.is_sample],
      );
    }
    return true;
  } catch {
    return false;
  } finally {
    try { await client.end(); } catch {}
  }
}

export async function loadRates(): Promise<RateRow[] | null> {
  const rows = await queryRows('select id, name, category, unit, price, source, is_sample from rates order by category, id');
  if (!rows) return null;
  return rows.map((r) => ({
    id: String(r.id), name: String(r.name), category: String(r.category), unit: String(r.unit),
    price: r.price === null ? null : Number(r.price), source: String(r.source ?? ''),
    is_sample: r.is_sample === true,
  }));
}

// ---- admin ----

export async function loadAdmin(): Promise<{ username: string; passwordHash: string } | null> {
  const rows = await queryRows('select username, password_hash from admin_credentials where id = 1');
  if (!rows || rows.length === 0) return null;
  return { username: String(rows[0].username), passwordHash: String(rows[0].password_hash) };
}

export async function saveAdmin(username: string, passwordHash: string): Promise<boolean> {
  return exec(
    `insert into admin_credentials (id, username, password_hash) values (1, $1, $2)
     on conflict (id) do update set username = excluded.username, password_hash = excluded.password_hash`,
    [username, passwordHash],
  );
}

// ---- security questions ----

export async function loadSecurity(): Promise<{ question: string; answerHash: string }[] | null> {
  const rows = await queryRows('select question, answer_hash from admin_security_questions order by id');
  if (!rows) return null;
  return rows.map((r) => ({ question: String(r.question), answerHash: String(r.answer_hash) }));
}

export async function saveSecurity(list: { question: string; answerHash: string }[]): Promise<boolean> {
  const client = await getClient();
  if (!client) return false;
  try {
    await client.query('delete from admin_security_questions');
    for (let i = 0; i < list.length; i++) {
      await client.query('insert into admin_security_questions (id, question, answer_hash) values ($1, $2, $3)', [i + 1, list[i].question, list[i].answerHash]);
    }
    return true;
  } catch {
    return false;
  } finally {
    try { await client.end(); } catch {}
  }
}

// ---- sessions ----

export async function loadSessions(): Promise<{ token: string; username: string; expires: number }[] | null> {
  const rows = await queryRows('select token, username, expires_at from admin_sessions');
  if (!rows) return null;
  return rows
    .map((r) => ({ token: String(r.token), username: String(r.username), expires: new Date(String(r.expires_at)).getTime() }))
    .filter((s) => s.expires > Date.now());
}

export async function saveSession(token: string, username: string, expires: number): Promise<boolean> {
  return exec(
    `insert into admin_sessions (token, username, expires_at) values ($1, $2, to_timestamp($3 / 1000.0))
     on conflict (token) do update set username = excluded.username, expires_at = excluded.expires_at`,
    [token, username, expires],
  );
}

export async function deleteSession(token: string): Promise<boolean> {
  return exec('delete from admin_sessions where token = $1', [token]);
}

// ---- ads ----

export type DbAd = {
  id: string; type: string; placement: string; enabled: boolean; title?: string; image?: string;
  link?: string; cta?: string; publisherId?: string; slotId?: string; html?: string; clicks: number;
  startDate?: string; endDate?: string;
};

export async function loadAds(): Promise<DbAd[] | null> {
  const rows = await queryRows('select id, type, placement, enabled, title, image, link, cta, publisher_id, slot_id, html, clicks, start_date, end_date from ads order by created_at');
  if (!rows) return null;
  return rows.map((r) => ({
    id: String(r.id), type: String(r.type), placement: String(r.placement), enabled: r.enabled === true,
    title: r.title ? String(r.title) : undefined, image: r.image ? String(r.image) : undefined,
    link: r.link ? String(r.link) : undefined, cta: r.cta ? String(r.cta) : undefined,
    publisherId: r.publisher_id ? String(r.publisher_id) : undefined, slotId: r.slot_id ? String(r.slot_id) : undefined,
    html: r.html ? String(r.html) : undefined, clicks: Number(r.clicks ?? 0),
    startDate: r.start_date ? String(r.start_date) : undefined, endDate: r.end_date ? String(r.end_date) : undefined,
  }));
}

export async function saveAd(ad: DbAd): Promise<boolean> {
  return exec(
    `insert into ads (id, type, placement, enabled, title, image, link, cta, publisher_id, slot_id, html, clicks, start_date, end_date)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     on conflict (id) do update set type=excluded.type, placement=excluded.placement, enabled=excluded.enabled,
       title=excluded.title, image=excluded.image, link=excluded.link, cta=excluded.cta,
       publisher_id=excluded.publisher_id, slot_id=excluded.slot_id, html=excluded.html, clicks=excluded.clicks,
       start_date=excluded.start_date, end_date=excluded.end_date`,
    [ad.id, ad.type, ad.placement, ad.enabled, ad.title ?? null, ad.image ?? null, ad.link ?? null, ad.cta ?? null,
     ad.publisherId ?? null, ad.slotId ?? null, ad.html ?? null, ad.clicks ?? 0, ad.startDate ?? null, ad.endDate ?? null],
  );
}

export async function deleteAd(id: string): Promise<boolean> {
  return exec('delete from ads where id = $1', [id]);
}

// ---- refresh log ----

export async function logRefresh(note: string): Promise<boolean> {
  return exec('insert into refresh_log (note) values ($1)', [note]);
}

export async function countRows(table: string): Promise<number | null> {
  const allowed = ['ads', 'refresh_log', 'admin_sessions'];
  if (!allowed.includes(table)) return null;
  const rows = await queryRows(`select count(*)::int as n from ${table}`);
  if (!rows || rows.length === 0) return null;
  return Number(rows[0].n);
}
