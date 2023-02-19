import { useMatch } from "react-router-dom"
import "./Button.css"

const buttonStyles = {
  primary: "primary-btn",
  inverted: "inverted-btn",
  error: "error-btn",
  icon: "icon-btn",
}

export function Button({ variant, children, onClick, type, path }) {
  const match = useMatch(path || "")
  return (
    <button
      className={
        buttonStyles[variant || "primary"] +
        " btn" +
        ` ${match ? "active" : ""}`
      }
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  )
}
