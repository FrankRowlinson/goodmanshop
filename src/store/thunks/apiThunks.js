import { createAsyncThunk } from "@reduxjs/toolkit"
import { endPoints } from "../../constants"

export const fetchSingleItem = createAsyncThunk(
  "items/fetchItemById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${endPoints.products}/${id}`)
      const data = await response.json()
      if (data.name && data.name.endsWith("Error")) {
        return rejectWithValue(data)
      }
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchItemPage = createAsyncThunk(
  "items/fetchItemPage",
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${endPoints.products}?offset=${offset}&limit=${limit}`
      )
      const data = await response.json()
      if (data.name && data.name.endsWith("Error")) {
        return rejectWithValue(data)
      }
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
