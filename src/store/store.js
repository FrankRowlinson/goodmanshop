import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { mainPageSlice, itemDetailSlice, userSlice, cartSlice } from "./slices"

const rootReducer = combineReducers({
  user: userSlice.reducer,
  cart: cartSlice.reducer,
  item: itemDetailSlice.reducer,
  items: mainPageSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
