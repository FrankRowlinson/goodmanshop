import { useContext } from "react"
import { Button, NavbarLink } from "../"
import { routes } from "../../constants"
import { UserContext } from "../../context"
import "./Navbar.css"

export function Navbar() {
  const { user, setUser, openLoginModal } = useContext(UserContext)
  return (
    <div className='navbar-container'>
      <div className='nav-buttons'>
        <NavbarLink to={routes.HOME} logo>
          GoodmanShop
        </NavbarLink>
        <NavbarLink to={routes.HOME}>Главная</NavbarLink>
        <NavbarLink to={routes.ABOUT}>О магазине</NavbarLink>
      </div>
      <div className='user-buttons'>
        <Button variant='primary'>Корзина</Button>
        {user.guest ? (
          <Button variant='primary' onClick={openLoginModal}>
            Войти
          </Button>
        ) : (
          <Button variant='primary' onClick={() => setUser({ guest: true })}>
            Выйти
          </Button>
        )}
      </div>
    </div>
  )
}
