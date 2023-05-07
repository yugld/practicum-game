import { Routes, Route } from 'react-router-dom'
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
import { NotFound } from './pages/notFound/NotFound'
import { GameEnd } from './pages/gameEnd/GameEnd'
import './App.less'

import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'

function App() {
  //const { pathname } = useLocation();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="app">
            {/* {pathname !== '/login' && pathname !== '/registration' && <MainHeader />} */}
            <MainHeader />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/rules" element={<GameRules />} />
              <Route path="/game/start" element={<GameStart />} />
              <Route path="/game/end" element={<GameEnd />} />
              <Route path="/rooms/:roomId" element={<GameRoom />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App
