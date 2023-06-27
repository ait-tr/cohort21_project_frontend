import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './features/auth/authSlice';
import helpCardsSlice from './features/help_cards/helpCardsSlice';
import tasksSlice from './features/tasks/tasksSlice';
import profileSlice from './features/profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    helpCards: helpCardsSlice,
    tasks: tasksSlice,
  },
});

// для правильной типизации будем использовать useAppDispatch вместо useDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
