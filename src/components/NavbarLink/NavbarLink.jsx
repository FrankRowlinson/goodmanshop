import { NavLink } from "react-router-dom"
import "./NavbarLink.css"

export function NavbarLink({ children, logo, ...props }) {
  const getClassNames = ({ isActive }) => {
    return (
      "navbar-link" +
      ` ${!logo && isActive ? "active" : !logo ? "hoverable" : ""}`
    )
  }
  return (
    <NavLink {...props} className={getClassNames}>
      {children}
    </NavLink>
  )
}
