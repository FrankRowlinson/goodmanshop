import "./App.css"
import { Routes, Route } from "react-router-dom"
import { MainPage, ItemPage, AboutPage, NotFoundPage } from "./pages"
import { LoginModal, Navbar } from "./components"
import { UserContext, CartContext } from "./context"
import { useEffect, useState } from "react"

const blankCart = { total: 0 }

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null)
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem(`${user}Cart`)) || blankCart
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
    setCart(blankCart)
  }

  const clearCart = () => {
    setCart(blankCart)
    localStorage.setItem(`${user}Cart`, JSON.stringify(blankCart))
  }

  const addToCart = (item, quantity) => {
    setCart((prev) => {
      if (prev.hasOwnProperty(item.id)) {
        localStorage.setItem(
          `${user}Cart`,
          JSON.stringify({
            ...prev,
            [item.id]: prev[item.id] + quantity,
            total: prev.total + item.price * quantity,
          })
        )
      } else {
        localStorage.setItem(
          `${user}Cart`,
          JSON.stringify({
            ...prev,
            [item.id]: quantity,
            total: prev.total + item.price * quantity,
          })
        )
      }
      return JSON.parse(localStorage.getItem(`${user}Cart`))
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, openLoginModal }}>
      <CartContext.Provider value={{ cart, addToCart, clearCart }}>
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
