import { PlayerType } from './activePlayer.types'
import { CardType, GameProgress, ResultMessageType } from '../pages/game/types'

export interface FinishedRoundType {
  value: boolean
  winUser: number | undefined
}

export interface DiscardedCardType {
  user: number
  card: CardType
}
export interface GameProgressState {
  activePlayer: PlayerType | null
  rivalPlayer: PlayerType | null
  discardedCards: DiscardedCardType[]
  discardedCard: CardType | null
  deck: CardType[]
  isFinishPrevRound: FinishedRoundType
  gameProgress?: GameProgress
  resultMessage?: ResultMessageType
  isSelectCard?: boolean
}

export interface GameStateSlice {
  gameState: GameProgressState
}
