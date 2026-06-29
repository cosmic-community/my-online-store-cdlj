'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getProductName } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'

interface SearchViewProps {
  products: Product[]
}

export default function SearchView({ products }: SearchViewProps) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter((p) => {
      const name = getProductName(p).toLowerCase()
      const tagline = getMetafieldValue(p.metadata?.tagline).toLowerCase()
      const scent = getMetafieldValue(p.metadata?.scent).toLowerCase()
      const type = getMetafieldValue(p.metadata?.candle_type).toLowerCase()
      const description = getMetafieldValue(p.metadata?.description).toLowerCase()
      return (
        name.includes(q) ||
        tagline.includes(q) ||
        scent.includes(q) ||
        type.includes(q) ||
        description.includes(q)
      )
    })
  }, [query, products])

  return (
    <div>
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candles by name, scent, or type…"
            className="w-full pl-12 pr-4 py-3 rounded-full border border-cream-200 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-ember/40"
            autoFocus
          />
        </div>
      </div>

      {query.trim() === '' ? (
        <p className="text-center text-stone-500">Start typing to find your perfect candle.</p>
      ) : results.length === 0 ? (
        <p className="text-center text-stone-500">No candles found for "{query}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}