import { TextField } from '@mui/material'

import { ChangeEventHandler, FC } from 'react'
import './styles.less'

interface IInputProps {
  id: string,
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  value: string,
  isError: boolean,
  helperText: string,
}

const Input: FC<IInputProps> = (props: IInputProps) => {
  return (
    <TextField
      error={ props.isError }
      id={ props.id }
      className='input'
      placeholder={ props.placeholder }
      value={ props.value }
      helperText={ props.helperText }
      variant='outlined'
      onChange={ props.onChange }
    />
  )
}

export default Input
