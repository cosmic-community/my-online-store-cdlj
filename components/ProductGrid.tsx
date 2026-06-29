'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getEffectivePrice, getProductName } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedScent, setSelectedScent] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const scents = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      const s = getMetafieldValue(p.metadata?.scent)
      if (s) set.add(s)
    })
    return Array.from(set).sort()
  }, [products])

  const types = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      const t = getMetafieldValue(p.metadata?.candle_type)
      if (t) set.add(t)
    })
    return Array.from(set).sort()
  }, [products])

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const scent = getMetafieldValue(p.metadata?.scent)
      const type = getMetafieldValue(p.metadata?.candle_type)
      if (selectedScent && scent !== selectedScent) return false
      if (selectedType && type !== selectedType) return false
      return true
    })

    result = [...result].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return getEffectivePrice(a) - getEffectivePrice(b)
      }
      if (sortBy === 'price-desc') {
        return getEffectivePrice(b) - getEffectivePrice(a)
      }
      if (sortBy === 'name-asc') {
        return getProductName(a).localeCompare(getProductName(b))
      }
      // featured
      const aFeatured = a.metadata?.featured ? 1 : 0
      const bFeatured = b.metadata?.featured ? 1 : 0
      return bFeatured - aFeatured
    })

    return result
  }, [products, selectedScent, selectedType, sortBy])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <ProductFilters
            scents={scents}
            types={types}
            selectedScent={selectedScent}
            selectedType={selectedType}
            sortBy={sortBy}
            onScentChange={setSelectedScent}
            onTypeChange={setSelectedType}
            onSortChange={setSortBy}
          />
        </div>
      </aside>

      <div className="lg:col-span-3">
        <p className="text-sm text-stone-500 mb-4">
          {filtered.length} {filtered.length === 1 ? 'candle' : 'candles'}
        </p>
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-stone-500">
            No candles match your filters. Try adjusting them.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}