import { AddUserDialogSlice } from './addUserDialog.types'
import { RoomSlice } from './roomSlice.types'
import { RoomsSlice } from './roomsSlice.types'
import { UserSlice } from './userSlice.types'
import { ActivePlayerSlice } from './activePlayer.types'
import { DiscardedCardSlice } from './discardedCard.types'
import { GameStateSlice } from './gameState.types'

export interface Store {
  rooms: RoomsSlice
  room: RoomSlice
  user: UserSlice
  addUserDialog: AddUserDialogSlice
  activePlayer: ActivePlayerSlice
  discardedCard: DiscardedCardSlice
  gameState: GameStateSlice
}
