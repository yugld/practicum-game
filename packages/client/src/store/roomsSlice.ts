import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';
import { RoomListPayload, RoomsSlice } from './roomsSlice.types';

const GET_ROOMS_LIST = 'GET_ROOMS_LIST';
const CREATE_NEW_ROOM = 'CREATE_NEW_ROOM';
const DELETE_ROOM = 'DELETE_ROOM';
const GET_ROOM_TOKEN = 'GET_ROOM_TOKEN';

export const initialStateRooms: RoomsSlice = {
    roomsList: null
};

export const getRoomsList = createAsyncThunk(
    `rooms/${GET_ROOMS_LIST}`,
    async ({data}: {data?: RoomListPayload}) => {
        const response = await axiosInstance({
            method: 'GET',
            url: `/chats`,
            data
        });

        return response.data;
    }
);

export const createRoom = createAsyncThunk(
    `rooms/${CREATE_NEW_ROOM}`,
    async (title: string) => {
        const response = await axiosInstance({
            method: 'POST',
            url: `/chats`,
            data: { title }
        });

        return response.data;
    }
);

export const deleteRoom = createAsyncThunk(
    `rooms/${DELETE_ROOM}`,
    async (id: number) => {
        const response = await axiosInstance({
            method: 'DELETE',
            url: `/chats`,
            data: { chatId: id }
        });

        return response.data;
    }
);

export const getRoomToken = createAsyncThunk(
    `rooms/${GET_ROOM_TOKEN}`,
    async (id: number) => {
        const response = await axiosInstance({
            method: 'POST',
            url: `/chats/token/${id}`
        });

        return response.data;
    }
);

const rooms = createSlice({
    name: 'rooms',
    initialState: initialStateRooms,
    reducers: {
        clearRoomsList: (state: RoomsSlice)=> {
            return {...state, roomsList: []};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomsList.pending, (state: RoomsSlice) => {
            state.roomsList = null;
        });
        builder.addCase(getRoomsList.fulfilled, (state: RoomsSlice, action) => {
            state.roomsList = action.payload;
        });
        builder.addCase(getRoomsList.rejected, (state: RoomsSlice) => {
            state.roomsList = [];
        });
    }
});

export const {
    actions: {clearRoomsList},
    reducer: roomsReducer
} = rooms;
