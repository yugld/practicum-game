import Player from './Player'
import { IUser } from '../../../api/types'

class Players {
  init(users: IUser[], callback: (player: Player, index: number) => void) {
    const players = []
    for (let index = 0; index < users.length; index++) {
      players.push(
        new Player({
          user: users[index],
        })
      )
      callback(players[index], index)
    }
    return players
  }

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
