import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import "./styles.less"
import "../../assets/base/index.less"

export const GameEnd = () => {
    const params = useParams<Record<string, any>>();
    const roomId: number = params.roomId;
    const navigate = useNavigate();

    const goToRoomListPage = () => {
        navigate(`/game/start`)
    }

    const goToGamePage = () => {
        navigate(`/rooms/${roomId}/game`)
    }

    navigate(`/rooms/${roomId}/game`)

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
