import { getAllProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'

export const metadata = {
  title: 'All Candles — Lumière Candle Co.',
  description: 'Browse our full collection of hand-poured luxury candles.',
}

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container-page py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-semibold text-stone-800">All Candles</h1>
        <p className="text-stone-500 mt-2">Filter and sort to find your perfect scent.</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-stone-500">No candles available yet.</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  )
}