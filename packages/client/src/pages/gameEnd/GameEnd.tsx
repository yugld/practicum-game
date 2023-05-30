import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import "./styles.less"
import "../../assets/base/index.less"

type Props = {
    websocket?: WebSocket;
}

export const GameEnd = ({websocket}: Props) => {
    const params = useParams<Record<string, any>>();
    const roomId: number = params.roomId;
    const navigate = useNavigate();

    const goToRoomListPage = () => {
        navigate(`/rooms`)
    }

    const goToGamePage = () => {
        navigate(`/rooms/${roomId}/game`)
    }

    useEffect(() => {
        websocket?.addEventListener('message', (message: { data: any }) => {
            const data = JSON.parse(message.data);
    
            if (data.type && data.type === 'pong') {
                return;
            }
        });
      }, [websocket]);

    return (
        <div className="page game-end-page">
            <div className="game-end-page__title">
                <h3>Победитель: Имя (логин) игрока</h3>
            </div>
            <div className="game-end-page__buttons">
                <Button className="game-end-page__button button-filled" onClick={goToGamePage}>Начать новую игру</Button>
                <Button className="game-end-page__button button-filled" onClick={goToRoomListPage}>Вернуться к списку комнат</Button>
            </div>
        </div>
    )
}
