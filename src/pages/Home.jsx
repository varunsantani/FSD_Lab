import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '../components/layout/Navbar'
import { addItem } from '../redux/cartSlice'

const categories = [
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Indian', emoji: '🍛' },
  { name: 'Chinese', emoji: '🍜' },
  { name: 'Desserts', emoji: '🍰' },
]

const restaurants = [
  {
    id: 1,
    name: 'Spice Garden',
    cuisine: 'Indian',
    rating: '4.6',
    deliveryTime: '25–35 min',
  },
  {
    id: 2,
    name: 'Burger Hub',
    cuisine: 'Burgers',
    rating: '4.4',
    deliveryTime: '20–30 min',
  },
  {
    id: 3,
    name: 'Dragon Wok',
    cuisine: 'Chinese',
    rating: '4.5',
    deliveryTime: '30–40 min',
  },
  {
    id: 4,
    name: 'Pizza Palazzo',
    cuisine: 'Pizza',
    rating: '4.7',
    deliveryTime: '15–25 min',
  },
]

const popularFoods = [
  {
    id: 1,
    emoji: '🍕',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palazzo',
    price: '₹299',
    rating: '4.8',
  },
  {
    id: 2,
    emoji: '🍔',
    name: 'Cheese Burger',
    restaurant: 'Burger Hub',
    price: '₹189',
    rating: '4.5',
  },
  {
    id: 3,
    emoji: '🍛',
    name: 'Butter Chicken',
    restaurant: 'Spice Garden',
    price: '₹349',
    rating: '4.7',
  },
  {
    id: 4,
    emoji: '🍰',
    name: 'Chocolate Cake',
    restaurant: 'Sweet Treats',
    price: '₹149',
    rating: '4.6',
  },
]

function Home() {
  const dispatch = useDispatch()

  // useEffect runs a side effect when the Home page loads (sets the tab title).
  useEffect(() => {
    document.title = 'Foodie - Home'
  }, [])

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />

      <main>
        <section className="bg-gradient-to-b from-orange-100 to-orange-50">
          <div className="mx-auto max-w-6xl px-4 py-12 text-center md:py-20">
            <h1 className="text-3xl font-bold text-gray-800 md:text-5xl">
              Delicious food, delivered to your door
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
              Order from your favourite restaurants on Foodie. Fresh meals,
              fast delivery, and flavours you will love.
            </p>

            <form
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="food-search" className="sr-only">
                Search food or restaurants
              </label>
              <input
                id="food-search"
                type="search"
                placeholder="Search for food or restaurants..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Explore Food
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-bold text-gray-800">Food Categories</h2>
          <p className="mt-1 text-gray-600">Pick a cuisine and start ordering.</p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <article
                key={category.name}
                className="cursor-pointer rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-4xl" aria-hidden="true">
                  {category.emoji}
                </span>
                <h3 className="mt-3 font-semibold text-gray-800">{category.name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-bold text-gray-800">Popular Restaurants</h2>
          <p className="mt-1 text-gray-600">Top places near you, ready to deliver.</p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{restaurant.cuisine}</p>
                <p className="mt-3 text-sm text-gray-700">
                  ⭐ {restaurant.rating} · ⏱ {restaurant.deliveryTime}
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
                >
                  View Menu
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-bold text-gray-800">Popular Food</h2>
          <p className="mt-1 text-gray-600">Customer favourites this week.</p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularFoods.map((food) => (
              <article
                key={food.id}
                className="rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-5xl" aria-hidden="true">
                  {food.emoji}
                </span>
                <h3 className="mt-3 text-lg font-bold text-gray-800">{food.name}</h3>
                <p className="text-sm text-gray-600">{food.restaurant}</p>
                <p className="mt-2 font-semibold text-orange-600">{food.price}</p>
                <p className="text-sm text-gray-700">⭐ {food.rating}</p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
                  onClick={() => dispatch(addItem(food))}
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-8 border-t border-orange-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
          <p>© 2026 Foodie. Online Food Ordering System.</p>
          <p className="mt-1">Experiment 1 — Responsive Home Page UI</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
