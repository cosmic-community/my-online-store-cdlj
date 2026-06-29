// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getReviewsForProduct } from '@/lib/cosmic'
import { getProductName } from '@/lib/utils'
import ProductDetail from '@/components/ProductDetail'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) {
    return { title: 'Product Not Found — Lumière Candle Co.' }
  }
  return {
    title: `${getProductName(product)} — Lumière Candle Co.`,
    description: product.metadata?.tagline || 'Hand-poured luxury candle.',
    other: {
      'cosmic-context': JSON.stringify({ object_id: product.id, object_type: 'products' }),
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsForProduct(product.id)

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0

  return (
    <div className="container-page py-12">
      <nav className="text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-ember">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-ember">
          Candles
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-700">{getProductName(product)}</span>
      </nav>

      <ProductDetail product={product} />

      {/* Reviews */}
      <section className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-semibold text-stone-800">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} />
              <span className="text-stone-500 text-sm">
                {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="text-stone-500">No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}