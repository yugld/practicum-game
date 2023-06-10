import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainHeader from './layout/header/MainHeader'
import GameNavigation from './modules/gameNavigation/GameNavigation'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Profile from './pages/profile/Profile'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Forum from './pages/forum/Forum'
import GameRules from './pages/gameRules/GameRules'
import { Home } from './pages/home/Home'
import { NotFound } from './pages/notFound/NotFound'
import { DARK_THEME, LIGHT_THEME, ThemeContext } from './ThemeWrapper'
import GameStart from './pages/gameStart/GameStart'
import { useAppDispatch } from './store/store'
import { Store } from './store/store.types'
import { getUser } from './store/userSlice'
import Thread from './pages/thread/Thread'

import './App.less'
import { routes } from './routes/routes'

function App() {
  console.debug('first row app.tsx');

  const dispatch = useAppDispatch()
  const isUserLoading = useSelector((state: Store) => state.user.isUserLoading);
  const state = useSelector((state: Store) => state);

  useEffect(() => {
    dispatch(getUser())
  }, [])


  const { isDarkTheme } = useContext(ThemeContext)

  // if (isUserLoading) {
  //   return <div>Загрузка...<br/> {JSON.stringify(state)} </div>;
  // }

  return <div className={ `app ${ isDarkTheme ? DARK_THEME : LIGHT_THEME }` }>
    <MainHeader />

    <Routes>
      {routes.map((route) => {
        const {loader: _, ...rest} = route;
        console.debug('route:' + JSON.stringify(route));
        return <Route key={rest.path} {...rest}/>
      })}
    </Routes>
  </div>
}

export default App
