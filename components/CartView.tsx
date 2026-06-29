'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'

export default function CartView() {
  const { items, updateQuantity, removeItem, totalPrice, isReady, clearCart } = useCart()

  if (!isReady) {
    return <div className="text-center py-20 text-stone-500">Loading your cart…</div>
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-serif text-2xl text-stone-700 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-6">Browse our collection and find your perfect candle.</p>
        <Link
          href="/products"
          className="inline-block bg-ember text-white font-medium px-6 py-3 rounded-lg hover:bg-ember-dark transition-colors"
        >
          Shop Candles
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.title} width={80} height={80} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🕯️</div>
              )}
            </div>
            <div className="flex-grow min-w-0">
              <Link href={`/products/${item.slug}`} className="font-medium text-stone-800 hover:text-ember">
                {item.title}
              </Link>
              <p className="text-ember font-semibold">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center border border-cream-200 rounded-lg overflow-hidden">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1.5 text-stone-600 hover:bg-cream-100"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-3 py-1.5 w-10 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1.5 text-stone-600 hover:bg-cream-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-stone-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        <button onClick={clearCart} className="text-sm text-stone-500 hover:text-red-500 transition-colors">
          Clear cart
        </button>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-semibold text-stone-800 mb-4">Order Summary</h2>
          <div className="space-y-2 text-stone-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="border-t border-cream-200 pt-4 flex justify-between text-lg font-semibold text-stone-800">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center w-full mt-6 bg-ember text-white font-medium px-6 py-3 rounded-lg hover:bg-ember-dark transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}