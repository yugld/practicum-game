import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  Button,
  TextField,
  Avatar,
  FormControl,
  FormLabel,
  IconButton,
} from '@mui/material'
import EditPassword from '../../components/EditPassword/EditPassword'
import { withAuthorizationCheck } from '../../utils/authorizedPage'
import { Store } from '../../store/store.types'
import { useAppDispatch } from '../../store/store'
import { editUserInfo, updateAvatar } from '../../store/userSlice'
import { RESOURCE_URL } from '../../utils/axios'

import './Profile.less'
import { TUserOmit } from '../../store/userSlice.types'
import { validateForm } from '../../utils/formValidation'

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useSelector((store: Store) => store.user.user)

  const [first_name, setFirstName] = useState(user.first_name)
  const [second_name, setSecondName] = useState(user.second_name)
  const [display_name, setDisplayName] = useState(user.display_name || '')
  const [login, setLogin] = useState(user.login)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [error, setError] = useState<TUserOmit>({
    first_name: '',
    second_name: '',
    email: '',
    login: '',
    phone: '',
    display_name: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(
      editUserInfo({
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
      })
    )
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.currentTarget as HTMLInputElement).value
    const fieldName = (e.currentTarget as HTMLInputElement).id
    switch (fieldName) {
      case 'first_name':
        setFirstName(value)
        setError({
          ...error,
          first_name: validateForm({ type: 'name', value }),
        })
        break
      case 'second_name':
        setSecondName(value)
        setError({
          ...error,
          second_name: validateForm({ type: 'name', value }),
        })
        break
      case 'display_name':
        setDisplayName(value)
        setError({
          ...error,
          display_name: validateForm({ type: 'name', value }),
        })
        break
      case 'login':
        setLogin(value)
        setError({
          ...error,
          login: validateForm({ type: 'login', value }),
        })
        break
      case 'email':
        setEmail(value)
        setError({
          ...error,
          email: validateForm({ type: 'email', value }),
        })
        break
      case 'phone':
        setPhone(value)
        setError({
          ...error,
          phone: validateForm({ type: 'phone', value }),
        })
        break
    }
  }

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { files } = event.target
    if (files && files.length === 1) {
      const img = files[0]
      dispatch(updateAvatar(img)).then(unwrapResult)
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
        <div className="profile__title">{display_name}</div>
        <FormControl>
          <div className="profile__inputs">
            <FormLabel>Имя</FormLabel>
            <TextField
              type="text"
              onChange={handleChange}
              value={first_name}
              id="first_name"
              fullWidth
              required
              sx={{ mb: 1 }}
              error={!!error.first_name}
              helperText={error.first_name}
            />
            <FormLabel>Фамилия</FormLabel>
            <TextField
              type="text"
              onChange={handleChange}
              value={second_name}
              id="second_name"
              fullWidth
              required
              sx={{ mb: 1 }}
              error={!!error.second_name}
              helperText={error.second_name}
            />
            <FormLabel>Отображаемое имя</FormLabel>
            <TextField
              type="text"
              onChange={handleChange}
              value={display_name}
              id="display_name"
              fullWidth
              required
              sx={{ mb: 1 }}
              error={!!error.display_name}
              helperText={error.display_name}
            />
            <FormLabel>Логин</FormLabel>
            <TextField
              type="text"
              onChange={handleChange}
              value={login}
              id="login"
              fullWidth
              required
              sx={{ mb: 1 }}
              error={!!error.login}
              helperText={error.login}
            />
            <FormLabel>E-mail</FormLabel>
            <TextField
              type="text"
              onChange={handleChange}
              value={email}
              id="email"
              fullWidth
              required
              sx={{ mb: 1 }}
              error={!!error.email}
              helperText={error.email}
            />
            <FormLabel>Телефон</FormLabel>
            <TextField
              type="tel"
              onChange={handleChange}
              value={phone}
              id="phone"
              fullWidth
              required
              error={!!error.phone}
              helperText={error.phone}
            />
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

export default withAuthorizationCheck(Profile)
