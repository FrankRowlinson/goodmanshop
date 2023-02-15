import "./Modal.css"
import { Button } from "../"

const Header = ({ children, onClose }) => {
  return (
    <div className='modal-header'>
      {children}
      <Button variant='icon' onClick={onClose} type='button'>
        X
      </Button>
    </div>
  )
}

const Content = ({ children }) => {
  return <div className='modal-content'>{children}</div>
}

const Actions = ({ children }) => {
  return <div className='modal-actions'>{children}</div>
}

function Modal({ open, children }) {
  if (!open) return
  return (
    <div className='modal-container'>
      <div className='modal paper'>{children}</div>
    </div>
  )
}

Modal.Header = Header
Modal.Content = Content
Modal.Actions = Actions

export { Modal }
