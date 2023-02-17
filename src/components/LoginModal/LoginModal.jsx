import { Modal, Typography, Button, Input, ErrorMessage } from "../"
import { useState, useContext } from "react"
import { UserContext } from "../../context"
import { useNavigate } from "react-router-dom"
import { routes } from "../../constants"

export function LoginModal({ onClose, ...restProps }) {
  const { login } = useContext(UserContext)
  const [showError, setShowError] = useState(false)
  const [formValues, setFormValues] = useState({ login: "", password: "" })
  const navigate = useNavigate()

  function setInput(name) {
    const onChange = (event) => {
      setFormValues((prev) => ({ ...prev, [name]: event.target.value }))
    }
    return onChange
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = login(formValues.login, formValues.password)
    if (success) {
      setFormValues({ login: "", password: "" })
      setShowError(false)
      onClose()
      navigate(routes.HOME)
    } else {
      setShowError(true)
      setFormValues((prev) => ({ ...prev, password: "" }))
    }
  }

  return (
    <Modal {...restProps}>
      <form className='modal' onSubmit={handleSubmit}>
        <Modal.Header onClose={onClose}>
          <Typography variant='brand' size='md'>
            Войти
          </Typography>
        </Modal.Header>
        <Modal.Content>
          {showError && (
            <ErrorMessage>Неправильный логин или пароль</ErrorMessage>
          )}
          <Input
            label='Логин'
            placeholder='Логин...'
            type='text'
            value={formValues.login}
            onChange={setInput("login")}
          />
          <Input
            label='Пароль'
            placeholder='Пароль...'
            type='password'
            value={formValues.password}
            onChange={setInput("password")}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='error' type='reset' onClick={onClose}>
            Отмена
          </Button>
          <Button variant='primary' type='submit'>
            Войти
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  )
}
