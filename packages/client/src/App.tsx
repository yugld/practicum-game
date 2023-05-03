import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'
import MainHeader from './layout/header/MainHeader'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Profile from './pages/profile/Profile'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Forum from './pages/forum/Forum'
import GameRules from './pages/gameRules/GameRules'
import { GameStart } from './pages/game/GameStart'
import { Home } from './pages/home/Home'
import { GameRoom } from './pages/room/GameRoom'
import './App.less'

function App() {

  return <div className="app">
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <MainHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/forum" element={ <Forum/>}/>
          <Route path="/rules" element={<GameRules/>}/>
          <Route path="/game" element={<GameStart/>}/>
          <Route path="/rooms/:roomId" element={<GameRoom/>}/>
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  </div>
}

export default App
