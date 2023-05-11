import { Route, Routes, Outlet } from "react-router-dom"
import GameRoom from "../../pages/room/GameRoom"
import Game from "../../pages/game/Game"
import { GameEnd } from "../../pages/gameEnd/GameEnd"

const GameNavigation = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <GameRoom /> } />
                <Route path='/game' element={ <Game /> } />
                <Route path='/end' element={ <GameEnd /> } />
            </Routes>
            <Outlet />
        </>
    )
}
  
export default GameNavigation
