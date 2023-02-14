import { endPoints } from "../constants"

export async function fetchProductById(id) {
  const response = await fetch(`${endPoints.products}/${id}`)
  const data = await response.json()
  return data
}
