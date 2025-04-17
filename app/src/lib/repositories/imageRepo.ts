import db from '../db';
import { ProductImage } from '../models/image';

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    src TEXT,
    width INTEGER,
    height INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

export function insertImage(image: ProductImage, productId: number) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO images (
      id, product_id, src, width, height
    ) VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(image.id, productId, image.src, image.width, image.height);
}

export function deleteImagesForProduct(productId: number) {
  db.prepare('DELETE FROM images WHERE product_id = ?').run(productId);
}
