import { Navigate } from 'react-router-dom';
import { isAuth } from '../../utils/isAuthenticated';

export default function Leaderboard() {
  if (!isAuth()) {
    return <Navigate replace to="/login" />;
  } else {
    return <h1>Страница лидерборда</h1>
  }
}
