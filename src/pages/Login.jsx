import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-3xl font-bold text-orange-600">🍴 Foodie</p>
          <h1 className="mt-3 text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-600">
            Login to continue ordering delicious food.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <p className="mb-6 text-right">
            <a
              href="#"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline"
            >
              Forgot Password?
            </a>
          </p>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a
            href="#"
            className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
