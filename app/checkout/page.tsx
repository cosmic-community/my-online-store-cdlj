import CheckoutForm from '@/components/CheckoutForm'

export const metadata = {
  title: 'Checkout — Lumière Candle Co.',
}

export default function CheckoutPage() {
  return (
    <div className="container-page py-12">
      <h1 className="font-serif text-4xl font-semibold text-stone-800 mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}