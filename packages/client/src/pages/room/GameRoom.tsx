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
import { useFlag } from '../../hooks/useFlag';
import { addRoomUsers, deleteRoomUsers, getRoomUsers } from '../../services/room';
import { searchUsers } from "../../services/user";
import { IUser } from '../../api/types';
import { RESOURCE_URL } from "../../api/BaseApi";
import deleteIcon from "../../assets/icons/delete.svg"

import "./styles.less"
import { withAuthorizationCheck } from "../../utils/authorizedPage";

const GameRoom = () => {
    const params = useParams<Record<string, any>>();
    const navigate = useNavigate();
    const roomId: number = params.roomId;

    const [visible, openDialog, closeDialog] = useFlag(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [roomUsers, setRoomUsers] = useState<IUser[]>([]);
    const [userList, setUserList] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

    const handleSubmit = () => {
        if (selectedUser)
            addRoomUsers({ id: roomId, users: [selectedUser.id] })
                .then(() => {
                    setRoomUsers([...roomUsers, selectedUser]);
                    handleClose();
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
        setUserList([]);
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        setTimeout(() => searchUsers(event.target.value)
            .then((users) => {
                setUserList(users.filter(user => !roomUsers.includes(user)));
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason
                if (reason) {
                    console.error(reason);
                }
            }), 1000)
    }

    const handleListItemClick = (user: IUser) => {
        setSelectedUser(user);
        setInputValue(user.login);
    };

    useEffect(() => {
        getRoomUsers(roomId)
            .then((users) => {
                setRoomUsers(users);
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason

                if (reason) {
                    console.error(reason)
                }
            })
    }, []);

    const goToGameEndPage = () => {
        navigate(`/game/end`)
    }

    const deleteUserFromRoom = (userId: number) => {
        deleteRoomUsers({ id: roomId, users: [userId] })
            .then(() => {
                setRoomUsers(roomUsers.filter(user => user.id !== userId));
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason

                if (reason) {
                    console.error(reason)
                }
            })
    }

    return (
        <div className="page room-page">
            <div className="room-page__header">
                <h3 className="room-page__header-title">Комната {roomId} (будет название комнаты)</h3>
                <div className="room-page__header-buttons">
                    <Button
                        className="button-filled"
                        onClick={openDialog}
                        disabled={roomUsers.length === 4}
                    >
                        Добавить игрока
                    </Button>
                    <Button
                        className="button-filled"
                        onClick={goToGameEndPage}
                        disabled={roomUsers.length < 2}
                    >
                        Начать игру
                    </Button>
                </div>
            </div>
            {!!roomUsers.length && (
                <List className='room-page__players'>
                    {roomUsers.map((roomUser) => 
                        <ListItem
                            className='room-page__player'
                            key={roomUser.id}
                            secondaryAction={
                                <IconButton
                                    onClick={() => deleteUserFromRoom(roomUser.id)}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <img src={deleteIcon} alt="Удалить пользователя из комнаты" />
                                </IconButton>
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

            <Dialog open={visible} onClose={handleClose} maxWidth='md'>
                <DialogTitle>Введите логин пользователя</DialogTitle>
                <DialogContent className='room-page__dialog'>
                    <Input
                        className='room-page__dialog_input'
                        onChange={onInputChange}
                        value={inputValue}
                        autoFocus
                    />
                    {!!userList.length && (
                        <List>
                            {userList.map((user) => 
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
        </div>
    )
}

export default withAuthorizationCheck(GameRoom);
