import './styles.less';
import {  ReactNode } from 'react'

export function Form(props: {title: string, body: ReactNode, actions: ReactNode}){
  return <div className="form">
    <div className="form__title"><span>{props.title}</span></div>
    <div className="form__body">{props.body}</div>
    <div className="form__actions">{props.actions}</div>
  </div>
}
