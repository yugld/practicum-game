import Player from './Player'
import { PlayerType } from '../../../store/activePlayer.types'
class Players {
  getNoActivePlayerIndex(
    players: PlayerType[],
    activePlayerId: number
  ): number {
    return players.findIndex(
      (player: PlayerType) => player.user?.id !== activePlayerId
    )
  }

  getPlayerByUserId(players: PlayerType[], id: number): PlayerType {
    return (
      players.find((player: PlayerType) => player.user?.id === id) ||
      ({} as Player)
    )
  }

  getPlayerIndexByUserId(players: PlayerType[], id: number): number {
    return players.findIndex((player: PlayerType) => player.user?.id === id)
  }
}
export default new Players()
