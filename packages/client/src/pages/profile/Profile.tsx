import { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TUserOmit } from '../../api/types'
import { userApi } from '../../api/userApi'
import { Button, TextField, Avatar, FormControl, FormLabel, IconButton } from '@mui/material'
import EditPassword from '../../components/EditPassword/EditPassword'

import './Profile.less'

const Profile = () => {
    const navigate = useNavigate()

    const [avatar, setAvatar] = useState<Blob>()
    const [first_name, setFirstName] = useState('')
    const [second_name, setSecondName] = useState('')
    const [display_name, setDisplayName] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = (event: any) => {
        event.preventDefault()
        userApi
            .editUser({
                first_name,
                second_name,
                display_name,
                login,
                email,
                phone,
            } as TUserOmit)
            .then(() => {
                console.log('Change userData')
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason

                if (reason) {
                    console.log(reason)
                }
            })
    }

    const onLogout = () => {
        userApi
            .logOut()
            .then(() => {
                navigate('/', { replace: true })
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason
                if (reason) {
                    console.log(reason)
                }
            })
    }

    useEffect(() => {
        userApi.getUser().then(({ data }) => {
            setFirstName(data.first_name)
            setSecondName(data.second_name)
            setDisplayName(data.display_name || '')
            setLogin(data.login)
            setEmail(data.email)
            setPhone(data.phone)
        })
    }, [])

    useEffect(() => {
        userApi
            .getUser()
            .then(({ data }) => {
                if (data.avatar) {
                    userApi
                        .getAvatar(data.avatar)
                        .then(res => {
                            setAvatar(res.data)
                        })
                        .catch(({ response }) => {
                            const reason = response?.data?.reason
                            if (reason) {
                                console.log(reason)
                            }
                        })
                }
            })
            .catch(({ response }) => {
                const reason = response?.data?.reason

                if (reason) {
                    console.log(reason)
                }
            })
    }, [])

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = event => {
        const { files } = event.target
        if (files && files.length === 1) {
            const img = files[0]
            setAvatar(img)
            userApi
                .editAvatar(img)
                .then(() => {
                    console.log('Change avatar')
                })
                .catch(({ response }) => {
                    const reason = response?.data?.reason
                    if (reason) {
                        console.log(reason)
                    }
                })
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
                            src={avatar && URL.createObjectURL(avatar)}>
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
                            onChange={e => setFirstName(e.target.value)}
                            value={first_name}
                            fullWidth
                            required></TextField>
                        <FormLabel>Фамилия</FormLabel>
                        <TextField
                            type="text"
                            onChange={e => setSecondName(e.target.value)}
                            value={second_name}
                            fullWidth
                            required></TextField>
                        <FormLabel>Отображаемое имя</FormLabel>
                        <TextField
                            type="text"
                            onChange={e => setDisplayName(e.target.value)}
                            value={display_name}
                            fullWidth
                            required></TextField>
                        <FormLabel>Логин</FormLabel>
                        <TextField
                            type="text"
                            onChange={e => setLogin(e.target.value)}
                            value={login}
                            fullWidth
                            required></TextField>
                        <FormLabel>E-mail</FormLabel>
                        <TextField
                            type="text"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            fullWidth
                            required></TextField>
                        <FormLabel>Телефон</FormLabel>
                        <TextField
                            type="tel"
                            onChange={e => setPhone(e.target.value)}
                            value={phone}
                            fullWidth
                            required></TextField>
                    </div>
                    <div className="profile__buttons">
                        <Button type="submit">Сохранить данные</Button>
                        <EditPassword />
                        <Button color="error" onClick={onLogout}>
                            Выйти
                        </Button>
                    </div>
                </FormControl>
            </form>
        </main>
    )
}

export default Profile
