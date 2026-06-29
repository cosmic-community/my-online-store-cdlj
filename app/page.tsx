import Link from 'next/link'
import { getFeaturedProducts, getAllCategories, getAllProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'

export default async function HomePage() {
  const [featuredRaw, categories, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllCategories(),
    getAllProducts(),
  ])

  const featured = featuredRaw.length > 0 ? featuredRaw : allProducts.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 to-cream-200">
        <div className="container-page py-20 lg:py-28 text-center">
          <p className="text-ember font-medium tracking-widest uppercase text-sm mb-4">
            Hand-Poured · Small Batch
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-semibold text-stone-800 mb-6 leading-tight">
            Light the moment.
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
            Luxury candles crafted with natural waxes and fine fragrances to bring warmth and calm into every room.
          </p>
          <Link
            href="/products"
            className="inline-block bg-ember text-white font-medium px-8 py-3.5 rounded-full hover:bg-ember-dark transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container-page py-16">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-800">Explore Collections</h2>
            <p className="text-stone-500 mt-2">Find the scent that suits your space.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container-page py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-800">Featured Candles</h2>
              <p className="text-stone-500 mt-2">Our most-loved scents.</p>
            </div>
            <Link href="/products" className="text-ember font-medium hover:underline whitespace-nowrap">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Story */}
      <section className="bg-ember-dark text-cream-100 py-20">
        <div className="container-page text-center max-w-3xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">Crafted with care</h2>
          <p className="text-cream-200/90 leading-relaxed text-lg">
            Each Lumière candle is poured by hand in small batches. We use clean-burning natural waxes and
            thoughtfully blended fragrances so you can relax knowing every detail was made with intention.
          </p>
        </div>
      </section>
    </div>
  )
}