import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { roomsReducer } from './roomsSlice'
import { roomReducer } from './roomSlice'
import { userReducer } from './userSlice'
import { addUserDialogReducer } from './addUserDialogSlice'
import { gameStateReducer } from './gameState'
import { leaderboardReducer } from './leaderboardSlice'
import { themeReducer } from './theme'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    room: roomReducer,
    user: userReducer,
    addUserDialog: addUserDialogReducer,
    gameState: gameStateReducer,
    leaderboard: leaderboardReducer,
    theme: themeReducer,
  },
})

export const appDispatch = store.dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
