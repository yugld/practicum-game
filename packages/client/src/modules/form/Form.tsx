import './styles.less'
import { FC, FormEvent, ReactNode } from 'react'

interface IFormProps {
  title: string
  body: ReactNode
  actions: ReactNode
  onSubmit: (e: FormEvent) => void
}

const Form: FC<IFormProps> = (props: IFormProps) => {
  return (
    <div className="form">
      <div className="form__title">
        <span>{props.title}</span>
      </div>
      <div className="form__body">{props.body}</div>
      <div className="form__actions">{props.actions}</div>
    </div>
  )
}

export default Form
