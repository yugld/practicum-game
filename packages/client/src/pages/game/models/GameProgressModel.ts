import { getRoomUsers } from '../../../services/room'
import Player from './Player'
import Players from './Players'
import { IUser } from '../../../api/types'
import Board from './Board'

import { CardType, GameProgress } from '../types'

export class GameProgressModel {
  static async initRoomUsers(roomId: number): Promise<IUser[]> {
    return await getRoomUsers(roomId)
      .then(users => {
        return users
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason
        if (reason) {
          console.error(reason)
        }
        return []
      })
  }

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
      if (!user) {
        console.log('User is undefined')
        return
      }
      const cardOnHand = Players.getPlayerByUserId(players, user.id).cardOnHand
      if (cardOnHand) {
        renderCards.push(cardOnHand)
      }
    }

    board?.renderCards(renderCards)
  }
}
