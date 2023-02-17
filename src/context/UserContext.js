import { useState, createContext } from "react"
import { LoginModal } from "../components"
import { useAuth } from "../hooks/"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { user, login, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openLoginModal = () => {
    if (!user) {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <UserContext.Provider
      value={{ user, login, logout, openLoginModal, isLoginModalOpen }}
    >
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      {children}
    </UserContext.Provider>
  )
}
