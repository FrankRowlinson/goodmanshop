import { createSlice } from "@reduxjs/toolkit"
import { fetchItemPage } from "./../thunks/apiThunks"

const initialState = {
  loading: false,
  error: null,
  items: [],
}

export const mainPageSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemPage.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchItemPage.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(...action.payload)
      })
      .addCase(fetchItemPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
