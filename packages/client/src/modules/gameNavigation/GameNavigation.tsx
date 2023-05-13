import { useEffect, useState } from "react"
import { Route, Routes, Outlet, useParams } from "react-router-dom"
import { io } from 'socket.io-client'
import GameRoom from "../../pages/room/GameRoom"
import Game from "../../pages/game/Game"
import { GameEnd } from "../../pages/gameEnd/GameEnd"
import { getRoomToken } from "../../services/room"

const GameNavigation = () => {
    const params = useParams<Record<string, any>>();
    const roomId: number = params.roomId;
    const [roomToken, setRoomToken] = useState<string>('');
    const [websocket, setWebsocket] = useState<WebSocket | undefined>(undefined);

    useEffect(() => {
        getRoomToken(roomId)
            .then((token) => setRoomToken(token))
            .catch(({ response }) => {
                const reason = response?.data?.reason

                if (reason) {
                    console.error(reason)
                }
            })
    }, []);

    useEffect(() => {
        if (roomToken) {
            const url = `wss://ya-praktikum.tech/ws/chats/877084/${roomId}/${roomToken}`;

            const socket = new WebSocket(url);
            let pingInterval = 0;

            socket.addEventListener('open', () => {
                pingInterval = setInterval(() => {
                    socket.send(JSON.stringify({ type: 'ping' }));
                }, 5000) as unknown as number;
            });

            socket.addEventListener('close', () => {
                clearInterval(pingInterval);
                pingInterval = 0;
            });
    
            socket.addEventListener('message', (message: { data: any }) => {
                const data = JSON.parse(message.data);
    
                if (data.type && data.type === 'pong') {
                    return;
                }
    
                console.log('message', data);
            });

            setWebsocket(socket);

            return () => {
                socket.removeEventListener('open', () => {
                    console.log('remove open');
                });

                socket.removeEventListener('message', () => {
                    console.log('remove message');
                });

                socket.removeEventListener('close', () => {
                    console.log('remove close');
                });
            };
        }
    }, [roomToken]);

    return (
        <>
            <Routes>
                <Route path='/' element={ <GameRoom websocket={websocket} /> } />
                <Route path='/game' element={ <Game websocket={websocket} /> } />
                <Route path='/end' element={ <GameEnd websocket={websocket} /> } />
            </Routes>
            <Outlet />
        </>
    )
}
  
export default GameNavigation
