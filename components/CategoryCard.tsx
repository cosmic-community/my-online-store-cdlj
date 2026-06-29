import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image?.imgix_url

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block rounded-xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-lg transition-shadow"
    >
      {image ? (
        <img
          src={`${image}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-cream-200 flex items-center justify-center text-5xl">🕯️</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="font-serif text-xl font-semibold">{name}</h3>
        {description && <p className="text-sm text-white/80 line-clamp-1 mt-1">{description}</p>}
      </div>
    </Link>
  )
}