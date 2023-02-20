import { endPoints } from "../constants"

export async function fetchProducts(offset, limit) {
  const response = await fetch(
    `${endPoints.products}?offset=${offset}&limit=${limit}`
  )
  const data = await response.json()
  return data
}
