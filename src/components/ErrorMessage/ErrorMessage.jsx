import "./ErrorMessage.css"

export function ErrorMessage({ children }) {
  return (
    <div className='error-message'>
      <div>
        <strong className='exclamation'>!</strong>
      </div>
      <div>{children}</div>
    </div>
  )
}
