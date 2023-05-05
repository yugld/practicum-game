import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'
import MainHeader from './layout/header/MainHeader'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Profile from './pages/profile/Profile'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Forum from './pages/forum/Forum'
import GameRules from './pages/gameRules/GameRules'
import { GameStart } from './pages/gameStart/GameStart'
import { Home } from './pages/home/Home'
import { GameRoom } from './pages/room/GameRoom'
import { GameEnd } from './pages/gameEnd/GameEnd'
import './App.less'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import React from 'react'
import { DARK_THEME, LIGHT_THEME, ThemeContext } from './ThemeWrapper'
import Game from './pages/game/Game'

function App () {
  const { isDarkTheme } = React.useContext(ThemeContext)
  return <div className={ `app ${ isDarkTheme ? DARK_THEME : LIGHT_THEME }` }>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/rules" element={<GameRules />} />
            <Route path='/game' element={ <Game /> } />
            <Route path="/game/start" element={<GameStart />} />
            <Route path="/game/end" element={<GameEnd/>}/>
            <Route path="/rooms/:roomId" element={<GameRoom />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </div>
}

export default App

