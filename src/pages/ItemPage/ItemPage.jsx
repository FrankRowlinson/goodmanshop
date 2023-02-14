import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button, Spinner, Typography } from "../../components"
import { fetchProductById } from "../../services"
import "./ItemPage.css"

export function ItemPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const product = await fetchProductById(id)
      setProduct(product)
    }
    fetchData()
  }, [id])
  return (
    <div className='item-page'>
      {!product ? (
        <Spinner />
      ) : (
        <>
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
            </div>

            <div className='item-page__cart'>
              <Typography variant='regular' size='md'>
                {product.price}.-
              </Typography>
              <Button variant='primary'>Добавить в корзину</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
