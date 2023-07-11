import { ChangeEvent, FormEvent, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  Button,
  TextField,
  FormLabel,
  DialogContent,
  DialogActions,
  Dialog,
} from '@mui/material'
import { useAppDispatch } from '../../store/store'
import { editUserPassword } from '../../store/userSlice'
import { validateForm } from '../../utils/formValidation'

export default function EditPassword() {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [oldPasswordError, setOldPasswordError] = useState<string>('')
  const [newPasswordError, setNewPasswordError] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.currentTarget as HTMLInputElement).value
    const fieldName = (e.currentTarget as HTMLInputElement).id
    switch (fieldName) {
      case 'oldPassword':
        setOldPassword(value)
        setOldPasswordError(validateForm({ type: 'password', value }))
        break
      case 'newPassword':
        setNewPassword(value)
        setNewPasswordError(validateForm({ type: 'password', value }))
        break
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setOldPassword('')
    setNewPassword('')
    setOldPasswordError('')
    setNewPasswordError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(editUserPassword({ newPassword, oldPassword }))
      .then(unwrapResult)
      .then(() => {
        alert(`change password ${newPassword}`)
        handleClose()
      })
  }

  return (
    <>
      <Button onClick={handleClickOpen}>Изменить пароль</Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <FormLabel>Старый пароль</FormLabel>
            <TextField
              margin="dense"
              onChange={handleChange}
              value={oldPassword}
              id="oldPassword"
              type="string"
              error={!!oldPasswordError}
              helperText={oldPasswordError}
              fullWidth
              required
            />
            <FormLabel>Новый пароль</FormLabel>
            <TextField
              margin="dense"
              onChange={handleChange}
              value={newPassword}
              id="newPassword"
              type="string"
              error={!!newPasswordError}
              helperText={newPassword}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type="submit">Сохранить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
