import {
  Button,
  TextField,
  FormLabel,
  DialogContent,
  DialogActions,
  Dialog
} from '@mui/material'
import { userApi } from '../../api/userApi'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function EditPassword () {
  const [ open, setOpen ] = useState(false)
  const [ oldPassword, setOldPassword ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.currentTarget as HTMLInputElement).value
    const fieldName = (e.currentTarget as HTMLInputElement).id
    switch (fieldName) {
      case 'oldPassword':
        setOldPassword(value)
        break
      case 'newPassword':
        setNewPassword(value)
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
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ newPassword })
    userApi
      .editPassword({ newPassword, oldPassword })
      .then(() => {
        alert(`change password ${ newPassword }`)
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
      <Button onClick={ handleClickOpen }>Изменить пароль</Button>
      <Dialog open={ open } onClose={ handleClose }>
        <form onSubmit={ handleSubmit }>
          <DialogContent>
            <FormLabel>Старый пароль</FormLabel>
            <TextField
              margin='dense'
              onChange={ handleChange }
              value={ oldPassword }
              id='oldPassword'
              type='string'
              fullWidth
              required
            />
            <FormLabel>Новый пароль</FormLabel>
            <TextField
              margin='dense'
              onChange={ handleChange }
              value={ newPassword }
              id='newPassword'
              type='string'
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleClose }>Отмена</Button>
            <Button type='submit'>Сохранить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
