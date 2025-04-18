'use client';

import { useState } from 'react';
import ProductTable from '@/components/ProductTable';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<{
    body_html: string;
    image: string;
  } | null>(null);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">Montu Product List</h1>
      </header>
      <section className="p-6 flex gap-6 min-h-screen">
        {/* Left Column: Product Table */}
        <div className="w-2/3">
          <ProductTable onProductSelect={(product) => setSelectedProduct(product)} />
        </div>

        {/* Right Column: Product Details */}
        <div className="w-1/3 bg-gray-800 p-4 rounded-md shadow-md">
          {selectedProduct ? (
            <>
              <div
                className="text-gray-100 mb-4"
                dangerouslySetInnerHTML={{ __html: selectedProduct.body_html }}
              />
              <img
                src={selectedProduct.image}
                alt="Product"
                className="w-full h-auto rounded-md"
              />
            </>
          ) : (
            <p className="text-gray-400">Select a product to view details</p>
          )}
        </div>
      </section>
    </main>
  );
}