import { createContext } from "react"
import { useCart } from "../hooks"

export const CartContext = createContext({ cart: {}, addToCart: () => {} })

export const CartProvider = ({ children }) => {
  const { cartItems, addItem, removeItem, clearCart, getTotalPrice } = useCart()
  return (
    <CartContext.Provider
      value={{ cartItems, addItem, clearCart, removeItem, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}
