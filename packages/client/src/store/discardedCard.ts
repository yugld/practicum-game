import { createSlice } from '@reduxjs/toolkit'
import { DiscardedCardSlice } from './discardedCard.types'
export const initialStateDiscardedCard: DiscardedCardSlice = {
  discardedCard: null,
}

const discardedCard = createSlice({
  name: 'discardedCard',
  initialState: initialStateDiscardedCard,
  reducers: {
    clearDiscardedCard: (state: DiscardedCardSlice) => {
      return { ...state, activePlayer: initialStateDiscardedCard.discardedCard }
    },
    // updateDiscardedCard: (state: DiscardedCardSlice, action) => {
    //   state.discardedCard = { ...state.discardedCard, ...action.payload }
    // },
  },
})

export const {
  actions: { clearDiscardedCard },
  reducer: discardedCardReducer,
} = discardedCard
