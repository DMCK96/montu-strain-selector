import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const result = await db.query('SELECT timestamp FROM last_sync ORDER BY id DESC LIMIT 1');
    const row = result.rows[0];
    return NextResponse.json({ lastSync: row?.timestamp || null });
  } catch (error) {
    console.error('Failed to fetch last sync timestamp:', error);
    return NextResponse.json({ error: 'Failed to fetch last sync timestamp' }, { status: 500 });
  }
}