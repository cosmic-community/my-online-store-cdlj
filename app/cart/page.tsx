import CartView from '@/components/CartView'

export const metadata = {
  title: 'Your Cart — Lumière Candle Co.',
}

export default function CartPage() {
  return (
    <div className="container-page py-12">
      <h1 className="font-serif text-4xl font-semibold text-stone-800 mb-8">Your Cart</h1>
      <CartView />
    </div>
  )
}