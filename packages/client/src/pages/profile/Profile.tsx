import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button, TextField, Avatar, FormControl, FormLabel, IconButton } from '@mui/material'
import EditPassword from '../../components/EditPassword/EditPassword'
import { withAuthorizationCheck } from '../../utils/authorizedPage'
import { Store } from '../../store/store.types'
import { useAppDispatch } from '../../store/store'
import { editUserInfo, updateAvatar } from '../../store/userSlice'
import { RESOURCE_URL } from '../../utils/axios'

import './Profile.less'

const Profile = () => {
    const dispatch = useAppDispatch()
    const user = useSelector((store: Store) => store.user.user)
    
    const [first_name, setFirstName] = useState(user.first_name)
    const [second_name, setSecondName] = useState(user.second_name)
    const [display_name, setDisplayName] = useState(user.display_name || '')
    const [login, setLogin] = useState(user.login)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(editUserInfo({
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone,
        }))
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = (e.currentTarget as HTMLInputElement).value
        const fieldName = (e.currentTarget as HTMLInputElement).id
        switch (fieldName) {
            case 'first_name':
                setFirstName(value)
                break;
            case 'second_name':
                setSecondName(value)
                break;
            case 'display_name':
                setDisplayName(value)
                break;
            case 'login':
                setLogin(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'phone':
                setPhone(value)
                break;
        }
    }

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = event => {
        const { files } = event.target
        if (files && files.length === 1) {
            const img = files[0]
            dispatch(updateAvatar(img))
                .then(unwrapResult)
            event.target.value = ''
        }
    }

    return (
        <main className="page profile">
            <div className="profile__avatar">
                <input
                    id="avatar"
                    type="file"
                    className="avatar__input"
                    onChange={handleOnChange}
                />
                <label htmlFor="avatar" className="avatar__label">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span">
                        <Avatar
                            className=""
                            sx={{ width: 130, height: 130 }}
                            src={user.avatar ? `${RESOURCE_URL}${user.avatar}` : ''}>
                            {first_name || 'Anon'}
                        </Avatar>
                    </IconButton>
                </label>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="profile__title">
                    {display_name}
                </div>
                <FormControl>
                    <div className='profile__inputs'>
                        <FormLabel>Имя</FormLabel>
                        <TextField
                            type="text"
                            onChange={handleChange}
                            value={first_name}
                            id='first_name'
                            fullWidth
                            required
                            sx={{ mb: 1 }} />
                        <FormLabel>Фамилия</FormLabel>
                        <TextField
                            type="text"
                            onChange={handleChange}
                            value={second_name}
                            id='second_name'
                            fullWidth
                            required
                            sx={{ mb: 1 }} />
                        <FormLabel>Отображаемое имя</FormLabel>
                        <TextField
                            type="text"
                            onChange={handleChange}
                            value={display_name}
                            id='display_name'
                            fullWidth
                            required
                            sx={{ mb: 1 }} />
                        <FormLabel>Логин</FormLabel>
                        <TextField
                            type="text"
                            onChange={handleChange}
                            value={login}
                            id='login'
                            fullWidth
                            required
                            sx={{ mb: 1 }} />
                        <FormLabel>E-mail</FormLabel>
                        <TextField
                            type="text"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            id='email'
                            fullWidth
                            required
                            sx={{ mb: 1 }} />
                        <FormLabel>Телефон</FormLabel>
                        <TextField
                            type='tel'
                            onChange={e => setPhone(e.target.value)}
                            value={phone}
                            id='tel'
                            fullWidth
                            required />
                    </div>
                    <div className="profile__buttons">
                        <Button type="submit">Сохранить данные</Button>
                        <EditPassword />
                    </div>
                </FormControl>
            </form>
        </main>
    )
}

export default withAuthorizationCheck(Profile);
