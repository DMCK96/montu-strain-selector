import axios from 'axios';
import db from './db';

import { Product } from './models/product';
import { insertProduct } from './repositories/productRepo';
import { insertVariant, deleteVariantsForProduct } from './repositories/variantRepo';
import { insertImage, deleteImagesForProduct } from './repositories/imageRepo';

const DATA_URL = process.env.DATA_URL;

export async function syncData() {
  if (typeof DATA_URL !== 'string' || DATA_URL.trim() === '') {
    throw new Error('DATA_URL is not defined or is invalid. Please check your environment variables.');
  }

  const res = await axios.get(DATA_URL);
  const products: Product[] = res.data.products;

  const client = await db.connect();
  try {
    await client.query('BEGIN');
    for (const product of products) {
      await insertProduct(product);

      await deleteVariantsForProduct(product.id);
      for (const variant of product.variants) {
        await insertVariant(variant);
      }

      await deleteImagesForProduct(product.id);
      for (const image of product.images) {
        await insertImage(image, product.id);
      }
    }
    await client.query('INSERT INTO last_sync (timestamp) VALUES (CURRENT_TIMESTAMP)');
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}