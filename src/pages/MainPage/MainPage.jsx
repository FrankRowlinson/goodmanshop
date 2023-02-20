import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, ItemCard, Spinner, Typography } from "../../components"
import { fetchProducts } from "../../services"
import { addToCart } from "../../store/slices"
import "./MainPage.css"

const limit = 20

export function MainPage() {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(limit)
  const [canFetchMore, setCanFetchMore] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.username)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProducts(0, limit)
      setProducts(data)
    }
    fetchData()
  }, [])

  const fetchMore = (offset) => async () => {
    const data = await fetchProducts(offset, limit)
    if (data.length < limit) {
      setCanFetchMore(false)
    }
    setProducts((prev) => [...prev, ...data])
    setOffset((prev) => prev + limit)
  }
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
          {canFetchMore && (
            <Button variant='primary' onClick={fetchMore(offset)}>
              Загрузить еще товары
            </Button>
          )}
        </div>
      )}
    </>
  )
}
