'use client'

import { useState } from 'react'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatPrice, getEffectivePrice, isOnSale, getProductName } from '@/lib/utils'
import StockBadge from '@/components/StockBadge'
import { useCart } from '@/lib/cart-context'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const name = getProductName(product)
  const tagline = getMetafieldValue(product.metadata?.tagline)
  const description = getMetafieldValue(product.metadata?.description)
  const scent = getMetafieldValue(product.metadata?.scent)
  const candleType = getMetafieldValue(product.metadata?.candle_type)
  const burnTime = getMetafieldValue(product.metadata?.burn_time)
  const onSale = isOnSale(product)
  const price = getEffectivePrice(product)
  const originalPrice = product.metadata?.price
  const stockStatus = product.metadata?.stock_status
  const outOfStock = stockStatus === 'Out of Stock'

  const mainImage = product.metadata?.main_image?.imgix_url
  const gallery = product.metadata?.gallery ?? []
  const allImages: string[] = []
  if (mainImage) allImages.push(mainImage)
  gallery.forEach((g) => {
    if (g?.imgix_url) allImages.push(g.imgix_url)
  })

  const [activeImage, setActiveImage] = useState(allImages[0])

  const handleAdd = () => {
    if (outOfStock) return
    addItem(
      {
        id: product.id,
        slug: product.slug,
        title: name,
        price,
        image: mainImage ? `${mainImage}?w=200&h=200&fit=crop&auto=format,compress` : undefined,
      },
      quantity
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <div className="aspect-square rounded-2xl overflow-hidden bg-cream-100 mb-4">
          {activeImage ? (
            <img
              src={`${activeImage}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl">🕯️</div>
          )}
        </div>
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImage === img ? 'border-ember' : 'border-transparent'
                }`}
              >
                <img
                  src={`${img}?w=300&h=300&fit=crop&auto=format,compress`}
                  alt={`${name} view ${i + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <StockBadge status={stockStatus} />
        <h1 className="font-serif text-4xl font-semibold text-stone-800 mt-3 mb-2">{name}</h1>
        {tagline && <p className="text-lg text-stone-500 mb-4">{tagline}</p>}

        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-semibold text-ember">{formatPrice(price)}</span>
          {onSale && typeof originalPrice === 'number' && (
            <span className="text-xl text-stone-400 line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {description && (
          <p className="text-stone-600 leading-relaxed mb-6">{description}</p>
        )}

        <dl className="grid grid-cols-2 gap-4 mb-8 border-t border-cream-200 pt-6">
          {scent && (
            <div>
              <dt className="text-sm text-stone-400">Scent</dt>
              <dd className="font-medium text-stone-700">{scent}</dd>
            </div>
          )}
          {candleType && (
            <div>
              <dt className="text-sm text-stone-400">Type</dt>
              <dd className="font-medium text-stone-700">{candleType}</dd>
            </div>
          )}
          {burnTime && (
            <div>
              <dt className="text-sm text-stone-400">Burn Time</dt>
              <dd className="font-medium text-stone-700">{burnTime}</dd>
            </div>
          )}
        </dl>

        {!outOfStock && (
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-cream-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-stone-600 hover:bg-cream-100 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-4 py-2 font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 text-stone-600 hover:bg-cream-100 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="w-full sm:w-auto bg-ember text-white font-medium px-8 py-3 rounded-lg hover:bg-ember-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {outOfStock ? 'Out of Stock' : added ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}