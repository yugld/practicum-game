import './styles.less';

export function Input(props: {placeholder: string}){
  return <input className="input" placeholder={props.placeholder}/>
}
