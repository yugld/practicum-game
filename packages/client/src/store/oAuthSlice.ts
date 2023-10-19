import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import { OAuthLoginRequestData, OAuthServiceRequestData, OAuthSlice } from "./oAuthSlice.types";

const OAUTH_URI_AUTHORIZE = "https://oauth.yandex.ru/authorize?response_type=code";
const REDIRECT_URI = 'https://meeples.ya-praktikum.tech/';

export const initialState: OAuthSlice = {
    loading: false,
    error: null,
};

export const getServiceId = createAsyncThunk("OAUTH/getServiceId", async () => {
    const data: OAuthServiceRequestData = {
        redirect_uri: REDIRECT_URI,
    }

    const response = await axiosInstance({
        method: 'GET',
        url: `oauth/yandex/service-id`,
        params: data
    });

    window.location.replace(
        `${OAUTH_URI_AUTHORIZE}&client_id=${response.data.service_id}&redirect_uri=${REDIRECT_URI}`
    );

    return response.data;
});

export const login = createAsyncThunk<void, OAuthLoginRequestData["code"],{ rejectValue: OAuthSlice["error"] }>("OAUTH/login", async (code, { dispatch }) => {
    const data: OAuthLoginRequestData = {
        code,
        redirect_uri: REDIRECT_URI,
    };

    await axiosInstance({
        method: 'POST',
        url: `oauth/yandex`,
        data
    });
});

export const oAuth = createSlice({
    name: "OAUTH",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getServiceId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getServiceId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || null;
        });
    },
});

export const {
    actions: {resetError},
    reducer: oAuthReducer
} = oAuth;
