import { createSlice } from "@reduxjs/toolkit"
import { fetchSingleItem } from "./../thunks/apiThunks"

const initialState = {
  loading: false,
  item: null,
  error: null,
}

export const itemDetailSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleItem.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSingleItem.fulfilled, (state, action) => {
        state.loading = false
        state.item = action.payload
      })
      .addCase(fetchSingleItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
