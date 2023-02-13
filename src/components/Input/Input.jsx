import "./Input.css"
import { Typography } from "../"

export function Input({ name, label, ...restProps }) {
  return (
    <div className='input-group'>
      <label htmlFor={name}>
        <Typography variant='brand' size='sm'>
          {label}
        </Typography>
      </label>
      <input id={name} name={name} {...restProps} />
    </div>
  )
}
