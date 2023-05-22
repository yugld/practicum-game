import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';
import { AddUserDialogSlice } from './addUserDialog.types';

const SEARCH_USERS_BY_LOGIN = 'SEARCH_USERS_BY_LOGIN';

export const initialStateAddUserDialog: AddUserDialogSlice = {
    usersList: null
};

export const searchUsersByLogin = createAsyncThunk(
    `addUserDialog/${SEARCH_USERS_BY_LOGIN}`,
    async (login: string) => {
        const response = await axiosInstance({
            method: 'POST',
            url: `/user/search`,
            data: { login }
        });

        return response.data;
    }
);

const addUserDialog = createSlice({
    name: 'addUserDialog',
    initialState: initialStateAddUserDialog,
    reducers: {
        clearAddUserDialog: (state: AddUserDialogSlice)=> {
            return {...state, user: initialStateAddUserDialog.usersList};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchUsersByLogin.pending, (state: AddUserDialogSlice) => {
            state.usersList = null;
        });
        builder.addCase(searchUsersByLogin.fulfilled, (state: AddUserDialogSlice, action) => {
            state.usersList = action.payload;
        });
        builder.addCase(searchUsersByLogin.rejected, (state: AddUserDialogSlice) => {
            state.usersList = [];
        });
    }
});

export const {
    actions: {clearAddUserDialog},
    reducer: addUserDialogReducer
} = addUserDialog;
