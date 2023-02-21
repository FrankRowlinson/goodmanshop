import { createSlice } from "@reduxjs/toolkit"
import { fetchItemPage } from "./../thunks/apiThunks"

const initialState = {
  loading: false,
  error: null,
  items: [],
  offset: 0,
  limit: 20,
  canLoadMore: false,
}

export const mainPageSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemPage.pending, (state) => {
        if (state.items.length === 0) {
          state.loading = true
        }
      })
      .addCase(fetchItemPage.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.length < state.limit) {
          state.canLoadMore = false
        } else {
          state.canLoadMore = true
        }
        state.items.push(...action.payload)
        state.offset = state.offset + state.limit
      })
      .addCase(fetchItemPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
