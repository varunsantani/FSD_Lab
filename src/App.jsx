import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import Chat from "./pages/Chat"
import { UserContextProvider } from "./context/UserContext"

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App