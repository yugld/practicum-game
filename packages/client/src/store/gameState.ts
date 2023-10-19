import { createSlice } from '@reduxjs/toolkit'
import { GameStateSlice } from './gameState.types'
import { GameProgress, ResultMessageTypeEnum } from '../pages/game/types'
export const initialStateGameState: GameStateSlice = {
  gameState: {
    activePlayer: null,
    rivalPlayer: null,
    discardedCards: [],
    discardedCard: null,
    deck: [],
    gameProgress: GameProgress.choice,
    isFinishPrevRound: {
      value: false,
      winUser: undefined,
    },
    resultMessage: {
      type: ResultMessageTypeEnum.error,
      text: '',
    },
    isSelectCard: false,
  },
}

const gameState = createSlice({
  name: 'gameState',
  initialState: initialStateGameState,
  reducers: {
    clearGameState: (state: GameStateSlice) => {
      return { ...state, gameState: initialStateGameState.gameState }
    },
    clearDiscardedCards: (state: GameStateSlice) => {
      state.gameState = {
        ...state.gameState,
        discardedCards: [],
      }
    },
    updateGameState: (state: GameStateSlice, action) => {
      state.gameState = { ...state.gameState, ...action.payload }
    },
    updateActivePlayer: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        activePlayer: { ...state.gameState.activePlayer, ...action.payload },
      }
    },
    updateRivalPlayer: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        rivalPlayer: { ...state.gameState.rivalPlayer, ...action.payload },
      }
    },
    updateDiscardedCards: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        discardedCards: [...state.gameState.discardedCards, action.payload],
      }
    },
    updateDiscardedCard: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        discardedCard: { ...state.gameState.discardedCard, ...action.payload },
      }
    },
    updateResultMessage: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        resultMessage: { ...state.gameState.resultMessage, ...action.payload },
      }
    },
    updateCardDeck: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        deck: [...action.payload],
      }
    },
    updateGameProgress: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        gameProgress: action.payload,
      }
    },
    updateIsSelectCard: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        isSelectCard: action.payload,
      }
    },
    updateFinishPrevRound: (state: GameStateSlice, action) => {
      state.gameState = {
        ...state.gameState,
        isFinishPrevRound: {
          ...state.gameState.isFinishPrevRound,
          ...action.payload,
        },
      }
    },
  },
})

export const {
  actions: {
    clearGameState,
    clearDiscardedCards,
    updateGameState,
    updateActivePlayer,
    updateRivalPlayer,
    updateDiscardedCards,
    updateDiscardedCard,
    updateResultMessage,
    updateCardDeck,
    updateGameProgress,
    updateIsSelectCard,
    updateFinishPrevRound,
  },
  reducer: gameStateReducer,
} = gameState
