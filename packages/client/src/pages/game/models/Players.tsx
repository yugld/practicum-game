import Player from './Player'
import { IUser } from '../../../api/types'

class Players {
  getNoActivePlayerIndex(players: Player[], activePlayerId: number): number {
    return players.findIndex(
      (player: Player) => player.user.id !== activePlayerId
    )
  }

  getPlayerByUserId(players: Player[], id: number): Player {
    return (
      players.find((player: Player) => player.user.id === id) || ({} as Player)
    )
  }

  getPlayerIndexByUserId(players: Player[], id: number): number {
    return players.findIndex((player: Player) => player.user.id === id)
  }
}
export default new Players()
