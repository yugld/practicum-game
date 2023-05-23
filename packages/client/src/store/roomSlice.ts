import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';
import { RoomSlice } from './roomSlice.types';

const GET_ROOM_USERS = 'GET_ROOM_USERS';
const DELETE_ROOM_USER = 'DELETE_ROOM_USER';
const ADD_ROOM_USER = 'ADD_ROOM_USER';

export const initialStateRoom: RoomSlice = {
    roomUsersList: null,
    currentStatus: null,
    roomInfo: null
};

export const getRoomsUsers = createAsyncThunk(
    `room/${GET_ROOM_USERS}`,
    async (id: number) => {
        const response = await axiosInstance({
            method: 'GET',
            url: `/chats/${id}/users`
        });

        return response.data;
    }
);

export const deleteRoomUser = createAsyncThunk(
    `room/${DELETE_ROOM_USER}`,
    async (data: any) => {
        const response = await axiosInstance({
            method: 'DELETE',
            url: `/chats/users`,
            data
        });

        return response.data;
    }
);

export const addRoomUser = createAsyncThunk(
    `room/${ADD_ROOM_USER}`,
    async (data: any) => {
        const response = await axiosInstance({
            method: 'PUT',
            url: `/chats/users`,
            data
        });

        return response.data;
    }
);

const room = createSlice({
    name: 'room',
    initialState: initialStateRoom,
    reducers: {
        clearRoomUsersList: (state: RoomSlice)=> {
            return {...state, roomUsersList: []};
        },
        updateUsers: (state: RoomSlice, action) => {
            state.roomUsersList = action.payload;
        },
        updateGameStatus: (state: RoomSlice, action) => {
            state.currentStatus = action.payload;
        },
        updateRoomInfo: (state: RoomSlice, action) => {
            state.roomInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomsUsers.pending, (state: RoomSlice) => {
            state.roomUsersList = null;
        });
        builder.addCase(getRoomsUsers.fulfilled, (state: RoomSlice, action) => {
            state.roomUsersList = action.payload;
        });
        builder.addCase(getRoomsUsers.rejected, (state: RoomSlice) => {
            state.roomUsersList = [];
        });
    }
});

export const {
    actions: {
        clearRoomUsersList,
        updateUsers,
        updateGameStatus,
        updateRoomInfo
    },
    reducer: roomReducer
} = room;
