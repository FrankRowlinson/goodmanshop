import "./App.css"
import { Routes, Route } from "react-router-dom"
import { MainPage, ItemPage, AboutPage, NotFoundPage } from "./pages"
import { Navbar } from "./components"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadCarts } from "./store/slices"

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
          <Route path='/' element={<MainPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/products/:id' element={<ItemPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
