import ProductTable from '@/components/ProductTable';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">Montu Product List</h1>
      </header>
      <section className="p-6 table-wrapper">
        <ProductTable />
      </section>
    </main>
  );
}