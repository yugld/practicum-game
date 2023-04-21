import { Link } from 'react-router-dom'
import './styles.less'
export default function MainHeader() {
    return <div className="main-header">
        <Link className="main-header__item" to="/" >Авторизация</Link>
        <Link className="main-header__item"  to="/registration">Регистрация</Link>
        <Link className="main-header__item" to="/profile">Профиль</Link>
        <Link className="main-header__item" to="/leaderboard">Лидерборд</Link>
        <Link className="main-header__item" to="/forum">Форум</Link>
        <Link className="main-header__item" to="/rules">Правила</Link>
        <Link  className="main-header__item" to="/game">Игра</Link>
    </div>;
}