import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { GiKnifeFork } from 'react-icons/gi'
import { UserContext } from '../../context/UserContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { name, role } = useContext(UserContext)
  const cartItems = useSelector((state) => state.cart.items)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Restaurants', href: '#' },
    { name: 'Orders', href: '#' },
    { name: `Cart (${cartItems.length})`, href: '/cart' },
  ]

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2 text-xl font-bold text-orange-600">
          <GiKnifeFork aria-hidden="true" />
          <span>Foodie</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.href !== '#' ? (
                <Link
                  to={link.href}
                  className="font-medium text-gray-700 hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="font-medium text-gray-700 hover:text-orange-600"
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <span className="text-sm text-gray-600">Hi, {name}</span>
          <Link
            to="/login"
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          className="text-2xl text-gray-700 md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-gray-100 px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href !== '#' ? (
                  <Link
                    to={link.href}
                    className="block font-medium text-gray-700 hover:text-orange-600"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="block font-medium text-gray-700 hover:text-orange-600"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-600">Hi, {name}</p>
          <Link
            to="/login"
            className="mt-3 block rounded-lg bg-orange-500 px-4 py-2 text-center font-semibold text-white hover:bg-orange-600"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
