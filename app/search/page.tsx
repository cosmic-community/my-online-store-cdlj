import { getAllProducts } from '@/lib/cosmic'
import SearchView from '@/components/SearchView'

export const metadata = {
  title: 'Search — Lumière Candle Co.',
}

export default async function SearchPage() {
  const products = await getAllProducts()

  return (
    <div className="container-page py-12">
      <h1 className="font-serif text-4xl font-semibold text-stone-800 text-center mb-8">Search Candles</h1>
      <SearchView products={products} />
    </div>
  )
}