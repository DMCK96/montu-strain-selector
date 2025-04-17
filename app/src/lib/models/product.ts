import { ProductImage } from './image';
import { ProductVariant } from './variant';

export interface Product {
  id: number;
  title: string;
  handle: string;
  vendor: string;
  product_type: string;
  tags: string[];
  published_at: string;
  created_at: string;
  updated_at: string;
  body_html: string;
  images: ProductImage[];
  variants: ProductVariant[];
}
