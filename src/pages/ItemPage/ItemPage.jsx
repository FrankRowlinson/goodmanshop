import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, Spinner, Typography } from "../../components"
import { fetchProductById } from "../../services"
import { addToCart } from "../../store/slices"
import "./ItemPage.css"

export function ItemPage() {
  const [quantityToAdd, setQuantityToAdd] = useState(1)
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.username)

  const increment = () => setQuantityToAdd((prev) => Math.max(prev + 1, 0))
  const decrement = () => setQuantityToAdd((prev) => Math.max(prev - 1, 0))

  const buyItem = () =>
    dispatch(addToCart({ user, item, quantity: quantityToAdd }))

  useEffect(() => {
    async function fetchData() {
      const item = await fetchProductById(id)
      setItem(item)
    }
    fetchData()
  }, [id])

  return (
    <>
      {!item ? (
        <Spinner />
      ) : (
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
              <Typography variant='regular' size='md'>
                {item.price}.-
              </Typography>
            </div>

            <div className='item-page__cart'>
              {user ? (
                <>
                  <div className='quantity-controller'>
                    <Button variant='icon' onClick={decrement}>
                      –
                    </Button>
                    <Typography variant='regular' size='md'>
                      {quantityToAdd}
                    </Typography>
                    <Button variant='icon' onClick={increment}>
                      +
                    </Button>
                  </div>
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
      )}
    </>
  )
}
