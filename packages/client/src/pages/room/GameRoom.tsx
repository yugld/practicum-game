import { useParams } from "react-router-dom"
import { Button } from "@mui/material";

import "./styles.less"

export const GameRoom = () => {
    const params = useParams<Record<string, any>>();
    const roomId = params.roomId;

    return (
        <div className="page room-page">
            <div className="room-page__header">
                <h3 className="room-page__header-title">Комната {roomId} (будет название комнаты)</h3>
                <div className="room-page__header-buttons">
                    <Button className="button-filled">Добавить игрока</Button>
                    <Button className="button-filled">Начать игру</Button>
                </div>
            </div>
            <ol className="room-page__players">
                <li className="room-page__player">Первый игрок</li>
                <li className="room-page__player">Второй игрок</li>
            </ol>
        </div>
    )
}
