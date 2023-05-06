import { Navigate } from 'react-router-dom';
import { isAuth } from '../../utils/isAuthenticated';

export default function GameRules() {
  if (!isAuth()) {
    return <Navigate replace to="/login" />;
  } else {
    return <h1>Страница правил игры</h1>
  }
}
