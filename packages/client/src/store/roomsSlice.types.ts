import { Room } from "./roomSlice.types";

export interface RoomsSlice {
    roomsList: Room[] | null;
}

export interface RoomListPayload {
    offset?: number;
    limit?: number;
    title?: string;
}
