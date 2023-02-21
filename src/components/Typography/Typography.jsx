import "./Typography.css"

export function Typography({ variant, size, children }) {
  return <div className={`${variant} ${size || "sm"}`}>{children}</div>
}
