import { IUser } from './userSlice.types'
import { CardType } from '../pages/game/types'

export interface PlayerType {
  user: IUser | null
  isProtect: boolean
  numberOfTokens: number
  cardOnHand: CardType
}
export interface ActivePlayerSlice {
  activePlayer: PlayerType
}
