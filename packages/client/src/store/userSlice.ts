import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';
import { ChangePasswordData, LoginRequestData, RegisterRequestData, TUserOmit, UserSlice } from './userSlice.types';

const GET_USER = 'GET_USER';
const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
const LOGOUT = 'LOGOUT';
const EDIT_USER_INFO = 'EDIT_USER_INFO';
const EDIT_USER_PASSWORD = 'EDIT_USER_PASSWORD';
const UPDATE_AVATAR = 'UPDATE_AVATAR';

export const initialStateUser: UserSlice = {
    user: {
        id: undefined,
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        email: '',
        avatar: '',
        phone: ''
    }
};
  
export const signinUser = createAsyncThunk(
    `user/${SIGN_IN}`,
    async (data: LoginRequestData) => {
        const response = await axiosInstance({
            method: 'POST',
            url: `/auth/signin`,
            data
        });

        return response.data;
    }
);

export const signupUser = createAsyncThunk(
    `user/${SIGN_UP}`,
    async (data: RegisterRequestData) => {
        const response = await axiosInstance({
            method: 'POST',
            url: `/auth/signup`,
            data
        });

        return response.data;
    }
);

export const logoutUser = createAsyncThunk(
    `user/${LOGOUT}`,
    async (_) => {
        const response = await axiosInstance({
            method: 'POST',
            url: `/auth/logout`
        });

        return response.data;
    }
);

export const getUser = createAsyncThunk(
    `user/${GET_USER}`,
    async (_) => {
        const response = await axiosInstance({
            method: 'GET',
            url: `/auth/user`
        });

        return response.data;
        
    }
);

export const editUserInfo = createAsyncThunk(
    `user/${EDIT_USER_INFO}`,
    async (data: TUserOmit) => {
        const response = await axiosInstance({
            method: 'PUT',
            url: `/user/profile`,
            data
        });

        return response.data;
    }
);

export const editUserPassword = createAsyncThunk(
    `user/${EDIT_USER_PASSWORD}`,
    async (data: ChangePasswordData) => {
        const response = await axiosInstance({
            method: 'PUT',
            url: `/user/password`,
            data
        });

        return response.data;
    }
);

export const updateAvatar = createAsyncThunk(
    `user/${UPDATE_AVATAR}`,
    async (avatar: Blob) => {
        const data = new FormData();
        data.append('avatar', avatar);

        const response = await axiosInstance({
            method: 'PUT',
            url: `user/profile/avatar`,
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data;
    }
);

const user = createSlice({
    name: 'user',
    initialState: initialStateUser,
    reducers: {
        clearUser: (state: UserSlice)=> {
            return {...state, user: initialStateUser.user};
        },
        updateUser: (state: UserSlice, action) => {
            state.user = { ...state.user, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state: UserSlice) => {
            state.user = initialStateUser.user;
        });
        builder.addCase(getUser.fulfilled, (state: UserSlice, action) => {
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state: UserSlice) => {
            state.user = initialStateUser.user;
        });
        builder.addCase(editUserInfo.pending, (state: UserSlice) => {
            state.user = { ...state.user };
        });
        builder.addCase(editUserInfo.fulfilled, (state: UserSlice, action) => {
            state.user = { ...state.user, ...action.payload };
        });
        builder.addCase(editUserInfo.rejected, (state: UserSlice) => {
            state.user = { ...state.user };
        });
        builder.addCase(updateAvatar.pending, (state: UserSlice) => {
            state.user = { ...state.user };
        });
        builder.addCase(updateAvatar.fulfilled, (state: UserSlice, action) => {
            state.user = { ...state.user, ...action.payload };
        });
        builder.addCase(updateAvatar.rejected, (state: UserSlice) => {
            state.user = { ...state.user };
        });
    }
});

export const {
    actions: {clearUser, updateUser},
    reducer: userReducer
} = user;
