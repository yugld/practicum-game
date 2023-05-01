import { ReactNode } from 'react'
import './styles.less';

export function Button(props: {text: ReactNode, onClick?: () => void}){
  return <button className="button" onClick={props.onClick}>{props.text}</button>
}
