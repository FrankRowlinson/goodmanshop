import { useState, useEffect } from "react"
import { useAuth } from "./"

export function useCart() {
  const [items, setItems] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`${user}Cart`)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user}Cart`, JSON.stringify(items))
    }
  }, [items, user])

  function addItem(item, quantity) {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === item.id
      )

      if (itemIndex >= 0) {
        const newItems = [...prevItems]
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + quantity,
        }
        return newItems
      } else {
        return [
          ...prevItems,
          {
            id: item.id,
            quantity: quantity,
            price: item.price,
          },
        ]
      }
    })
  }

  function removeItem(itemId) {
    setItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== itemId)
    )
  }

  function getTotalPrice() {
    return items.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price
    }, 0)
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem(`${user}Cart`)
  }

  return {
    cartItems: items,
    addItem,
    removeItem,
    getTotalPrice,
    clearCart,
  }
}
