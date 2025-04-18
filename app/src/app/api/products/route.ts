import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const result = await db.query(`
    SELECT 
      p.id, p.title, p.vendor, p.product_type, p.tags,
      v.price, v.grams, i.src AS image, v.available, p.body_html
    FROM products p
    LEFT JOIN variants v ON v.product_id = p.id
    LEFT JOIN images i ON i.product_id = p.id
    WHERE p.product_type != 'Accessory'
    GROUP BY p.id, v.price, v.grams, i.src, v.available, p.body_html
    ORDER BY p.title ASC
  `);

  return NextResponse.json(result.rows);
}