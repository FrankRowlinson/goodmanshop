import { updateItemQuantity, removeFromCart } from "../slices"
import { store } from "../store"

export const updateQuantity = (user, id, sign) => (dispatch) => {
  const {
    cart: { carts },
  } = store.getState()
  const itemIndex = carts[user].findIndex((prev) => prev.id === id)
  const newQuantity = carts[user][itemIndex].quantity + sign
  if (newQuantity === 0) {
    dispatch(removeFromCart({ user, id }))
  } else {
    dispatch(updateItemQuantity({ user, id, newQuantity }))
  }
}
