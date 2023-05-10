import './styles.less'

export default function ServerError() {
  return (
    <div className="server-error">
      <h1>Что-то пошло не так...</h1>
      <p>Мы уже решаем проблему, попробуйте перезагрузить страницу позже</p>
    </div>
  )
}
