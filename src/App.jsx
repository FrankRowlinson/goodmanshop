import "./App.css"
import { Routes, Route } from "react-router-dom"
import { MainPage, AboutPage, NotFoundPage } from "./pages"
import { LoginModal, Navbar } from "./components"
import { UserContext } from "./context"
import { useState } from "react"

function App() {
  const [user, setUser] = useState({ guest: true })
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  return (
    <UserContext.Provider value={{ ...user, setUser, openLoginModal }}>
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
