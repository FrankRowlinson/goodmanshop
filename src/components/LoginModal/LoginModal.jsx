import { Modal, Typography, Button } from "../"

export function LoginModal({ onClose, ...restProps }) {
  return (
    <Modal {...restProps}>
      <Modal.Header onClose={onClose}>
        <Typography variant='brand' size='md'>
          Войти
        </Typography>
      </Modal.Header>
      <form>
        <Modal.Content></Modal.Content>
        <Modal.Actions>
          <Button variant='primary'>Войти</Button>
          <Button variant='error' onClick={onClose}>
            Отмена
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  )
}
