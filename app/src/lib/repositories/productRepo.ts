import db from '../db';
import { Product } from '../models/product';

export async function insertProduct(p: Product) {
  await db.query(
    `INSERT INTO products (
      id, title, handle, vendor, product_type, tags, body_html,
      published_at, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      handle = EXCLUDED.handle,
      vendor = EXCLUDED.vendor,
      product_type = EXCLUDED.product_type,
      tags = EXCLUDED.tags,
      body_html = EXCLUDED.body_html,
      published_at = EXCLUDED.published_at,
      created_at = EXCLUDED.created_at,
      updated_at = EXCLUDED.updated_at
    `,
    [
      p.id, p.title, p.handle, p.vendor, p.product_type,
      JSON.stringify(p.tags), p.body_html,
      p.published_at, p.created_at, p.updated_at
    ]
  );
}

export async function getProductsWithStatus(): Promise<Product[]> {
  const { rows } = await db.query(`
    SELECT id, title, handle, vendor, product_type, tags, body_html,
           published_at, created_at, updated_at
    FROM products
  `);

  return rows.map((product) => {
    const tags = Array.isArray(product.tags) ? product.tags : JSON.parse(product.tags || '[]') as string[];
    const status = determineStatus(tags);
    return { ...product, status };
  });
}

function determineStatus(tags: string[]): string | null {
  const statusMapping: Record<string, string> = {
    coming_soon: 'Coming Soon',
    no_new_rqst: 'No New Requests'
  };

  for (const tag of tags) {
    if (statusMapping[tag]) {
      return statusMapping[tag];
    }
  }

  return null;
}