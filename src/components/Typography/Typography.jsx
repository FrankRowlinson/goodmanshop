import "./Typography.css"

export function Typography({ variant, size, children }) {
  return <p className={`${variant} ${size}`}>{children}</p>
}
