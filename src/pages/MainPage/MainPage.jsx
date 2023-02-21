import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  ErrorMessage,
  ItemCard,
  Spinner,
  Typography,
} from "../../components"
import { addToCart } from "../../store/slices"
import { fetchItemPage } from "../../store/thunks/apiThunks"
import "./MainPage.css"

export function MainPage() {
  const { loading, items, error, offset, limit, canLoadMore } = useSelector(
    (state) => state.items
  )
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.username)

  useEffect(() => {
    if (offset === 0) {
      dispatch(fetchItemPage({ offset, limit }))
    }
  }, [dispatch, offset, limit])

  const fetchMore = (offset) => () => {
    dispatch(fetchItemPage({ offset, limit }))
  }

  if (error) {
    return (
      <ErrorMessage>
        Не удалось загрузить главную. Перезагрузите страницу или попробуйте
        позже.
      </ErrorMessage>
    )
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='main-page'>
      {items.map((item) => {
        return (
          <ItemCard key={item.id}>
            <ItemCard.Image src={item.images[0]} id={item.id} />
            <ItemCard.Title id={item.id}>{item.title}</ItemCard.Title>
            <ItemCard.Price>{item.price}</ItemCard.Price>
            <ItemCard.Actions>
              {user ? (
                <Button
                  onClick={() =>
                    dispatch(addToCart({ user, item, quantity: 1 }))
                  }
                >
                  Купить
                </Button>
              ) : (
                <Typography variant='regular'>
                  Войдите, чтобы купить товар
                </Typography>
              )}
            </ItemCard.Actions>
          </ItemCard>
        )
      })}
      {canLoadMore && (
        <Button variant='primary' onClick={fetchMore(offset)}>
          Загрузить еще товары
        </Button>
      )}
    </div>
  )
}
