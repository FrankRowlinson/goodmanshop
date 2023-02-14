import { endPoints } from "../constants"

export async function fetchProducts() {
  const response = await fetch(endPoints.products)
  const data = await response.json()
  return data
}
