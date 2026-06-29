import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const name = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous'
  const text = getMetafieldValue(review.metadata?.review_text)
  const rating = review.metadata?.rating ?? 0
  const verified = review.metadata?.verified_purchase

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-ember font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-stone-800">{name}</p>
            {verified && (
              <span className="text-xs text-green-700 inline-flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Verified Purchase
              </span>
            )}
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
      {text && <p className="text-stone-600 leading-relaxed">{text}</p>}
    </div>
  )
}