import { createSelector } from "@reduxjs/toolkit"

const selectCarts = (state) => state.cart.carts
const selectUser = (state) => state.user.username

export const selectCurrentCart = createSelector(
  [selectCarts, selectUser],
  (carts, user) => carts[user] || []
)

export const selectTotalPrice = createSelector(
  [selectCarts, selectUser],
  (carts, user) => {
    return carts[user]?.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price
    }, 0)
  }
)
