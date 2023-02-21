import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Button,
  ErrorMessage,
  Spinner,
  Typography,
  QuantityController,
} from "../../components"
import { addToCart } from "../../store/slices"
import { fetchSingleItem } from "../../store/thunks/apiThunks"
import "./ItemPage.css"

export function ItemPage() {
  const dispatch = useDispatch()
  const [quantityToAdd, setQuantityToAdd] = useState(1)
  const { id } = useParams()
  const user = useSelector((state) => state.user.username)
  const { loading, item, error } = useSelector((state) => state.item)

  const increment = () => setQuantityToAdd((prev) => Math.max(prev + 1, 0))
  const decrement = () => setQuantityToAdd((prev) => Math.max(prev - 1, 0))

  const buyItem = () =>
    dispatch(addToCart({ user, item, quantity: quantityToAdd }))

  useEffect(() => {
    dispatch(fetchSingleItem(id))
  }, [dispatch, id])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <ErrorMessage>
        Ошибка при загрузке товара. Обновите страницу или попробуйте позже
      </ErrorMessage>
    )
  }

  if (!item) {
    return null
  }

  return (
    <div className='item-page paper'>
      <div className='item-page__image'>
        <img src={item.images[0]} alt='' />
      </div>
      <div className='item-page__info'>
        <div className='item-page__title'>
          <Typography variant='brand' size='md'>
            {item.title}
          </Typography>
        </div>
        <div className='item-page__description'>
          <Typography variant='regular' size='sm'>
            {item.description}
          </Typography>
          <Typography variant='regular' size='lg'>
            {item.price}.-
          </Typography>
        </div>

        <div className='item-page__cart'>
          {user ? (
            <>
              <QuantityController
                increment={increment}
                decrement={decrement}
                count={quantityToAdd}
              />
              <Button variant='primary' onClick={buyItem}>
                Добавить в корзину
              </Button>
            </>
          ) : (
            <Typography variant='regular'>
              Войдите, чтобы купить товар
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
