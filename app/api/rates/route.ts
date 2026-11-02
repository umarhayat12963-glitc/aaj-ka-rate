import { NextResponse } from 'next/server';
import { CATEGORIES } from '../../../lib/data';
import { getSeason } from '../../../lib/season';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({ categories: CATEGORIES, season: getSeason(), lastRefresh: new Date().toISOString(), note: 'Sample rates labelled as sample until live refresh replaces them.' });
}
