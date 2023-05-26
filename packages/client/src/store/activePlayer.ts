import { createSlice } from '@reduxjs/toolkit'
import { ActivePlayerSlice } from './activePlayer.types'
export const initialStateActivePlayer: ActivePlayerSlice = {
  activePlayer: {
    user: null,
    isProtect: false,
    numberOfTokens: 0,
    cardOnHand: {
      title: '',
      count: 0,
      value: 0,
      text: '',
      imgSrc: '',
    },
  },
}

const activePlayer = createSlice({
  name: 'activePlayer',
  initialState: initialStateActivePlayer,
  reducers: {
    clearActivePlayer: (state: ActivePlayerSlice) => {
      return { ...state, activePlayer: initialStateActivePlayer.activePlayer }
    },
    // updateActivePlayer: (state: ActivePlayerSlice, action) => {
    //   state.activePlayer = { ...state.activePlayer, ...action.payload }
    // },
  },
})

export const {
  actions: { clearActivePlayer },
  reducer: activePlayerReducer,
} = activePlayer
