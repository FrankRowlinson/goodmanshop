import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, ItemCard, Spinner, Typography } from "../../components"
import { fetchProducts } from "../../services"
import { addToCart } from "../../store/slices"
import "./MainPage.css"

export function MainPage() {
  const [products, setProducts] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.username)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProducts()
      setProducts(data.slice(0, 24))
    }
    fetchData()
  }, [])
  return (
    <>
      {!products ? (
        <Spinner />
      ) : (
        <div className='main-page'>
          {products.map((item) => {
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
        </div>
      )}
    </>
  )
}
