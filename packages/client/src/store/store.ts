import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { roomsReducer } from './roomsSlice'
import { roomReducer } from './roomSlice'
import { userReducer } from './userSlice'
import { addUserDialogReducer } from './addUserDialogSlice'
import { gameStateReducer } from './gameState'
import { AddUserDialogSlice } from './addUserDialog.types'
import { GameStateSlice } from './gameState.types'
import { RoomSlice } from './roomSlice.types'
import { RoomsSlice } from './roomsSlice.types'
import { UserSlice } from './userSlice.types'

export type RootState = {
  rooms: RoomsSlice;
  room: RoomSlice;
  user: UserSlice;
  addUserDialog: AddUserDialogSlice;
  gameState: GameStateSlice;
};

// const state = globalThis?.__REDUX_STATE__ as RootState;
// console.log(state);

export const createStore = (preloadedState?: RootState) => {
  return configureStore<RootState>({
    reducer: {
      rooms: roomsReducer,
      room: roomReducer,
      user: userReducer,
      addUserDialog: addUserDialogReducer,
      gameState: gameStateReducer,
    },
    preloadedState
  })
}

export const store = createStore();

export const appDispatch = store.dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
