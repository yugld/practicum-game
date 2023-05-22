import { AddUserDialogSlice } from "./addUserDialog.types";
import { RoomSlice } from "./roomSlice.types";
import { RoomsSlice } from "./roomsSlice.types";
import { UserSlice } from "./userSlice.types";

export interface Store {
    rooms: RoomsSlice;
    room: RoomSlice;
    user: UserSlice;
    addUserDialog: AddUserDialogSlice;
}
