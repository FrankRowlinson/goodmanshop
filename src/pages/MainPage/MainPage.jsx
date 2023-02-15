import { useState, useEffect } from "react"
import { Button, ItemCard, Spinner } from "../../components"
import { fetchProducts } from "../../services"
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
                  <Button>Добавить в корзину</Button>
                </ItemCard.Actions>
              </ItemCard>
            )
          })}
        </div>
      )}
    </>
  )
}
