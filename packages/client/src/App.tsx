import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
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
import GameStart from './pages/gameStart/GameStart'
import { useAppDispatch } from './store/store'
import { Store } from './store/store.types'
import { getUser } from './store/userSlice'
import Thread from './pages/thread/Thread'

import './App.less'
import { GameEnd } from './pages/gameEnd/GameEnd'
import { ThemeEnum } from './store/ThemeSlice.types'

function App() {
  const dispatch = useAppDispatch()
  const isUserLoading = useSelector((state: Store) => state.user.isUserLoading)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const theme = useSelector((state: Store) => state.theme.theme)

  if (isUserLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div
      className={`app ${theme === 'light' ? ThemeEnum.light : ThemeEnum.dark}`}>
      <MainHeader />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/thread" element={<Thread />} />
        <Route path="/rules" element={<GameRules />} />
        <Route path="/rooms" element={<GameStart />} />
        <Route path="/finish" element={<GameEnd />} />
        <Route path="/rooms/:roomId/*" element={<GameNavigation />} />
      </Routes>
    </div>
  )
}

export default App
