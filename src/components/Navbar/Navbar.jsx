import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../"
import { UserContext } from "../../context"
import "./Navbar.css"

export function Navbar() {
  const { openLoginModal } = useContext(UserContext)
  const navigate = useNavigate()

  function goTo(path) {
    return () => navigate(path)
  }

  return (
    <div className='navbar-container'>
      <div className='nav-buttons'>
        <Button variant='navbar'>GoodmanShop</Button>
        <Button variant='navbar' onClick={goTo("/")}>
          Главная
        </Button>
        <Button variant='navbar' onClick={goTo("/about")}>
          О магазине
        </Button>
      </div>
      <div className='user-buttons'>
        <Button variant='primary'>Корзина</Button>
        <Button variant='primary' onClick={openLoginModal}>
          Войти
        </Button>
      </div>
    </div>
  )
}
