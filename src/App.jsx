import "./App.css"
import { Routes, Route } from "react-router-dom"
import { MainPage, ItemPage, AboutPage, NotFoundPage, CartPage } from "./pages"
import { Navbar } from "./components"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadCarts } from "./store/slices"
import { routes } from "./constants"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCarts())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path={routes.HOME} element={<MainPage />} />
          <Route path={routes.ABOUT} element={<AboutPage />} />
          <Route path={`${routes.PRODUCTS}/:id`} element={<ItemPage />} />
          <Route path={routes.CART} element={<CartPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
