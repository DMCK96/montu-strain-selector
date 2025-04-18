import db from '../db';
import { Product } from '../models/product';

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    title TEXT,
    handle TEXT,
    vendor TEXT,
    product_type TEXT,
    tags TEXT,
    body_html TEXT,
    published_at TEXT,
    created_at TEXT,
    updated_at TEXT
  );
`);

export function insertProduct(p: Product) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO products (
      id, title, handle, vendor, product_type, tags, body_html,
      published_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    p.id, p.title, p.handle, p.vendor, p.product_type,
    JSON.stringify(p.tags), p.body_html,
    p.published_at, p.created_at, p.updated_at
  );
}

export function getProductsWithStatus(): Product[] {
  const stmt = db.prepare(`
    SELECT id, title, handle, vendor, product_type, tags, body_html,
           published_at, created_at, updated_at
    FROM products
  `);

  const products: Product[] = stmt.all() as Product[];
  if (!products) {
    return [];
  }

  return products.map((product) => {
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

  return null; // Default to no status if no matching tag is found
}