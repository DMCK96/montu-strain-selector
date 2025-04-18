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

  const tx = db.transaction(() => {
    for (const product of products) {
      insertProduct(product);

      deleteVariantsForProduct(product.id);
      for (const variant of product.variants) {
        insertVariant(variant);
      }

      deleteImagesForProduct(product.id);
      for (const image of product.images) {
        insertImage(image, product.id);
      }
    }
  });

  tx();

  // Log the last sync timestamp
  db.prepare('INSERT INTO last_sync (timestamp) VALUES (CURRENT_TIMESTAMP)').run();
}
