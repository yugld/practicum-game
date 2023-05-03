import { ChangeEventHandler, FC } from 'react'
import './styles.less'

interface IInputProps {
  id: string
  placeholder: string
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
}

const Input: FC<IInputProps> = (props: IInputProps) => {
  return (
    <input
      id={props.id}
      className="input"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  )
}

export default Input
