import { useContext, useState } from "react"
import { Button, NavbarLink } from "../"
import { routes } from "../../constants"
import { UserContext } from "../../context"
import { CartDropdown } from "../CartDropdown/CartDropdown"
import "./Navbar.css"

export function Navbar() {
  const { user, logout, openLoginModal } = useContext(UserContext)
  const [cartOpen, setCartOpen] = useState(false)

  const handleCartOpen = () => setCartOpen((prev) => !prev)

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
        {!user ? (
          <Button variant='primary' onClick={openLoginModal}>
            Войти
          </Button>
        ) : (
          <Button variant='primary' onClick={logout}>
            Выйти
          </Button>
        )}
        {user && (
          <Button variant='primary' onClick={handleCartOpen} tabIndex={0}>
            Корзина{" "}
            <span id='toggler' className={!cartOpen ? "cart-closed" : ""}>
              V
            </span>
            {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
          </Button>
        )}
      </div>
    </div>
  )
}
