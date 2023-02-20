import { login } from "../slices"

const CREDENTIALS = { admin: "admin", user: "user" }

export const authenticate = (username, password) => (dispatch) => {
  if (CREDENTIALS[username] === password) {
    dispatch(login(username))
    return true
  }
  return false
}
