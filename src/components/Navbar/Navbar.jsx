import { useContext, useMemo } from "react"
import { Button, NavbarLink } from "../"
import { routes } from "../../constants"
import { UserContext, CartContext } from "../../context"
import "./Navbar.css"

export function Navbar() {
  const { user, logout, openLoginModal } = useContext(UserContext)
  const { cartItems, getTotalPrice } = useContext(CartContext)

  const totalItemsInCart = useMemo(() => {
    return cartItems.reduce((totalAmount, item) => {
      return totalAmount + item.quantity
    }, 0)
  }, [cartItems])

  const cartPositions = useMemo(() => cartItems.length, [cartItems])

  return (
    <div className='navbar-container'>
      <div className='nav-buttons'>
        <NavbarLink to={routes.HOME} logo>
          GoodmanShop
        </NavbarLink>
        <NavbarLink to={routes.HOME}>Главная</NavbarLink>
        <NavbarLink to={routes.ABOUT}>О магазине</NavbarLink>
      </div>
      {user && (
        <div className='cart-block'>
          <Button variant='inverted'>
            {cartItems.length
              ? `В корзине ${totalItemsInCart} товаров среди ${cartPositions} позиций на общую
        сумму ${getTotalPrice()}.-`
              : "Ваша корзина пуста"}
          </Button>
        </div>
      )}
      <div className='user-buttons'>
        {!user ? (
          <Button variant='inverted' onClick={openLoginModal}>
            Войти
          </Button>
        ) : (
          <Button variant='inverted' onClick={logout}>
            Выйти
          </Button>
        )}
      </div>
    </div>
  )
}
