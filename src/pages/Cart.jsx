import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/layout/Navbar'
import { removeItem } from '../redux/cartSlice'

function parsePrice(price) {
  if (typeof price === 'number') {
    return price
  }

  const numericValue = Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isNaN(numericValue) ? 0 : numericValue
}

function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price),
    0
  )

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Your Cart</h1>
        <p className="mt-1 text-gray-600">Review your items before placing an order.</p>

        {cartItems.length === 0 ? (
          <p className="mt-8 rounded-xl bg-white p-6 text-center text-gray-600 shadow-sm">
            Your cart is empty.
          </p>
        ) : (
          <section className="mt-6 space-y-4">
            {cartItems.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className="flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                  <p className="mt-1 font-semibold text-orange-600">{item.price}</p>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </article>
            ))}

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-lg font-bold text-gray-800">
                Total Amount:{' '}
                <span className="text-orange-600">₹{totalAmount}</span>
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default Cart
