import "./App.css"
import { Routes, Route } from "react-router-dom"
import { MainPage, ItemPage, AboutPage, NotFoundPage } from "./pages"
import { LoginModal, Navbar } from "./components"
import { UserContext, CartContext } from "./context"
import { useEffect, useState } from "react"

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null)
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(`${user}Cart`)) || {}
  )
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const openLoginModal = () => {
    if (!user) {
      setIsLoginModalOpen(true)
    }
  }

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("user")
    } else {
      localStorage.setItem("user", user)
    }

    setCart(JSON.parse(localStorage.getItem(`${user}Cart`)) || {})
  }, [user])

  const logout = () => {
    setUser(null)
    setCart({})
  }

  const addToCart = (item, quantity) => {
    setCart((prev) => {
      if (prev.hasOwnProperty(item)) {
        localStorage.setItem(
          `${user}Cart`,
          JSON.stringify({ ...prev, [item]: prev[item] + quantity })
        )
      } else {
        localStorage.setItem(
          `${user}Cart`,
          JSON.stringify({ ...prev, [item]: quantity })
        )
      }
      return JSON.parse(localStorage.getItem(`${user}Cart`))
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, openLoginModal }}>
      <CartContext.Provider value={{ cart, addToCart }}>
        <LoginModal
          open={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/products/:id' element={<ItemPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App
