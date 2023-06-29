import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthState from './types/AuthState';
import Credentials from './types/Credentials';
import * as api from './api';
import RegisterData from './types/RegisterData';
import User from './types/User';

const initialState: AuthState = {
  authChecked: false,
  user: undefined,
  loginFormError: undefined,
  registerFormError: undefined,
};

export const getProfile = createAsyncThunk('api/users/my/profile', () =>
  api.getProfile()
);

export const login = createAsyncThunk('login', async (credentials: Credentials) => {
  if (!credentials.username.trim() || !credentials.password.trim()) {
    throw new Error('Не все поля заполнены');
  }
  return api.login(credentials);
});

export const register = createAsyncThunk(
  'api/register',
  async (data: RegisterData) => {
    if (data.password !== data.passwordRepeat) {
      throw new Error('Пароли не совпадают');
    }
    if (!data.username.trim() || !data.password.trim()) {
      throw new Error('Не все поля заполнены');
    }

    return api.register(data);
  }
);

export const logout = createAsyncThunk('logout', api.logout);

export const getUserCards = createAsyncThunk('api/users/my/cards', () =>
  api.getUserCards()
);

export const editProfile = createAsyncThunk(
  'users/editProfile',
  async (profile: User) => api.editProfile(profile)
  // TODO переделать стартовый(тестовый) вариант
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // редьюсер для очистки ошибки
    resetLoginFormError: (state) => {
      state.loginFormError = undefined;
    },
    resetRegisterFormError: (state) => {
      state.registerFormError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.authChecked = true;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.authChecked = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loginFormError = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginFormError = action.error.message;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.authChecked = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerFormError = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerFormError = action.error.message;
      })
      .addCase(getUserCards.fulfilled, (state, action) => {
        if (state.user) {
          state.user.cards = action.payload.cards;
        }
      })
      // TODO добавить форму ошибки для getUserCards и case под неё

      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
    // TODO добавить форму ошибки для editProfile и case под неё
  },
});

export const { resetLoginFormError, resetRegisterFormError } = authSlice.actions;

export default authSlice.reducer;
