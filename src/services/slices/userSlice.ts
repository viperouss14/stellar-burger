import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
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
    localStorage.clear();
  })
);

export const checkUserThunk = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((response) => {
          dispatch(setUser(response.user));
        })
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

type TUserState = {
  isAuthChecked: boolean;
  userData: TUser | null;
  error: string | undefined;
};

const initialState: TUserState = {
  isAuthChecked: false,
  userData: null,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.userData = action.payload;
    }
  },
  selectors: {
    getUserSelector: (state) => state.userData,
    getAuthCheckedSelector: (state) => state.isAuthChecked,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка при регистрации';
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка при входе';
      })
      .addCase(getUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка при получении данных пользователя';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка при обновлении данных пользователя';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.userData = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка при выходе';
      });
  }
});

export const { getAuthCheckedSelector, getUserSelector, getErrorSelector } =
  userSlice.selectors;
export const userReducer = userSlice.reducer;
export const { setAuthChecked, setUser } = userSlice.actions;
