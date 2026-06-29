'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

export default function Header() {
  const { totalItems, isReady } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur border-b border-cream-200">
      <div className="container-page">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🕯️</span>
            <span className="font-serif text-2xl font-semibold text-ember tracking-wide">
              Lumière
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-stone-700 hover:text-ember transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-stone-700 hover:text-ember transition-colors">
              Collections
            </Link>
            <Link href="/search" className="text-stone-700 hover:text-ember transition-colors">
              Search
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-stone-700 hover:text-ember transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {isReady && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-ember text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-stone-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/products" className="text-stone-700 hover:text-ember" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link href="/categories" className="text-stone-700 hover:text-ember" onClick={() => setMobileOpen(false)}>
              Collections
            </Link>
            <Link href="/search" className="text-stone-700 hover:text-ember" onClick={() => setMobileOpen(false)}>
              Search
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}