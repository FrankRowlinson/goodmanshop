import { useState, useEffect } from "react"

const CREDENTIALS = { admin: "admin", user: "user" }

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  function login(username, password) {
    if (CREDENTIALS[username] === password) {
      localStorage.setItem("user", JSON.stringify(username))
      setUser(username)
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem("user")
    setUser(null)
  }

  return { user, login, logout }
}
