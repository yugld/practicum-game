import * as React from 'react'
import {
  Button,
  TextField,
  FormLabel,
  DialogContent,
  DialogActions,
  Dialog
} from '@mui/material'
import { userApi } from '../../api/userApi'
import { ChangePasswordData } from '../../api/types'

export default function EditPassword() {
  const [open, setOpen] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setOldPassword('')
    setNewPassword('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ newPassword })
    userApi
      .editPassword({ newPassword, oldPassword } as ChangePasswordData)
      .then(() => {
        alert(`change password ${newPassword}`)
        handleClose()
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason
        if (reason) {
          alert(reason)
          handleClose()
        }
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
              onChange={e => setOldPassword(e.target.value)}
              value={oldPassword}
              type="string"
              fullWidth
              required
            />
            <FormLabel>Новый пароль</FormLabel>
            <TextField
              margin="dense"
              onChange={e => setNewPassword(e.target.value)}
              value={newPassword}
              type="string"
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
