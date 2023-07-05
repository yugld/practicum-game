import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ThemeStateSlice } from './ThemeSlice.types'
import { axiosLocalApiInstance } from '../utils/axios'

const GET_THEME_BY_USER_ID = 'GET_THEME_BY_USER_ID'
const UPDATE_THEME_FOR_USER = 'updateThemeForUser'
export const initialThemeState: ThemeStateSlice = {
  theme: 'light',
}

export const getThemeByUserId = createAsyncThunk(
  `theme/${GET_THEME_BY_USER_ID}`,
  async (userId: number) => {
    const response = await axiosLocalApiInstance({
      method: 'GET',
      url: `/api/theme/${userId}`,
    })

    return response.data
  }
)

export const updateThemeForUser = createAsyncThunk(
  `theme/${UPDATE_THEME_FOR_USER}`,
  async ({ userId, value }: { userId: number; value: number }) => {
    const response = await axiosLocalApiInstance({
      method: 'POST',
      url: `/api/theme/${userId}`,
      data: {
        value,
      },
    })

    return response.data
  }
)

const themeState = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    updateTheme: (state: ThemeStateSlice, action) => {
      state.theme = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getThemeByUserId.pending, (state: ThemeStateSlice) => {
      state.theme = initialThemeState.theme
    })
    builder.addCase(
      getThemeByUserId.fulfilled,
      (state: ThemeStateSlice, action) => {
        state.theme = action.payload
      }
    )
    builder.addCase(getThemeByUserId.rejected, (state: ThemeStateSlice) => {
      state.theme = initialThemeState.theme
    })
  },
})

export const {
  actions: { updateTheme },
  reducer: themeReducer,
} = themeState
