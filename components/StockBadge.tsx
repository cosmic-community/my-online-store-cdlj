import type { StockStatus } from '@/types'

interface StockBadgeProps {
  status?: StockStatus
}

export default function StockBadge({ status }: StockBadgeProps) {
  if (!status) return null

  const styles: Record<StockStatus, string> = {
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-amber-100 text-amber-800',
    'Out of Stock': 'bg-red-100 text-red-800',
  }

  const style = styles[status] ?? 'bg-stone-100 text-stone-700'

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  )
}