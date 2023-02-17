import "./App.css"
import { Routes, Route } from "react-router-dom"
import { MainPage, ItemPage, AboutPage, NotFoundPage } from "./pages"
import { Navbar } from "./components"
import { UserProvider, CartProvider } from "./context"

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/products/:id' element={<ItemPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </CartProvider>
    </UserProvider>
  )
}

export default App
