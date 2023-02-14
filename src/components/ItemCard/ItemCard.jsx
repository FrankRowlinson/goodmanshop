import { NavLink } from "react-router-dom"
import { routes } from "../../constants"
import { Typography } from "../Typography/Typography"
import "./ItemCard.css"

const Title = ({ children, id }) => (
  <div className='item-card__title'>
    <NavLink to={`${routes.PRODUCTS}/${id}`} className='item-card__link'>
      <Typography variant='bold'>{children}</Typography>
    </NavLink>
  </div>
)

const Price = ({ children }) => (
  <div className='item-card__price'>
    <Typography variant='regular'>{children}.-</Typography>
  </div>
)

const Image = ({ src, id }) => (
  <NavLink to={`${routes.PRODUCTS}/${id}`}>
    <div className='item-card__image'>
      <img src={src} alt='' />
    </div>
  </NavLink>
)

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
