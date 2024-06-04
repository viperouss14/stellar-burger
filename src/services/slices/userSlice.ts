import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'register/registerUser',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const loginUserThunk = createAsyncThunk(
  'login/loginUser',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logoutThunk = createAsyncThunk('user/logoutUser', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: undefined,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.user,
    getIsAuthCheckedSelector: (state) => state.isAuthChecked,
    getErrorSelector: (state) => state.error,
    getLoginUserRequestSelector: (state) => state.loginUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message ?? 'Ошибка при регистрации';
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message ?? 'Ошибка при входе';
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error =
          action.error.message ?? 'Ошибка при получении данных пользователя';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error =
          action.error.message ?? 'Ошибка при обновлении данных пользователя';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = { email: '', name: '' };
        state.error = undefined;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка при выходе';
      });
  }
});

export const {
  getIsAuthCheckedSelector,
  getUserSelector,
  getErrorSelector,
  getLoginUserRequestSelector
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
