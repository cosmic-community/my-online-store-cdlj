import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
  title: 'Collections — Lumière Candle Co.',
  description: 'Browse our candle collections by theme and mood.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="container-page py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-semibold text-stone-800">Collections</h1>
        <p className="text-stone-500 mt-2">Discover candles grouped by mood and moment.</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 text-stone-500">No collections available yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}