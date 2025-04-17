import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const rows = db.prepare('SELECT * FROM data').all();
  return NextResponse.json(rows);
}
 