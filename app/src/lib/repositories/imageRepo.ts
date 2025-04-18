import db from '../db';
import { ProductImage } from '../models/image';

export async function insertImage(image: ProductImage, productId: number) {
  await db.query(
    `INSERT INTO images (id, product_id, src, width, height)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE SET
       product_id = EXCLUDED.product_id,
       src = EXCLUDED.src,
       width = EXCLUDED.width,
       height = EXCLUDED.height`,
    [image.id, productId, image.src, image.width, image.height]
  );
}

export async function deleteImagesForProduct(productId: number) {
  await db.query('DELETE FROM images WHERE product_id = $1', [productId]);
}