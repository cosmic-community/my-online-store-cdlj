'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'

export default function CheckoutForm() {
  const { items, totalPrice, isReady, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)

  if (!isReady) {
    return <div className="text-center py-20 text-stone-500">Loading…</div>
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-serif text-2xl text-stone-700 mb-2">Thank you for your order!</h2>
        <p className="text-stone-500 mb-6">
          This is a demo checkout. Connect a payment provider like Stripe to take real card payments.
        </p>
        <Link
          href="/products"
          className="inline-block bg-ember text-white font-medium px-6 py-3 rounded-lg hover:bg-ember-dark transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500 mb-6">Your cart is empty.</p>
        <Link href="/products" className="text-ember font-medium hover:underline">
          Browse candles
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    setSubmitted(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h2 className="font-serif text-xl font-semibold text-stone-800 mb-4">Contact</h2>
          <input
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded-lg border border-cream-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember/40"
          />
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-stone-800 mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="First name" className="rounded-lg border border-cream-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember/40" />
            <input required placeholder="Last name" className="rounded-lg border border-cream-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember/40" />
            <input required placeholder="Address" className="sm:col-span-2 rounded-lg border border-cream-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember/40" />
            <input required placeholder="City" className="rounded-lg border border-cream-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember/40" />
            <input required placeholder="Postal code" className="rounded-lg border border-cream-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ember/40" />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-stone-800 mb-4">Payment</h2>
          <p className="text-sm text-stone-500 mb-3 bg-cream-100 rounded-lg p-3">
            This is a demo store. To accept real card payments securely, connect a provider such as Stripe.
          </p>
          <input disabled placeholder="Card number (demo)" className="w-full rounded-lg border border-cream-200 px-3 py-2.5 bg-cream-50 text-stone-400" />
        </div>

        <button
          type="submit"
          className="w-full bg-ember text-white font-medium px-6 py-3 rounded-lg hover:bg-ember-dark transition-colors"
        >
          Place Order — {formatPrice(totalPrice)}
        </button>
      </form>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-semibold text-stone-800 mb-4">Your Order</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-stone-600">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-cream-200 pt-4 flex justify-between text-lg font-semibold text-stone-800">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}