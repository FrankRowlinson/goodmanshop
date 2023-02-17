import { useState, useEffect, useContext } from "react"
import { Button, ItemCard, Spinner, Typography } from "../../components"
import { CartContext, UserContext } from "../../context"
import { fetchProducts } from "../../services"
import "./MainPage.css"

export function MainPage() {
  const [products, setProducts] = useState(null)
  const { addItem } = useContext(CartContext)
  const { user } = useContext(UserContext)

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
                    <Button onClick={() => addItem(item, 1)}>Купить</Button>
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
