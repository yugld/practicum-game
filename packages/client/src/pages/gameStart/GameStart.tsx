import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import "../../assets/base/index.less"

export const GameStart = () => {
    const [visible, openDialog, closeDialog] = useFlag(false);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

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

    const goToRoom = (id: string) => {
        navigate(`/rooms/${id}`)
    }

    return (
        <div className="page game-start-page">
            <div className="game-start-page__wrapper">
                <div className="game-start-page__container">
                    <div className="game-start-page__description">
                        <h3>Игровой процесс</h3>
                        <p>
                            У каждого игрока на руках находится по одной карте.
                            Игроки по очереди берут еще по одной карте и разыгрывают одну из своих двух карт, применяя её свойство.
                            Если вас вынуждают сбросить карту (например, эффектом Принца), ее действие не разыгрывается.
                            Все сыгранные и сброшенные карты отображаются в верхней части экрана.
                        </p>
                        <p>
                            Игрок, оставшийся с картой с наибольшим номером в конце или выбивший остальных игроков, выигрывает раунд.
                            Если несколько игроков в конце раунда имеют на руках карты с одинаковым значением, он выбывают.
                            Чтобы победить во всей игре, для 2 игроков необходимо выиграть 7 раундов, для 3-4 игроков - 4 раунда.
                        </p>

                        <h3>Другие детали</h3>
                        <p>
                            При игре с 3-4 игроками в начале каждого раунда из колоды взакрытую сбрасывается случайная карта.
                            При игре с 2 игроками в каждом раунде 3 дополнительные карты сбрасываются рубашкой вверх.
                        </p>
                    </div>

                    <Button className="game-start-page__button button-filled" onClick={openDialog}>Начать новую игру</Button>
                </div>

                <div className="game-start-page__rooms">
                    <h3>Доступные комнаты</h3>
                    <div className="game-start-page__room">
                        <p>First test room</p>
                        <Button
                            className="game-start-page__button-small button-filled"
                            onClick={() => goToRoom('1')}
                        >
                            Войти
                        </Button>
                    </div>
                    <div className="game-start-page__room" id='2'>
                        <p>Second test room</p>
                        <Button
                            className="game-start-page__button-small button-filled"
                            onClick={() => goToRoom('2')}
                        >
                            Войти
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={visible} onClose={handleClose} maxWidth='md'>
                <DialogTitle>Введите название комнаты</DialogTitle>
                <DialogContent className='game-start-page__dialog'>
                    <Input
                        className='game-start-page__dialog_input'
                        onChange={onInputChange}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions className='game-start-page__dialog_footer'>
                    <Button className='button-filled' onClick={handleSubmit}>Создать комнату</Button>
                    <Button className='button-text' onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
