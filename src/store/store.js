import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { cartSlice } from "./slices/cartSlice"
import { userSlice } from "./slices/userSlice"

const rootReducer = combineReducers({
  user: userSlice.reducer,
  cart: cartSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
