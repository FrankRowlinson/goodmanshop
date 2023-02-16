import { useMemo } from "react"
import { Button, Typography } from "../"
import "./CartDropdown.css"
import { useContext } from "react"
import { CartContext } from "../../context"

export function CartDropdown() {
  const { cart, clearCart } = useContext(CartContext)
  const cartItems = useMemo(
    () =>
      Object.keys(cart)
        .filter((el) => el !== "total")
        .reduce((acc, item) => acc + parseInt(cart[item]), 0),
    [cart]
  )

  const cartPositions = useMemo(() => Object.keys(cart).length - 1, [cart])

  return (
    <div
      className='cart-dropdown paper'
      onClick={(event) => event.stopPropagation()}
    >
      <Typography variant='regular' size='sm'>
        {cartItems
          ? `В корзине ${cartItems} товаров среди ${cartPositions} позиций на общую
        сумму ${cart.total}.-`
          : "Ваша корзина пуста"}
      </Typography>
      {!!cartItems && (
        <Button variant='error' onClick={clearCart}>
          Очистить корзину
        </Button>
      )}
      <Button variant='primary'>Перейти в корзину</Button>
    </div>
  )
}
