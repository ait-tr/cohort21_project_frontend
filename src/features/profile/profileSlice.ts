import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import Profile from './types/Profile';
import ProfileState from './types/ProfileState';

const initialState: ProfileState = {
  id: 0,
  username: '',
  email: '',
  phone: '',
  role: '',
  isHelper: false,
  cards: [],
};

export const getProfile = createAsyncThunk('users/getProfile', () =>
  api.getProfile()
);

export const editProfile = createAsyncThunk(
  'users/editProfile',
  async (profile: Profile) => api.editProfile(profile)
);

// export const editProfile = createAsyncThunk(
//   'users/editProfile',
//   async ({ email, phone }: { email: string; phone: string }, { getState }) => {
//     const state: RootState = getState();
//     const currentUser = state.profile;

//     const editedUser = {
//       ...currentUser,
//       email,
//       phone,
//     };

//     return api.editProfile(editedUser);
//   }
// );

const profileSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.username = action.payload.username;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        //   state.email = action.payload.email;
        //   state.phone = action.payload.phone;
        state = action.payload;
      });
  },
});

export default profileSlice.reducer;
