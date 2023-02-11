import "./Button.css"

const buttonStyles = {
  navbar: "navbar-btn",
  primary: "primary-btn",
  error: "error-btn",
  icon: "icon-btn",
}

export function Button({ variant, children, onClick }) {
  return (
    <button
      className={buttonStyles[variant || "primary"] + " btn"}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
