import { IUser } from "./userSlice.types";

export interface RoomSlice {
  roomUsersList: IUser[] | null;
  currentStatus: string | null;
  playersConnected: number;
  roomInfo: Room | null;
}

export interface Room {
  id: number;
  title: string;
  created_by: number;
  last_message: {
    user: IUser;
    time: string;
    content: string;
  }
}
  