import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Button, Spinner, Typography } from "../../components"
import { CartContext, UserContext } from "../../context"
import { fetchProductById } from "../../services"
import "./ItemPage.css"

export function ItemPage() {
  const [quantityToAdd, setQuantityToAdd] = useState(1)
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const { addItem } = useContext(CartContext)

  const increment = () => setQuantityToAdd((prev) => Math.max(prev + 1, 0))
  const decrement = () => setQuantityToAdd((prev) => Math.max(prev - 1, 0))

  useEffect(() => {
    async function fetchData() {
      const product = await fetchProductById(id)
      setProduct(product)
    }
    fetchData()
  }, [id])

  return (
    <>
      {!product ? (
        <Spinner />
      ) : (
        <div className='item-page paper'>
          <div className='item-page__image'>
            <img src={product.images[0]} alt='' />
          </div>
          <div className='item-page__info'>
            <div className='item-page__title'>
              <Typography variant='brand' size='md'>
                {product.title}
              </Typography>
            </div>
            <div className='item-page__description'>
              <Typography variant='regular' size='sm'>
                {product.description}
              </Typography>
              <Typography variant='regular' size='md'>
                {product.price}.-
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
                  <Button
                    variant='primary'
                    onClick={() => addItem(product, quantityToAdd)}
                  >
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
