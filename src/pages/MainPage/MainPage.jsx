import { useState, useEffect } from "react"
import { Button, ItemCard, Spinner } from "../../components"
import { fetchProducts } from "../../services/fetchProducts"
import "./MainPage.css"

export function MainPage() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProducts()
      setProducts(data)
    }
    fetchData()
  }, [])
  return (
    <div className='main-page'>
      {!products ? (
        <Spinner />
      ) : (
        products.map((item) => {
          return (
            <ItemCard key={item.id}>
              <ItemCard.Image src={item.images[0]} />
              <ItemCard.Title>{item.title}</ItemCard.Title>
              <ItemCard.Price>{item.price}</ItemCard.Price>
              <ItemCard.Actions>
                <Button>Добавить в корзину</Button>
              </ItemCard.Actions>
            </ItemCard>
          )
        })
      )}
    </div>
  )
}
