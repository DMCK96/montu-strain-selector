import axios from 'axios';
import db from './db';

import { Product } from './models/product';
import { insertProduct } from './repositories/productRepo';
import { insertVariant, deleteVariantsForProduct } from './repositories/variantRepo';
import { insertImage, deleteImagesForProduct } from './repositories/imageRepo';

const DATA_URL = 'https://store.montu.uk/products.json?limit=2500';

export async function syncData() {
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
}
