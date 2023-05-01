import { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useFlag } from '../../hooks/useFlag';
import { DialogProps } from '../../typings/dialog.types';

import "./styles.less"
import "../../assets/base/index.less"

export const GameStart = () => {
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

    const initialDialogState: DialogProps = {
        id: '',
        title: '',
        submitText: ''
    }

    const [dialog, setDialog] = useState(initialDialogState);

    const openNewGameDialog = () => {
        setDialog({
            id: 'new',
            title: 'Введите название комнаты',
            submitText: 'Создать комнату'
        });

        openDialog();
    }

    const openJoinGameDialog = () => {
        setDialog({
            id: 'join',
            title: 'Введите id комнаты',
            submitText: 'Войти в комнату'
        });

        openDialog();
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <div className="page game-page">
            <div className="game-page__description">
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
            <div className="game-page__buttons">
                <Button className="button-filled" onClick={openNewGameDialog}>Начать новую игру</Button>
                <Button className="button-filled" onClick={openJoinGameDialog}>Присоединиться к игре</Button>
            </div>

            <Dialog open={visible} onClose={handleClose} maxWidth='md'>
                <DialogTitle>{dialog.title}</DialogTitle>
                <DialogContent className='game-page__dialog'>
                    <Input onChange={onInputChange} autoFocus />
                </DialogContent>
                <DialogActions className='game-page__dialog_footer'>
                    <Button className='button-filled' onClick={handleSubmit}>{dialog.submitText}</Button>
                    <Button className='button-text' onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
