import { AddUserDialogSlice } from './addUserDialog.types'
import { RoomSlice } from './roomSlice.types'
import { RoomsSlice } from './roomsSlice.types'
import { UserSlice } from './userSlice.types'
import { GameStateSlice } from './gameState.types'

export interface Store {
  rooms: RoomsSlice
  room: RoomSlice
  user: UserSlice
  addUserDialog: AddUserDialogSlice
  gameState: GameStateSlice
}
