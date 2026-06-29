'use client'

interface ProductFiltersProps {
  scents: string[]
  types: string[]
  selectedScent: string
  selectedType: string
  sortBy: string
  onScentChange: (value: string) => void
  onTypeChange: (value: string) => void
  onSortChange: (value: string) => void
}

export default function ProductFilters({
  scents,
  types,
  selectedScent,
  selectedType,
  sortBy,
  onScentChange,
  onTypeChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm space-y-5">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Scent</label>
        <select
          value={selectedScent}
          onChange={(e) => onScentChange(e.target.value)}
          className="w-full rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-stone-700 focus:outline-none focus:ring-2 focus:ring-ember/40"
        >
          <option value="">All Scents</option>
          {scents.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Candle Type</label>
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-full rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-stone-700 focus:outline-none focus:ring-2 focus:ring-ember/40"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-stone-700 focus:outline-none focus:ring-2 focus:ring-ember/40"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  )
}