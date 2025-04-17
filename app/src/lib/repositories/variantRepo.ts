import db from '../db';
import { ProductVariant } from '../models/variant';

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS variants (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    title TEXT,
    sku TEXT,
    price TEXT,
    grams INTEGER,
    available INTEGER DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

export function insertVariant(v: ProductVariant) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO variants (
      id, product_id, title, sku, price, grams, available
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(v.id, v.product_id, v.title, v.sku, v.price, v.grams, v.available ? 1 : 0);
}

export function deleteVariantsForProduct(productId: number) {
  db.prepare('DELETE FROM variants WHERE product_id = ?').run(productId);
}
