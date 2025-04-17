import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const products = db.prepare(`
    SELECT 
      p.id, p.title, p.vendor, p.product_type, p.tags,
      v.price, v.grams, i.src AS image, v.available
    FROM products p
    LEFT JOIN variants v ON v.product_id = p.id
    LEFT JOIN images i ON i.product_id = p.id
    GROUP BY p.id
    ORDER BY p.title ASC
  `).all();

  return NextResponse.json(products);
}
