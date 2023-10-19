import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosLocalApiInstance } from '../utils/axios';
import { LeaderboardSlice } from './leaderboardSlice.types';

const GET_TOP_FIVE_USERS = 'GET_TOP_FIVE_USERS';
const UPDATE_USER_RATING = 'UPDATE_USER_RATING';

export const initialStateLeaderboard: LeaderboardSlice = {
    topFiveUsersList: null
};

export const getTopFiveUsers = createAsyncThunk(
    `leaderboard/${GET_TOP_FIVE_USERS}`,
    async () => {
        const response = await axiosLocalApiInstance({
            method: 'GET',
            url: '/api/userRating/top'
        });

        return response.data;
    }
);

export const updateUserRating = createAsyncThunk(
    `leaderboard/${UPDATE_USER_RATING}`,
    async (userId: number) => {
        const response = await axiosLocalApiInstance({
            method: 'POST',
            url: `/api/userRating/${userId}`,
        });

        return response.data;
    }
);

const leaderboard = createSlice({
    name: 'leaderboard',
    initialState: initialStateLeaderboard,
    reducers: {
        clearTopFiveUsersList: (state: LeaderboardSlice)=> {
            return {...state, topFiveUsersList: []};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTopFiveUsers.pending, (state: LeaderboardSlice) => {
            state.topFiveUsersList = null;
        });
        builder.addCase(getTopFiveUsers.fulfilled, (state: LeaderboardSlice, action) => {
            state.topFiveUsersList = action.payload;
        });
        builder.addCase(getTopFiveUsers.rejected, (state: LeaderboardSlice) => {
            state.topFiveUsersList = [];
        });
    }
});

export const {
    actions: {
        clearTopFiveUsersList
    },
    reducer: leaderboardReducer
} = leaderboard;
