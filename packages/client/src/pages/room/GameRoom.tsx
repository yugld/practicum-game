import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {
    Button,
    Input,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Avatar,
    ListItemAvatar,
    IconButton
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDebounce } from "use-debounce";
import { useAppDispatch } from "../../store/store";
import { Store } from "../../store/store.types";
import {
    addRoomUser,
    deleteRoomUser,
    getRoomsUsers,
    updateGameStatus,
    updateUsers
} from "../../store/roomSlice";
import { clearAddUserDialog, searchUsersByLogin } from "../../store/addUserDialogSlice";
import { IUser } from "../../store/userSlice.types";
import { deleteRoom } from "../../store/roomsSlice";
import { withAuthorizationCheck } from "../../utils/authorizedPage";
import { useFlag } from '../../hooks/useFlag';
import { RESOURCE_URL } from "../../utils/axios";
import deleteIcon from "../../assets/icons/delete.svg"

import "./styles.less"

type Props = {
    websocket?: WebSocket;
}

const GameRoom = ({ websocket }: Props) => {
    const dispatch = useAppDispatch();
    const roomUsersList = useSelector((state: Store) => state.room.roomUsersList);
    const suggestUsersList = useSelector((state: Store) => state.addUserDialog.usersList);
    const currentUserId = useSelector((state: Store) => state.user.user.id);
    const roomCreatorId = useSelector((state: Store) => state.room.roomInfo?.created_by);
    const roomTitle = useSelector((state: Store) => state.room.roomInfo?.title);

    const params = useParams<Record<string, any>>();
    const navigate = useNavigate();
    const roomId: number = params.roomId;

    const [addUserVisible, addUserOpenDialog, addUserCloseDialog] = useFlag(false);
    const [deleteRoomtVisible, deleteRoomOpenDialog, deleteRoomCloseDialog] = useFlag(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);
    const [usersCounter, setUsersCounter] = useState<number>(0);
    const [debouncedText] = useDebounce(inputValue, 500);

    const handleSubmit = () => {
        if (selectedUser && roomUsersList)
            dispatch(addRoomUser({ chatId: roomId, users: [selectedUser.id] }))
                .then(unwrapResult)
                .then(() => {
                    dispatch(updateUsers([...roomUsersList, selectedUser]));
                    handleClose();
                })
    }

    const handleClose = () => {
        addUserCloseDialog();
        setInputValue('');
        dispatch(clearAddUserDialog());
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {
        if (debouncedText) {
            dispatch(searchUsersByLogin(debouncedText))
        }
      }, [debouncedText]);

    const handleListItemClick = (user: IUser) => {
        setSelectedUser(user);
        setInputValue(user.login);
    };

    useEffect(() => {
        dispatch(getRoomsUsers(roomId))
    }, []);

    useEffect(() => {
        websocket?.addEventListener('message', (message: { data: any }) => {
            const data = JSON.parse(message.data);

            if (data.type && data.type === 'pong') {
                return;
            }

            if (data.content === 'game started') {
                dispatch(updateGameStatus(data.content))
                navigate(`/rooms/${roomId}/game`);
            } else if (data.content === 'player connected') {
                setUsersCounter(usersCounter + 1);
            }
        });

        websocket?.addEventListener('open', () => {
            websocket.send(JSON.stringify({ type: 'message', content: 'player connected' }));
        });
    }, [websocket]);

    const goToGamePage = () => {
        websocket?.send(JSON.stringify({ type: 'message', content: 'game started' }));
    }

    const deleteUserFromRoom = (userId: number | undefined) => {
        if (roomCreatorId === userId) {
            deleteRoomOpenDialog();
        } else {
            dispatch(deleteRoomUser({ chatId: roomId, users: [userId] }))
                .then(unwrapResult)
                .then(() => dispatch(updateUsers(roomUsersList?.filter(user => user.id !== userId))))
        }
    }

    const deleteGameRoom = () => {
        dispatch(deleteRoom(roomId))
            .then(() => {
                deleteRoomCloseDialog()
                navigate('/rooms', { replace: true })
            })
    }

    return (
        <div className="page room-page">
            <div className="room-page__header">
                <h3 className="room-page__header-title">Комната {roomTitle || roomId}</h3>
                {Boolean(usersCounter) && <div>Подключено игроков: {usersCounter}</div>}
                {Boolean(websocket) && (
                    <div className="room-page__header-buttons">
                        <Button
                            className="button-filled"
                            onClick={addUserOpenDialog}
                            disabled={roomUsersList ? roomUsersList.length === 4 : false}
                        >
                            Добавить игрока
                        </Button>
                        <Button
                            className="button-filled"
                            onClick={goToGamePage}
                            disabled={roomUsersList ? roomUsersList.length < 2 : true}
                        >
                            Начать игру
                        </Button>
                    </div>
                )}
            </div>
            {roomUsersList && roomUsersList.length && (
                <List className='room-page__players'>
                    {roomUsersList.map((roomUser) => 
                        <ListItem
                            className='room-page__player'
                            key={roomUser.id}
                            secondaryAction={roomCreatorId === currentUserId ? (
                                <IconButton
                                    onClick={() => deleteUserFromRoom(roomUser.id)}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <img src={deleteIcon} alt="Удалить пользователя из комнаты" />
                                </IconButton>
                            ) : <></>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={roomUser.avatar ? `${RESOURCE_URL}${roomUser.avatar}` : ''}
                                    sx={{ width: 56, height: 56 }}
                                    alt="avatar"
                                />
                            </ListItemAvatar>
                            <ListItemText primary={roomUser.login} />
                        </ListItem>
                    )}
                </List>
            )}

            <Dialog open={addUserVisible} onClose={handleClose} maxWidth='md'>
                <DialogTitle>Введите логин пользователя</DialogTitle>
                <DialogContent className='room-page__dialog'>
                    <Input
                        className='room-page__dialog_input'
                        onChange={onInputChange}
                        value={inputValue}
                        autoFocus
                    />
                    {!!suggestUsersList?.length && (
                        <List>
                            {suggestUsersList.map((user) => 
                                <ListItem
                                    key={user.id}
                                    disablePadding
                                >
                                    <ListItemButton
                                        className='room-page__dialog_player'
                                        onClick={() => handleListItemClick(user)}
                                        selected={selectedUser?.id === user.id}
                                    >
                                        <Avatar
                                            src={user.avatar ? `${RESOURCE_URL}${user.avatar}` : ''}
                                            sx={{ width: 56, height: 56 }}
                                            alt="avatar"
                                        />
                                        <ListItemText primary={user.login} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>
                    )}
                </DialogContent>
                <DialogActions className='room-page__dialog_footer'>
                    <Button className='button-filled' onClick={handleSubmit}>Добавить</Button>
                    <Button className='button-text' onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteRoomtVisible} onClose={handleClose} maxWidth='md'>
                <DialogContent className='room-page__dialog'>
                    <span>
                        Удаление создателя комнаты приведет к удалению самой комнаты.
                    </span>
                </DialogContent>
                <DialogActions className='room-page__dialog_footer'>
                    <Button className='button-filled' onClick={deleteGameRoom}>Удалить</Button>
                    <Button className='button-text' onClick={deleteRoomCloseDialog}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withAuthorizationCheck(GameRoom);
