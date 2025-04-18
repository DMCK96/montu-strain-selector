import db from '../db';
import { ProductVariant } from '../models/variant';

export async function insertVariant(v: ProductVariant) {
  await db.query(
    `INSERT INTO variants (
      id, product_id, title, sku, price, grams, available
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE SET
      product_id = EXCLUDED.product_id,
      title = EXCLUDED.title,
      sku = EXCLUDED.sku,
      price = EXCLUDED.price,
      grams = EXCLUDED.grams,
      available = EXCLUDED.available
    `,
    [
      v.id,
      v.product_id,
      v.title,
      v.sku,
      v.price,
      v.grams,
      v.available ? true : false
    ]
  );
}

export async function deleteVariantsForProduct(productId: number) {
  await db.query('DELETE FROM variants WHERE product_id = $1', [productId]);
}