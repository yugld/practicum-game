import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import "./styles.less"
import "../../assets/base/index.less"

export const GameEnd = () => {
    const navigate = useNavigate();

    const goToGameStartPage = () => {
        navigate(`/game/start`)
    }

    return (
        <div className="page game-end-page">
            <div className="game-end-page__title">
                <h3>Победитель: Имя (логин) игрока</h3>
            </div>
            <div className="game-end-page__buttons">
                <Button className="game-end-page__button button-filled">Начать новую игру</Button>
                <Button className="game-end-page__button button-filled" onClick={goToGameStartPage}>Вернуться к списку комнат</Button>
            </div>
        </div>
    )
}
