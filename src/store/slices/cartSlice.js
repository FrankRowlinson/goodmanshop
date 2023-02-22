import { createSlice } from "@reduxjs/toolkit"

const storedCarts = localStorage.getItem("carts")

const initialState = { carts: storedCarts ? JSON.parse(storedCarts) : {} }

const updateLocalStorage = (carts) =>
  localStorage.setItem("carts", JSON.stringify(carts))

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCarts: (state) => {
      const storedCarts = localStorage.getItem("carts")
      state.carts = storedCarts ? JSON.parse(storedCarts) : {}
    },

    addToCart: (state, action) => {
      const { user, item, quantity } = action.payload
      if (!state.carts.hasOwnProperty(user)) {
        state.carts[user] = []
      }
      const itemIndex = state.carts[user].findIndex(
        (prevItem) => prevItem.id === item.id
      )
      if (itemIndex >= 0) {
        state.carts[user][itemIndex] = {
          ...state.carts[user][itemIndex],
          quantity: state.carts[user][itemIndex].quantity + quantity,
        }
      } else {
        state.carts[user].push({
          id: item.id,
          quantity: quantity,
          price: item.price,
          title: item.title,
        })
      }
      updateLocalStorage(state.carts)
    },
    updateItemQuantity: (state, action) => {
      const { user, id, newQuantity } = action.payload
      const itemIndex = state.carts[user].findIndex(
        (prevItem) => prevItem.id === id
      )
      state.carts[user][itemIndex] = {
        ...state.carts[user][itemIndex],
        quantity: newQuantity,
      }
      updateLocalStorage(state.carts)
    },
    removeFromCart: (state, action) => {
      const { user, id } = action.payload
      state.carts[user] = state.carts[user].filter((item) => item.id !== id)
      updateLocalStorage(state.carts)
    },
    clearCart: (state, action) => {
      state.carts[action.payload] = []
      updateLocalStorage(state.carts)
    },
  },
})

export const {
  addToCart,
  loadCarts,
  removeFromCart,
  clearCart,
  updateItemQuantity,
} = cartSlice.actions
