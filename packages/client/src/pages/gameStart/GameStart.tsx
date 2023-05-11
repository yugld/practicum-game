import { useEffect, useState, ChangeEvent } from 'react';
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
import { createRoom, getRoomList } from '../../services/room';
import { Room } from '../../api/types';

import "./styles.less"
import "../../assets/base/index.less"
// import { withAuthorizationCheck } from '../../utils/authorizedPage';

const GameStart = () => {
    const [visible, openDialog, closeDialog] = useFlag(false);
    const [inputValue, setInputValue] = useState('');
    const [roomList, setRoomList] = useState<Room[]>([]);

    const navigate = useNavigate();

    const handleSubmit = () => {
        createRoom(inputValue)
            .then((id) => {
                navigate(`/rooms/${id}`)
                handleClose()
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason
                if (reason) {
                    console.error(reason);
                }
            })
    }

    const handleClose = () => {
        closeDialog();
        setInputValue('');
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const goToRoom = (id: number) => {
        navigate(`/rooms/${id}`)
    }

    useEffect(() => {
        getRoomList()
            .then((rooms) => {
                setRoomList(rooms);
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason

                if (reason) {
                    console.error(reason)
                }
            })
    }, []);

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

                    <Button className="game-start-page__button button-filled" onClick={openDialog}>Создать новую комнату</Button>
                </div>

                <div className="game-start-page__rooms">
                    {!!roomList.length && (
                        <>
                            <h3>Доступные комнаты</h3>
                            {roomList.map((room) =>
                                <div className="game-start-page__room" key={room.id}>
                                    <p>{room.title}</p>
                                    <Button
                                        className="game-start-page__button-small button-filled"
                                        onClick={() => goToRoom(room.id)}
                                    >
                                        Войти
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
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

// export default withAuthorizationCheck(GameStart);
export default GameStart;
