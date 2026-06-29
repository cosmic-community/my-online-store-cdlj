'use client'

import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatPrice, getEffectivePrice, isOnSale, getProductName, getProductImage } from '@/lib/utils'
import StockBadge from '@/components/StockBadge'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const name = getProductName(product)
  const tagline = getMetafieldValue(product.metadata?.tagline)
  const image = getProductImage(product, 700, 700)
  const onSale = isOnSale(product)
  const price = getEffectivePrice(product)
  const originalPrice = product.metadata?.price
  const stockStatus = product.metadata?.stock_status
  const outOfStock = stockStatus === 'Out of Stock'

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) return
    addItem({
      id: product.id,
      slug: product.slug,
      title: name,
      price,
      image,
    })
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-cream-100">
          {image ? (
            <img
              src={image}
              alt={name}
              width={350}
              height={350}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🕯️</div>
          )}
        </div>
        {onSale && (
          <span className="absolute top-3 left-3 bg-ember text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Sale
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-stone-800 group-hover:text-ember transition-colors leading-tight">
              {name}
            </h3>
          </Link>
        </div>
        {tagline && <p className="text-sm text-stone-500 mb-3 line-clamp-2">{tagline}</p>}

        <div className="mb-3">
          <StockBadge status={stockStatus} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-ember">{formatPrice(price)}</span>
            {onSale && typeof originalPrice === 'number' && (
              <span className="text-sm text-stone-400 line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="text-sm font-medium bg-ember text-white px-3 py-1.5 rounded-lg hover:bg-ember-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {outOfStock ? 'Sold Out' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}