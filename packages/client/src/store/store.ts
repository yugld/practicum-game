import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { roomsReducer } from './roomsSlice'
import { roomReducer } from './roomSlice'
import { userReducer } from './userSlice'
import { addUserDialogReducer } from './addUserDialogSlice'
import { gameStateReducer } from './gameState'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    room: roomReducer,
    user: userReducer,
    addUserDialog: addUserDialogReducer,
    gameState: gameStateReducer,
  },
})

export const appDispatch = store.dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
