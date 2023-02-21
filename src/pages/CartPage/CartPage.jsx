import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  ErrorMessage,
  QuantityController,
  Spinner,
  Typography,
} from "../../components"
import { selectTotalPrice } from "../../store/selectors"
import { clearCart, removeFromCart } from "../../store/slices"
import { updateQuantity } from "../../store/thunks/cartThunks"
import "./CartPage.css"

export function CartPage() {
  const user = useSelector((state) => state.user.username)
  const cart = useSelector((state) => state.cart.carts[user])
  const totalPrice = useSelector(selectTotalPrice)
  const dispatch = useDispatch()
  if (!user) {
    return (
      <ErrorMessage>
        Для того, чтобы создавать или просматривать корзину, вам нужно войти в
        свой аккаунт.
      </ErrorMessage>
    )
  }

  if (!cart) {
    return <Spinner />
  }

  return (
    <div className='cart-page'>
      <div className='cart-header'>
        <Typography variant='regular' size='md'>
          Корзина пользователя {user}
        </Typography>
      </div>
      <table className='cart-table paper'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название товара</th>
            <th>Цена за шт</th>
            <th>Количество в корзине</th>
            <th>Стоимость</th>
            <th>Управление</th>
          </tr>
        </thead>
        <tbody>
          {cart.length ? (
            <>
              {cart.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}.-</td>
                    <td className='quantity-col'>
                      <QuantityController
                        count={item.quantity}
                        increment={() =>
                          dispatch(updateQuantity(user, item.id, +1))
                        }
                        decrement={() =>
                          dispatch(updateQuantity(user, item.id, -1))
                        }
                      />
                    </td>
                    <td>{item.quantity * item.price}.-</td>
                    <td>
                      {
                        <Button
                          variant='error'
                          onClick={() =>
                            dispatch(removeFromCart({ user, id: item.id }))
                          }
                        >
                          Удалить
                        </Button>
                      }
                    </td>
                  </tr>
                )
              })}
              <tr className='cart-total'>
                <td colSpan={3}></td>
                <td>Итого к оплате</td>
                <td>{totalPrice}.-</td>
              </tr>
            </>
          ) : (
            <tr className='empty-cart'>
              <td colSpan='6'>
                <Typography variant='regular'>Корзина пуста</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='button-group'>
        <Button variant='primary' disabled>
          Оплатить
        </Button>
        <Button variant='error' onClick={() => dispatch(clearCart(user))}>
          Очистить корзину
        </Button>
      </div>
    </div>
  )
}
