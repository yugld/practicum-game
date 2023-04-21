import { ReactNode } from 'react'
import './styles.less';

export function Button(props: {text: ReactNode}){
  return <button className="button">{props.text}</button>
}
