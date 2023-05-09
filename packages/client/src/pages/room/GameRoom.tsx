import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Button,
    Input,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { useFlag } from '../../hooks/useFlag';

import "./styles.less"
import { withAuthorizationCheck } from "../../utils/authorizedPage";

const GameRoom = () => {
    const params = useParams<Record<string, any>>();
    const navigate = useNavigate();
    const roomId = params.roomId;

    const [visible, openDialog, closeDialog] = useFlag(false);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        console.log(inputValue);
        handleClose();
    }

    const handleClose = () => {
        closeDialog();
        setInputValue('');
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const goToGameEndPage = () => {
        navigate(`/game/end`)
    }

    return (
        <div className="page room-page">
            <div className="room-page__header">
                <h3 className="room-page__header-title">Комната {roomId} (будет название комнаты)</h3>
                <div className="room-page__header-buttons">
                    <Button className="button-filled" onClick={openDialog}>Добавить игрока</Button>
                    <Button className="button-filled" onClick={goToGameEndPage}>Начать игру</Button>
                </div>
            </div>
            <ol className="room-page__players" type="1">
                <li className="room-page__player">Первый игрок</li>
                <li className="room-page__player">Второй игрок</li>
            </ol>

            <Dialog open={visible} onClose={handleClose} maxWidth='md'>
                <DialogTitle>Введите логин пользователя</DialogTitle>
                <DialogContent className='room-page__dialog'>
                    <Input
                        className='room-page__dialog_input'
                        onChange={onInputChange}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions className='room-page__dialog_footer'>
                    <Button className='button-filled' onClick={handleSubmit}>Добавить</Button>
                    <Button className='button-text' onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withAuthorizationCheck(GameRoom);
