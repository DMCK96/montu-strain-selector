import { NextResponse } from 'next/server';
import { syncData } from '@/lib/sync';

export async function POST() {
  try {
    await syncData();
    return NextResponse.json({ message: 'Sync completed successfully' });
  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Failed to sync data' }, { status: 500 });
  }
}