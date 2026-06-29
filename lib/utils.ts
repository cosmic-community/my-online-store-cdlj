import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export function formatPrice(value: number | undefined): string {
  if (value === undefined || value === null || isNaN(value)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function getEffectivePrice(product: Product): number {
  const sale = product.metadata?.sale_price
  const price = product.metadata?.price ?? 0
  if (typeof sale === 'number' && sale > 0 && sale < price) {
    return sale
  }
  return price
}

export function isOnSale(product: Product): boolean {
  const sale = product.metadata?.sale_price
  const price = product.metadata?.price ?? 0
  return typeof sale === 'number' && sale > 0 && sale < price
}

export function getProductName(product: Product): string {
  const name = getMetafieldValue(product.metadata?.name)
  return name || product.title
}

export function getProductImage(product: Product, width = 600, height = 600): string | undefined {
  const img = product.metadata?.main_image
  if (img?.imgix_url) {
    return `${img.imgix_url}?w=${width}&h=${height}&fit=crop&auto=format,compress`
  }
  return undefined
}