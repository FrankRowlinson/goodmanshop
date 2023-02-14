import { Typography } from "../Typography/Typography"
import "./ItemCard.css"

const Title = ({ children }) => (
  <div className='item-card__title'>
    <Typography variant='bold'>{children}</Typography>
  </div>
)

const Price = ({ children }) => (
  <div className='item-card__price'>
    <Typography variant='regular'>{children}.-</Typography>
  </div>
)

const Image = ({ src }) => <img className='item-card__image' src={src} alt='' />

const Actions = ({ children }) => (
  <div className='item-card__actions'>{children}</div>
)

function ItemCard({ children }) {
  return <div className='item-card'>{children}</div>
}

ItemCard.Title = Title
ItemCard.Price = Price
ItemCard.Image = Image
ItemCard.Actions = Actions

export { ItemCard }
