import Player from './Player'
import Players from './Players'
import { IUser } from '../../../store/userSlice.types'
import Board from './Board'

import { CardType, GameProgress } from '../types'

export class GameProgressModel {
  static renderBoard(
    board: Board | null,
    players: Player[],
    takeRandomCard: () => CardType,
    discardCard: (card: CardType) => void,
    activePlayer: Player,
    user: IUser | null,
    changeGameProgress: (progress: GameProgress) => void
  ) {
    let renderCards: CardType[] = []
    if (user?.id === activePlayer?.user.id) {
      changeGameProgress(GameProgress.choice)
      renderCards = [activePlayer?.cardOnHand, takeRandomCard()]
    } else {
      changeGameProgress(GameProgress.waiting)
      if (!user || user.id == undefined) {
        console.log('User is undefined')
        return
      }
      const cardOnHand = Players.getPlayerByUserId(players, user.id).cardOnHand
      if (cardOnHand) {
        renderCards.push(cardOnHand)
      }
    }
    console.log(renderCards)
    board?.renderCards(renderCards)
  }
}
