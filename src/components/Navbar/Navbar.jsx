import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button, LoginModal, NavbarLink } from "../"
import { routes } from "../../constants"
import { selectCurrentCart, selectTotalPrice } from "../../store/selectors"
import { logout } from "../../store/slices"
import "./Navbar.css"
import { ReactComponent as CartIcon } from "../../icons/cart-icon.svg"

export function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const user = useSelector((state) => state.user.username)
  const cart = useSelector(selectCurrentCart)
  const totalPrice = useSelector(selectTotalPrice)

  const totalItemsInCart = useMemo(() => {
    return cart.reduce((totalAmount, item) => {
      return totalAmount + item.quantity
    }, 0)
  }, [cart])

  const handleLogout = () => {
    dispatch(logout())
    navigate(routes.HOME)
  }

  const cartPositions = useMemo(() => cart.length, [cart])

  return (
    <div className='navbar-container'>
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <div className='nav-buttons'>
        <NavbarLink to={routes.HOME} logo>
          GoodmanShop
        </NavbarLink>
        <NavbarLink to={routes.HOME}>Главная</NavbarLink>
        <NavbarLink to={routes.ABOUT}>О магазине</NavbarLink>
      </div>
      {user && (
        <div className='cart-block'>
          {cart.length
            ? `В корзине ${totalItemsInCart} товаров среди ${cartPositions} позиций на общую
            сумму ${totalPrice}.-`
            : "Ваша корзина пуста"}
          <Button variant='icon' onClick={() => navigate(routes.CART)}>
            <div className='icon-container'>
              <CartIcon className='icon' />
            </div>
          </Button>
        </div>
      )}
      <div className='user-buttons'>
        {!user ? (
          <Button variant='inverted' onClick={() => setIsLoginModalOpen(true)}>
            Войти
          </Button>
        ) : (
          <Button variant='inverted' onClick={handleLogout}>
            Выйти
          </Button>
        )}
      </div>
    </div>
  )
}
