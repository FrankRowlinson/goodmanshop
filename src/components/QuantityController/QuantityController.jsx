import { Typography, Button } from "../"
import "./QuantityController.css"

export function QuantityController({ increment, decrement, count }) {
  return (
    <div className='quantity-controller'>
      <Button variant='icon' onClick={decrement}>
        –
      </Button>
      <Typography variant='regular' size='md'>
        {count}
      </Typography>
      <Button variant='icon' onClick={increment}>
        +
      </Button>
    </div>
  )
}
