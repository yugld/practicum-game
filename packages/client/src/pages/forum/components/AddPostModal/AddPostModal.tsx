import {
    Button,
    TextField,
    FormLabel,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    DialogTitle
} from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import IconAdd from '../icons/IconAdd'

export default function AddPostModal() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = (e.currentTarget as HTMLInputElement).value
        const fieldName = (e.currentTarget as HTMLInputElement).id
    }

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setTitle('')
        setDescription('')
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleClose()
    }

    return (
        <>
            <IconButton onClick={handleClickOpen} size="large">
                <IconAdd />
            </IconButton>
            <Dialog open={open} onClose={handleClose} className='post__modal'>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Cоздать новую тему</DialogTitle>
                    <DialogContent>
                        <FormLabel>Название</FormLabel>
                        <TextField
                            margin='dense'
                            onChange={handleChange}
                            id='title'
                            type='string'
                            fullWidth
                            required
                        />
                        <FormLabel>Описание</FormLabel>
                        <TextField
                            margin='dense'
                            onChange={handleChange}
                            id='description'
                            type='string'
                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button type='submit'>ОК</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
