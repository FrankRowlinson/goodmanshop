import { createSlice } from "@reduxjs/toolkit"

const username = localStorage.getItem("user")

const initialState = {
  username: username || null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload
      localStorage.setItem("user", action.payload)
    },
    logout: (state) => {
      state.username = null
      localStorage.removeItem("user")
    },
  },
})

export const { login, logout } = userSlice.actions
