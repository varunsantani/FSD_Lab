import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { GiKnifeFork } from 'react-icons/gi'
import {
  FiHome,
  FiCoffee,
  FiClipboard,
  FiUsers,
  FiLogOut,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
} from 'react-icons/fi'

const stats = [
  { title: 'Total Orders', value: '128', icon: <FiShoppingBag /> },
  { title: 'Total Revenue', value: '₹24,560', icon: <FiDollarSign /> },
  { title: 'Total Users', value: '86', icon: <FiUsers /> },
  { title: 'Pending Orders', value: '12', icon: <FiClock /> },
]

const recentOrders = [
  {
    id: 'ORD-101',
    customer: 'Anita Sharma',
    items: 'Butter Chicken, Naan',
    amount: '₹449',
    status: 'Delivered',
  },
  {
    id: 'ORD-102',
    customer: 'Rahul Verma',
    items: 'Margherita Pizza',
    amount: '₹299',
    status: 'Pending',
  },
  {
    id: 'ORD-103',
    customer: 'Sneha Patel',
    items: 'Cheese Burger, Fries',
    amount: '₹259',
    status: 'Preparing',
  },
  {
    id: 'ORD-104',
    customer: 'Amit Joshi',
    items: 'Veg Hakka Noodles',
    amount: '₹189',
    status: 'Out for Delivery',
  },
]

function Dashboard() {
  useDocumentTitle('Foodie - Dashboard')

  return (
    <div className="min-h-screen bg-orange-50 md:flex">
      <aside className="border-b border-orange-100 bg-white md:flex md:min-h-screen md:w-64 md:flex-col md:border-b-0 md:border-r">
        <div className="flex items-center gap-2 px-4 py-4 text-xl font-bold text-orange-600">
          <GiKnifeFork aria-hidden="true" />
          <span>Foodie</span>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible md:pb-4">
          <Link
            to="/dashboard"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            <FiHome />
            Dashboard
          </Link>
          <a
            href="#"
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            onClick={(event) => {
              event.preventDefault()
              alert('This feature will be implemented in a later experiment.')
            }}
          >
            <FiCoffee />
            Food Items
          </a>
          <a
            href="#"
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            onClick={(event) => {
              event.preventDefault()
              alert('This feature will be implemented in a later experiment.')
            }}
          >
            <FiClipboard />
            Orders
          </a>
          <a
            href="#"
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            onClick={(event) => {
              event.preventDefault()
              alert('This feature will be implemented in a later experiment.')
            }}
          >
            <FiUsers />
            Users
          </a>
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 md:mt-auto"
          >
            <FiLogOut />
            Logout
          </Link>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="border-b border-orange-100 bg-white px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of orders, revenue, and users.
          </p>
        </header>

        <main className="px-4 py-6 sm:px-6">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.title}
                className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-lg text-orange-600">
                  {stat.icon}
                </div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {stat.value}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-800">
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-[640px] w-full text-left text-sm">
                <thead className="bg-orange-50 text-gray-600">
                  <tr>
                    <th className="rounded-l-lg px-3 py-3 font-semibold">
                      Order ID
                    </th>
                    <th className="px-3 py-3 font-semibold">Customer</th>
                    <th className="px-3 py-3 font-semibold">Items</th>
                    <th className="px-3 py-3 font-semibold">Amount</th>
                    <th className="rounded-r-lg px-3 py-3 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-gray-100 hover:bg-orange-50"
                    >
                      <td className="px-3 py-3 font-medium text-gray-800">
                        {order.id}
                      </td>
                      <td className="px-3 py-3 text-gray-700">
                        {order.customer}
                      </td>
                      <td className="px-3 py-3 text-gray-700">{order.items}</td>
                      <td className="px-3 py-3 font-medium text-gray-800">
                        {order.amount}
                      </td>
                      <td className="px-3 py-3">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
