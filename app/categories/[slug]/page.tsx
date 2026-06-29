// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) {
    return { title: 'Collection Not Found — Lumière Candle Co.' }
  }
  const name = getMetafieldValue(category.metadata?.name) || category.title
  return {
    title: `${name} — Lumière Candle Co.`,
    description: getMetafieldValue(category.metadata?.description) || 'Candle collection.',
    other: {
      'cosmic-context': JSON.stringify({ object_id: category.id, object_type: 'categories' }),
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="container-page py-12">
      <nav className="text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-ember">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-ember">
          Collections
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-700">{name}</span>
      </nav>

      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-semibold text-stone-800">{name}</h1>
        {description && <p className="text-stone-500 mt-2 max-w-2xl mx-auto">{description}</p>}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-stone-500">No candles in this collection yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}