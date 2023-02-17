import { useMemo } from "react"
import { Button, Typography } from "../"
import "./CartDropdown.css"
import { useContext } from "react"
import { CartContext } from "../../context"

export function CartDropdown() {
  const { cartItems, clearCart, getTotalPrice } = useContext(CartContext)
  const totalItemsInCart = useMemo(() => {
    return cartItems.reduce((totalAmount, item) => {
      return totalAmount + item.quantity
    }, 0)
  }, [cartItems])

  const cartPositions = useMemo(() => cartItems.length, [cartItems])

  return (
    <div
      className='cart-dropdown paper'
      onClick={(event) => event.stopPropagation()}
    >
      <Typography variant='regular' size='sm'>
        {cartItems
          ? `В корзине ${totalItemsInCart} товаров среди ${cartPositions} позиций на общую
        сумму ${getTotalPrice()}.-`
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
