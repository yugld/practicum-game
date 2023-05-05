import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainHeader from './layout/header/MainHeader'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Profile from './pages/profile/Profile'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Forum from './pages/forum/Forum'
import GameRules from './pages/gameRules/GameRules'
import Game from './pages/game/Game'
import Home from './pages/home/Home'
import './App.less'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import React from 'react'
import { DARK_THEME, LIGHT_THEME, ThemeContext } from './ThemeWrapper'

function App () {
  const { isDarkTheme } = React.useContext(ThemeContext)
  return <div className={ `app ${ isDarkTheme ? DARK_THEME : LIGHT_THEME }` }>
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/registration' element={ <Registration /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/leaderboard' element={ <Leaderboard /> } />
          <Route path='/forum' element={ <Forum /> } />
          <Route path='/rules' element={ <GameRules /> } />
          <Route path='/game' element={ <Game /> } />
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  </div>
}

export default App
