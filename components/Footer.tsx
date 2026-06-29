import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ember-dark text-cream-100 mt-20">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🕯️</span>
              <span className="font-serif text-2xl font-semibold">Lumière</span>
            </div>
            <p className="text-cream-200/80 text-sm leading-relaxed">
              Hand-poured luxury candles crafted with natural waxes and fine fragrances to bring warmth to your home.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-cream-200/80">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Candles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-cream-200/80 text-sm leading-relaxed">
              Every candle is poured by hand in small batches with care and intention.
            </p>
          </div>
        </div>
        <div className="border-t border-cream-200/20 mt-8 pt-6 text-center text-sm text-cream-200/60">
          © {new Date().getFullYear()} Lumière Candle Co. All rights reserved.
        </div>
      </div>
    </footer>
  )
}